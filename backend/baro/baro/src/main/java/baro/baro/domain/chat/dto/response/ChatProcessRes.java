package baro.baro.domain.chat.dto.response;

import baro.baro.domain.chat.document.Chat;
import baro.baro.domain.chat.document.ChatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ChatProcessRes {
    private String uuid;

    private String message;

    private String image;

    private LocalDateTime chatTime;

    private ChatType chatType;

    public static ChatProcessRes toDto(Chat chat) {
        return ChatProcessRes.builder()
                .uuid(chat.getUuid())
                .message(chat.getMessage())
                .image(chat.getImage())
                .chatTime(chat.getChatTime())
                .chatType(chat.getChatType())
                .build();
    }
}
