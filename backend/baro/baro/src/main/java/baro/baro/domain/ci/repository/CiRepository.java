package baro.baro.domain.ci.repository;

import baro.baro.domain.ci.entity.Ci;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CiRepository extends JpaRepository<Ci, Long> {
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END " +
            "FROM Ci c " +
            "WHERE c.member.id = :memberId")
    boolean existsCiByMember(@Param("memberId") Long memberId);
}
