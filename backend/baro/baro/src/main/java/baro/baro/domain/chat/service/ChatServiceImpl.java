package baro.baro.domain.chat.service;

import baro.baro.domain.chat.document.Chat;
import baro.baro.domain.chat.document.DatabaseSequence;
import baro.baro.domain.chat.dto.ChatDto;
import baro.baro.domain.chat.dto.ChatRoomDto;
import baro.baro.domain.chat.dto.request.ChatProcessReq;
import baro.baro.domain.chat.dto.response.ChatProcessRes;
import baro.baro.domain.chat.dto.response.ChatRoomAndChatsDetailsRes;
import baro.baro.domain.chat.repository.ChatRepository;
import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.repository.ChatRoomRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static baro.baro.domain.chat.document.Chat.CHAT_MESSAGE_SEQUENCE;
import static baro.baro.global.statuscode.ErrorCode.CHATROOM_NOT_ENROLLED;
import static baro.baro.global.statuscode.ErrorCode.CHATROOM_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final MongoOperations mongoOperations;

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

        List<ChatDto> chatDtos = chatRepository.findByChatRoomIdOrderByChatTimeDesc(chatRoomId)
                .stream()
                .map(chat -> ChatDto.toDto(chat, memberRepository.findByUuid(chat.getUuid())))
                .collect(Collectors.toList());

        return new ChatRoomAndChatsDetailsRes(ChatRoomDto.toDto(chatRoom, member), chatDtos);
    }

    @Override
    public ChatProcessRes processChat(Long chatRoomId, ChatProcessReq chatProcessReq, Long memberId) {
        Long chatId = createSequence(CHAT_MESSAGE_SEQUENCE);
        String uuid = memberRepository.findById(memberId).get().getUuid();

        Chat chat = chatProcessReq.toEntity(chatId, chatRoomId, uuid, LocalDateTime.now());

        return ChatProcessRes.toDto(chat);
    }

    @Override
    public Long createSequence(String seqName) {
        DatabaseSequence counter = mongoOperations.findAndModify(Query.query(Criteria.where("_id").is(seqName)),
                new Update().inc("seq", 1), FindAndModifyOptions.options().returnNew(true).upsert(true),
                DatabaseSequence.class);

        return !Objects.isNull(counter) ? counter.getSeq() : 1;
    }
}
