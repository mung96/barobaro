package baro.baro.global.feigin_client.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BankProduct {
    private String accountTypeUniqueNo;

    private String bankCode;

    private String bankName;

    private String accountTypeCode;

    private String accountTypeName;

    private String accountName;

    private String accountDescription;

    private String accountType;
}
