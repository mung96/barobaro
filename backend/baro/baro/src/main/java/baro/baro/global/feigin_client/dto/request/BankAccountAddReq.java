package baro.baro.global.feigin_client.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankAccountAddReq {
    @JsonProperty("Header")
    private HeaderReq headerReq;

    private String accountTypeUniqueNo;
}
