package baro.baro.domain.product.dto.response;

import baro.baro.domain.product.dto.KeywordDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class KeywordListRes {
    private List<KeywordDto> keywords;

}
