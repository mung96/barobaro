package baro.baro.domain.product.dto.response;

import baro.baro.domain.product.dto.SearchProductDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SearchProductRes {
    private List<SearchProductDto> products;
}
