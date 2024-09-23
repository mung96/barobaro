package baro.baro.domain.notification.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class NotificationListRes {
    private List<NotificationDto> notifications;
}
