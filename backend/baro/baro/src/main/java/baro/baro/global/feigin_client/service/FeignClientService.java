package baro.baro.global.feigin_client.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeignClientService {
    private final BankFeignClientCustom bankFeignClientCustom;

    public void callBankApi() {
        // 초기 데이터 세팅 예정
    }
}
