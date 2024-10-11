package baro.baro.domain.wish_list.dto;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.wish_list.entity.WishList;
import baro.baro.domain.wish_list.entity.WishListPK;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishDto {
    private Boolean isWished;

    private Integer wishCount;

    public static WishList toEntity(Member member, Product product) {
        return WishList.builder()
                .wishListPK(new WishListPK(member.getId(), product.getId()))
                .member(member)
                .product(product)
                .build();
    }

    public static WishDto toDto(Boolean isWished, Integer wishCount) {
        return WishDto.builder()
                .isWished(isWished)
                .wishCount(wishCount)
                .build();
    }
}
