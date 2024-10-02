package baro.baro.domain.location.dto.request;

import baro.baro.domain.location.dto.LocationReqDto;
import lombok.Data;

import java.util.List;

@Data
public class LocationsAddReq {
    List<LocationReqDto> locations;
}
