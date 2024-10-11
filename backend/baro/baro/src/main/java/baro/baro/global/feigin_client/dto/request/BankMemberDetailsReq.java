package baro.baro.global.feigin_client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankMemberDetailsReq {
    private String userId; // ex. ssafy@email.com

    private String apiKey;
}
