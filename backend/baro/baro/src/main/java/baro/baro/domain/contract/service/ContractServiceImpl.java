package baro.baro.domain.contract.service;

import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.repository.ChatRoomRepository;
import baro.baro.domain.contract.dto.ContractApplicationDto;
import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.ContractRequestDetailReq;
import baro.baro.domain.contract.entity.Contract;
import baro.baro.domain.contract.repository.ContractRepository;
import baro.baro.domain.product.entity.Product;
import baro.baro.global.event.UnlockEvent;
import baro.baro.global.exception.CustomException;
import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

import static baro.baro.domain.chat_room.entity.RentalStatus.APPLICATION;
import static baro.baro.domain.contract.validator.ContractValidator.validateContractRequestDto;
import static baro.baro.domain.product.entity.ProductStatus.AVAILABLE;
import static baro.baro.global.statuscode.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final RedisUtils redisUtils;
    private final ApplicationEventPublisher eventPublisher;
    private final ChatRoomRepository chatRoomRepository;
    private final ContractRepository contractRepository;

    @Transactional
    public void addContractRequest(ContractRequestDto contractRequestDto, Long rentalId) {

        //유효하지 않은 날짜, 유효하지 않은 ReturnType 검증
        validateContractRequestDto(contractRequestDto);

        //존재하지 않는 채팅방
        ChatRoom chatRoom = chatRoomRepository.findById(contractRequestDto.getChatRoomId())
                .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

        //채팅방의 참여자가 아님
        if (!Objects.equals(chatRoom.getRental().getId(), rentalId)) {
            throw new CustomException(CHATROOM_NOT_ENROLLED);
        }

        Product product = chatRoom.getProduct();

        //상품이 존재하지 않음
        if (product == null) {
            throw new CustomException(PRODUCT_NOT_FOUND);
        }

        //분산락 획득
        if (!redisUtils.lock("contract_" + product.getId(), 3000L)) {
            throw new CustomException(CONTRACT_IN_PROGRESS_BY_OTHERS);
        }

        //다른 사람 간에 진행중인 계약이 존재
        Contract contract = product.getContract();

        if (contract != null || !product.getProductStatus().equals(AVAILABLE)) {
            throw new CustomException(CONTRACT_IN_PROGRESS_BY_OTHERS);
        }

        //해당 채팅방 거래 상태 업데이트
        chatRoom.updateRentalStatus(APPLICATION);

        //레디스에 거래 정보 집어넣기
        ContractApplicationDto contractApplicationDto = ContractApplicationDto.builder()
                .chatRoomId(chatRoom.getId())
                .rentalId(rentalId)
                .ownerId(product.getMember().getId())
                .productId(product.getId())
                .desiredStartDate(contractRequestDto.getDesiredStartDate())
                .desiredEndDate(contractRequestDto.getDesiredEndDate())
                .returnType(contractRequestDto.getReturnType())
                .build();
        redisUtils.addListData("contract_" + product.getId(), contractApplicationDto); //거래정보);

        //분산락 풀기. Transaction 내부에 unlock이 있을 경우, 동시성 이슈 발생 가능.
        //after_completion을 통해 트랜젝션이 종료된 후, 락 해제를 보장
        eventPublisher.publishEvent(new UnlockEvent(this, "contract_" + product.getId()));
    }

    @Transactional(readOnly = true)
    public ContractRequestDto findContractRequestDetail(ContractRequestDetailReq contractRequestDetailReq, Long ownerId) {

        //존재하지 않는 채팅방
        ChatRoom chatRoom = chatRoomRepository.findById(contractRequestDetailReq.getChatRoomId())
                .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

        //채팅방의 참여자가 아님
        if (!Objects.equals(chatRoom.getOwner().getId(), ownerId)) {
            throw new CustomException(CHATROOM_NOT_ENROLLED);
        }

        Product product = chatRoom.getProduct();

        //상품이 존재하지 않음
        if (product == null) {
            throw new CustomException(PRODUCT_NOT_FOUND);
        }

        List<Object> contractRequestList = redisUtils.getListData("contract_" + product.getId());

        //redis에서 ContractRequest 못찾을 때
        ContractApplicationDto contractApplicationDto = contractRequestList.stream()
                .map(item->(ContractApplicationDto)item)
                .filter(contractRequest->contractRequest.getChatRoomId().equals(contractRequestDetailReq.getChatRoomId()))
                .findFirst()
                .orElseThrow(() -> new CustomException(CONTRACT_REQUEST_NOT_FOUND));

        return ContractRequestDto.from(contractApplicationDto);
    }


}
