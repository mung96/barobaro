package baro.baro.domain.contract.controller;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.ContractApproveReq;
import baro.baro.domain.contract.dto.request.ContractOptionDetailReq;
import baro.baro.domain.contract.dto.request.ContractRequestDetailReq;
import baro.baro.domain.contract.dto.response.ContractApproveRes;
import baro.baro.domain.contract.dto.response.ContractOptionDetailRes;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static baro.baro.domain.product.entity.ReturnType.DELIVERY;
import static baro.baro.domain.product.entity.ReturnType.DIRECT;
import static baro.baro.global.statuscode.SuccessCode.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contracts")
public class ContractController {

    @PostMapping("/request")
    public ResponseEntity<?> contractRequestAdd(@RequestBody ContractRequestDto contractRequestDto) {

        ContractRequestDto result = new ContractRequestDto(
                10000L,
                LocalDate.of(2024, 9, 25),
                LocalDate.of(2024, 10, 1),
                ReturnType.DELIVERY
        );

        return new ResponseEntity<>(ResponseDto.success(CONTRACT_REQUEST_CREATED, result), CREATED);
    }

    @GetMapping("/request")
    public ResponseEntity<?> contractRequestDetail(@RequestBody ContractRequestDetailReq contractRequestDetailReq) {

        ContractRequestDto result = new ContractRequestDto(
                contractRequestDetailReq.getChatRoomId(),
                LocalDate.of(2024, 9, 25),
                LocalDate.of(2024, 10, 1),
                ReturnType.DELIVERY
        );

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

}
