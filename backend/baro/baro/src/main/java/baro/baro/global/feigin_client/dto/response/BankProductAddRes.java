package baro.baro.global.feigin_client.dto.response;

import baro.baro.global.feigin_client.dto.BankProduct;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BankProductAddRes {
    @JsonProperty("Header")
    private HeaderRes headerRes;

    @JsonProperty("REC")
    private BankProduct bankProduct;
}
