package baro.baro.domain.product.entity;

import baro.baro.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;

    private String content;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer rentalFee;

    private Integer wishCount;

    private Category category;

    private String place;

    private Double latitude;

    private Double longitude;

    private ReturnType returnType;

    private String returnAddress;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;
}
