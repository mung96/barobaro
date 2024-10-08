package baro.baro.global.feigin_client.service;

import baro.baro.global.feigin_client.dto.request.*;
import baro.baro.global.feigin_client.dto.response.*;
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

    @PostMapping("/edu/demandDeposit/inquireDemandDepositList")
    BankProductDetailsRes findBankProducts(BankProductDetailsReq req);

    @PostMapping("/edu/demandDeposit/createDemandDepositAccount")
    BankAccountAddRes addBankAccount(BankAccountAddReq req); // 계좌 생성

    @PostMapping("/edu/demandDeposit/inquireDemandDepositAccountBalance")
    BankAccountDetailsRes findBankAccount(BankAccountDetailsReq req); // 계좌 잔액 조회
}
