package baro.baro.domain.wish_list.dto.response;

import baro.baro.domain.product.dto.SearchProductDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MyWishListRes {
    List<SearchProductDto> products;
}
