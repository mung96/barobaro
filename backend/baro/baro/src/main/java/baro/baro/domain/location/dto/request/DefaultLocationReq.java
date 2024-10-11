package baro.baro.domain.location.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DefaultLocationReq {
    @NotNull
    private Long locationId;
}
