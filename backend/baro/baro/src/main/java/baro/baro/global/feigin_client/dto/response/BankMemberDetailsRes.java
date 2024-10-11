package baro.baro.global.feigin_client.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BankMemberDetailsRes {
    private String userId;

    private String username;

    private String institutionCode;

    private String userKey;

    private String created;

    private String modified;
}
