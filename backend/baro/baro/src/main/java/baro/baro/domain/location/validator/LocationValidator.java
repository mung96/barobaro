package baro.baro.domain.location.validator;

import baro.baro.domain.location.dto.request.LocationsAddReq;
import baro.baro.domain.member_location.dto.request.MemberLocationReq;
import baro.baro.global.exception.CustomException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static baro.baro.global.statuscode.ErrorCode.*;

public class LocationValidator {
    private final static int LOCATION_LENGTH = 3;

    public static void validateLocationAddRequest(final List<MemberLocationReq> locations) {
        validateInputSize(locations);
        if(!validateLocation(locations)) {
            throw new CustomException(INVALID_LOCATION);
        }
    }

    private static void validateInputSize(final List<MemberLocationReq> locations) {
        if(locations == null || locations.isEmpty()) {
            throw new CustomException(LOCATION_IS_EMPTY);
        }

        if(locations.size() > LOCATION_LENGTH) {
            throw new CustomException(INVALID_LOCATION_SIZE);
        }
    }

    private static boolean validateLocation(final List<MemberLocationReq> locations) {
        Set<Long> locationIds = new HashSet<>();
        return locations.stream()
                .map(MemberLocationReq::getLocationId)
                .anyMatch(locationId -> {
                    if (!locationIds.add(locationId)) {
                        throw new CustomException(DUPLICATED_LOCATION);
                    }
                    return locations.stream()
                            .anyMatch(MemberLocationReq::getIsMain);
                });
    }
}
