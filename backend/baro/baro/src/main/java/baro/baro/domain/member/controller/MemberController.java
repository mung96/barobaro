package baro.baro.domain.member.controller;

import baro.baro.domain.member.dto.request.PasswordModifyReq;
import baro.baro.domain.member.dto.response.PasswordModifyRes;
import baro.baro.global.dto.ResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static baro.baro.global.statuscode.SuccessCode.PASSWORD_MODIFY_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members/me")
public class MemberController {
    @PatchMapping("/password")
    public ResponseEntity<?> passwordModify(@RequestBody @Valid PasswordModifyReq passwordModifyReq) {
        PasswordModifyRes result = new PasswordModifyRes("654321");

        return new ResponseEntity<>(ResponseDto.success(PASSWORD_MODIFY_OK, result), OK);
    }
}
