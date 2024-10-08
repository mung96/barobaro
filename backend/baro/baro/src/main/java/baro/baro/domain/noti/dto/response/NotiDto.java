package baro.baro.domain.noti.dto.response;

import baro.baro.domain.noti.entity.Noti;
import baro.baro.domain.noti.entity.NotiType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotiDto {
    private String message;

    private String fromMemberId;

    private NotiType notiType;

    public static NotiDto toDto(Noti noti) {
        return NotiDto.builder()
                .message(noti.getMessage())
                .fromMemberId(noti.getFromMember().getUuid())
                .notiType(noti.getNotiType())
                .build();
    }
}
