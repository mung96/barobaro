package baro.baro.global.feigin_client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PortOneTokenReq {
    private String imp_key;

    private String imp_secret;
}
