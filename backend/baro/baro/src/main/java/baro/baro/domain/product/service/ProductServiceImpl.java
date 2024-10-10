package baro.baro.domain.product.service;

import baro.baro.domain.chat_room.repository.ChatRoomRepository;
import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.contract.dto.request.ContractConditionReq;
import baro.baro.domain.contract.entity.Contract;
import baro.baro.domain.contract.entity.ContractCondition;
import baro.baro.domain.contract.repository.ContractConditionRepository;
import baro.baro.domain.contract.repository.ContractRepository;
import baro.baro.domain.contract.repository.SignatureInformationRepository;
import baro.baro.domain.location.entity.Location;
import baro.baro.domain.location.repository.LocationRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.product.dto.*;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.request.ProductModifyReq;
import baro.baro.domain.product.dto.request.RecentlyProductsReq;
import baro.baro.domain.product.dto.request.SearchProductsReq;
import baro.baro.domain.product.dto.response.*;
import baro.baro.domain.product.entity.Category;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product.entity.ProductStatus;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.domain.product.repository.ProductRepository;
import baro.baro.domain.product_image.dto.request.ProductImageReq;
import baro.baro.domain.product_image.repository.ProductImageRepository;
import baro.baro.domain.wish_list.repository.WishListRepository;
import baro.baro.global.elastic_search.domain.EsKeyword;
import baro.baro.global.elastic_search.domain.EsProduct;
import baro.baro.global.elastic_search.service.EsKeywordService;
import baro.baro.global.elastic_search.service.EsProductService;
import baro.baro.global.event.UnlockEvent;
import baro.baro.global.exception.CustomException;
import baro.baro.global.feigin_client.dto.response.NaverSearchRes;
import baro.baro.global.feigin_client.service.SearchFeignClientCustom;
import baro.baro.global.s3.Images3Service;
import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.IntStream;

