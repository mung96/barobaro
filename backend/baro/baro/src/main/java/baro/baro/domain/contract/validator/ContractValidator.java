package baro.baro.domain.contract.validator;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.global.exception.CustomException;

import java.time.LocalDate;
import java.util.Arrays;

import static baro.baro.global.statuscode.ErrorCode.INVALID_DATE_OPTION;
import static baro.baro.global.statuscode.ErrorCode.INVALID_RETURN_TYPE;
import static baro.baro.global.validator.GlobalValidator.validateDateRangeOption;
import static baro.baro.global.validator.GlobalValidator.validateReturnType;

public class ContractValidator {

    public static void validateContractRequestDto(final ContractRequestDto contractRequestDto) {
        validateDateRangeOption(contractRequestDto.getDesiredStartDate(), contractRequestDto.getDesiredEndDate());
        validateReturnType(contractRequestDto.getReturnType());
    }

}
