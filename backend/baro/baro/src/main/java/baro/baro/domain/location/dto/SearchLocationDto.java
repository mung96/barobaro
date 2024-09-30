package baro.baro.domain.location.dto;

import baro.baro.domain.location.entity.Location;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchLocationDto {
    private Long locationId;

    private String name;

    private String dong;

    public static SearchLocationDto toEntity(Location location) {
        return SearchLocationDto.builder()
                .locationId(location.getId())
                .name(location.getName())
                .dong(location.getDong())
                .build();
    }
}
