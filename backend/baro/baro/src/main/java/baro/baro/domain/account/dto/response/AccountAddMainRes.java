package baro.baro.domain.account.dto.response;

import baro.baro.domain.account.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AccountAddMainRes {
    private String accountNumber;

    private Long accountId;

    private Boolean main;

    public static AccountAddMainRes toDto(Account account) {
        return AccountAddMainRes.builder()
                .accountNumber(account.getAccountNumber())
                .accountId(account.getId())
                .main(account.getMain())
                .build();
    }
}
