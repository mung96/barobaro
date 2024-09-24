package baro.baro.domain.product.dto;

import baro.baro.domain.product.entity.ProductStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ProductDto {
    private Long productId;

    private String productMainImage;

    private String title;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer rentalFee;

    private ProductStatus productStatus;
}
