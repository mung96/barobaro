package baro.baro.domain.wish_list.repository;

import baro.baro.domain.wish_list.entity.WishList;
import baro.baro.domain.wish_list.entity.WishListPK;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WishListRepository extends JpaRepository<WishList, WishListPK> {
    @Query("SELECT COUNT(w) > 0 " +
            "FROM WishList w " +
            "WHERE w.member.id = :memberId " +
            "AND w.product.id = :productId")
    boolean existsByMemberIdAndProductId(@Param("memberId") Long memberId, @Param("productId") Long productId);
}
