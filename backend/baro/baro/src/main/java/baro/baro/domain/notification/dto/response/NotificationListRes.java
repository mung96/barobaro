package baro.baro.domain.notification.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificationListRes {
	private List<NotificationDto> notifications;
}
