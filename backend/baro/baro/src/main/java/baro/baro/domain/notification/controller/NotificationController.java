package baro.baro.domain.notification.controller;

import baro.baro.domain.notification.dto.response.NotificationDto;
import baro.baro.domain.notification.dto.response.NotificationListRes;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static baro.baro.domain.notification.entity.NotificationType.CONTRACT_REQUEST;
import static baro.baro.global.statuscode.SuccessCode.NOTIFICATION_LIST_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
public class NotificationController {

    @GetMapping("")
    public ResponseEntity<?> notificationList() {
        List<NotificationDto> notifications = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            String fromMemberId = UUID.randomUUID().toString();
            NotificationDto dto = NotificationDto.builder()
                    .message("ㅇㅇㅇ" + "님이 계약 요청을 했습니다.")
                    .fromMemberId(fromMemberId)
                    .notificationType(CONTRACT_REQUEST)
                    .build();
            notifications.add(dto);
        }
        NotificationListRes result = new NotificationListRes(notifications);
        return new ResponseEntity<>(ResponseDto.success(NOTIFICATION_LIST_OK, result), OK);
    }

}
