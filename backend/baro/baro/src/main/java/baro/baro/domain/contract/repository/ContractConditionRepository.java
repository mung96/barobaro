package baro.baro.domain.contract.repository;

import baro.baro.domain.contract.entity.ContractCondition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractConditionRepository extends JpaRepository<ContractCondition, Long> {
}
