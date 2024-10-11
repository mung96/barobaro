package baro.baro.domain.contract.dto.request;

import baro.baro.domain.contract.entity.ContractCondition;
import baro.baro.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ContractConditionReq {
    private String productName;

    private String serialNumber;

    private String repairVendor;

    private Integer overdueCriteria;

    private Integer overdueFee;

    private Integer theftCriteria;

    private Integer refundDeadline;

    public ContractCondition toEntity(Product product) {
        return ContractCondition.builder()
                .product(product)
                .productName(productName)
                .serialNumber(serialNumber)
                .repairVendor(repairVendor)
                .overdueCriteria(overdueCriteria)
                .overdueFee(overdueFee)
                .theftCriteria(theftCriteria)
                .refundDeadline(refundDeadline)
                .build();
    }
}
