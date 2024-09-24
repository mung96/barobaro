package baro.baro.domain.contract.entity;

import baro.baro.domain.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private String productName;

    private String serialNumber;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer rentalFee;

    private String repairVendor;

    private Integer overdueCriteria;

    private Integer overdueFee;

    private Integer theftCriteria;

    private Integer refundDeadline;

    private String contractKeyName;
}
