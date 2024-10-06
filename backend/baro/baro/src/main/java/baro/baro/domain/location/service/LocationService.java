package baro.baro.domain.location.service;

import baro.baro.domain.location.dto.request.LocationsAddReq;
import baro.baro.domain.location.dto.response.LocationsAddRes;
import baro.baro.domain.location.dto.response.MyLocationListRes;

public interface LocationService {
    LocationsAddRes addLocations(LocationsAddReq locationsAddReq, Long memberId);
    MyLocationListRes findLocations(Long memberId);
}
