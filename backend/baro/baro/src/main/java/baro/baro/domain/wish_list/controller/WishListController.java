package baro.baro.domain.wish_list.controller;

import baro.baro.domain.product.dto.SearchProductDto;
import baro.baro.domain.product.dto.response.SearchProductRes;
import baro.baro.domain.wish_list.dto.WishDto;
import baro.baro.domain.wish_list.dto.response.MyWishListRes;
import baro.baro.domain.wish_list.service.WishListService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final WishListService wishListService;
    private final JwtService jwtService;

    @PostMapping("/wish-list/{productId}")
    public ResponseEntity<?> wishListAdd(@PathVariable("productId") Long productId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        WishDto result = wishListService.addWishList(productId, memberId);

        return new ResponseEntity<>(ResponseDto.success(WISH_LIST_CREATED, result), CREATED);
    }

    @DeleteMapping("/wish-list/{productId}")
    public ResponseEntity<?> wishListRemove(@PathVariable("productId") Long productId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        WishDto result = wishListService.deleteWishList(productId, memberId);

        return new ResponseEntity<>(ResponseDto.success(WISH_LIST_DELETED, result), OK);
    }

    @GetMapping("/wish-list")
    public ResponseEntity<?> wishList() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        MyWishListRes result = wishListService.getWishList(memberId);

        return new ResponseEntity<>(ResponseDto.success(WISH_LIST_OK, result), OK);
    }
}
