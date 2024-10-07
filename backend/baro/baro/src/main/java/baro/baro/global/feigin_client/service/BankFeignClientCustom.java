package baro.baro.global.feigin_client.service;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "bankFeignClientCustom", url = "https://finopenapi.ssafy.io/ssafy/api/v1")
public interface BankFeignClientCustom {
}
