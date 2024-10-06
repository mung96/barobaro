package baro.baro.domain.location.dto.request;

import baro.baro.domain.member_location.dto.request.MemberLocationReq;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class LocationsAddReq {
    @NotNull
    List<MemberLocationReq> locations;
}
