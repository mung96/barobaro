package baro.baro.domain.chat_room.dto;

import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ChatRoomDto {
    private Long chatRoomId;

    private String profileImage;

    private String nickname;

    private String productMainImage;

    private String lastChat;

    private LocalDateTime lastChatTime;

    private ChatRoomStatus chatRoomStatus;

    public static ChatRoomDto toDto(ChatRoom chatRoom, Member member, String productMainImage, ChatRoomStatus chatRoomStatus) {
        return ChatRoomDto.builder()
                .chatRoomId(chatRoom.getId())
                .profileImage(member.getProfileImage())
                .nickname(member.getNickname())
                .productMainImage(productMainImage)
                .lastChat(chatRoom.getLastChat())
                .lastChatTime(chatRoom.getLastChatTime())
                .chatRoomStatus(chatRoomStatus)
                .build();
    }
}
