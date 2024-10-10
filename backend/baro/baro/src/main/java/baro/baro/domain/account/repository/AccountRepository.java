package baro.baro.domain.account.repository;

import baro.baro.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findAllByMemberId(Long memberId);
}
