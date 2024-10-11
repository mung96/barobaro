package baro.baro.domain.noti.entity;

import lombok.Getter;

@Getter
public enum NotiType {

    CONTRACT_REQUEST,       // 계약 요청 알림
    CONTRACT_ACCEPTANCE,    // 계약 수락 알림
    SIGNATURE_REQUEST,      // 서명 요청 알림
    PAYMENT_NOTIFICATION,   // 송금 알림
    RECEIPT_CONFIRMATION,   // 수령 확인
    CONTRACT_MODIFICATION,  // 계약 조건 수정 알림
    DEFAULT,                // 일반적인 상황

}
