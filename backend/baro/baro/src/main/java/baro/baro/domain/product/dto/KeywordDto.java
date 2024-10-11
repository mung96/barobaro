package baro.baro.domain.product.dto;

import baro.baro.global.elastic_search.domain.EsKeyword;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KeywordDto {
    private String name;

    public static KeywordDto toDto(EsKeyword esKeyword) {
        return KeywordDto.builder()
                .name(esKeyword.getKeyword())
                .build();
    }
}
