package baro.baro.domain.contract.repository;

import baro.baro.domain.contract.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    @Query("SELECT c FROM Contract c " +
            "WHERE c.product.id = :productId")
    Contract findContractByProductId(@Param("productId") Long productId);
}
