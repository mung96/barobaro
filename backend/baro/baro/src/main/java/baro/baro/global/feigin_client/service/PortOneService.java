package baro.baro.global.feigin_client.service;

import baro.baro.global.exception.CustomException;
import baro.baro.global.feigin_client.dto.request.PortOneTokenReq;
import baro.baro.global.feigin_client.dto.response.PortOneCiRes;
import baro.baro.global.feigin_client.dto.response.PortOneTokenRes;
import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static baro.baro.global.statuscode.ErrorCode.FAIL_PORTONE_IDENTIFIED;
import static baro.baro.global.statuscode.ErrorCode.FAIL_PORTONE_TOKEN;

@Service
@RequiredArgsConstructor
@Slf4j
public class PortOneService {
    @Value("${PORT_ONE_KEY}")
    private String apiKey;

    @Value("${PORT_ONE_SECRET}")
    private String apiSecret;

    private final PortOneFeignClientCustom portOneFeignClientCustom;
    private final RedisUtils redisUtils;

    public String getAccessToken() {
        String token = (String) redisUtils.getData("portOne");
        if (token == null) {
            PortOneTokenReq req = new PortOneTokenReq(apiKey, apiSecret);
            PortOneTokenRes res;

            try {
                res = portOneFeignClientCustom.getToken(req);
            } catch (CustomException e) {
                throw new CustomException(FAIL_PORTONE_TOKEN);
            }
            log.info("token: {}", res);
            log.info("token: {}", res.getResponse().getAccess_token());

            token = "Bearer " + res.getResponse().getAccess_token();
            redisUtils.setDataWithExpiration("portOne", token, 1799L);
        }

        return token;
    }

    public PortOneCiRes getPortOneToken(String imp_uid) {
        String token = getAccessToken();
        PortOneCiRes response;

        try {
            response = portOneFeignClientCustom.getCi(imp_uid, token);
            log.info("ci: {}", response);
        } catch (CustomException e) {
            throw new CustomException(FAIL_PORTONE_IDENTIFIED);
        }

        return response;
    }
}