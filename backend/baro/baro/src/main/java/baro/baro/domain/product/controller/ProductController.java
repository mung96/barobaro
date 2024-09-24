package baro.baro.domain.product.controller;

import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.product.dto.ProductDetails;
import baro.baro.domain.product.dto.ProductDto;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.response.ProductListRes;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static baro.baro.domain.product.entity.Category.LIGHT_STICK;
import static baro.baro.domain.product.entity.ProductStatus.FINISH;
import static baro.baro.domain.product.entity.ProductStatus.IN_PROGRESS;
import static baro.baro.domain.product.entity.ReturnType.DELIVERY;
import static baro.baro.global.formatter.DateFormatter.calculateTime;
import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class ProductController {
    @PostMapping("/products")
    public ResponseEntity<?> productAdd(@RequestPart(value = "dto") ProductAddReq productAddReq,
                                        @RequestPart(value = "files") List<MultipartFile> files) {
        List<String> images = new ArrayList<>();
        images.add("이미지1");
        images.add("이미지2");

        ContractConditionDto contractConditionDto = ContractConditionDto.builder()
                .productName("갤럭시S24")
                .serialNumber("핸드폰시리얼넘버")
                .repairVendor("제조사 또는 공식 수입사의 AS 센터")
                .overdueCriteria(5)
                .overdueFee(2)
                .theftCriteria(7)
                .refundDeadline(7)
                .build();

        List<ReturnType> returnTypes = new ArrayList<>();
        returnTypes.add(DELIVERY);

        ProductDetails result = ProductDetails.builder()
                .productId(1L)
                .writerId("ffefwsfd-sfewwertwet-3rrsefsedf")
                .writerProfileImage("유저 image url")
                .writerNickname("유저 닉네임")
                .imageList(images)
                .productStatus(IN_PROGRESS)
                .title("제목")
                .category(LIGHT_STICK)
                .dong("봉천동")
                .createdAt(calculateTime(LocalDateTime.now()))
                .wishCount(0)
                .content("본문내용본문내용용용")
                .place("고척스카이돔 중앙출입문C게이트앞")
                .latitude(37.50)
                .longitude(126.87)
                .isWriteContract(true)
                .contractCondition(contractConditionDto)
                .returnTypes(returnTypes)
                .startDate(LocalDate.of(2024, 9, 30))
                .endDate(LocalDate.of(2024, 10, 24))
                .rentalFee(10000)
                .build();

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_CREATED, result), CREATED);
    }

    @GetMapping("/members/me/rental")
    public ResponseEntity<?> rentalProductList() {
        List<ProductDto> products = new ArrayList<>();

        for(int i = 0; i < 5; i++) {
            Long id = 10000L + i;

            ProductDto dto = ProductDto.builder()
                    .productId(id)
                    .productMainImage("대표 이미지 " + id)
                    .title("제목 " + id)
                    .startDate(LocalDate.of(2024, 1, 2))
                    .endDate(LocalDate.of(2024, 5, 24))
                    .rentalFee(100000)
                    .productStatus(IN_PROGRESS)
                    .build();

            products.add(dto);
        }

        for(int i = 5; i < 10; i++) {
            Long id = 10000L + i;

            ProductDto dto = ProductDto.builder()
                    .productId(id)
                    .productMainImage("대표 이미지 " + id)
                    .title("제목 " + id)
                    .startDate(LocalDate.of(2024, 1, 2))
                    .endDate(LocalDate.of(2024, 5, 24))
                    .rentalFee(100000)
                    .productStatus(FINISH)
                    .build();

            products.add(dto);
        }

        ProductListRes result = new ProductListRes(products);

        return new ResponseEntity<>(ResponseDto.success(RENTAL_PRODUCT_LIST_OK, result), OK);
    }

    @GetMapping("/members/me/owner")
    public ResponseEntity<?> ownerProductList() {
        List<ProductDto> products = new ArrayList<>();

        for(int i = 0; i < 5; i++) {
            Long id = 10000L + i;

            ProductDto dto = ProductDto.builder()
                    .productId(id)
                    .productMainImage("대표 이미지 " + id)
                    .title("제목 " + id)
                    .startDate(LocalDate.of(2024, 1, 2))
                    .endDate(LocalDate.of(2024, 5, 24))
                    .rentalFee(100000)
                    .productStatus(IN_PROGRESS)
                    .build();

            products.add(dto);
        }

        for(int i = 5; i < 10; i++) {
            Long id = 10000L + i;

            ProductDto dto = ProductDto.builder()
                    .productId(id)
                    .productMainImage("대표 이미지 " + id)
                    .title("제목 " + id)
                    .startDate(LocalDate.of(2024, 1, 2))
                    .endDate(LocalDate.of(2024, 5, 24))
                    .rentalFee(100000)
                    .productStatus(FINISH)
                    .build();

            products.add(dto);
        }

        ProductListRes result = new ProductListRes(products);

        return new ResponseEntity<>(ResponseDto.success(OWNER_PRODUCT_LIST_OK, result), OK);
    }
}
