package baro.baro.domain.contract.service;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.ContractRequestDetailReq;

public interface ContractService {

    void addContractRequest(ContractRequestDto contractRequestDto,Long rentalId);

    ContractRequestDto findContractRequestDetail(ContractRequestDetailReq contractRequestDetailReq, Long ownerId);
}
