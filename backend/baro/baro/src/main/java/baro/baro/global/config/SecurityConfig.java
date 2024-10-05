package baro.baro.global.config;

import baro.baro.global.oauth.PrincipalOauth2UserService;
import baro.baro.global.oauth.handler.Oauth2FailureHandler;
import baro.baro.global.oauth.handler.Oauth2SuccessHandler;
import baro.baro.global.oauth.jwt.filter.JwtBearerAuthenticationFilter;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;

import java.security.Security;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Profile({"local", "prod"})
public class SecurityConfig {
    private final JwtBearerAuthenticationFilter jwtBearerAuthenticationFilter;
    private final PrincipalOauth2UserService oAuth2UserService;
    private final Oauth2SuccessHandler oauth2SuccessHandler;
    private final Oauth2FailureHandler oauth2FailureHandler;

    @PostConstruct
    public void init() {
        Security.addProvider(new BouncyCastleProvider());
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                        .requestMatchers(
                                "/members/signup/**", "/members/login/oauth2/**",
                                "/members/oauth2/code/**", "/docs/**", "/h2-console/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2Configurer -> oauth2Configurer
                        .authorizationEndpoint(authEndPoint -> authEndPoint
                                .baseUri("/members/signin/social"))
                        .redirectionEndpoint(redirection -> redirection
                                .baseUri("/members/oauth2/code/*"))
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(oAuth2UserService))
                        .successHandler(oauth2SuccessHandler)
                        .failureHandler(oauth2FailureHandler))
        ;
        http.addFilterBefore(jwtBearerAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}