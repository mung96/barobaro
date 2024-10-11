package baro.baro.domain.product.dto.request;

import lombok.Data;

@Data
public class RecentlyProductsReq {
    private Long locationId;

    private String Category;
}
