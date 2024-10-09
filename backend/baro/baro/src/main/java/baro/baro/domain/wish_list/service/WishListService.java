package baro.baro.domain.wish_list.service;

import baro.baro.domain.wish_list.dto.WishDto;
import baro.baro.domain.wish_list.dto.response.MyWishListRes;

public interface WishListService {
    WishDto addWishList(Long productId, Long memberId);
    WishDto deleteWishList(Long productId, Long memberId);
    MyWishListRes getWishList(Long memberId);
}
