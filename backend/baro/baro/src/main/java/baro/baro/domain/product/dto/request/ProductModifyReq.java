package baro.baro.domain.product.dto.request;

import baro.baro.domain.contract.dto.request.ContractConditionReq;
import baro.baro.domain.product.entity.Category;
import baro.baro.domain.product.entity.ReturnType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class ProductModifyReq {
    private String title;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer rentalFee;

    private String place;

    private Double latitude;

    private Double longitude;

    private List<ReturnType> returnTypeList;

    private String returnAddress;

    private String content;

    private Category category;

    private ContractConditionReq contractConditionReq;
}
