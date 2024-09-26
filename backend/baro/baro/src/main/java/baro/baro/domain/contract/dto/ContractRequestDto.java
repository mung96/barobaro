package baro.baro.domain.contract.dto;

import baro.baro.domain.product.entity.ReturnType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ContractRequestDto {

    private Long chatRoomId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate desiredStartDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate desiredEndDate;

    private ReturnType returnType;

}
