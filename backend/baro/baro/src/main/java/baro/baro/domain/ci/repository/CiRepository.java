package baro.baro.domain.ci.repository;

import baro.baro.domain.ci.entity.Ci;
import baro.baro.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CiRepository extends JpaRepository<Ci, Long> {
    Optional<Ci> findCiByMember(Member member);
}
