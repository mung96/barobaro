package baro.baro.domain.chat.service;

import baro.baro.domain.chat.dto.response.ChatRoomAndChatsDetailsRes;

public interface ChatService {
    ChatRoomAndChatsDetailsRes findChatRoomAndChats(Long chatRoomId, Long memberId);
}
