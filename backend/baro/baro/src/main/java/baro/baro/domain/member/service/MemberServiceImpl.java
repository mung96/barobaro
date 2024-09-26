package baro.baro.domain.member.service;

import baro.baro.domain.member.dto.request.SignupReq;
import baro.baro.domain.member.dto.response.SignUpInfoRes;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.global.exception.CustomException;
import baro.baro.global.oauth.jwt.entity.JwtRedis;
import baro.baro.global.oauth.jwt.service.JwtService;
import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static baro.baro.global.statuscode.ErrorCode.ALREADY_EXIST_MEMBER;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {
    @Value("${CLOUD_FRONT}")
    private String cloudFrontUrl;

    private final MemberRepository memberRepository;
    private final JwtService jwtService;
    private final RedisUtils redisUtils;

    @Override
    @Transactional
    public String signup(SignupReq signupReq) {
        String uuid = UUID.randomUUID().toString();

        if (memberRepository.findByEmail(signupReq.getEmail()) != null){
            throw new CustomException(ALREADY_EXIST_MEMBER);
        }

        Member member = signupReq.toEntity(uuid, cloudFrontUrl);

        memberRepository.save(member);

        JwtRedis jwtRedis = signupReq.toRedis(uuid, member.getId(), jwtService.createRefreshToken(uuid));
        redisUtils.setData(uuid, jwtRedis);

        return jwtService.createAccessToken(uuid, false);
    }

    @Override
    public SignUpInfoRes signupDetails(String key) {
        SignUpInfoRes result = (SignUpInfoRes) redisUtils.getData(key + "_signin_key");
        redisUtils.deleteData(key + "_signin_key");

        return result;
    }
}
