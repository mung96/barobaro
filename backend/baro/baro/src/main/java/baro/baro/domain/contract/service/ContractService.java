package baro.baro.domain.contract.service;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.ContractOptionDetailReq;
import baro.baro.domain.contract.dto.request.ContractRequestDetailReq;
import baro.baro.domain.contract.dto.response.ContractOptionDetailRes;

public interface ContractService {

    void addContractRequest(ContractRequestDto contractRequestDto,Long rentalId);

    ContractRequestDto findContractRequestDetail(ContractRequestDetailReq contractRequestDetailReq, Long ownerId);

    ContractOptionDetailRes findContractOptionDetail(ContractOptionDetailReq contractOptionDetailReq, Long memberId);
}
