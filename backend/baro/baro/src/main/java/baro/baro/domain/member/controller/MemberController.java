package baro.baro.domain.member.controller;

import baro.baro.domain.member.dto.request.PasswordAddReq;
import baro.baro.domain.member.dto.request.PasswordModifyReq;
import baro.baro.domain.member.dto.request.ProfileModifyReq;
import baro.baro.domain.member.dto.request.SignupReq;
import baro.baro.domain.member.dto.response.PasswordModifyRes;
import baro.baro.domain.member.dto.response.ProfileDetailsRes;
import baro.baro.domain.member.dto.response.SignUpInfoRes;
import baro.baro.domain.member.service.MemberService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static baro.baro.domain.member.validator.MemberValidator.isInvalidNickname;
import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final JwtService jwtService;

    @PostMapping("/members/signup")
    public ResponseEntity<?> signUp(@RequestPart(value = "dto") SignupReq signupReq,
                                    @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {

        isInvalidNickname(signupReq.getNickname());

        String accessToken = memberService.signup(signupReq, file);

        return new ResponseEntity<>(ResponseDto.success(MEMBER_CREATED, accessToken), CREATED);
    }

    @GetMapping("/members/signup/info")
    public ResponseEntity<?> signupInfo(@RequestParam("key") String key) {
        SignUpInfoRes result = memberService.signupDetails(key);

        return new ResponseEntity<>(ResponseDto.success(MEMBER_SIGNUP_DETAILS_OK, result), OK);
    }

    @PostMapping("/members/me/password")
    public ResponseEntity<?> passwordAdd(@RequestBody @Valid PasswordAddReq passwordAddReq) throws Exception {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        memberService.addPassword(memberId, passwordAddReq);

        return new ResponseEntity<>(ResponseDto.success(PASSWORD_CREATED, null), OK);
    }

    @PatchMapping("/members/me/password")
    public ResponseEntity<?> passwordModify(@RequestBody @Valid PasswordModifyReq passwordModifyReq) {
        PasswordModifyRes result = new PasswordModifyRes("654321");

        return new ResponseEntity<>(ResponseDto.success(PASSWORD_MODIFIED, result), OK);
    }

    @GetMapping("/members/me/password/verify")
    public ResponseEntity<?> verifyPassword(@RequestParam("key") String key) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        memberService.verifyPassword(key,memberId);
        return new ResponseEntity<>(ResponseDto.success(PASSWORD_VALIDATION_OK, null), OK);
    }

    @GetMapping("/members/me/profile")
    public ResponseEntity<?> profileDetails() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ProfileDetailsRes result = memberService.getProfileDetails(memberId);


        return new ResponseEntity<>(ResponseDto.success(PROFILE_DETAILS_OK, result), OK);
    }

    @PostMapping("/members/me/profile")
    public ResponseEntity<?> profileModify(@RequestPart(value = "dto") ProfileModifyReq profileModifyReq,
                                           @RequestPart(value = "file") MultipartFile file) {
        ProfileDetailsRes result = new ProfileDetailsRes("프로필 이미지", "uuid", "닉네임", "010-1111-1111", "ssafy@ssafy.com", "아무개",Boolean.TRUE);

        return new ResponseEntity<>(ResponseDto.success(PROFILE_MODIFIED, result), OK);
    }
}
