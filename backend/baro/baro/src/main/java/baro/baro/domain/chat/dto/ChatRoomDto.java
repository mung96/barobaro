package baro.baro.domain.chat.dto;

import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.entity.RentalStatus;
import baro.baro.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ChatRoomDto {
    private Long chatRoomId;

    private String opponentUuid;

    private String opponentNickname;

    private String opponentProfileImage;

    private RentalStatus rentalStatus;

    public static ChatRoomDto toDto(ChatRoom chatRoom, Member member) {
        return ChatRoomDto.builder()
                .chatRoomId(chatRoom.getId())
                .opponentUuid(member.getUuid())
                .opponentNickname(member.getNickname())
                .opponentProfileImage(member.getProfileImage())
                .rentalStatus(chatRoom.getRentalStatus())
                .build();
    }
}
