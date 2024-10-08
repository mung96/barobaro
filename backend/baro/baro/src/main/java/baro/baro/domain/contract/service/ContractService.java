package baro.baro.domain.contract.service;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.*;
import baro.baro.domain.contract.dto.response.ContractApproveRes;
import baro.baro.domain.contract.dto.response.ContractOptionDetailRes;
import baro.baro.domain.contract.dto.response.ContractSignedRes;
import baro.baro.domain.contract.dto.response.ContractTerminatedRes;
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

    ContractTerminatedRes confirmProductTakeBack(ProductTakeBackReq productTakeBackReq, Long ownerId);
}
