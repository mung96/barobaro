package baro.baro.domain.product.dto;

import baro.baro.domain.location.entity.Location;
import baro.baro.domain.product.entity.Product;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

import static baro.baro.global.formatter.DateFormatter.calculateTime;

@Data
@Builder
public class SearchProductDto {
    private Long productId;

    private String productMainImage;

    private String title;

    private LocalDate startDate;

    private LocalDate endDate;

    private String dong;

    private String uploadDate;

    private Integer rentalFee;

    private Integer wishCount;

    public static SearchProductDto toDto(Product product, String mainImageUrl, Location location) {
        return SearchProductDto.builder()
                .productId(product.getId())
                .productMainImage(mainImageUrl)
                .title(product.getTitle())
                .startDate(product.getStartDate())
                .endDate(product.getEndDate())
                .dong(location.getDong())
                .uploadDate(calculateTime(product.getCreatedAt()))
                .rentalFee(product.getRentalFee())
                .wishCount(product.getWishCount())
                .build();
    }
}
