package baro.baro.domain.contract.dto.response;

import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.product.entity.ReturnType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContractOptionDetailRes {

    private Boolean isWriteContract;

    private List<ReturnType> returnTypes;

    private ContractConditionDto contractCondition;

}
