package baro.baro.domain.product.dto.response;

import baro.baro.domain.product.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProductListRes {
    private List<ProductDto> products;
}
