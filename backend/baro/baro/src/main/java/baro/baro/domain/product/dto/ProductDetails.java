package baro.baro.domain.product.dto;

import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.product.entity.Category;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product.entity.ProductStatus;
import baro.baro.domain.product.entity.ReturnType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

import static baro.baro.global.formatter.DateFormatter.calculateTime;

@Data
@Builder
@AllArgsConstructor
public class ProductDetails {
    private Long productId;

    private String writerId;

    private String writerProfileImage;

    private String writerNickname;

    private List<String> imageList;

    private ProductStatus productStatus;

    private String title;

    private Category category;

    private String dong;

    private String createdAt;

    private Integer wishCount;

    private String content;

    private String place;

    private Double latitude;

    private Double longitude;

    private Boolean isWriteContract;

    private ContractConditionDto contractCondition;

    private List<ReturnType> returnTypes;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer rentalFee;

    private Boolean isMine;

    private Boolean isWished;

    public static ProductDetails toDto(Product product, Member member, List<String> imageList,
                                       ContractConditionDto contractCondition, Boolean isMine, Boolean isWished) {
        return ProductDetails.builder()
                .productId(product.getId())
                .writerId(member.getUuid())
                .writerProfileImage(member.getProfileImage())
                .writerNickname(member.getNickname())
                .imageList(imageList)
                .productStatus(product.getProductStatus())
                .title(product.getTitle())
                .category(product.getCategory())
                .dong(product.getDong())
                .createdAt(calculateTime(product.getCreatedAt()))
                .wishCount(product.getWishCount())
                .content(product.getContent())
                .place(product.getPlace())
                .latitude(product.getLatitude())
                .longitude(product.getLongitude())
                .isWriteContract(contractCondition != null)
                .contractCondition(contractCondition)
                .returnTypes(product.getReturnTypes())
                .startDate(product.getStartDate())
                .endDate(product.getEndDate())
                .rentalFee(product.getRentalFee())
                .isMine(isMine)
                .isWished(isWished)
                .build();
    }
}
