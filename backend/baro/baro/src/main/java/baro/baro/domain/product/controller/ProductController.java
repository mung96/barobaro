package baro.baro.domain.product.controller;

import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.product.dto.MyProductDto;
import baro.baro.domain.product.dto.ProductDetails;
import baro.baro.domain.product.dto.ProductDto;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.request.ProductModifyReq;
import baro.baro.domain.product.dto.response.MyProductListRes;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
import static org.springframework.http.HttpStatus.*;

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
                .isMine(true)
                .build();

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_CREATED, result), CREATED);
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<?> productDetails(@PathVariable Long productId) {
        List<String> images = new ArrayList<>();
        images.add("이미지1");
        images.add("이미지2");

        ContractConditionDto contractConditionDto = ContractConditionDto.builder()
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
                .isMine(false)
                .build();

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_DETAILS_OK, result), OK);
    }

    @GetMapping("products/recently-viewed")
    public ResponseEntity<?> recentlyViewedList() {
        List<ProductDto> result = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            Long id = 1000L+i;

            if(i % 2 == 0) {
                ProductDto dto = ProductDto.builder()
                        .productId(id)
                        .productMainImage("상품 대표 이미지 url")
                        .isWished(true)
                        .startDate(LocalDate.of(2024, 9, 30))
                        .endDate(LocalDate.of(2024, 10, 30))
                        .rentalFee(10000+1000*i)
                        .title("제목")
                        .build();
                result.add(dto);
            } else {
                ProductDto dto = ProductDto.builder()
                        .productId(id)
                        .productMainImage("상품 대표 이미지 url")
                        .isWished(false)
                        .startDate(LocalDate.of(2024, 9, 26))
                        .endDate(LocalDate.of(2024, 10, 26))
                        .rentalFee(10000+1000*i)
                        .title("제목")
                        .build();
                result.add(dto);
            }
        }

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_RECENTLY_VIEWED_LIST_OK, result), OK);
    }

    @GetMapping("/products/recently-uploaded")
    public ResponseEntity<?> recentlyUploadedList() {
        List<ProductDto> result = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            Long id = 1000L+i;

            if(i % 2 == 0) {
                ProductDto dto = ProductDto.builder()
                        .productId(id)
                        .productMainImage("상품 대표 이미지 url")
                        .isWished(true)
                        .startDate(LocalDate.of(2024, 9, 30))
                        .endDate(LocalDate.of(2024, 10, 30))
                        .rentalFee(10000+1000*i)
                        .title("제목")
                        .build();
                result.add(dto);
            } else {
                ProductDto dto = ProductDto.builder()
                        .productId(id)
                        .productMainImage("상품 대표 이미지 url")
                        .isWished(false)
                        .startDate(LocalDate.of(2024, 9, 26))
                        .endDate(LocalDate.of(2024, 10, 26))
                        .rentalFee(10000+1000*i)
                        .title("제목")
                        .build();
                result.add(dto);
            }
        }

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_RECENTLY_UPLOADED_LIST_OK, result), OK);
    }

    @PostMapping("/products/{productId}")
    public ResponseEntity<?> productModify(@RequestPart(value = "dto") ProductModifyReq productModifyReq,
                                           @RequestPart(value = "files") List<MultipartFile> files) {
        List<String> images = new ArrayList<>();
        images.add("이미지1");
        images.add("이미지2");

        ContractConditionDto contractConditionDto = ContractConditionDto.builder()
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
                .isMine(true)
                .build();

        return new ResponseEntity<>(ResponseDto.success(PRODUCT_MODIFIED, result), OK);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> productRemove(@PathVariable Long productId) {
        return new ResponseEntity<>(ResponseDto.success(PRODUCT_DELETED, null), NO_CONTENT);
    }

    @GetMapping("/members/me/rental")
    public ResponseEntity<?> rentalProductList() {
        List<MyProductDto> products = new ArrayList<>();

        for(int i = 0; i < 5; i++) {
            Long id = 10000L + i;

            MyProductDto dto = MyProductDto.builder()
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

            MyProductDto dto = MyProductDto.builder()
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

        MyProductListRes result = new MyProductListRes(products);

        return new ResponseEntity<>(ResponseDto.success(RENTAL_PRODUCT_LIST_OK, result), OK);
    }

    @GetMapping("/members/me/owner")
    public ResponseEntity<?> ownerProductList() {
        List<MyProductDto> products = new ArrayList<>();

        for(int i = 0; i < 5; i++) {
            Long id = 10000L + i;

            MyProductDto dto = MyProductDto.builder()
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

            MyProductDto dto = MyProductDto.builder()
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

        MyProductListRes result = new MyProductListRes(products);

        return new ResponseEntity<>(ResponseDto.success(OWNER_PRODUCT_LIST_OK, result), OK);
    }
}
