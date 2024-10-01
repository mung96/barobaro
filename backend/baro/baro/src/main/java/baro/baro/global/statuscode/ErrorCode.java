package baro.baro.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    //member
    INVALID_NICKNAME(BAD_REQUEST.value(), "닉네임은 10자 이내의 영어 대소문자, 숫자, 한글만 사용해야합니다."),
    MEMBER_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 유저입니다."),

    //token
    EXPIRED_TOKEN(BAD_REQUEST.value(), "만료된 토큰입니다."),
    NOT_VALID_TOKEN(BAD_REQUEST.value(), "유효하지 않은 토큰입니다."),
    ALREADY_EXIST_MEMBER(BAD_REQUEST.value(), "이미 가입된 유저입니다."),

    //file
    FILE_UPLOAD_FAIL(BAD_REQUEST.value(), "파일 업로드에 실패했습니다."),
    FILE_DELETE_FAIL(BAD_REQUEST.value(), "파일 삭제에 실패했습니다."),
    FILE_EXTENSION_FAIL(BAD_REQUEST.value(), "파일 확장자가 올바르지 않습니다."),

    //location
    LOCATION_IS_EMPTY(BAD_REQUEST.value(), "지역은 최소 1개 이상을 선택해야합니다."),
    INVALID_LOCATION_SIZE(BAD_REQUEST.value(), "지역은 최대 3개까지 선택가능합니다."),
    LOCATION_NOT_FOUND(NOT_FOUND.value(), "지역을 찾을 수 없습니다."),

    //계약
    INVALID_DATE_OPTION(BAD_REQUEST.value(),"유효하지 않은 날짜값이 있습니다."),
    INVALID_RETURN_TYPE(BAD_REQUEST.value(),"유효하지 않은 반납 유형입니다."),
    CONTRACT_IN_PROGRESS_BY_OTHERS(CONFLICT.value(),"해당 상품은 다른 사용자가 계약 진행 중입니다."),

    //대여 물품
    PRODUCT_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 대여 물품입니다."),
    PRODUCT_UNAVAILABLE(BAD_REQUEST.value(), "대여 물품이 대여 가능한 상태가 아닙니다."),

    //채팅
    CHATROOM_SELF_CREATED(BAD_REQUEST.value(), "본인이 올린 대여 물품의 채팅방은 만들 수 없습니다"),
    CHATROOM_NOT_FOUND(NOT_FOUND.value(),"존재하지 않는 채팅방입니다."),
    CHATROOM_NOT_ENROLLED(FORBIDDEN.value(),"참가중인 채팅방이 아닙니다"),
    ;

    private final int httpStatusCode;

    private final String message;
}
