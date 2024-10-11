package baro.baro.domain.product.dto.request;

import lombok.Data;

@Data
public class SearchProductsReq {
    private String keyword;

    private String category;

    private Long locationId;
}

