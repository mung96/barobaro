package baro.baro.domain.wish_list.controller;

import baro.baro.domain.product.dto.SearchProductDto;
import baro.baro.domain.wish_list.dto.response.MyWishListRes;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static baro.baro.global.formatter.DateFormatter.calculateTime;
import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
public class WishListController {
    @PostMapping("/wish-list/{productId}")
    public ResponseEntity<?> wishListAdd(@PathVariable("productId") String productId) {
        return new ResponseEntity<>(ResponseDto.success(WISH_LIST_CREATED, null), CREATED);
    }

    @DeleteMapping("/wish-list/{productId}")
    public ResponseEntity<?> wishListRemove(@PathVariable("productId") String productId) {
        return new ResponseEntity<>(ResponseDto.success(WISH_LIST_DELETED, null), NO_CONTENT);
    }

    @GetMapping("/wish-list")
    public ResponseEntity<?> wishList() {
        List<SearchProductDto> products = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            Long id = 10000L + i;

            SearchProductDto dto = SearchProductDto.builder()
                    .productId(id)
                    .productMainImage("대표 이미지 " + id)
                    .title("제목 " + id)
                    .startDate(LocalDate.of(2024, 1, 2))
                    .endDate(LocalDate.of(2024, 5, 24))
                    .dong("역삼동")
                    .uploadDate(calculateTime(LocalDateTime.now()))
                    .rentalFee(100000)
                    .wishCount(10*i)
                    .build();

            products.add(dto);
        }

        MyWishListRes result = new MyWishListRes(products);

        return new ResponseEntity<>(ResponseDto.success(WISH_LIST_OK, result), OK);
    }
}
