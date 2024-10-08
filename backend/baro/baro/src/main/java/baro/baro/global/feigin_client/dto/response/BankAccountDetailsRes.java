package baro.baro.global.feigin_client.dto.response;

import baro.baro.global.feigin_client.dto.BankAccountDetails;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BankAccountDetailsRes {
    @JsonProperty("Header")
    private HeaderRes header;

    @JsonProperty("REC")
    private BankAccountDetails bankAccountDetails;
}
