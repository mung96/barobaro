package baro.baro.domain.product.dto;

import baro.baro.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class ProductDto {
    private Long productId;

    private String productMainImage;

    private Boolean isWished;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer rentalFee;

    private String title;

    public static ProductDto toDto(Product product, String mainImageUrl, Boolean isWished) {
        return ProductDto.builder()
                .productId(product.getId())
                .productMainImage(mainImageUrl)
                .isWished(isWished)
                .startDate(product.getStartDate())
                .endDate(product.getEndDate())
                .rentalFee(product.getRentalFee())
                .title(product.getTitle())
                .build();
    }
}
