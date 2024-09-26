package baro.baro.domain.contract.dto.response;

import baro.baro.domain.product.entity.ReturnType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class ContractOptionDetailRes {

    private Boolean isUsingContract;

    private List<ReturnType> returnTypes;

    private String repairVendor;

    private Integer overdueCriteria;

    private Integer overdueFee;

    private Integer refundDeadline;

}
