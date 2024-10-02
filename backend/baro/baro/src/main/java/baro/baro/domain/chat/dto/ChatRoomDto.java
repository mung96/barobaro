package baro.baro.domain.chat.dto;

import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.entity.RentalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ChatRoomDto {
    private Long chatRoomId;

    private RentalStatus rentalStatus;

    public static ChatRoomDto toDto(ChatRoom chatRoom) {
        return ChatRoomDto.builder()
                .chatRoomId(chatRoom.getId())
                .rentalStatus(chatRoom.getRentalStatus())
                .build();
    }
}
