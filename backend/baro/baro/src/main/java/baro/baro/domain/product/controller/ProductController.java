package baro.baro.domain.product.controller;

import baro.baro.domain.product.dto.response.ProductDto;
import baro.baro.domain.product.dto.response.ProductListRes;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static baro.baro.domain.product.entity.ProductStatus.FINISH;
import static baro.baro.domain.product.entity.ProductStatus.IN_PROGRESS;
import static baro.baro.global.statuscode.SuccessCode.RENTAL_PRODUCT_LIST_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class ProductController {
    @GetMapping("/members/me/rental")
    public ResponseEntity<?> rentalProductList() {
        List<ProductDto> products = new ArrayList<>();

        for(int i = 0; i < 5; i++) {
            Long id = 10000L + i;

            ProductDto dto = ProductDto.builder()
                    .product_id(id)
                    .product_main_image("대표 이미지 " + id)
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
                    .product_id(id)
                    .product_main_image("대표 이미지 " + id)
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
}
