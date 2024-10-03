package baro.baro.global.validator;

import baro.baro.domain.product.entity.Category;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.global.exception.CustomException;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static baro.baro.global.statuscode.ErrorCode.*;

public class GlobalValidator {
    private final static Integer IMAGE_LIMIT = 5;

    public static void validateReturnType(final ReturnType returnType) {
        if(!isValidReturnType(returnType)) {
            throw new CustomException(INVALID_RETURN_TYPE);
        }
    }

    public static void validateReturnTypes(final @NotNull List<String> returnTypes, final String address) {
        returnTypes.forEach(returnTypeStr -> {
            ReturnType returnType;
            try {
                returnType = ReturnType.valueOf(returnTypeStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new CustomException(INVALID_RETURN_TYPE);
            }

            if (!isValidReturnType(returnType)) {
                throw new CustomException(INVALID_RETURN_TYPE);
            }

            if(returnType == ReturnType.DELIVERY) {
                if (address == null || address.isEmpty()) {
                    throw new CustomException(RETURN_ADDRESS_REQUIRED);
                }
            }
        });
    }

    private static boolean isValidReturnType(final ReturnType returnType) {
        return returnType != null && Arrays.stream(ReturnType.values())
                .anyMatch(type -> type == returnType);
    }

    public static void validateDateRangeOption(final LocalDate startDate, final LocalDate endDate) {
        if (notValidDate(startDate) || notValidDate(endDate) || endDate.isBefore(startDate)) {
            throw new CustomException(INVALID_DATE_OPTION);
        }
    }

    private static boolean notValidDate(final LocalDate date) {
        return date == null || date.isBefore(LocalDate.now());
    }

    public static void validateCategory(final String categoryStr) {
        Category inputCategory;
        try {
            inputCategory = Category.valueOf(categoryStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new CustomException(CATEGORY_NOT_FOUND);
        }

        if (!isValidCategory(inputCategory)) {
            throw new CustomException(CATEGORY_NOT_FOUND);
        }
    }

    private static boolean isValidCategory(final Category inputCategory) {
        return inputCategory != null && Arrays.stream(Category.values())
                .anyMatch(category -> category == inputCategory);
    }

    public static void validateFiles(final List<MultipartFile> files) {
        if(files == null || files.isEmpty()) {
            throw new CustomException(PRODUCT_PHOTO_REQUIRED);
        }

        if(files.size() > IMAGE_LIMIT) {
            throw new CustomException(PRODUCT_PHOTO_LIMIT);
        }
    }
}
