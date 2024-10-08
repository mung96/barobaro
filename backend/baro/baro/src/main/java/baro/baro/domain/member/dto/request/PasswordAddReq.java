package baro.baro.domain.member.dto.request;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.entity.Pin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PasswordAddReq {
    @NotBlank
    @Size(min = 6, max = 6)
    private String password;

    @NotBlank
    @Size(min = 6, max = 6)
    private String checkPassword;

    public Pin toEntity(Member member, String uuid) {
        return Pin.builder()
                .member(member)
                .pinNumber(password)
                .keystorePassword(uuid)
                .build();
    }
}
