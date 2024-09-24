package baro.baro.domain.member.controller;

import baro.baro.domain.member.dto.request.PasswordModifyReq;
import baro.baro.domain.member.dto.request.ProfileModifyReq;
import baro.baro.domain.member.dto.response.PasswordModifyRes;
import baro.baro.domain.member.dto.response.ProfileDetailsRes;
import baro.baro.global.dto.ResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static baro.baro.global.statuscode.SuccessCode.*;
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

    @GetMapping("/profile")
    public ResponseEntity<?> profileDetails() {
        ProfileDetailsRes result = new ProfileDetailsRes("프로필 이미지", "닉네임", "010-1111-1111", "ssafy@ssafy.com");

        return new ResponseEntity<>(ResponseDto.success(PROFILE_DETAILS_OK, result), OK);
    }

    @PostMapping("/profile")
    public ResponseEntity<?> profileModify(@RequestPart(value = "dto") ProfileModifyReq profileModifyReq,
                                           @RequestPart(value = "file") MultipartFile file) {
        ProfileDetailsRes result = new ProfileDetailsRes("프로필 이미지", "닉네임", "010-1111-1111", "ssafy@ssafy.com");

        return new ResponseEntity<>(ResponseDto.success(PROFILE_MODIFY_OK, result), OK);
    }
}
