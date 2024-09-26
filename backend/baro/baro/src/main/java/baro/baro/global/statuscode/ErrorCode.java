package baro.baro.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    //token
    EXPIRED_TOKEN(BAD_REQUEST.value(), "만료된 토큰입니다."),
    NOT_VALID_TOKEN(BAD_REQUEST.value(), "유효하지 않은 토큰입니다."),
    ALREADY_EXIST_MEMBER(BAD_REQUEST.value(), "이미 가입된 유저입니다.")
    ;

    private final int httpStatusCode;

    private final String message;
}