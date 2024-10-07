package baro.baro.global.dto;

import baro.baro.domain.contract.dto.ContractApplicationDto;
import baro.baro.domain.contract.entity.ContractCondition;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@Builder
@AllArgsConstructor
public class PdfCreateDto {
    private Long chatRoomId;
    private String ownerName;
    private String ownerTel;
    private String ownerEmail;
    private String rentalName;
    private String rentalTel;
    private String rentalEmail;
    private String productName;
    private String productSerialNumber;
    private Long totalRentalPrice;
    private LocalDate rentalStartDate;
    private LocalDate rentalEndDate;
    private Integer overdueCriteria;
    private Integer overdueFee;
    private Integer theftCriteria;
    private Integer refundDeadline;

    public static PdfCreateDto toDto(Long chatRoomId, Member owner, Member rental, Product product, ContractApplicationDto contractApplicationDto, ContractCondition contractCondition) {
        return PdfCreateDto.builder()
                .chatRoomId(chatRoomId)
                .ownerName(owner.getName())
                .ownerTel(owner.getPhoneNumber())
                .ownerEmail(owner.getEmail())
                .rentalName(rental.getName())
                .rentalTel(rental.getPhoneNumber())
                .rentalEmail(rental.getEmail())
                .productName(contractCondition.getProductName())
                .productSerialNumber(contractCondition.getSerialNumber())
                .totalRentalPrice(
                        ChronoUnit.DAYS.between(contractApplicationDto.getDesiredStartDate(), contractApplicationDto.getDesiredEndDate())
                                * product.getRentalFee()
                )
                .rentalStartDate(contractApplicationDto.getDesiredStartDate())
                .rentalEndDate(contractApplicationDto.getDesiredEndDate())
                .overdueCriteria(contractCondition.getOverdueCriteria())
                .overdueFee(contractCondition.getOverdueFee())
                .theftCriteria(contractCondition.getTheftCriteria())
                .refundDeadline(contractCondition.getRefundDeadline())
                .build();
    }
}

