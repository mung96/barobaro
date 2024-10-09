package baro.baro.domain.wish_list.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WishListPK {
    private Long memberId;

    private Long productId;
}
