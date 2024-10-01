package baro.baro.domain.contract.dto;

import baro.baro.domain.product.entity.ReturnType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class ContractApplicationDto {

    private Long chatRoomId;

    private Long rentalId;

    private Long ownerId;

    private Long productId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate desiredStartDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate desiredEndDate;

    private ReturnType returnType;
}
