package baro.baro.domain.product.dto.request;

import baro.baro.domain.contract.dto.request.ContractConditionReq;
import baro.baro.domain.location.entity.Location;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.product.entity.Category;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product.entity.ReturnType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static baro.baro.domain.product.entity.ProductStatus.AVAILABLE;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductAddReq {
    @NotNull
    private String title;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @NotNull
    private Integer rentalFee;

    @NotNull
    private String place;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    @NotNull
    private List<String> returnTypeList;

    private String returnAddress;

    @NotNull
    private String content;

    @NotNull
    private String category;

    private ContractConditionReq contractConditionReq;

    public Product toEntity(Member member, Location location) {
        Category categoryEnum = Category.valueOf(category.toUpperCase());
        List<ReturnType> returnTypeEnums = returnTypeList.stream()
                .map(returnType -> ReturnType.valueOf(returnType.toUpperCase()))
                .toList();

        return Product.builder()
                .member(member)
                .title(title)
                .content(content)
                .startDate(startDate)
                .endDate(endDate)
                .rentalFee(rentalFee)
                .wishCount(0)
                .category(categoryEnum)
                .productStatus(AVAILABLE)
                .place(place)
                .latitude(latitude)
                .longitude(longitude)
                .returnTypes(returnTypeEnums)
                .returnAddress(returnAddress)
                .createdAt(LocalDateTime.now())
                .lastModifiedAt(LocalDateTime.now())
                .locationId(location.getId())
                .dong(location.getDong())
                .isDeleted(false)
                .build();
    }
}
