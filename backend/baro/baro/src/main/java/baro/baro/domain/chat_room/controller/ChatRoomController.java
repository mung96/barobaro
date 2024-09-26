package baro.baro.domain.chat_room.controller;

import baro.baro.domain.chat_room.dto.ChatRoomDto;
import baro.baro.domain.chat_room.dto.response.ChatRoomListRes;
import baro.baro.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static baro.baro.domain.chat_room.dto.ChatRoomStatus.OWNER;
import static baro.baro.domain.chat_room.dto.ChatRoomStatus.RENTAL;
import static baro.baro.global.statuscode.SuccessCode.CHATROOM_LIST_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatrooms")
public class ChatRoomController {
    @GetMapping
    public ResponseEntity<?> chatRoomList() {
        List<ChatRoomDto> chatRooms = new ArrayList<>();

        for(int i = 0; i < 5; i++) {
            Long id = 10000L + i;

            ChatRoomDto dto = ChatRoomDto.builder()
                    .chatRoomId(id)
                    .profileImage("상대방 프로필 이미지")
                    .nickname("상대방 닉네임")
                    .productMainImage("대여 상품 메인 이미지")
                    .lastChat("돈 낸나!")
                    .chatRoomStatus(OWNER)
                    .build();

            chatRooms.add(dto);
        }

        for(int i = 5; i < 10; i++) {
            Long id = 10000L + i;

            ChatRoomDto dto = ChatRoomDto.builder()
                    .chatRoomId(id)
                    .profileImage("상대방 프로필 이미지")
                    .nickname("상대방 닉네임")
                    .productMainImage("대여 상품 메인 이미지")
                    .lastChat("춤춰줄테니 빌려줘.. 제발 나 돈이 없어..")
                    .chatRoomStatus(RENTAL)
                    .build();

            chatRooms.add(dto);
        }

        ChatRoomListRes result = new ChatRoomListRes(chatRooms);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, result), OK);
    }
}
