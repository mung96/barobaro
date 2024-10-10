package baro.baro.domain.contract.entity;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private LocalDateTime createdAt;

    private String initialDocumentSerialNum;

    private String contractUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rental_id")
    private Member rental;

    public void updateContractUrl(String contractUrl) {
        this.contractUrl = contractUrl;
    }
}
