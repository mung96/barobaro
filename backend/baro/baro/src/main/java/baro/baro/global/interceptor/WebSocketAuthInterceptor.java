package baro.baro.global.interceptor;

import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;

@RequiredArgsConstructor
public class WebSocketAuthInterceptor implements ChannelInterceptor {
    private final JwtService jwtService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String token = accessor.getFirstNativeHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            try {
                Authentication authentication = jwtService.getAuthentication(token.substring(7));
                accessor.setUser(authentication);
            } catch (Exception e) { // JWT 토큰이 유효하지 않은 경우 처리
                return null;
            }
        }

        return message;
    }
}
