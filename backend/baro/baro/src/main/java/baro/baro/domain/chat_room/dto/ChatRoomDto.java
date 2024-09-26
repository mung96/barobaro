package baro.baro.domain.chat_room.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRoomDto {
    private Long chatRoomId;

    private String profileImage;

    private String nickname;

    private String productMainImage;

    private String lastChat;

    private ChatRoomStatus chatRoomStatus;
}
