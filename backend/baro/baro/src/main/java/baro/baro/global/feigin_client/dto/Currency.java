package baro.baro.global.feigin_client.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
class Currency {
    private String currency;

    private String currencyName;
}
