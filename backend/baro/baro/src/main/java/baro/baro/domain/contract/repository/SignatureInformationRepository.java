package baro.baro.domain.contract.repository;

import baro.baro.domain.contract.entity.SignatureInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SignatureInformationRepository extends JpaRepository<SignatureInformation, Long> {
    @Query("SELECT s FROM SignatureInformation s WHERE s.contract.id = :contractId")
    List<SignatureInformation> findByContractId(@Param("contractId") Long contractId);

    @Modifying
    @Transactional
    @Query("DELETE FROM SignatureInformation s " +
            "WHERE s.contract.id = :contractId")
    void deleteByContractId(@Param("contractId") Long contractId);
}
