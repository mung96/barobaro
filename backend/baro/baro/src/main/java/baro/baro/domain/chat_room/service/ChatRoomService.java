package baro.baro.domain.chat_room.service;

import baro.baro.domain.chat_room.dto.request.ChatRoomAddReq;
import baro.baro.domain.chat_room.dto.response.ChatRoomAddRes;
import baro.baro.domain.chat_room.dto.response.ChatRoomListRes;

public interface ChatRoomService {
    ChatRoomAddRes addChatRoom(Long rentalId, ChatRoomAddReq chatRoomAddReq);

    ChatRoomListRes findChatRooms(Long memberId);
}
