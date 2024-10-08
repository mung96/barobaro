package baro.baro.domain.member.service;

import baro.baro.domain.member.dto.request.PasswordAddReq;
import baro.baro.domain.member.dto.request.SignupReq;
import baro.baro.domain.member.dto.response.ProfileDetailsRes;
import baro.baro.domain.member.dto.response.SignUpInfoRes;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MemberService {
    String signup(SignupReq signupReq, MultipartFile file) throws IOException;

    SignUpInfoRes signupDetails(String key);

    Boolean verifyPassword(String key, Long memberId);

    void addPassword(Long memberId, PasswordAddReq passwordAddReq) throws Exception;

    ProfileDetailsRes getProfileDetails(Long memberId);

}
