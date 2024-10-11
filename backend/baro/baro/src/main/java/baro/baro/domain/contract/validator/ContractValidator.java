package baro.baro.domain.contract.validator;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.product.entity.ReturnType;

import static baro.baro.global.validator.GlobalValidator.validateDateRangeOption;
import static baro.baro.global.validator.GlobalValidator.validateReturnType;

public class ContractValidator {

    public static void validateContractRequestDto(final ContractRequestDto contractRequestDto) {
        validateDateRangeOption(contractRequestDto.getDesiredStartDate(), contractRequestDto.getDesiredEndDate());
        validateReturnType(ReturnType.valueOf(contractRequestDto.getReturnType()));
    }

}
