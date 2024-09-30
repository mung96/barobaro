package baro.baro.domain.chat_room.dto.response;

import baro.baro.domain.chat_room.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ChatRoomAddRes {
    private Long chatRoomId;

    public static ChatRoomAddRes toDto(ChatRoom chatRoom) {
        return ChatRoomAddRes.builder()
                .chatRoomId(chatRoom.getId())
                .build();
    }
}
