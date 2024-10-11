package baro.baro.domain.member.repository;

import baro.baro.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);

    Member findByEmailAndProviderType(String email, String provider);

    Member findByUuid(String uuid);
}