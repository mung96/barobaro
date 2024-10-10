package baro.baro.domain.noti.repository;

import baro.baro.domain.noti.dto.response.NotiDto;
import baro.baro.domain.noti.entity.Noti;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotiRepository extends JpaRepository<Noti, Long> {
    @Query("SELECT new baro.baro.domain.noti.dto.response.NotiDto(n.message, n.fromMember.uuid," +
            "n.fromMember.profileImage, n.fromMember.nickname, n.notiType) " +
            "FROM Noti n " +
            "WHERE n.toMember.id = :memberId " +
            "ORDER BY n.id DESC")
    List<NotiDto> findNotisByMemberId(@Param("memberId") Long memberId, Pageable pageable);

}