import static baro.baro.domain.chat_room.entity.RentalStatus.AVAILABLE;
import static baro.baro.domain.product.entity.Category.ALL;
import static baro.baro.domain.product.validator.ProductValidator.validateProductAddRequest;
import static baro.baro.domain.product.validator.ProductValidator.validateProductModifyRequest;
import static baro.baro.global.statuscode.ErrorCode.*;
import static baro.baro.global.validator.GlobalValidator.validateFiles;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {
    private final static int PRODUCT_SIZE = 20;

    private final RedisUtils redisUtils;
    private final Images3Service images3Service;
    private final MemberRepository memberRepository;
    private final LocationRepository locationRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ContractConditionRepository contractConditionRepository;
    private final WishListRepository wishListRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ContractRepository contractRepository;
    private final SignatureInformationRepository signatureInformationRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final EsProductService esProductService;
    private final EsKeywordService esKeywordService;
    private final SearchFeignClientCustom searchFeignClient;

    @Value("${NAVER_ID}")
    private String naverId;

    @Value("${NAVER_SECRET}")
    private String naverSecret;

    @Override
    @Transactional
    public ProductDetails addProduct(ProductAddReq productAddReq, List<MultipartFile> files, Long memberId) throws IOException {
        //게시글 생성이 안되는경우
        //1. 대여 마감일과 대여 시작일이 지금 시각보다 빠르면 에러, 대여 마감일이 대여 시작일보다 빠른 경우 에러
        //2. 유효하지 않은 리턴타입
        //3. 택배 반납 선택했는디 주소 없으면 에러
        //4. 유효하지 않은 카테고리
        //5. 파일 없으면 에러
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        validateProductAddRequest(productAddReq);
        validateFiles(files);

        Location location = locationRepository.findLocation(productAddReq.getLatitude(), productAddReq.getLongitude());
        Product product = productAddReq.toEntity(member, location);

        ContractCondition contractCondition = null;
        ContractConditionDto contractConditionDto = null;

        if(productAddReq.getContractConditionReq() != null) {
            validateContractCondition(productAddReq.getContractConditionReq());
            contractCondition = productAddReq.getContractConditionReq().toEntity(product);
            contractConditionRepository.save(contractCondition);

            product.updateContractCondition(contractCondition);

            contractConditionDto = ContractConditionDto.toDto(contractCondition);
        }

        productRepository.save(product);

        List<String> imageUrls = images3Service.uploadMultipleFiles(files, "products/"+product.getId());

        IntStream.range(0, imageUrls.size())
                .forEach(i -> {
                    boolean isMain = (i == 0);
                    ProductImageReq productImageReq = new ProductImageReq(imageUrls.get(i), isMain);

                    productImageRepository.save(productImageReq.toEntity(product, member));
                });

        esProductService.saveEsProduct(product.getId(), product.getTitle(),
                product.getLocationId(), product.getCategory().name());

        return ProductDetails.toDto(product, member, imageUrls, contractConditionDto, true, false);
    }

    void validateContractCondition(ContractConditionReq req) {
        if(req.getOverdueCriteria() == null) {
            throw new CustomException(INVALID_CONTRACT_CONDITION);
        }

        if(req.getOverdueFee() == null) {
            throw new CustomException(INVALID_CONTRACT_CONDITION);
        }

        if(req.getRefundDeadline() == null) {
            throw new CustomException(INVALID_CONTRACT_CONDITION);
        }

        if(req.getRepairVendor() == null) {
            throw new CustomException(INVALID_CONTRACT_CONDITION);
        }

        if(req.getTheftCriteria() == null) {
            throw new CustomException(INVALID_CONTRACT_CONDITION);
        }

        if(req.getProductName() == null) {
            throw new CustomException(INVALID_CONTRACT_CONDITION);
        }

        if(req.getSerialNumber() == null) {
            throw new CustomException(INVALID_CONTRACT_CONDITION);
        }
    }

    @Override
    public ProductDetails findProduct(Long id, Long memberId) {
        //조회 예외처리
        //1. 게시글이 없는 경우
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new CustomException(PRODUCT_NOT_FOUND));

        List<String> imageUrls = productImageRepository.findSrcByProductId(product.getId());
        ContractCondition contractCondition = product.getContractCondition();

        ContractConditionDto contractConditionDto = null;
        if(contractCondition != null) {
            contractConditionDto = ContractConditionDto.toDto(contractCondition);
        }

        Boolean isMine = product.getMember().getId().equals(memberId);

        redisUtils.productRecentlySave(memberId, id);

        Boolean isWish = wishListRepository.existsByMemberIdAndProductId(memberId, id);

        return ProductDetails.toDto(product, member, imageUrls, contractConditionDto, isMine, isWish);
    }

    @Override
    public RecentlyViewListRes recentlyViewedProducts(Long memberId) {
        List<Object> productViewedList = redisUtils.getListData("product_recently_" + memberId);

        List<ProductDto> products = productViewedList.stream()
                .map(id -> (Long) id)
                .map(productId -> {
                    Product product = productRepository.findById(productId)
                            .orElseThrow(() -> new CustomException(PRODUCT_NOT_FOUND));
                    String mainUrl = productImageRepository.findMainImageUrl(productId);
                    Boolean isWish = wishListRepository.existsByMemberIdAndProductId(memberId, productId);
                    return ProductDto.toDto(product, mainUrl, isWish);
                })
                .toList();

        return new RecentlyViewListRes(products);
    }

    @Override
    public RecentlyUploadedListRes recentlyUpdatedProducts(Long memberId) {
        Pageable pageable = PageRequest.of(0, PRODUCT_SIZE);

        List<ProductDto> products = productRepository.findRecentlyProducts(memberId, pageable);

        return new RecentlyUploadedListRes(products);
    }

    @Override
    public MyProductListRes findRentalProducts(Long memberId) {
        List<MyProductDto> products = chatRoomRepository.findByRentalIdAndRentalStatusNot(memberId, AVAILABLE)
                .stream()
                .map(chatRoom -> {
                    Optional<Product> product = productRepository.findById(chatRoom.getProduct().getId());
                    if(product.isEmpty()) {
                        return null;
                    }

                    Product existedProduct = product.get();
                    List<String> imageUrls = productImageRepository.findSrcByProductId(existedProduct.getId());
                    String productMainImage = imageUrls.getFirst();

                    return MyProductDto.toDto(existedProduct, productMainImage);
                })
                .filter(Objects::nonNull)
                .toList();

        return new MyProductListRes(products);
    }

    @Override
    public MyProductListRes findOwnerProducts(Long memberId) {
        List<MyProductDto> products = chatRoomRepository.findByOwnerIdAndRentalStatusNot(memberId, AVAILABLE)
                .stream()
                .map(chatRoom -> {
                    Optional<Product> product = productRepository.findById(chatRoom.getProduct().getId());
                    if(product.isEmpty()) {
                        return null;
                    }

                    Product existedProduct = product.get();
                    List<String> imageUrls = productImageRepository.findSrcByProductId(existedProduct.getId());
                    String productMainImage = imageUrls.getFirst();

                    return MyProductDto.toDto(existedProduct, productMainImage);
                })
                .filter(Objects::nonNull)
                .toList();

        return new MyProductListRes(products);
    }

    @Override
    @Transactional
    public ProductDetails modifyProduct(ProductModifyReq productModifyReq, List<MultipartFile> files, Long productId, Long memberId) throws IOException {
        //물품 수정 예외처리
        //1. 없는 상품 수정
        //2. 거래가 진행중일때 수정하면 에러
        //3. 본인의 게시글이 아닌 경우 에러
        //4. 대여 마감일과 대여 시작일이 지금 시각보다 빠르면 에러, 대여 마감일이 대여 시작일보다 빠른 경우 에러
        //5. 유효하지 않은 리턴타입
        //6. 택배 반납 선택했는디 주소 없으면 에러
        //7. 유효하지 않은 카테고리
        //8. 분산 락 걸려있을때 진행하면 안댐! 그리고 수정할때 분산락걸어야함.

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(PRODUCT_NOT_FOUND));

        if(!member.getId().equals(product.getMember().getId())) {
            throw new CustomException(PRODUCT_MODIFY_FORBIDDEN);
        }

        //분산락 획득
        if (!redisUtils.lock("contract_" + product.getId(), 3000L)) {
            throw new CustomException(CONFLICT_WITH_OTHER);
        }

        if(product.getProductStatus() != ProductStatus.AVAILABLE) {
            throw new CustomException(PRODUCT_NOT_MODIFIABLE);
        }

        validateProductModifyRequest(productModifyReq);

        updateProduct(productModifyReq, product);

        List<String> imageUrls;

        if(files != null || !files.isEmpty()) {
            validateFiles(files);
            imageUrls = updateProductImages(files, product, member);
        } else {
            imageUrls = productImageRepository.findSrcByProductId(product.getId());
        }

        validateContractCondition(productModifyReq.getContractConditionReq());

        ContractConditionDto contractConditionDto = updateContractCondition(productModifyReq.getContractConditionReq(), product);

        Boolean isWish = wishListRepository.existsByMemberIdAndProductId(memberId, productId);

        ProductDetails result = ProductDetails.toDto(product, member, imageUrls, contractConditionDto , true, isWish);

        eventPublisher.publishEvent(new UnlockEvent(this, "contract_" + product.getId()));

        return result;
    }

    private void updateProduct(ProductModifyReq productModifyReq, Product product) {
        if(productModifyReq.getTitle() != null) {
            product.updateTitle(productModifyReq.getTitle());
        }

        if(productModifyReq.getContent() != null) {
            product.updateContent(productModifyReq.getContent());
        }

        if(productModifyReq.getStartDate() != null) {
            product.updateStartDate(productModifyReq.getStartDate());
        }

        if(productModifyReq.getEndDate() != null) {
            product.updateEndDate(productModifyReq.getEndDate());
        }

        if(productModifyReq.getRentalFee() != null) {
            product.updateRentalFee(productModifyReq.getRentalFee());
        }

        if(productModifyReq.getCategory() != null) {
            Category categoryEnum = Category.valueOf(productModifyReq.getCategory().toUpperCase());

            product.updateCategory(categoryEnum);
        }

        if(productModifyReq.getPlace() != null) {
            product.updatePlace(productModifyReq.getPlace());
        }

        if(productModifyReq.getLatitude() != null && productModifyReq.getLongitude() != null) {
            Location location =  locationRepository.findLocation(productModifyReq.getLatitude(), productModifyReq.getLongitude());

            product.updateLocation(productModifyReq.getLatitude(), productModifyReq.getLongitude(), location.getId(), location.getDong());
        }

        if(productModifyReq.getReturnTypeList() != null) {
            List<ReturnType> returnTypeEnums = productModifyReq.getReturnTypeList().stream()
                    .map(returnType -> ReturnType.valueOf(returnType.toUpperCase()))
                    .toList();

            product.UpdateReturnTypes(returnTypeEnums);
        }

        if(productModifyReq.getReturnAddress() != null) {
            product.updateReturnAddress(productModifyReq.getReturnAddress());
        }

        product.updateLastModifiedAt();
    }

    private ContractConditionDto updateContractCondition(ContractConditionReq contractConditionReq, Product product) {
        ContractCondition contractCondition = contractConditionRepository.findByProductId(product.getId());

        //계약조건이 없다가 있으면 만들어주기
        if(contractCondition == null && contractConditionReq != null) {
            ContractCondition newContractCondition =  contractCondition = contractConditionReq.toEntity(product);
            contractConditionRepository.save(contractCondition);

            return ContractConditionDto.toDto(newContractCondition);
        } else if(contractCondition != null && contractConditionReq != null) {
            contractCondition.updateProductName(contractConditionReq.getProductName());
            contractCondition.updateSerialNumber(contractConditionReq.getSerialNumber());
            contractCondition.updateRepairVendor(contractConditionReq.getRepairVendor());
            contractCondition.updateOverdueCriteria(contractConditionReq.getOverdueCriteria());
            contractCondition.updateOverdueFee(contractConditionReq.getOverdueFee());
            contractCondition.updateTheftCriteria(contractConditionReq.getTheftCriteria());
            contractCondition.updateRefundDeadline(contractConditionReq.getRefundDeadline());

            return ContractConditionDto.toDto(contractCondition);
        } else if (contractCondition != null) { //만약 계약조건이 있다가 없어졌으면 삭제
            contractConditionRepository.delete(contractCondition);
            return null;
        }

        return null;
    }

    private List<String> updateProductImages(List<MultipartFile> files, Product product, Member member) throws IOException {
        images3Service.deleteFolder("products/"+product.getId());

        List<String> imageUrls = images3Service.uploadMultipleFiles(files, "products/"+product.getId());

        IntStream.range(0, imageUrls.size())
                .forEach(i -> {
                    boolean isMain = (i == 0);
                    ProductImageReq productImageReq = new ProductImageReq(imageUrls.get(i), isMain);

                    productImageRepository.save(productImageReq.toEntity(product, member));
                });

        return imageUrls;
    }

    @Override
    public SearchProductRes searchProduct(SearchProductsReq searchProductsReq, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        Pageable pageable = PageRequest.of(0, PRODUCT_SIZE);

        NaverSearchRes naverSearchRes = searchFeignClient.naverSearch(searchProductsReq.getKeyword(),
                naverId, naverSecret);

        String keyword = naverSearchRes.getErrata().equals("") ? searchProductsReq.getKeyword() : naverSearchRes.getErrata();

        esKeywordService.saveEsKeyword(keyword);
        List<Long> esProducts;
        List<SearchProductTmpDto> tmpProducts;

        if(Category.valueOf(searchProductsReq.getCategory().toUpperCase()) == ALL) {
            esProducts = esProductService.searchProduct(keyword,
                            searchProductsReq.getLocationId(), searchProductsReq.getCategory())
                    .stream()
                    .map(EsProduct::getId)
                    .toList();

            tmpProducts = productRepository.findByProductIdIn(esProducts, pageable);
        } else {
            esProducts = esProductService.searchProduct(keyword,
                            searchProductsReq.getLocationId(), searchProductsReq.getCategory())
                    .stream()
                    .map(EsProduct::getId)
                    .toList();

            tmpProducts = productRepository.findByProductIdIn(esProducts, pageable);
        }

        List<SearchProductDto> products = tmpProducts.stream()
                .map(SearchProductDto::toDto)
                .toList();

        return new SearchProductRes(products);
    }

    @Override
    public SearchProductRes searchRecentlyProducts(RecentlyProductsReq recentlyProductsReq, Long memberId) {
        Pageable pageable = PageRequest.of(0, PRODUCT_SIZE);

        Category category = Category.valueOf(recentlyProductsReq.getCategory());

        List<SearchProductTmpDto> tmpProducts = productRepository.findRecentlyCategoryProducts(memberId, category,
                recentlyProductsReq.getLocationId(), pageable);

        List<SearchProductDto> result = tmpProducts.stream()
                .map(SearchProductDto::toDto)
                .toList();

        return new SearchProductRes(result);
    }

    @Override
    public KeywordListRes searchKeyword(String keyword) {
        List<EsKeyword> esKeywords = esKeywordService.findKeyword(keyword);

        List<KeywordDto> keywords = esKeywords.stream()
                .map(KeywordDto::toDto)
                .toList();

        return new KeywordListRes(keywords);
    }
    
    @Override
    @Transactional
    public void deleteProduct(Long productId, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(PRODUCT_NOT_FOUND));

        if (!redisUtils.lock("contract_" + product.getId(), 3000L)) {
            throw new CustomException(CONFLICT_WITH_OTHER);
        }

        if(product.getProductStatus() != ProductStatus.AVAILABLE) {
            throw new CustomException(PRODUCT_NOT_DELETED);
        }

        chatRoomRepository.deleteByProductId(productId);
        productImageRepository.deleteByProductId(productId);
        wishListRepository.deleteWishListByProductId(productId);

        Contract contract = contractRepository.findContractByProductId(productId);

        if(contract != null) {
            contractConditionRepository.deleteContractConditionByProductId(productId);
            signatureInformationRepository.deleteByContractId(contract.getId());
            contractRepository.delete(contract);
        }

        productRepository.delete(product);

        eventPublisher.publishEvent(new UnlockEvent(this, "contract_" + product.getId()));
    }

}
