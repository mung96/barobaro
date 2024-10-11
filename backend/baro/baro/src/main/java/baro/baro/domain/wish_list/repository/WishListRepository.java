package baro.baro.domain.wish_list.repository;

import baro.baro.domain.wish_list.entity.WishList;
import baro.baro.domain.wish_list.entity.WishListPK;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface WishListRepository extends JpaRepository<WishList, WishListPK> {
    @Query("SELECT COUNT(w) > 0 " +
            "FROM WishList w " +
            "WHERE w.member.id = :memberId " +
            "AND w.product.id = :productId")
    boolean existsByMemberIdAndProductId(@Param("memberId") Long memberId, @Param("productId") Long productId);

    @Query("SELECT COUNT(w) " +
            "FROM WishList w " +
            "WHERE w.product.id = :productId ")
    Integer countWishList(@Param("productId") Long productId);

    @Modifying
    @Transactional
    @Query("DELETE FROM WishList w " +
            "WHERE w.member.id = :memberId AND w.product.id = :productId")
    void deleteByMemberIdAndProductId(@Param("memberId") Long memberId, @Param("productId") Long productId);

    @Modifying
    @Transactional
    @Query("DELETE FROM WishList w " +
            "WHERE w.product.id = :productId")
    void deleteWishListByProductId(@Param("productId") Long productId);
}
