package baro.baro.global.config;

import baro.baro.global.interceptor.WebSocketAuthInterceptor;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99) // 우선순위
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final JwtService jwtService;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 클라이언트가 서버로 보낼 메시지 경로를 정의
        registry.setApplicationDestinationPrefixes("/pub");

        // 메시지 브로커를 활성화하여, 특정 주제(/sub)로 전달된 메시지를 클라이언트가 구독할 수 있도록 함
        // 서버에서 해당 주제로 메시지를 발행하면, 구독 중인 클라이언트가 메시지를 수신함
        registry.enableSimpleBroker("/sub");

        log.info("WebSocketConfig configureMessageBroker");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/ws") // /ws 경로를 통해 클라이언트는 WebSocket 연결을 시도
                .setAllowedOrigins("http://localhost:3000", "ws://localhost:3000",
                        "https://j11a401.p.ssafy.io", "wss://j11a401.p.ssafy.io")
                .withSockJS(); // SockJS를 사용하도록 설정

        log.info("WebSocketConfig registerStompEndpoints");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // 클라이언트에서 수신하는 메시지에 대해 인터셉터 적용
        registration.interceptors(new WebSocketAuthInterceptor(jwtService));
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(8192)
                .setSendBufferSizeLimit(8192)
                .setSendTimeLimit(10000);
    }
}
