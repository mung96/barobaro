package baro.baro.domain.member.service;

import baro.baro.domain.member.dto.request.SignupReq;
import baro.baro.domain.member.dto.response.SignUpInfoRes;

public interface MemberService {
    String signup(SignupReq user);

    SignUpInfoRes signupDetails(String key);
}
