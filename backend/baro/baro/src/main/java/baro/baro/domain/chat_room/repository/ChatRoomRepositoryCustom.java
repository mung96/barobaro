package baro.baro.domain.chat_room.repository;

import baro.baro.domain.chat_room.dto.ChatRoomDto;

import java.util.List;

public interface ChatRoomRepositoryCustom {
    List<ChatRoomDto> findAllChatRooms(Long memberId);
}
