package baro.baro.domain.chat.dto.request;

import baro.baro.domain.chat.document.Chat;
import baro.baro.domain.chat.document.ChatType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatProcessReq {
    private String message;

    private String image;

    @NotNull
    private String chatType;

    public Chat toEntity(Long chatRoomId, String uuid, LocalDateTime chatTime) {
        ChatType chatTypeEnum = ChatType.valueOf(chatType.toUpperCase());

        return Chat.builder()
                .chatRoomId(chatRoomId)
                .uuid(uuid)
                .message(message)
                .image(image)
                .chatTime(chatTime)
                .chatType(chatTypeEnum)
                .build();
    }
}
