package baro.baro.global.feigin_client.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BankMemberAddRes {
    private String userId;

    private String username;

    private String institutionCode; // 00100

    private String userKey; // 랜덤 UUID

    private String created;

    private String modified;
}
