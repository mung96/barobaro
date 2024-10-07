package baro.baro.domain.location.controller;

import baro.baro.domain.location.dto.request.DefaultLocationReq;
import baro.baro.domain.location.dto.request.LocationsAddReq;
import baro.baro.domain.location.dto.response.DefaultLocationRes;
import baro.baro.domain.location.dto.response.LocationsAddRes;
import baro.baro.domain.location.dto.response.MyLocationListRes;
import baro.baro.domain.location.dto.response.SearchLocationRes;
import baro.baro.domain.location.service.LocationService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class LocationController {
    private final JwtService jwtService;
    private final LocationService locationService;

    @GetMapping("/search/locations")
    public ResponseEntity<?> searchLocation(@RequestParam("keyword") String keyword) {
        SearchLocationRes result = locationService.searchLocation(keyword);

        return new ResponseEntity<>(ResponseDto.success(SEARCH_LOCATION_OK, result), OK);
    }

    @PostMapping("/members/me/locations")
    public ResponseEntity<?> LocationsAdd(@RequestBody LocationsAddReq locationsAddReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        LocationsAddRes result = locationService.addLocations(locationsAddReq, memberId);

        return new ResponseEntity<>(ResponseDto.success(LOCATION_SETTING_OK, result), OK);
    }

    @GetMapping("/members/me/locations")
    public ResponseEntity<?> LocationList() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        MyLocationListRes result = locationService.findLocations(memberId);

        return new ResponseEntity<>(ResponseDto.success(LOCATION_LIST_OK, result), OK);
    }

    @PostMapping("/members/me/default-location")
    public ResponseEntity<?> DefaultLocation(@RequestBody DefaultLocationReq defaultLocationReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        DefaultLocationRes result = locationService.updateDefaultLocation(defaultLocationReq, memberId);

        return new ResponseEntity<>(ResponseDto.success(DEFAULT_LOCATION_UPDATE_OK, result), OK);
    }
}
