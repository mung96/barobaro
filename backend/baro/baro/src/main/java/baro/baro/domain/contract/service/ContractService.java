package baro.baro.domain.contract.service;

import baro.baro.domain.contract.dto.ContractRequestDto;

public interface ContractService {

    void addContractRequest(ContractRequestDto contractRequestDto,Long rentalId);

}
