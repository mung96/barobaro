package baro.baro.domain.location.service;

import baro.baro.domain.location.dto.LocationDto;
import baro.baro.domain.location.dto.request.LocationsAddReq;
import baro.baro.domain.location.dto.response.LocationsAddRes;
import baro.baro.domain.location.entity.Location;
import baro.baro.domain.location.repository.LocationRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.member_location.repository.MemberLocationRepository;
import baro.baro.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static baro.baro.domain.location.validator.LocationValidator.validateLocationAddRequest;
import static baro.baro.global.statuscode.ErrorCode.LOCATION_NOT_FOUND;
import static baro.baro.global.statuscode.ErrorCode.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
    private final MemberRepository memberRepository;
    private final LocationRepository locationRepository;
    private final MemberLocationRepository memberLocationRepository;

    @Override
    public LocationsAddRes addLocations(LocationsAddReq locationsAddReq, Long memberId) {
        //지역 설정 예외처리
        //없는 지역 ID면 에러
        //중복된 지역이 있으면 에러
        //3개 넘어가면 에러
        Member member = memberRepository.findById(memberId)
                        .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        validateLocationAddRequest(locationsAddReq.getLocations());

        memberLocationRepository.deleteMemberLocations(memberId);

        List<LocationDto> result = locationsAddReq.getLocations()
                .stream()
                .map(locationReq -> {
                    Location location = locationRepository.findById(locationReq.getLocationId())
                            .orElseThrow(() -> new CustomException(LOCATION_NOT_FOUND));

                    memberLocationRepository.insertMemberLocations(member.getId(),
                            location.getId(),
                            locationReq.getIsMain());

                    return LocationDto.toDto(location, locationReq.getIsMain());
                })
                .toList();

        return new LocationsAddRes(result);
    }
}
