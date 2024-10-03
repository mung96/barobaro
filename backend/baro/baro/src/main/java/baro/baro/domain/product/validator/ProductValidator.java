package baro.baro.domain.product.validator;

import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.global.exception.CustomException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static baro.baro.global.validator.GlobalValidator.*;

public class ProductValidator {
    public static void validateProductAddRequest(final ProductAddReq productAddReq) {
        validateDateRangeOption(productAddReq.getStartDate(), productAddReq.getEndDate());
        validateReturnTypes(productAddReq.getReturnTypeList(), productAddReq.getReturnAddress());
        validateCategory(productAddReq.getCategory());
    }


}
