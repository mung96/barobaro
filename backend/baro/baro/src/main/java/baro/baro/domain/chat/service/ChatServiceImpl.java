package baro.baro.domain.chat.service;

import baro.baro.domain.chat.dto.ChatDto;
import baro.baro.domain.chat.dto.ChatRoomDto;
import baro.baro.domain.chat.dto.response.ChatRoomAndChatsDetailsRes;
import baro.baro.domain.chat.repository.ChatRepository;
import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.repository.ChatRoomRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static baro.baro.global.statuscode.ErrorCode.CHATROOM_NOT_ENROLLED;
import static baro.baro.global.statuscode.ErrorCode.CHATROOM_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    @Override
    public ChatRoomAndChatsDetailsRes findChatRoomAndChats(Long chatRoomId, Long memberId) {
        // 채팅방 상세 정보를 볼 수 없는 경우
        // 1. 채팅방이 없는 경우
        // 2. 해당 채팅방에 참여한 유저가 아닌 경우

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

        if(!chatRoom.getOwner().getId().equals(memberId) || !chatRoom.getRental().getId().equals(memberId)) {
            throw new CustomException(CHATROOM_NOT_ENROLLED);
        }

        List<ChatDto> chatDtos = chatRepository.findByChatRoomIdOrderByChatTimeDesc(chatRoomId)
                .stream()
                .map(chat -> {
                    Member member = memberRepository.findByUuid(chat.getUuid());
                    return ChatDto.toDto(chat, member);
                })
                .toList();

        return new ChatRoomAndChatsDetailsRes(ChatRoomDto.toDto(chatRoom), chatDtos);
    }
}
