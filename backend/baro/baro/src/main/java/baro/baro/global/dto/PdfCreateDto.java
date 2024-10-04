package baro.baro.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

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
}

