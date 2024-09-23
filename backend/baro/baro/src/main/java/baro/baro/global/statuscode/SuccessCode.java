package baro.baro.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.OK;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    RENTAL_PRODUCT_LIST_OK(OK.value(), "빌린 내역 리스트 조회에 성공했습니다.")
    ;

    private final int httpStatusCode;

    private final String message;
}