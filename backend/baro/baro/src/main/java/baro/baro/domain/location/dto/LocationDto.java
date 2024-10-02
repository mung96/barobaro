package baro.baro.domain.location.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LocationDto {
    private Long locationId;

    private String name;

    private String dong;

    private Boolean isMain;
}
