package baro.baro.domain.location.controller;

import baro.baro.domain.location.dto.LocationDto;
import baro.baro.domain.location.dto.SearchLocationDto;
import baro.baro.domain.location.dto.request.LocationsAddReq;
import baro.baro.domain.location.dto.response.LocationsAddRes;
import baro.baro.domain.location.dto.response.SearchLocationRes;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static baro.baro.global.statuscode.SuccessCode.LOCATION_SETTING_OK;
import static baro.baro.global.statuscode.SuccessCode.SEARCH_LOCATION_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class LocationController {
    @GetMapping("/search/locations")
    public ResponseEntity<?> searchLocation(@RequestParam("name") String name) {
        List<SearchLocationDto> searchLocationDtoList = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            searchLocationDtoList.add(SearchLocationDto
                    .builder()
                    .locationId(11010530L + (10*i))
                    .name("서울특별시 종로구 사직동(시군동)")
                    .dong("사직동(동만)")
                    .build());
        }

        SearchLocationRes result = new SearchLocationRes(searchLocationDtoList);

        return new ResponseEntity<>(ResponseDto.success(SEARCH_LOCATION_OK, result), OK);
    }

    @PostMapping("/members/me/locations")
    public ResponseEntity<?> LocationsAdd(@RequestBody LocationsAddReq locationsAddReq) {
        List<LocationDto> locations = new ArrayList<>();

        for(int i = 0; i < 3; i++) {
            LocationDto location = LocationDto.builder()
                    .locationId(11010530L + (10*i))
                    .name("서울특별시 종로구 사직동(시군동)")
                    .dong("사직동(동만)")
                    .isMain(i == 0)
                    .build();

            locations.add(location);
        }

        LocationsAddRes result = new LocationsAddRes(locations);

        return new ResponseEntity<>(ResponseDto.success(LOCATION_SETTING_OK, result), OK);
    }
}
