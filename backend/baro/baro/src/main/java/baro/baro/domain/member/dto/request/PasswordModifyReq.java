package baro.baro.domain.member.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PasswordModifyReq {
    @NotBlank
    @Size(min = 6, max = 6)
    private String nowPassword;

    @NotBlank
    @Size(min = 6, max = 6)
    private String modifyPassword;

    @NotBlank
    @Size(min = 6, max = 6)
    private String checkPassword;
}
