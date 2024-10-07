package baro.baro.global.oauth.handler;

import baro.baro.domain.member.dto.response.SignUpInfoRes;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.global.oauth.PrincipalDetails;
import baro.baro.global.oauth.jwt.entity.JwtRedis;
import baro.baro.global.oauth.jwt.service.JwtService;
import baro.baro.global.utils.CookieUtil;
import baro.baro.global.utils.RedisUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Slf4j
@Component
@RequiredArgsConstructor
public class Oauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Value("${FRONT_URL}")
    private String frontUrl;

    private final JwtService jwtService;
    private final RedisUtils redisUtils;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("성공성공!!");

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Member member = memberRepository.findByEmailAndProviderType(
                ((PrincipalDetails)authentication.getPrincipal()).getPassword(),
                ((PrincipalDetails) oAuth2User).getMember().getProviderType());

        if(member == null) {
            member = ((PrincipalDetails)oAuth2User).getMember();
            sendSignUpUserInfo(response, member);
        } else {
            if(Objects.equals(((PrincipalDetails) authentication.getPrincipal()).getMember().getProviderType(), member.getProviderType()) && !member.getIsDeleted()){
                sendAccessToken(response, member);
            } else{
                response.sendRedirect(frontUrl + "signup/error?providerType=" + member.getProviderType());
            }
        }
    }

    //회원가입 절차 마저 진행하기 위해 email, nickname, profileUrl 전달
    public void sendSignUpUserInfo(HttpServletResponse response, Member member) throws IOException {
        if (!response.isCommitted()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);

            SignUpInfoRes signUpInfoRes = SignUpInfoRes.toDto(member);

            redisUtils.setDataWithExpiration(signUpInfoRes.getEmail()+"_signin_key", signUpInfoRes, System.currentTimeMillis() + (10_000));

            response.sendRedirect(frontUrl + "signup/info?key=" + signUpInfoRes.getEmail());

            log.info("redirect 성공!!!!!!!!!!!!!" + signUpInfoRes.getEmail());
        }
    }

    //기존 회원 정보가 있는 경우 UUID 기반 accessToken 반환
    public void sendAccessToken(HttpServletResponse response, Member member) throws IOException {
        if (!response.isCommitted()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);

            String uuid = member.getUuid();
            JwtRedis jwtRedis = JwtRedis.builder()
                    .uuid(uuid)
                    .memberId(member.getId())
                    .refreshToken(jwtService.createRefreshToken(uuid))
                    .build();
            redisUtils.setData(uuid, jwtRedis);

            String accessToken = jwtService.createAccessToken(uuid, member.getIsCertificated());

            log.info("쿠키쿠키");
            //accessToken

            CookieUtil.addCookie(response, "token", accessToken,3600);

            log.info("쿠키쿠키 넣었음");

            response.sendRedirect(frontUrl+"home");
        }
    }
}
