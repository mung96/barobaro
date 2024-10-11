package baro.baro.global.oauth.jwt.service;

import baro.baro.global.oauth.jwt.entity.JwtRedis;
import baro.baro.global.utils.RedisUtils;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static baro.baro.domain.member.entity.UserRole.ROLE_USER;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {
    //== jwt.yml에 설정된 값 가져오기 ==//
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access.expiration}")
    private long accessTokenValidityInSeconds;

    @Value("${jwt.refresh.expiration}")
    private long refreshTokenValidityInSeconds;

    private final RedisUtils redisUtils;
    private static final String ISSUER = "www.samsung.com";
    private static final String ACCESS_TOKEN_CLAIM_NAME = "access_token";
    private static final String REFRESH_TOKEN_CLAIM_NAME = "refresh_token";

    @Override
    public String createAccessToken(String uuid, Boolean isCertificated) {
        return JWT.create()
                .withSubject(uuid)
                .withClaim("isCertificated", isCertificated)
                .withClaim("type", ACCESS_TOKEN_CLAIM_NAME)
                .withIssuer(ISSUER)
                .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenValidityInSeconds * 1000))
                .sign(Algorithm.HMAC512(secret));
    }

    @PostConstruct
    public void init() {
        String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
        String accessToken = createAccessToken(UUID, false);
        String refreshToken = createRefreshToken(UUID);
        System.out.println("accessToken = " + accessToken);
        System.out.println("refreshToken = " + refreshToken);
        JwtRedis redis = JwtRedis.builder()
                .refreshToken(refreshToken)
                .uuid(UUID)
                .memberId(123L)
                .build();
        redisUtils.setData(UUID, redis);
    }

    @Override
    public String createRefreshToken(String uuid) {
        return JWT.create()
                .withSubject(uuid)
                .withClaim("type", REFRESH_TOKEN_CLAIM_NAME)
                .withIssuer(ISSUER)
                .withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenValidityInSeconds * 1000))
                .sign(Algorithm.HMAC512(secret));
    }

    @Override
    public String getUuid(String token) {
        return JWT.decode(token).getSubject();
    }

    @Override
    public Authentication getAuthentication(String accessToken) {
        String uuid = JWT.decode(accessToken).getSubject();
        JwtRedis jwtRedis = (JwtRedis)redisUtils.getData(uuid);
        Long userId = jwtRedis.getMemberId();
        return new UsernamePasswordAuthenticationToken(userId, accessToken, List.of(ROLE_USER));
    }

    @Override
    public boolean isTokenValid(String token) {
        try {
            DecodedJWT decode = JWT
                    .require(Algorithm.HMAC512(secret))
                    .build()
                    .verify(token);
            return decode.getIssuer().equals(ISSUER);
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean isTokenExpired(String token) {
        try {
            DecodedJWT decoded = JWT.decode(token);
            String type = decoded.getClaim("type").asString();
            String uuid = decoded.getSubject();

            if(type.equals(REFRESH_TOKEN_CLAIM_NAME)){
                Long expires = decoded.getExpiresAt().getTime() - new Date().getTime();
                long diffInDays = TimeUnit.MILLISECONDS.toDays(expires);
                if (diffInDays < 3 && expires > 0) {//redis에 있는 refreshToken 재발급
                    JwtRedis jwtRedis = (JwtRedis) redisUtils.getData(uuid);
                    jwtRedis.setRefreshToken(createRefreshToken(uuid));
                    redisUtils.setData(uuid, jwtRedis);
                    return false;
                } else return diffInDays < 3;
            }
            return JWT.decode(token).getExpiresAt().before(new Date());
        } catch(Exception e){
            return true;
        }
    }

    @Override
    public Long getUserId(SecurityContext securityContext) {
        return (Long) securityContext.getAuthentication().getPrincipal();
    }

    @Override
    public Long getUserIdFromRedis(String uuid) {
        return (Long) redisUtils.getData(uuid);
    }

    public String getTypeFromToken(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getClaim("type").asString();
    }

    public Boolean getIsCertificatedFromToken(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getClaim("isCertificated").asBoolean();
    }
}

