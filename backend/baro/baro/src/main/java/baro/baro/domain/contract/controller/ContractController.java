package baro.baro.domain.contract.controller;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.*;
import baro.baro.domain.contract.dto.response.*;
import baro.baro.domain.contract.service.ContractService;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static baro.baro.domain.product.entity.ReturnType.DELIVERY;
import static baro.baro.domain.product.entity.ReturnType.DIRECT;
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
        contractService.addContractRequest(contractRequestDto,memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_CREATED, null), CREATED);
    }

    @GetMapping("/request")
    public ResponseEntity<?> contractRequestDetail(@RequestBody ContractRequestDetailReq contractRequestDetailReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ContractRequestDto result = contractService.findContractRequestDetail(contractRequestDetailReq,memberId);

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_OK, result), OK);
    }

    @GetMapping("")
    public ResponseEntity<?> contractOptionDetail(@RequestBody ContractOptionDetailReq contractOptionDetailReq) {

        List<ReturnType> returnTypes = new ArrayList<>();
        returnTypes.add(DELIVERY);
        returnTypes.add(DIRECT);

        ContractOptionDetailRes result = ContractOptionDetailRes.builder()
                .isUsingContract(Boolean.TRUE)
                .returnTypes(returnTypes)
                .repairVendor("제조사 또는 공식 수입사의 AS 센터")
                .overdueCriteria(5)
                .overdueFee(2)
                .refundDeadline(7)
                .build();
        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_OK, result), OK);
    }

    @PostMapping("/approve")
    public ResponseEntity<?> approveContractRequest(@RequestBody ContractApproveReq contractApproveReq, @RequestParam(name = "type", defaultValue = "default") String type) {

        ContractApproveRes result = switch (type) {
            case "default" ->
                //거래 status 변경 및 물품 status 변경
                    ContractApproveRes.builder()
                            .chatRoomId(contractApproveReq.getChatRoomId())
                            .build();

            case "contract" ->
                //거래 status 변경 및 물품 status 변경
                //계약서 Step1 진행 및 s3 업로드 후 url 반환
                    ContractApproveRes.builder()
                            .chatRoomId(contractApproveReq.getChatRoomId())
                            .fileUrl("http://test.url/test.pdf")
                            .build();
            default -> null;
        };
        return new ResponseEntity<>(ResponseDto.success(CONTRACT_APPROVED_OK, result), OK);
    }

    @PostMapping("/sign/owner")
    public ResponseEntity<?> addOwnerSignature(@RequestBody SignatureAddReq signatureAddReq) {

        ContractSignedRes result = ContractSignedRes.builder()
                .chatRoomId(signatureAddReq.getChatRoomId())
                .fileUrl("http://test.url/test_A_signed.pdf")
                .signedAt(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(ResponseDto.success(CONTRACT_SIGNED_OK, result), OK);
    }

    @PostMapping("/sign/rental")
    public ResponseEntity<?> addRentalSignature(@RequestBody SignatureAddReq signatureAddReq) {
        ContractSignedRes result = ContractSignedRes.builder()
                .chatRoomId(signatureAddReq.getChatRoomId())
                .fileUrl("http://test.url/test_B_signed.pdf")
                .signedAt(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(ResponseDto.success(CONTRACT_SIGNED_OK, result), OK);
    }

    @PostMapping("/terminate")
    public ResponseEntity<?> confirmProductTakeBack(@RequestBody ProductTakeBackReq productTakeBackReq) {
        ContractTerminatedRes result = ContractTerminatedRes.builder()
                .chatRoomId(productTakeBackReq.getChatRoomId())
                .build();
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
}
