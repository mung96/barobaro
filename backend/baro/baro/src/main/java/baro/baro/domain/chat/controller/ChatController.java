package baro.baro.domain.chat.controller;

import baro.baro.domain.chat.dto.response.ChatRoomAndChatsDetailsRes;
import baro.baro.domain.chat.service.ChatService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static baro.baro.global.statuscode.SuccessCode.CHATROOM_DETAILS_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatrooms")
public class ChatController {
    private final ChatService chatService;
    private final JwtService jwtService;

    @GetMapping("/{chatRoomId}")
    public ResponseEntity<?> chatroomAndChatsDetails(@PathVariable("chatRoomId") Long chatRoomId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        ChatRoomAndChatsDetailsRes result = chatService.findChatRoomAndChats(chatRoomId, memberId);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_DETAILS_OK, result), OK);
    }
}
