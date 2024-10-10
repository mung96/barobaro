package baro.baro.domain.contract.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class ContractRequestDto {
    private Long chatRoomId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate desiredStartDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate desiredEndDate;

    private String returnType;

    public static ContractRequestDto from(ContractApplicationDto contractApplicationDto) {
        return ContractRequestDto.builder()
                .chatRoomId(contractApplicationDto.getChatRoomId())
                .desiredStartDate(contractApplicationDto.getDesiredStartDate())
                .desiredEndDate(contractApplicationDto.getDesiredEndDate())
                .returnType(String.valueOf(contractApplicationDto.getReturnType()))
                .build();
    }

}
