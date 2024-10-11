package baro.baro.global.feigin_client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HeaderReq {
    private String apiName;

    private String transmissionDate;

    private String transmissionTime;

    private String institutionCode; // 00100

    private String fintechAppNo; // 001

    private String apiServiceCode; // == apiName

    private String institutionTransactionUniqueNo;

    private String apiKey;

    private String userKey;
}
