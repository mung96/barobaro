package baro.baro.domain.member.repository;

import baro.baro.domain.member.entity.Pin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PinRepository extends JpaRepository<Pin, Long> {
    Optional<Pin> findByMemberId(Long memberId);
}
