package baro.baro.domain.chat.document;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "chat")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Chat {
    @Id
    private String chatId;

    private Long chatRoomId;

    private String uuid;

    private String message;

    private String image;

    private LocalDateTime chatTime;

    @Enumerated(EnumType.STRING)
    private ChatType chatType;
}
