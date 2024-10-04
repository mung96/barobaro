package baro.baro.domain.product.repository;

import baro.baro.domain.product.dto.ProductDto;
import baro.baro.domain.product.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT new baro.baro.domain.product.dto.ProductDto(p.id, pi.src, " +
            "(CASE WHEN wl.wishListPK IS NOT NULL THEN true ELSE false END), " +
            "p.startDate, p.endDate, p.rentalFee, p.title) " +
            "FROM Product p " +
            "LEFT JOIN ProductImage pi ON pi.product.id = p.id AND pi.isMain = true " +
            "LEFT JOIN WishList wl ON wl.product.id = p.id AND wl.member.id = :memberId " +
            "WHERE p.id != :memberId " +
            "ORDER BY p.id DESC")
    List<ProductDto> findRecentlyProducts(@Param("memberId") Long memberId, Pageable pageable);
}
