package baro.baro.global.feigin_client.service;

import baro.baro.global.feigin_client.dto.request.BankMemberAddReq;
import baro.baro.global.feigin_client.dto.response.BankMemberAddRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "bankFeignClientCustom", url = "https://finopenapi.ssafy.io/ssafy/api/v1")
public interface BankFeignClientCustom {
    @PostMapping("/member")
    BankMemberAddRes addBankMember(BankMemberAddReq req);
}
