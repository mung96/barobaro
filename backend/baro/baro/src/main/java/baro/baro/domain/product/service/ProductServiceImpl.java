package baro.baro.domain.product.service;

import baro.baro.domain.chat_room.repository.ChatRoomRepository;
import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.contract.entity.ContractCondition;
import baro.baro.domain.contract.repository.ContractConditionRepository;
import baro.baro.domain.location.entity.Location;
import baro.baro.domain.location.repository.LocationRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.product.dto.MyProductDto;
import baro.baro.domain.product.dto.ProductDetails;
import baro.baro.domain.product.dto.ProductDto;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.response.MyProductListRes;
import baro.baro.domain.product.dto.response.RecentlyUploadedListRes;
import baro.baro.domain.product.dto.response.RecentlyViewListRes;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product.repository.ProductRepository;
import baro.baro.domain.product_image.dto.request.ProductImageReq;
import baro.baro.domain.product_image.repository.ProductImageRepository;
import baro.baro.domain.wish_list.repository.WishListRepository;
import baro.baro.global.exception.CustomException;
import baro.baro.global.s3.Images3Service;
import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static baro.baro.domain.chat_room.entity.RentalStatus.AVAILABLE;
import static baro.baro.domain.product.validator.ProductValidator.validateProductAddRequest;
import static baro.baro.global.statuscode.ErrorCode.MEMBER_NOT_FOUND;
import static baro.baro.global.statuscode.ErrorCode.PRODUCT_NOT_FOUND;
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

        return ProductDetails.toDto(product, member, imageUrls, contractConditionDto, true);
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

        Boolean isMine = Objects.equals(member.getId(), product.getMember().getId());

        redisUtils.productRecentlySave(memberId, id);

        return ProductDetails.toDto(product, member, imageUrls, contractConditionDto, isMine);
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
}
