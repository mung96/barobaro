package baro.baro.global.feigin_client.service;

import baro.baro.global.feigin_client.dto.request.BankMemberAddReq;
import baro.baro.global.feigin_client.dto.response.BankMemberAddRes;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeignClientService {
    private final BankFeignClientCustom bankFeignClientCustom;

    @Value("${BANK_API_KEY}")
    private String apiKey;

    public void callBankApi() {
        // 초기 데이터 세팅 예정
    }
}
