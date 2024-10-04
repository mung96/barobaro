package baro.baro.domain.product_image.repository;

import baro.baro.domain.product_image.entity.ProductImage;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    @Query("SELECT pi.src " +
            "FROM ProductImage pi " +
            "WHERE pi.product.id = :productId " +
            "ORDER BY pi.id")
    List<String> findSrcByProductId(@Param("productId") Long productId);
}
