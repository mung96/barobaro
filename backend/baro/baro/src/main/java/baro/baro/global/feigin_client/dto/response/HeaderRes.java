package baro.baro.global.feigin_client.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HeaderRes {
    private String responseCode;

    private String responseMessage;

    private String apiName;

    private String transmissionDate;

    private String transmissionTime;

    private String institutionCode;

    private String fintechAppNo;

    private String apiServiceCode;

    private String institutionTransactionUniqueNo;
}
