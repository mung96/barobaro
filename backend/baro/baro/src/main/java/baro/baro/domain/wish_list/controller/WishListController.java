package baro.baro.domain.wish_list.controller;

import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import static baro.baro.global.statuscode.SuccessCode.WISH_LIST_CREATED;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequiredArgsConstructor
public class WishListController {
    @PostMapping("/wish-list/{productId}")
    public ResponseEntity<?> wishListAdd(@PathVariable("productId") String productId) {
        return new ResponseEntity<>(ResponseDto.success(WISH_LIST_CREATED, null), CREATED);
    }
}
