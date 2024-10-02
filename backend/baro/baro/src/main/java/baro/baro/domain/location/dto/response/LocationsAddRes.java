package baro.baro.domain.location.dto.response;

import baro.baro.domain.location.dto.LocationDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LocationsAddRes {
    private List<LocationDto> locations;
}
