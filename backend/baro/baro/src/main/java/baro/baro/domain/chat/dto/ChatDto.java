package baro.baro.domain.chat.dto;

import baro.baro.domain.chat.document.Chat;
import baro.baro.domain.chat.document.ChatType;
import baro.baro.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ChatDto {
    private String uuid;

    private String message;

    private String image;

    private LocalDateTime chatTime;

    private ChatType chatType;

    public static ChatDto toDto(Chat chat, Member member) {
        return ChatDto.builder()
                .uuid(member.getUuid())
                .message(chat.getMessage())
                .image(chat.getImage())
                .chatTime(chat.getChatTime())
                .chatType(chat.getChatType())
                .build();
    }
}
