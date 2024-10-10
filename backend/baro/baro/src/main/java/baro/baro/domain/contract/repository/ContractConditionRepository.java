package baro.baro.domain.contract.repository;

import baro.baro.domain.contract.entity.ContractCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ContractConditionRepository extends JpaRepository<ContractCondition, Long> {
    ContractCondition findByProductId(Long productId);

    @Modifying
    @Transactional
    @Query("DELETE FROM ContractCondition cc " +
            "WHERE cc.product.id = :productId")
    void deleteContractConditionByProductId(Long productId);
}
