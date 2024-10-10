package baro.baro.domain.contract.controller;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.*;
import baro.baro.domain.contract.dto.response.*;
import baro.baro.domain.contract.service.ContractService;
import baro.baro.global.dto.PdfCreateDto;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.exception.CustomException;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

import static baro.baro.global.statuscode.ErrorCode.INVALID_APPROVE_TYPE;
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

    @PostMapping("/request")
    public ResponseEntity<?> contractRequestAdd(@RequestBody final ContractRequestDto contractRequestDto) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        contractService.addContractRequest(contractRequestDto, memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_CREATED, null), CREATED);
    }

    @GetMapping("/request")
    public ResponseEntity<?> contractRequestDetail(@ModelAttribute ContractRequestDetailReq contractRequestDetailReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractRequestDto result = contractService.findContractRequestDetail(contractRequestDetailReq, memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_OK, result), OK);
    }

    @GetMapping("")
    public ResponseEntity<?> contractOptionDetail(@ModelAttribute ContractOptionDetailReq contractOptionDetailReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractOptionDetailRes result = contractService.findContractOptionDetail(contractOptionDetailReq, memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_OK, result), OK);
    }

    @PostMapping("/approve")
    public ResponseEntity<?> approveContractRequest(@RequestBody ContractApproveReq contractApproveReq, @RequestParam(name = "type", defaultValue = "default") String type) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractApproveRes result = switch (type) {
            case "default" ->
                //거래 status 변경 및 물품 status 변경
                    contractService.approveRequestWithoutContract(contractApproveReq, memberId);
            case "contract" ->
                //거래 status 변경 및 물품 status 변경
                //계약서 Step1 진행 및 s3 업로드 후 url 반환
                    contractService.approveRequestWithContract(contractApproveReq, memberId);
            default -> throw new CustomException(INVALID_APPROVE_TYPE);
        };
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

    @GetMapping("/{chatRoomId}")
    public ResponseEntity<?> getPresentPdf(@PathVariable Long chatRoomId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        PresentPdfRes result = contractService.findPresentPdf(chatRoomId, memberId);

        return new ResponseEntity<>(ResponseDto.success(PRESENT_PDF_OK, result), OK);
    }
}
