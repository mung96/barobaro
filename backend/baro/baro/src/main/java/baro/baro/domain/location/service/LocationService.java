package baro.baro.domain.location.service;

import baro.baro.domain.location.dto.request.LocationsAddReq;
import baro.baro.domain.location.dto.response.LocationsAddRes;

public interface LocationService {
    LocationsAddRes addLocations(LocationsAddReq locationsAddReq, Long memberId);
}
