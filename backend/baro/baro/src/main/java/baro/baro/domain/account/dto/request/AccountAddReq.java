package baro.baro.domain.account.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AccountAddReq {
    @NotBlank
    private String accountNumber;
}
