package baro.baro.domain.chat_room.dto.response;

import baro.baro.domain.chat_room.dto.ChatRoomDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChatRoomListRes {
    private List<ChatRoomDto> chatRooms;
}
