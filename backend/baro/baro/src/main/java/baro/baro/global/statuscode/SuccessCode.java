package baro.baro.global.statuscode;

import static org.springframework.http.HttpStatus.*;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    RENTAL_PRODUCT_LIST_OK(OK.value(), "빌린 내역 리스트 조회에 성공했습니다."),
    OWNER_PRODUCT_LIST_OK(OK.value(), "빌려준 내역 리스트 조회에 성공했습니다."),

    ACCOUNT_LIST_OK(OK.value(), "계좌 리스트 조회에 성공했습니다."),

	NOTIFICATION_LIST_OK(OK.value(), "알림 리스트 조회에 성공했습니다."),

    PASSWORD_MODIFY_OK(OK.value(), "PIN번호 변경에 성공했습니다."),
    PROFILE_DETAILS_OK(OK.value(), "프로필 조회에 성공했습니다."),
    ;

	private final int httpStatusCode;

    private final String message;
}
