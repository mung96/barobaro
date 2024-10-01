package baro.baro.domain.wish_list.entity;

import baro.baro.domain.location.entity.Location;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member_location.entity.MemberLocationPK;
import baro.baro.domain.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishList {
    @EmbeddedId
    private WishListPK wishListPK;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;
}
