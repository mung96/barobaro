package baro.baro.domain.product_image.repository;

import baro.baro.domain.product_image.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}
