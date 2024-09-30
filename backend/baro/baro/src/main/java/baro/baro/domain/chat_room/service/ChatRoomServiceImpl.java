package baro.baro.domain.chat_room.service;

import baro.baro.domain.chat_room.dto.request.ChatRoomAddReq;
import baro.baro.domain.chat_room.dto.response.ChatRoomAddRes;
import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.entity.RentalStatus;
import baro.baro.domain.chat_room.repository.ChatRoomRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.product.entity.Product;
import baro.baro.domain.product.repository.ProductRepository;
import baro.baro.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static baro.baro.domain.product.entity.ProductStatus.AVAILABLE;
import static baro.baro.global.statuscode.ErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;

    public ChatRoomAddRes addChatRoom(Long rentalId, ChatRoomAddReq chatRoomAddReq) {
        // 채팅방 생성이 불가능한 경우
        // 1. 대여 상품이 삭제된 경우
        // 2. 존재하지 않는 사용자가 올린 대여 상품일 경우
        // 3. 본인이 올린 대여 상품일 경우 -> 관련된 채팅방이 너무 많음
        // 4. 대여 상품이 거래 가능한 상태가 아닌 경우

        Product product = productRepository.findById(chatRoomAddReq.getProductId())
                .orElseThrow(() -> new CustomException(PRODUCT_NOT_FOUND));
        if(product.getIsDeleted()) {
            throw new CustomException(PRODUCT_NOT_FOUND);
        }

        Member owner = memberRepository.findById(product.getMember().getId())
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        if(owner.getIsDeleted()) {
            throw new CustomException(MEMBER_NOT_FOUND);
        }

        if(rentalId.equals(owner.getId())) {
            throw new CustomException(CHATROOM_SELF_CREATED);
        }

        Optional<ChatRoom> chatRoom = chatRoomRepository
                .findByProductIdAndOwnerIdAndRentalId(product.getId(), owner.getId(), rentalId);
        if(chatRoom.isPresent()) {
            return ChatRoomAddRes.toDto(chatRoom.get());
        }

        if(!product.getProductStatus().equals(AVAILABLE)) {
            throw new CustomException(PRODUCT_UNAVAILABLE);
        }

        Member rental = memberRepository.findById(rentalId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        return ChatRoomAddRes.toDto(chatRoomRepository.save(ChatRoom.builder()
                .product(product)
                .owner(owner)
                .rental(rental)
                .rentalStatus(RentalStatus.AVAILABLE)
                .build()));
    }
}
