package baro.baro.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

import static baro.baro.global.formatter.DateFormatter.calculateTime;

@Data
@Builder
@AllArgsConstructor
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

    public static SearchProductDto toDto(SearchProductTmpDto product) {
        return SearchProductDto.builder()
                .productId(product.getProductId())
                .productMainImage(product.getProductMainImage())
                .title(product.getTitle())
                .startDate(product.getStartDate())
                .endDate(product.getEndDate())
                .dong(product.getDong())
                .uploadDate(calculateTime(product.getUploadDate()))
                .rentalFee(product.getRentalFee())
                .wishCount(product.getWishCount())
                .build();
    }
}
