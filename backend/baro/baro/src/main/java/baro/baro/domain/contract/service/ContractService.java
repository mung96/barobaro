package baro.baro.domain.contract.service;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.ContractApproveReq;
import baro.baro.domain.contract.dto.request.ProductTakeBackReq;
import baro.baro.domain.contract.dto.request.SignatureAddReq;
import baro.baro.domain.contract.dto.response.*;
import baro.baro.global.dto.PdfCreateDto;

public interface ContractService {

    void addContractRequest(ContractRequestDto contractRequestDto,Long rentalId);

    ContractRequestDto findContractRequestDetail(Long chatRoomId, Long ownerId);

    ContractOptionDetailRes findContractOptionDetail(Long chatRoomId, Long memberId);

    ContractApproveRes approveRequestWithoutContract(ContractApproveReq contractApproveReq, Long ownerId);

    ContractApproveRes approveRequestWithContract(ContractApproveReq contractApproveReq, Long ownerId);

    String generatePdf(PdfCreateDto pdfCreateDto);

    ContractSignedRes addOwnerSignature(SignatureAddReq signatureAddReq, Long ownerId);

    ContractSignedRes addRentalSignature(SignatureAddReq signatureAddReq, Long rentalId);

    ContractTerminatedRes confirmProductTakeBack(ProductTakeBackReq productTakeBackReq, Long ownerId);

    PresentPdfRes findPresentPdf(Long chatRoomId, Long memberId);
}
