package baro.baro.domain.location.controller;

import baro.baro.domain.location.dto.SearchLocationDto;
import baro.baro.domain.location.dto.response.SearchLocationRes;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static baro.baro.global.statuscode.SuccessCode.SEARCH_LOCATION_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class LocationController {
    @GetMapping("/search/locations")
    @PostMapping("/members/signup")
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
}
