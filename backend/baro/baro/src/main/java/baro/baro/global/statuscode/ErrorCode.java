package baro.baro.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    //token
    EXPIRED_TOKEN(BAD_REQUEST.value(), "만료된 토큰입니다."),
    NOT_VALID_TOKEN(BAD_REQUEST.value(), "유효하지 않은 토큰입니다."),
    ALREADY_EXIST_MEMBER(BAD_REQUEST.value(), "이미 가입된 유저입니다."),

    MEMBER_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 유저입니다."),

    //대여 물품
    PRODUCT_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 대여 물품입니다."),
    PRODUCT_UNAVAILABLE(BAD_REQUEST.value(), "대여 물품이 대여 가능한 상태가 아닙니다."),

    //채팅
    CHATROOM_SELF_CREATED(BAD_REQUEST.value(), "본인이 올린 대여 물품의 채팅방은 만들 수 없습니다"),

    ;

    private final int httpStatusCode;

    private final String message;
}
