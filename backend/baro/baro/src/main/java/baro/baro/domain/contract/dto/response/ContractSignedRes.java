package baro.baro.domain.contract.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ContractSignedRes {
    private Long chatRoomId;

    private String fileUrl;

    private LocalDateTime signedAt;
}
