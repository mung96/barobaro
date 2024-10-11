package baro.baro.global.feigin_client.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BankAccount {
    private String bankCode;

    private String accountNo;

    private Currency currency;
}
