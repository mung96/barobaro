package baro.baro.global.feigin_client.service;

import baro.baro.global.feigin_client.dto.request.BankAccountDetailsReq;
import baro.baro.global.feigin_client.dto.request.HeaderReq;
import baro.baro.global.feigin_client.dto.response.BankAccountDetailsRes;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class FeignClientService {
    private final BankFeignClientCustom bankFeignClientCustom;

    @Value("${BANK_API_KEY}")
    private String apiKey;

    @Value("${ACCOUNT_TYPE_UNIQUE_NO}")
    private String accountTypeUniqueNo;

    @Value("${USER_KEY_SSAFY123}")
    private String userKeySafy123;

    public void callBankApi() {
        // 초기 데이터 세팅 예정

        // 공통 요청 헤더
        String apiName = "updateDemandDepositAccountWithdrawal";

        HeaderReq headerReq = HeaderReq.builder()
                .apiName(apiName)
                .transmissionDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")))
                .transmissionTime(LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss")))
                .institutionCode("00100")
                .fintechAppNo("001")
                .apiServiceCode(apiName)
                .institutionTransactionUniqueNo(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSSSS")))
                .apiKey(apiKey)
                .userKey(userKeySafy123)
                .build();

        // 계좌 잔액 조회
        // getAccountDetails("9992678903441444");
    }

    private void getAccountDetails(String accountNo) {
        String apiName = "inquireDemandDepositAccountBalance";

        HeaderReq headerReq = HeaderReq.builder()
                .apiName(apiName)
                .transmissionDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")))
                .transmissionTime(LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss")))
                .institutionCode("00100")
                .fintechAppNo("001")
                .apiServiceCode(apiName)
                .institutionTransactionUniqueNo(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSSSS")))
                .apiKey(apiKey)
                .userKey(userKeySafy123)
                .build();

        BankAccountDetailsReq req = BankAccountDetailsReq.builder()
                .headerReq(headerReq)
                .accountNo(accountNo)
                .build();

//        BankAccountDetailsRes res = bankFeignClientCustom.findBankAccount(req);
//        System.out.println(res.toString());
    }
}
