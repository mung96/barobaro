package baro.baro.domain.product.service;

import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.contract.entity.ContractCondition;
import baro.baro.domain.contract.repository.ContractConditionRepository;
import baro.baro.domain.location.entity.Location;
import baro.baro.domain.location.repository.LocationRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.product.dto.ProductDetails;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product.repository.ProductRepository;
import baro.baro.domain.product_image.dto.request.ProductImageReq;
import baro.baro.domain.product_image.repository.ProductImageRepository;
import baro.baro.global.exception.CustomException;
import baro.baro.global.s3.Images3Service;
import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;

import static baro.baro.domain.product.validator.ProductValidator.validateProductAddRequest;
import static baro.baro.global.statuscode.ErrorCode.MEMBER_NOT_FOUND;
import static baro.baro.global.statuscode.ErrorCode.PRODUCT_NOT_FOUND;
import static baro.baro.global.validator.GlobalValidator.validateFiles;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {
    private final RedisUtils redisUtils;
    private final Images3Service images3Service;
    private final MemberRepository memberRepository;
    private final LocationRepository locationRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ContractConditionRepository contractConditionRepository;

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
}
