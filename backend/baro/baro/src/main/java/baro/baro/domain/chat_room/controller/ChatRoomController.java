package baro.baro.domain.chat_room.controller;

import baro.baro.domain.chat_room.dto.ChatRoomDto;
import baro.baro.domain.chat_room.dto.request.ChatRoomAddReq;
import baro.baro.domain.chat_room.dto.response.ChatRoomAddRes;
import baro.baro.domain.chat_room.dto.response.ChatRoomListRes;
import baro.baro.domain.chat_room.service.ChatRoomService;
import baro.baro.domain.chat_room.service.ChatRoomServiceImpl;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static baro.baro.domain.chat_room.dto.ChatRoomStatus.OWNER;
import static baro.baro.domain.chat_room.dto.ChatRoomStatus.RENTAL;
import static baro.baro.global.statuscode.SuccessCode.CHATROOM_CREATED;
import static baro.baro.global.statuscode.SuccessCode.CHATROOM_LIST_OK;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatrooms")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<?> chatRoomAdd(@RequestBody ChatRoomAddReq chatRoomAddReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        ChatRoomAddRes result = chatRoomService.addChatRoom(memberId, chatRoomAddReq);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_CREATED, result), CREATED);
    }

    @GetMapping
    public ResponseEntity<?> chatRoomList() {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        ChatRoomListRes result = chatRoomService.findChatRooms(memberId);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_LIST_OK, result), OK);
    }
}
