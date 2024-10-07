package baro.baro.domain.contract.entity;

import baro.baro.domain.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContractCondition {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "contract_condition_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private String productName;

    private String serialNumber;

    private String repairVendor;

    private Integer overdueCriteria;

    private Integer overdueFee;

    private Integer theftCriteria;

    private Integer refundDeadline;

    public void updateProductName(String productName) {
        this.productName = productName;
    }

    public void updateSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public void updateRepairVendor(String repairVendor) {
        this.repairVendor = repairVendor;
    }

    public void updateOverdueCriteria(Integer overdueCriteria) {
        this.overdueCriteria = overdueCriteria;
    }

    public void updateOverdueFee(Integer overdueFee) {
        this.overdueFee = overdueFee;
    }

    public void updateTheftCriteria(Integer theftCriteria) {
        this.theftCriteria = theftCriteria;
    }

    public void updateRefundDeadline(Integer refundDeadline) {
        this.refundDeadline = refundDeadline;
    }
}
