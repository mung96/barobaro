package baro.baro.global.feigin_client.dto.response;

import baro.baro.global.feigin_client.dto.BankAccount;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankAccountAddRes {
    @JsonProperty("Header")
    private HeaderRes headerRes;

    @JsonProperty("REC")
    private BankAccount bankAccount;
}
