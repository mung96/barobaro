package baro.baro.domain.member_location.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class MemberLocationPK {
    private Long memberId;

    private Long locationId;
}
