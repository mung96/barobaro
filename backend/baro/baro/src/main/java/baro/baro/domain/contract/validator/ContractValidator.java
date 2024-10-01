package baro.baro.domain.contract.validator;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.global.exception.CustomException;

import java.time.LocalDate;
import java.util.Arrays;

import static baro.baro.global.statuscode.ErrorCode.INVALID_DATE_OPTION;
import static baro.baro.global.statuscode.ErrorCode.INVALID_RETURN_TYPE;

public class ContractValidator {

    public static void validateContractRequestDto(final ContractRequestDto contractRequestDto) {
        validateDateRangeOption(contractRequestDto.getDesiredStartDate(), contractRequestDto.getDesiredEndDate());
        validateReturnType(contractRequestDto.getReturnType());
    }

    private static void validateReturnType(final ReturnType returnType) {
        if(!isValidReturnType(returnType)) {
            throw new CustomException(INVALID_RETURN_TYPE);
        }
    }
    private static boolean isValidReturnType(final ReturnType returnType) {
        return returnType != null && Arrays.stream(ReturnType.values())
                .anyMatch(type -> type == returnType);
    }

    private static void validateDateRangeOption(final LocalDate startDate, final LocalDate endDate) {
        if (notValidDate(startDate) || notValidDate(endDate) || endDate.isBefore(startDate)
        ) {
            throw new CustomException(INVALID_DATE_OPTION);
        }
    }

    private static boolean notValidDate(final LocalDate date) {
        return date == null || date.isBefore(LocalDate.now());
    }
}
