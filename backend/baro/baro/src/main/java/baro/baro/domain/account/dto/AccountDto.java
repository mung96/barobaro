package baro.baro.domain.account.dto;

import baro.baro.domain.account.entity.Account;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountDto {
    private String bank;

    private String accountNumber;

    private Long accountId;

    private Boolean main;

    public static AccountDto toDto(Account account) {
        return AccountDto.builder()
                .bank(account.getBank())
                .accountNumber(account.getAccountNumber())
                .accountId(account.getId())
                .main(account.getMain())
                .build();
    }
}
