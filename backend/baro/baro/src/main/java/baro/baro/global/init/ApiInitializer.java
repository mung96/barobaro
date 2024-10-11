package baro.baro.global.init;

import baro.baro.global.feigin_client.service.FeignClientService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApiInitializer {
    private final FeignClientService feignClientService;

    @PostConstruct
    public void init() {
        feignClientService.callBankApi();
    }
}
