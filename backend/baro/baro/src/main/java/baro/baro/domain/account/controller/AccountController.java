package baro.baro.domain.account.controller;

import baro.baro.domain.account.dto.AccountDto;
import baro.baro.domain.account.dto.response.AccountListRes;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static baro.baro.global.statuscode.SuccessCode.ACCOUNT_LIST_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members/me/accounts")
public class AccountController {
    @GetMapping
    public ResponseEntity<?> accountList() {
        List<AccountDto> accounts = new ArrayList<>();

        AccountDto dto = AccountDto.builder()
                .bank("카카오뱅크")
                .accountNumber("3333-05-681789")
                .accountId(10000L)
                .main(true)
                .build();

        accounts.add(dto);

        for(int i = 1; i < 10; i++) {
            Long id = 10000L + i;

            dto = AccountDto.builder()
                    .bank("카카오뱅크")
                    .accountNumber("3333-05-681789")
                    .accountId(id)
                    .main(false)
                    .build();

            accounts.add(dto);
        }

        AccountListRes result = new AccountListRes(accounts);

        return new ResponseEntity<>(ResponseDto.success(ACCOUNT_LIST_OK, result), OK);
    }
}
