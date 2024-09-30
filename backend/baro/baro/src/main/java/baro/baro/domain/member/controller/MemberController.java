package baro.baro.domain.member.controller;

import baro.baro.domain.member.dto.request.PasswordModifyReq;
import baro.baro.domain.member.dto.request.ProfileModifyReq;
import baro.baro.domain.member.dto.request.SignupReq;
import baro.baro.domain.member.dto.response.PasswordModifyRes;
import baro.baro.domain.member.dto.response.ProfileDetailsRes;
import baro.baro.domain.member.dto.response.SignUpInfoRes;
import baro.baro.domain.member.service.MemberService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.utils.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static baro.baro.domain.member.validator.MemberValidator.isInvalidNickname;
import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/members/signup")
    public ResponseEntity<?> signUp(@RequestPart(value = "dto") SignupReq signupReq,
                                    @RequestPart(value = "file") MultipartFile file,
                                    HttpServletResponse response) throws IOException {
        isInvalidNickname(signupReq.getNickname());

        String accessToken = memberService.signup(signupReq, file);

        CookieUtil.addCookie(response, "token", accessToken, 300);

        return new ResponseEntity<>(ResponseDto.success(MEMBER_CREATED, null), CREATED);
    }

    @GetMapping("/members/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        CookieUtil.deleteCookie(response, "token");

        return new ResponseEntity<>(ResponseDto.success(MEMBER_LOGOUT, null), OK);
    }

    @GetMapping("/members/signup/info/{key}")
    public ResponseEntity<?> signupInfo(@PathVariable("key") String key) {
        SignUpInfoRes result = memberService.signupDetails(key);

        return new ResponseEntity<>(ResponseDto.success(MEMBER_SIGNUP_DETAILS_OK, result), OK);
    }

    @PatchMapping("/members/me/password")
    public ResponseEntity<?> passwordModify(@RequestBody @Valid PasswordModifyReq passwordModifyReq) {
        PasswordModifyRes result = new PasswordModifyRes("654321");

        return new ResponseEntity<>(ResponseDto.success(PASSWORD_MODIFIED, result), OK);
    }

    @GetMapping("/members/me/profile")
    public ResponseEntity<?> profileDetails() {
        ProfileDetailsRes result = new ProfileDetailsRes("아무개", "프로필 이미지", "닉네임", "010-1111-1111", "ssafy@ssafy.com");

        return new ResponseEntity<>(ResponseDto.success(PROFILE_DETAILS_OK, result), OK);
    }

    @PostMapping("/members/me/profile")
    public ResponseEntity<?> profileModify(@RequestPart(value = "dto") ProfileModifyReq profileModifyReq,
                                           @RequestPart(value = "file") MultipartFile file) {
        ProfileDetailsRes result = new ProfileDetailsRes("아무개", "프로필 이미지", "닉네임", "010-1111-1111", "ssafy@ssafy.com");

        return new ResponseEntity<>(ResponseDto.success(PROFILE_MODIFIED, result), OK);
    }
}
