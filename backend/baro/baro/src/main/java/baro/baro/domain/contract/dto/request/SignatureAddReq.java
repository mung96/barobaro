package baro.baro.domain.contract.dto.request;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignatureAddReq {
    private Long chatRoomId;

    @NotBlank
    @Size(min = 6, max = 6)
    private String pinNumber;

    @Lob
    private String signatureData;

    private String s3FileUrl;
}
