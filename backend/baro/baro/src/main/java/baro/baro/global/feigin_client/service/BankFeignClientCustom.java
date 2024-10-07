package baro.baro.global.feigin_client.service;

import baro.baro.global.feigin_client.dto.request.BankMemberAddReq;
import baro.baro.global.feigin_client.dto.request.BankMemberDetailsReq;
import baro.baro.global.feigin_client.dto.request.BankProductAddReq;
import baro.baro.global.feigin_client.dto.response.BankMemberAddRes;
import baro.baro.global.feigin_client.dto.response.BankMemberDetailsRes;
import baro.baro.global.feigin_client.dto.response.BankProductAddRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "bankFeignClientCustom", url = "https://finopenapi.ssafy.io/ssafy/api/v1")
public interface BankFeignClientCustom {
    @PostMapping("/member")
    BankMemberAddRes addBankMember(BankMemberAddReq req);

    @PostMapping("/member/search")
    BankMemberDetailsRes findBankMember(BankMemberDetailsReq req); // userId로 userKey 찾기 용도

    @PostMapping("/edu/demandDeposit/createDemandDeposit")
    BankProductAddRes addBankProduct(BankProductAddReq req);
}
