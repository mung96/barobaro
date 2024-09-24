package baro.baro.domain.account.controller;

import baro.baro.domain.account.dto.AccountDto;
import baro.baro.domain.account.dto.request.AccountAddReq;
import baro.baro.domain.account.dto.response.AccountAddMainRes;
import baro.baro.domain.account.dto.response.AccountAddRes;
import baro.baro.domain.account.dto.response.AccountListRes;
import baro.baro.global.dto.ResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.*;

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

    @PostMapping
    public ResponseEntity<?> accountAdd(@RequestBody @Valid AccountAddReq accountAddReq) {
        AccountAddRes result = new AccountAddRes("3333-05-681789");

        return new ResponseEntity<>(ResponseDto.success(ACCOUNT_CREATED, result), CREATED);
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<?> accountRemove(@PathVariable("accountId") Long accountId) {
        return new ResponseEntity<>(ResponseDto.success(ACCOUNT_DELETED, null), NO_CONTENT);
    }

    @PostMapping("/{accountId}")
    public ResponseEntity<?> accountAddMain(@PathVariable("accountId") Long accountId) {
        AccountAddMainRes result = new AccountAddMainRes("3333-05-681789", 10000L, true);

        return new ResponseEntity<>(ResponseDto.success(ACCOUNT_ADD_MAIN_OK, result), OK);
    }
}
