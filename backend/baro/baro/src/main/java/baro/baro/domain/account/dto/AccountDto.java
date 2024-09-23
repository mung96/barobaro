package baro.baro.domain.account.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountDto {
    private String bank;

    private String accountNumber;

    private Long accountId;

    private Boolean main;
}
