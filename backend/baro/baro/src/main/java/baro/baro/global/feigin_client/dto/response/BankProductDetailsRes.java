package baro.baro.global.feigin_client.dto.response;

import baro.baro.global.feigin_client.dto.BankProduct;
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
    private HeaderRes headerRes;

    @JsonProperty("REC")
    List<BankProduct> bankProducts;
}
