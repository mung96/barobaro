package baro.baro.domain.contract.dto;

import baro.baro.domain.contract.entity.ContractCondition;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContractConditionDto {
    private String repairVendor;

    private Integer overdueCriteria;

    private Integer overdueFee;

    private Integer theftCriteria;

    private Integer refundDeadline;

    public static ContractConditionDto toDto(ContractCondition contractCondition) {
        return ContractConditionDto.builder()
                .repairVendor(contractCondition.getRepairVendor())
                .overdueCriteria(contractCondition.getOverdueCriteria())
                .overdueFee(contractCondition.getOverdueFee())
                .theftCriteria(contractCondition.getTheftCriteria())
                .repairVendor(contractCondition.getRepairVendor())
                .refundDeadline(contractCondition.getRefundDeadline())
                .build();
    }
}
