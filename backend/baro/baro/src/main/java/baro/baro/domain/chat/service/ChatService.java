package baro.baro.domain.chat.service;

import baro.baro.domain.chat.dto.request.ChatProcessReq;
import baro.baro.domain.chat.dto.response.ChatImageUploadRes;
import baro.baro.domain.chat.dto.response.ChatProcessRes;
import baro.baro.domain.chat.dto.response.ChatRoomAndChatsDetailsRes;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ChatService {
    ChatRoomAndChatsDetailsRes findChatRoomAndChats(Long chatRoomId, Long memberId);

    ChatProcessRes processChat(Long chatRoomId, ChatProcessReq chatProcessReq, Long memberId);

    Long createSequence(String seqName);

    ChatImageUploadRes uploadChatImage(MultipartFile file) throws IOException;
}
