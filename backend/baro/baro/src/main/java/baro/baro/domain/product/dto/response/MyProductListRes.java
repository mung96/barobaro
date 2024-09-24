package baro.baro.domain.product.dto.response;

import baro.baro.domain.product.dto.MyProductDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MyProductListRes {
    private List<MyProductDto> products;
}
