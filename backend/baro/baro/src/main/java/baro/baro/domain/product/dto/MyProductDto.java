package baro.baro.domain.product.dto;

import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyProductDto {
    private Long productId;

    private String productMainImage;

    private String title;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer rentalFee;

    private ProductStatus productStatus;

    public static MyProductDto toDto(Product product, String productMainImage) {
        return MyProductDto.builder()
                .productId(product.getId())
                .productMainImage(productMainImage)
                .title(product.getTitle())
                .startDate(product.getStartDate())
                .endDate(product.getEndDate())
                .rentalFee(product.getRentalFee())
                .productStatus(product.getProductStatus())
                .build();
    }
}
