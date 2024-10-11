package baro.baro.domain.location.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class LocationsAddReq {
    @NotNull
    List<Long> locations;
}
