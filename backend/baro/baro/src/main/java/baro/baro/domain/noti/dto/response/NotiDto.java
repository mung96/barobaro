package baro.baro.domain.noti.dto.response;

import baro.baro.domain.noti.entity.Noti;
import baro.baro.domain.noti.entity.NotiType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotiDto {
	private String message;

	private String fromMemberId;

	private String fromMemberImage;

	private String fromMemberNickName;

	private NotiType notiType;

	public static NotiDto toDto(Noti noti) {
		return NotiDto.builder()
			.message(noti.getMessage())
			.fromMemberId(noti.getFromMember().getUuid())
			.fromMemberImage(noti.getFromMember().getProfileImage())
			.fromMemberNickName(noti.getFromMember().getNickname())
			.notiType(noti.getNotiType())
			.build();
	}
}
