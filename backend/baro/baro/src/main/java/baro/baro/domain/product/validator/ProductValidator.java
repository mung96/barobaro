package baro.baro.domain.product.validator;

import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.request.ProductModifyReq;

import static baro.baro.global.validator.GlobalValidator.*;

public class ProductValidator {
    public static void validateProductAddRequest(final ProductAddReq productAddReq) {
        validateDateRangeOption(productAddReq.getStartDate(), productAddReq.getEndDate());
        validateReturnTypes(productAddReq.getReturnTypeList(), productAddReq.getReturnAddress());
        validateCategory(productAddReq.getCategory());
    }

    public static void validateProductModifyRequest(final ProductModifyReq productModifyReq) {
        validateDateRangeOption(productModifyReq.getStartDate(), productModifyReq.getEndDate());
        validateReturnTypes(productModifyReq.getReturnTypeList(), productModifyReq.getReturnAddress());
        validateCategory(productModifyReq.getCategory());
    }
}
