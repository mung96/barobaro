package baro.baro.domain.product_image.dto.request;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product_image.entity.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProductImageReq {
    private String imageUrl;

    private Boolean isMain;

    public ProductImage toEntity(Product product, Member member) {
        return ProductImage.builder()
                .product(product)
                .member(member)
                .src(imageUrl)
                .isMain(isMain)
                .build();
    }
}
