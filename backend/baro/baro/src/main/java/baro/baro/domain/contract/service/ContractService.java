package baro.baro.domain.contract.service;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.ContractApproveReq;
import baro.baro.domain.contract.dto.request.ContractOptionDetailReq;
import baro.baro.domain.contract.dto.request.ContractRequestDetailReq;
import baro.baro.domain.contract.dto.request.SignatureAddReq;
import baro.baro.domain.contract.dto.response.ContractApproveRes;
import baro.baro.domain.contract.dto.response.ContractOptionDetailRes;
import baro.baro.domain.contract.dto.response.ContractSignedRes;
import baro.baro.global.dto.PdfCreateDto;

public interface ContractService {

    void addContractRequest(ContractRequestDto contractRequestDto,Long rentalId);

    ContractRequestDto findContractRequestDetail(ContractRequestDetailReq contractRequestDetailReq, Long ownerId);

    ContractOptionDetailRes findContractOptionDetail(ContractOptionDetailReq contractOptionDetailReq, Long memberId);

    ContractApproveRes approveRequestWithoutContract(ContractApproveReq contractApproveReq, Long ownerId);

    ContractApproveRes approveRequestWithContract(ContractApproveReq contractApproveReq, Long ownerId);

    String generatePdf(PdfCreateDto pdfCreateDto);

    ContractSignedRes addOwnerSignature(SignatureAddReq signatureAddReq, Long ownerId);

    ContractSignedRes addRentalSignature(SignatureAddReq signatureAddReq, Long rentalId);
}
