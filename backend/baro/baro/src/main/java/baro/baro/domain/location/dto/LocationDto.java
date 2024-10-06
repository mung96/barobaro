package baro.baro.domain.location.dto;

import baro.baro.domain.location.entity.Location;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LocationDto {
    private Long locationId;

    private String name;

    private String dong;

    private Boolean isMain;

    public static LocationDto toDto(Location location, Boolean isMain) {
        return LocationDto.builder()
                .locationId(location.getId())
                .name(location.getName())
                .dong(location.getDong())
                .isMain(isMain)
                .build();
    }
}
