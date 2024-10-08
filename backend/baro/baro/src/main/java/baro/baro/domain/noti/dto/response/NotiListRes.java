package baro.baro.domain.noti.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class NotiListRes {
    private List<NotiDto> notifications;
}
