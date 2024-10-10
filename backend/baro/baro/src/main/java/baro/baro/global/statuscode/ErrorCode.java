package baro.baro.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    //멤버
    INVALID_NICKNAME(BAD_REQUEST.value(), "닉네임은 10자 이내의 영어 대소문자, 숫자, 한글만 사용해야합니다."),
    MEMBER_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 유저입니다."),
    PIN_NOT_FOUND(NOT_FOUND.value(), "PIN이 설정되지 않은 유저입니다."),
    NOT_VALID_PIN_NUMBER(BAD_REQUEST.value(), "유효하지 않은 PIN입니다."),
    PRIVATE_KEY_EXCEPTION(INTERNAL_SERVER_ERROR.value(), "개인 키를 가져오는 도중 서버 에러가 발생했습니다."),
    CERTIFICATE_EXCEPTION(INTERNAL_SERVER_ERROR.value(), "개인 인증서를 가져오는 과정에서 에러가 발생했습니다."),
    INVALID_PIN_NUMBER(BAD_REQUEST.value(), "유효하지 않은 PIN 번호입니다."),
    PIN_MISMATCH(BAD_REQUEST.value(), "PIN번호가 일치하지 않습니다."),
    ALREADY_EXIST_PIN(BAD_REQUEST.value(), "이미 PIN번호가 등록되어 있습니다."),
    PRIVATE_CREATED_FAIL(BAD_REQUEST.value(), "비밀키가 생성되지 않았습니다."),

    //계좌
    ACCOUNT_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 계좌입니다."),

    //토큰
    EXPIRED_TOKEN(BAD_REQUEST.value(), "만료된 토큰입니다."),
    NOT_VALID_TOKEN(BAD_REQUEST.value(), "유효하지 않은 토큰입니다."),
    ALREADY_EXIST_MEMBER(BAD_REQUEST.value(), "이미 가입된 유저입니다."),

    //파일
    FILE_UPLOAD_FAIL(BAD_REQUEST.value(), "파일 업로드에 실패했습니다."),
    FILE_DELETE_FAIL(BAD_REQUEST.value(), "파일 삭제에 실패했습니다."),
    FILE_EXTENSION_FAIL(BAD_REQUEST.value(), "파일 확장자가 올바르지 않습니다."),

    //지역
    LOCATION_IS_EMPTY(BAD_REQUEST.value(), "지역은 최소 1개 이상을 선택해야합니다."),
    INVALID_LOCATION_SIZE(BAD_REQUEST.value(), "지역은 최대 3개까지 선택가능합니다."),
    LOCATION_NOT_FOUND(NOT_FOUND.value(), "지역을 찾을 수 없습니다."),
    DUPLICATED_LOCATION(BAD_REQUEST.value(), "중복된 지역을 등록할 수 없습니다."),
    INVALID_LOCATION(BAD_REQUEST.value(), "대표 지역을 설정해야합니다."),
    MEMBER_LOCATION_NOT_FOUND(NOT_FOUND.value(), "등록된 지역만 대표으로 설정할 수 있습니다."),

    //계약
    INVALID_DATE_OPTION(BAD_REQUEST.value(), "유효하지 않은 날짜값이 있습니다."),
    INVALID_RETURN_TYPE(BAD_REQUEST.value(), "유효하지 않은 반납 유형입니다."),
    CONTRACT_IN_PROGRESS_BY_OTHERS(CONFLICT.value(), "해당 상품은 다른 사용자가 계약 진행 중입니다."),
    CONFLICT_WITH_OTHER(CONFLICT.value(), "해당 상품에 다른 요청과 충돌이 발생했습니다. 잠시 후 다시 시도해주세요."),
    INVALID_APPROVE_TYPE(BAD_REQUEST.value(), "승인 타입이 유효하지 않습니다."),
    CONTRACT_REQUEST_NOT_FOUND(NOT_FOUND.value(), "계약 요청 정보를 찾을 수 없습니다."),
    PDF_GENERATE_FAILED(INTERNAL_SERVER_ERROR.value(), "PDF 생성 및 업로드 과정에서 오류가 발생했습니다."),
    CONTRACT_NOT_FOUND(NOT_FOUND.value(), "진행중인 계약 정보가 없습니다."),
    EXCEPTION_DURING_SIGNING(INTERNAL_SERVER_ERROR.value(), "서명 진행 중 오류가 발생했습니다"),
    NOT_MADE_FROM_BAROBARO(NOT_FOUND.value(), "바로바로에서 생성된 계약서가 아닙니다."),
    PDF_NOT_MINE(FORBIDDEN.value(), "본인이 포함하지 않은 PDF는 열람할 수 없습니다."),


    //대여 물품
    PRODUCT_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 대여 물품입니다."),
    PRODUCT_UNAVAILABLE(BAD_REQUEST.value(), "대여 물품이 대여 가능한 상태가 아닙니다."),
    RETURN_ADDRESS_REQUIRED(BAD_REQUEST.value(), "반납 주소가 필요합니다."),
    PRODUCT_PHOTO_REQUIRED(BAD_REQUEST.value(), "사진 파일은 1장 이상을 등록해야합니다."),
    PRODUCT_PHOTO_LIMIT(BAD_REQUEST.value(), "사진 파일은 최대 3장까지 가능합니다."),
    PRODUCT_NOT_MODIFIABLE(FORBIDDEN.value(), "거래가 진행중이거나 끝난 물품은 수정할 수 없습니다."),
    PRODUCT_MODIFY_FORBIDDEN(FORBIDDEN.value(), "본인의 게시글이 아닌 경우에 수정할 수 없습니다."),
    INVALID_CONTRACT_CONDITION(BAD_REQUEST.value(), "입력값이 비어있습니다. 입력값을 넣어주세요."),
    PRODUCT_NOT_DELETED(FORBIDDEN.value(), "거래가 진행중일 때는 게시글을 삭제할 수 없습니다."),

    //카테고리
    CATEGORY_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 카테고리입니다."),

    //인증
    AUTHENTICATION_REQUIRED(BAD_REQUEST.value(), "본인인증이 필요합니다."),
    FAIL_PORTONE_TOKEN(BAD_REQUEST.value(), "포트원 토큰 발급 실패했습니다."),
    FAIL_PORTONE_IDENTIFIED(BAD_REQUEST.value(), "포트원 본인인증값을 가져올 수 없습니다."),

    //채팅
    CHATROOM_SELF_CREATED(BAD_REQUEST.value(), "본인이 올린 대여 물품의 채팅방은 만들 수 없습니다"),
    CHATROOM_NOT_FOUND(NOT_FOUND.value(), "존재하지 않는 채팅방입니다."),
    CHATROOM_NOT_ENROLLED(FORBIDDEN.value(), "참가중인 채팅방이 아닙니다"),

    //위시리스트
    WISHLIST_IS_PRESENT(BAD_REQUEST.value(), "이미 찜한 게시글입니다."),
    WISHLIST_IS_NOT_PRESENT(BAD_REQUEST.value(), "찜하지 않은 게시글은 취소할 수 없습니다"),
    ;

    private final int httpStatusCode;

    private final String message;
}
