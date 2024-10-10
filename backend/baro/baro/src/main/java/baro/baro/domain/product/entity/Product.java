package baro.baro.domain.product.entity;

import baro.baro.domain.contract.entity.Contract;
import baro.baro.domain.contract.entity.ContractCondition;
import baro.baro.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@SQLDelete(sql = " UPDATE Product SET is_deleted = true WHERE product_id = ? ")
@SQLRestriction("is_deleted = false")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "product")
    private Contract contract;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "product")
    private ContractCondition contractCondition;

    private String title;

    private String content;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer rentalFee;

    private Integer wishCount;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus;

    private String place;

    private Double latitude;

    private Double longitude;

    @ElementCollection
    @CollectionTable(name = "product_return_types", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "return_type")
    private List<ReturnType> returnTypes;

    private String returnAddress;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;

    private Long locationId;

    private String dong;

    private Boolean isDeleted;

    public void updateProductStatus(ProductStatus productStatus) {
        this.productStatus = productStatus;
    }

    public void updateContractCondition(ContractCondition contractCondition) {
        this.contractCondition = contractCondition;
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void updateEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void updateRentalFee(Integer rentalFee) {
        this.rentalFee = rentalFee;
    }

    public void updateCategory(Category category) {
        this.category = category;
    }

    public void UpdateReturnTypes(List<ReturnType> returnTypes) {
        this.returnTypes = returnTypes;
    }

    public void updatePlace(String place) {
        this.place = place;
    }

    public void updateLocation(Double latitude, Double longitude, Long locationId, String dong) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.locationId = locationId;
        this.dong = dong;
    }

    public void updateReturnAddress(String returnAddress) {
        this.returnAddress = returnAddress;
    }

    public void updateLastModifiedAt() {
        this.lastModifiedAt = LocalDateTime.now();
    }

    public void updateWishCount(Integer wishCount) {
        this.wishCount = wishCount;
    }
}
