package baro.baro.domain.notification.dto.response;

import baro.baro.domain.notification.entity.Notification;
import baro.baro.domain.notification.entity.NotificationType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationDto {
	private String message;

	private String fromMemberId;

	private NotificationType notificationType;

	public static NotificationDto toDto(Notification notification) {
		return NotificationDto.builder()
			.message(notification.getMessage())
			.fromMemberId(notification.getFromMember().getUuid())
			.notificationType(notification.getNotificationType())
			.build();
	}
}
