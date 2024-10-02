package baro.baro.domain.location.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LocationReqDto {
    private Long locationId;

    private Boolean isMain;
}
