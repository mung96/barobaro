package baro.baro.domain.location.service;

import baro.baro.domain.location.dto.request.DefaultLocationReq;
import baro.baro.domain.location.dto.request.LocationsAddReq;
import baro.baro.domain.location.dto.response.DefaultLocationRes;
import baro.baro.domain.location.dto.response.LocationsAddRes;
import baro.baro.domain.location.dto.response.MyLocationListRes;
import baro.baro.domain.location.dto.response.SearchLocationRes;

public interface LocationService {
    LocationsAddRes addLocations(LocationsAddReq locationsAddReq, Long memberId);
    MyLocationListRes findLocations(Long memberId);
    DefaultLocationRes updateDefaultLocation(DefaultLocationReq defaultLocationReq, Long memberId);
    SearchLocationRes searchLocation(String keyword);
}
