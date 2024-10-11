package baro.baro.global.feigin_client.dto.response;

import lombok.Data;
import lombok.Getter;

@Data
public class PortOneTokenRes {
    private Response response;

    @Getter
    public static class Response {
        private String access_token;
    }
}
