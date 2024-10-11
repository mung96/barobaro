package baro.baro.domain.member_location.dto.request;

import baro.baro.domain.location.entity.Location;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member_location.entity.MemberLocation;
import baro.baro.domain.member_location.entity.MemberLocationPK;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberLocationReq {
    private Long locationId;

    private Boolean isMain;

    public MemberLocation toEntity(Member member, Location location) {
        return MemberLocation.builder()
                .memberLocationPK(new MemberLocationPK(member.getId(), location.getId()))
                .member(member)
                .location(location)
                .isMain(isMain)
                .build();
    }
}
