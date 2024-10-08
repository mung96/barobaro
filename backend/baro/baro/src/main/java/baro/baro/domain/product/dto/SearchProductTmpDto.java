package baro.baro.domain.product.dto;

import baro.baro.domain.location.entity.Location;
import baro.baro.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class SearchProductTmpDto {
    private Long productId;

    private String productMainImage;

    private String title;

    private LocalDate startDate;

    private LocalDate endDate;

    private String dong;

    private LocalDateTime uploadDate;

    private Integer rentalFee;

    private Integer wishCount;

    public static SearchProductTmpDto toDto(Product product, String mainImageUrl, Location location) {
        return SearchProductTmpDto.builder()
                .productId(product.getId())
                .productMainImage(mainImageUrl)
                .title(product.getTitle())
                .startDate(product.getStartDate())
                .endDate(product.getEndDate())
                .dong(location.getDong())
                .uploadDate(product.getCreatedAt())
                .rentalFee(product.getRentalFee())
                .wishCount(product.getWishCount())
                .build();
    }
}
