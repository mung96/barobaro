package baro.baro.domain.noti.service;

import baro.baro.domain.noti.dto.response.NotiListRes;

public interface NotiService {
    void addMemberFcmToken(String fcmToken, Long memberId);
    NotiListRes getNotiList(Long memberId);
}
