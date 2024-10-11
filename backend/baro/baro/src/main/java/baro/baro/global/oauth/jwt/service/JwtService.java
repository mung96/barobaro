package baro.baro.global.oauth.jwt.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;

public interface JwtService {
    String createAccessToken(String uuid, Boolean isCertificated);

    String createRefreshToken(String uuid);

    String getUuid(String token);

    Authentication getAuthentication(String accessToken);

    boolean isTokenValid(String token);

    boolean isTokenExpired(String token);

    Long getUserId(SecurityContext securityContext);

    Long getUserIdFromRedis(String uuid);

    String getTypeFromToken(String token);

    Boolean getIsCertificatedFromToken(String token);
}

