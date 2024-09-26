package baro.baro.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 클라이언트가 서버로 보낼 메시지 경로를 정의
        registry.setApplicationDestinationPrefixes("/pub");

        // 메시지 브로커를 활성화하여, 특정 주제(/sub)로 전달된 메시지를 클라이언트가 구독할 수 있도록 함
        // 서버에서 해당 주제로 메시지를 발행하면, 구독 중인 클라이언트가 메시지를 수신함
        registry.enableSimpleBroker("/sub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/ws") // /ws 경로를 통해 클라이언트는 WebSocket 연결을 시도
                .setAllowedOrigins("*") // 모든 도메인에서 이 WebSocket 엔드포인트로 접속할 수 있도록 허용
                .withSockJS(); // SockJS를 사용하도록 설정
    }
}
