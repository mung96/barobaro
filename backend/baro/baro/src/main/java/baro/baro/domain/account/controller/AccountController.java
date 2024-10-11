package baro.baro.domain.account.controller;

import baro.baro.domain.account.dto.request.AccountAddReq;
import baro.baro.domain.account.dto.response.AccountAddMainRes;
import baro.baro.domain.account.dto.response.AccountAddRes;
import baro.baro.domain.account.dto.response.AccountListRes;
import baro.baro.domain.account.service.AccountService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members/me/accounts")
public class AccountController {
    private final AccountService accountService;
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<?> accountList() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        AccountListRes result = accountService.findAccounts(memberId);

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

    @PatchMapping("/{accountId}")
    public ResponseEntity<?> accountAddMain(@PathVariable("accountId") Long accountId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        AccountAddMainRes result = accountService.addMainAccount(memberId, accountId);

        return new ResponseEntity<>(ResponseDto.success(ACCOUNT_ADD_MAIN_OK, result), OK);
    }
}
