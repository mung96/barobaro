package baro.baro.domain.member_location.repository;

import baro.baro.domain.member_location.entity.MemberLocation;
import baro.baro.domain.member_location.entity.MemberLocationPK;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface MemberLocationRepository extends JpaRepository<MemberLocation, MemberLocationPK> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO member_location (member_id, location_id, is_main) " +
            "VALUES (:memberId, :locationId, :isMain)", nativeQuery = true)
    void insertMemberLocations(@Param("memberId") Long memberId,
                               @Param("locationId") Long locationId,
                               @Param("isMain") boolean isMain);
}
