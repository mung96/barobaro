package baro.baro.domain.chat.dto.response;

import baro.baro.domain.chat.dto.ChatDto;
import baro.baro.domain.chat.dto.ChatRoomDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomAndChatsDetailsRes {
    private ChatRoomDto chatRoomDto;

    private List<ChatDto> chatDtos;
}
