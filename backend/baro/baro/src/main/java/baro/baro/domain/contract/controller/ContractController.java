package baro.baro.domain.contract.controller;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.ContractApproveReq;
import baro.baro.domain.contract.dto.request.ProductTakeBackReq;
import baro.baro.domain.contract.dto.request.SignatureAddReq;
import baro.baro.domain.contract.dto.response.*;
import baro.baro.domain.contract.service.ContractService;
import baro.baro.global.dto.PdfCreateDto;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import baro.baro.global.utils.PdfUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.UUID;

import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/contracts")
public class ContractController {

    private final JwtService jwtService;
    private final ContractService contractService;
    private final PdfUtils pdfUtils;
    @PostMapping("/request")
    public ResponseEntity<?> contractRequestAdd(@RequestBody final ContractRequestDto contractRequestDto) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        contractService.addContractRequest(contractRequestDto, memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_CREATED, null), CREATED);
    }

    @GetMapping("/request")
    public ResponseEntity<?> contractRequestDetail(@RequestParam("chatRoomId") Long chatRoomId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractRequestDto result = contractService.findContractRequestDetail(chatRoomId, memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_OK, result), OK);
    }

    @GetMapping("")
    public ResponseEntity<?> contractOptionDetail(@RequestParam("chatRoomId") Long chatRoomId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractOptionDetailRes result = contractService.findContractOptionDetail(chatRoomId, memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_OK, result), OK);
    }

    @PostMapping("/approve")
    public ResponseEntity<?> approveContractRequest(@RequestBody ContractApproveReq contractApproveReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractApproveRes result = contractService.approveRequestWithContract(contractApproveReq, memberId);
        return new ResponseEntity<>(ResponseDto.success(CONTRACT_APPROVED_OK, result), OK);
    }

    @PostMapping("/sign/owner")
    public ResponseEntity<?> addOwnerSignature(@RequestBody SignatureAddReq signatureAddReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractSignedRes result = contractService.addOwnerSignature(signatureAddReq, memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_SIGNED_OK, result), OK);
    }

    @PostMapping("/sign/rental")
    public ResponseEntity<?> addRentalSignature(@RequestBody SignatureAddReq signatureAddReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractSignedRes result = contractService.addRentalSignature(signatureAddReq, memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_SIGNED_OK, result), OK);
    }

    @PostMapping("/terminate")
    public ResponseEntity<?> confirmProductTakeBack(@RequestBody ProductTakeBackReq productTakeBackReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractTerminatedRes result = contractService.confirmProductTakeBack(productTakeBackReq,memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_TERMINATED_OK, result), OK);

    }

    @PostMapping("/{chatRoomId}/video")
    public ResponseEntity<?> uploadVideo(@PathVariable("chatRoomId") Long chatRoomId, @RequestPart("file") MultipartFile file) {
        ContractVideoUploadRes result = ContractVideoUploadRes.builder()
                .videoUrl("https://test.url.com/saved.mp4")
                .build();
        return new ResponseEntity<>(ResponseDto.success(PRODUCT_VIDEO_UPLOADED_OK, result), OK);
    }

    @GetMapping("/{chatRoomId}/video")
    public ResponseEntity<?> videoDetails(@PathVariable("chatRoomId") Long chatRoomId) {
        ContractVideoDetailsRes result = ContractVideoDetailsRes.builder()
                .videoUrl("https://test.url.com/saved.mp4")
                .build();
        return new ResponseEntity<>(ResponseDto.success(PRODUCT_VIDEO_DETAILS_OK, result), OK);
    }

    @PostMapping("/test/generate-pdf")
    public ResponseEntity<?> generatePdf() {
        PdfCreateDto tmp = PdfCreateDto.builder()
                .chatRoomId(1L)
                .ownerName("주인")
                .ownerTel("010-1234-1234")
                .ownerEmail("owner@naver.com")
                .rentalName("대여자")
                .rentalTel("010-9876-9876")
                .rentalEmail("rental@naver.com")
                .productName("테스트물품")
                .productSerialNumber("serialNo")
                .documentSerialNumber(UUID.randomUUID().toString())
                .totalRentalPrice(10000L)
                .rentalStartDate(LocalDate.now())
                .rentalEndDate(LocalDate.now().plusDays(2))
                .overdueCriteria(5)
                .overdueFee(3)
                .theftCriteria(5)
                .refundDeadline(4)
                .build();
        String url = contractService.generatePdf(tmp);
        return new ResponseEntity<>(ResponseDto.success(PDF_GENERATE_OK, url), OK);
    }
    @GetMapping("/verify")
    public ResponseEntity<?> verifySignature(@RequestPart("file") MultipartFile file) throws Exception {
        pdfUtils.verifySignatures(file);
        return new ResponseEntity<>(ResponseDto.success(PDF_GENERATE_OK, null), OK);
    }

    @GetMapping("/{chatRoomId}")
    public ResponseEntity<?> getPresentPdf(@PathVariable Long chatRoomId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        PresentPdfRes result = contractService.findPresentPdf(chatRoomId, memberId);

        return new ResponseEntity<>(ResponseDto.success(PRESENT_PDF_OK, result), OK);
    }
}
