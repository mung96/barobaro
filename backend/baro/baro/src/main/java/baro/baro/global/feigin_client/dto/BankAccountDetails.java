package baro.baro.global.feigin_client.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BankAccountDetails {
    private String bankCode;

    private String accountNo;

    private Long accountBalance; // 계좌잔액

    private String accountCreatedDate;

    private String accountExpiryDate;

    private String lastTransactionDate;

    private String currency;
}
