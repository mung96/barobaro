package baro.baro.domain.wish_list.controller;

import baro.baro.domain.wish_list.dto.WishDto;
import baro.baro.domain.wish_list.dto.response.MyWishListRes;
import baro.baro.domain.wish_list.service.WishListService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import static baro.baro.global.statuscode.SuccessCode.WISH_LIST_OK;
import static baro.baro.global.statuscode.SuccessCode.WISH_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class WishListController {
    private final WishListService wishListService;
    private final JwtService jwtService;

    @PostMapping("/wish-list/{productId}")
    public ResponseEntity<?> wishListAdd(@PathVariable("productId") Long productId,
                                         @RequestParam("isWished") Boolean isWished) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        WishDto result = wishListService.wishList(productId, memberId, isWished);

        return new ResponseEntity<>(ResponseDto.success(WISH_OK, result), OK);
    }

    @GetMapping("/wish-list")
    public ResponseEntity<?> wishList() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        MyWishListRes result = wishListService.getWishList(memberId);

        return new ResponseEntity<>(ResponseDto.success(WISH_LIST_OK, result), OK);
    }
}
