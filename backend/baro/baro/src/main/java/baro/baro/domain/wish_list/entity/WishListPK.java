package baro.baro.domain.wish_list.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class WishListPK {
    private Long memberId;

    private Long productId;
}
