package baro.baro.global.feigin_client.dto.response;

import baro.baro.global.feigin_client.dto.BankProduct;
import baro.baro.global.feigin_client.dto.request.HeaderReq;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BankProductDetailsRes {
    @JsonProperty("Header")
    private HeaderReq headerReq;

    @JsonProperty("REC")
    List<BankProduct> bankProducts;
}
