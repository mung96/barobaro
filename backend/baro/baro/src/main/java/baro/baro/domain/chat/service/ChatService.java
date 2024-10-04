package baro.baro.domain.chat.service;

import baro.baro.domain.chat.dto.request.ChatProcessReq;
import baro.baro.domain.chat.dto.response.ChatProcessRes;
import baro.baro.domain.chat.dto.response.ChatRoomAndChatsDetailsRes;

public interface ChatService {
    ChatRoomAndChatsDetailsRes findChatRoomAndChats(Long chatRoomId, Long memberId);

    ChatProcessRes processChat(Long chatRoomId, ChatProcessReq chatProcessReq, Long memberId);

    Long createSequence(String seqName);
}
