package baro.baro.domain.ci.dto.request;

import baro.baro.domain.ci.entity.Ci;
import baro.baro.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CiAddReq {
    private String impUid;

    public Ci toEntity(String value, Member member) {
        return Ci.builder()
                .value(value)
                .member(member)
                .build();
    }
}
