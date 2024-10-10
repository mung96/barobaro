package baro.baro.domain.wish_list.service;

import baro.baro.domain.wish_list.dto.WishDto;
import baro.baro.domain.wish_list.dto.response.MyWishListRes;

public interface WishListService {
    WishDto wishList(Long productId, Long memberId, Boolean isWished);
    MyWishListRes getWishList(Long memberId);
}
