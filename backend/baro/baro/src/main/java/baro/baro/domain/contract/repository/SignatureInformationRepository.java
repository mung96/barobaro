package baro.baro.domain.contract.repository;

import baro.baro.domain.contract.entity.SignatureInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SignatureInformationRepository extends JpaRepository<SignatureInformation, Long> {
}
