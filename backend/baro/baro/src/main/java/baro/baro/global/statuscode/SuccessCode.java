package baro.baro.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    //대여 물품
    PRODUCT_CREATED(CREATED.value(), "대여 물품 등록에 성공했습니다."),
    PRODUCT_MODIFIED(OK.value(), "대여 물품 수정에 성공했습니다."),
    PRODUCT_DETAILS_OK(OK.value(), "대여 물품 상세 조회에 성공했습니다."),
    PRODUCT_RECENTLY_VIEWED_LIST_OK(OK.value(), "최근 본 대여 물품 리스트 조회에 성공했습니다."),
    PRODUCT_RECENTLY_UPLOADED_LIST_OK(OK.value(), "최근 올라온 대여 물품 리스트 조회에 성공했습니다."),

    //계약
    CONTRACT_REQUEST_CREATED(CREATED.value(), "계약 요청에 성공했습니다."),
    CONTRACT_REQUEST_OK(OK.value(), "계약 요청 조회에 성공했습니다."),
    //채팅

    //검색

    //본인인증

    //알림 및 푸시
    NOTIFICATION_LIST_OK(OK.value(), "알림 리스트 조회에 성공했습니다."),

    //찜

    //마이페이지
    RENTAL_PRODUCT_LIST_OK(OK.value(), "빌린 내역 리스트 조회에 성공했습니다."),
    OWNER_PRODUCT_LIST_OK(OK.value(), "빌려준 내역 리스트 조회에 성공했습니다."),

    ACCOUNT_LIST_OK(OK.value(), "계좌 리스트 조회에 성공했습니다."),
    ACCOUNT_CREATED(CREATED.value(), "계좌 연결에 성공했습니다."),
    ACCOUNT_ADD_MAIN_OK(OK.value(), "대표 계좌 설정에 성공했습니다."),
    ACCOUNT_DELETED(NO_CONTENT.value(), "대표 계좌 설정에 성공했습니다."),
    PASSWORD_MODIFIED(OK.value(), "PIN번호 변경에 성공했습니다."),
    PROFILE_DETAILS_OK(OK.value(), "프로필 조회에 성공했습니다."),
    PROFILE_MODIFIED(OK.value(), "프로필 수정에 성공했습니다."),



    //지역 설정

    //회원가입 및 로그인
    ;

	private final int httpStatusCode;

    private final String message;
}
