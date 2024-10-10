package baro.baro.domain.chat.service;

import baro.baro.domain.chat.document.Chat;
import baro.baro.domain.chat.dto.ChatDto;
import baro.baro.domain.chat.dto.ChatRoomDto;
import baro.baro.domain.chat.dto.request.ChatProcessReq;
import baro.baro.domain.chat.dto.response.ChatImageUploadRes;
import baro.baro.domain.chat.dto.response.ChatProcessRes;
import baro.baro.domain.chat.dto.response.ChatRoomAndChatsDetailsRes;
import baro.baro.domain.chat.repository.ChatRepository;
import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.repository.ChatRoomRepository;
import baro.baro.domain.contract.entity.Contract;
import baro.baro.domain.contract.repository.ContractRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.global.exception.CustomException;
import baro.baro.global.s3.Images3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static baro.baro.global.statuscode.ErrorCode.CHATROOM_NOT_ENROLLED;
import static baro.baro.global.statuscode.ErrorCode.CHATROOM_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final ContractRepository contractRepository;
    private final Images3Service images3Service;

    @Override
    public ChatRoomAndChatsDetailsRes findChatRoomAndChats(Long chatRoomId, Long memberId) {
        // 채팅방 상세 정보를 볼 수 없는 경우
        // 1. 채팅방이 없는 경우
        // 2. 해당 채팅방에 참여한 유저가 아닌 경우

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

        Member member = null;
        if(chatRoom.getOwner().getId().equals(memberId)) {
            member = chatRoom.getRental();
        } else if(chatRoom.getRental().getId().equals(memberId)) {
            member = chatRoom.getOwner();
        } else {
            throw new CustomException(CHATROOM_NOT_ENROLLED);
        }

        List<ChatDto> chatDtos = chatRepository.findByChatRoomIdOrderByChatTime(chatRoomId)
                .stream()
                .map(chat -> ChatDto.toDto(chat, memberRepository.findByUuid(chat.getUuid())))
                .collect(Collectors.toList());

        Contract contract = contractRepository.findContractByProductId(chatRoom.getProduct().getId());
        String pdfSrc = null; // 전자 계약서가 없는 계약의 경우
        if(contract != null) { // 전자 계약서가 있는 게약의 경우 
            pdfSrc = contract.getContractUrl();
        }

        return new ChatRoomAndChatsDetailsRes(ChatRoomDto.toDto(chatRoom, member, pdfSrc), chatDtos);
    }

    @Override
    public ChatProcessRes processChat(Long chatRoomId, ChatProcessReq chatProcessReq, Long memberId) {
        String uuid = memberRepository.findById(memberId).get().getUuid();

        Chat chat = chatProcessReq.toEntity(chatRoomId, uuid, LocalDateTime.now());
        chatRepository.save(chat);

        return ChatProcessRes.toDto(chat);
    }

    @Override
    public ChatImageUploadRes uploadChatImage(MultipartFile file) throws IOException {
        if(file != null && !file.isEmpty()) {
            String image = images3Service.upload(file, "chat_image");
            return new ChatImageUploadRes(image);
        } else {
            return new ChatImageUploadRes("");
        }
    }
}
