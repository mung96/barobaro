package baro.baro.domain.chat.controller;

import baro.baro.domain.chat.dto.request.ChatProcessReq;
import baro.baro.domain.chat.dto.response.ChatImageUploadRes;
import baro.baro.domain.chat.dto.response.ChatProcessRes;
import baro.baro.domain.chat.dto.response.ChatRoomAndChatsDetailsRes;
import baro.baro.domain.chat.service.ChatService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static baro.baro.global.statuscode.SuccessCode.CHATROOM_DETAILS_OK;
import static baro.baro.global.statuscode.SuccessCode.CHAT_IMAGE_UPLOAD_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final JwtService jwtService;

    @GetMapping("/chatrooms/{chatRoomId}")
    public ResponseEntity<?> chatroomAndChatsDetails(@PathVariable("chatRoomId") Long chatRoomId) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());

        ChatRoomAndChatsDetailsRes result = chatService.findChatRoomAndChats(chatRoomId, memberId);

        return new ResponseEntity<>(ResponseDto.success(CHATROOM_DETAILS_OK, result), OK);
    }

    @PostMapping("/chatrooms/image")
    public ResponseEntity<?> chatImageUpload(@RequestPart(value = "file") MultipartFile file) throws IOException {
        ChatImageUploadRes result = chatService.uploadChatImage(file);

        return new ResponseEntity<>(ResponseDto.success(CHAT_IMAGE_UPLOAD_OK, result), OK);
    }

    @MessageMapping("/chatrooms/{chatRoomId}")
    @SendTo("/sub/chatrooms/{chatRoomId}")
    public ChatProcessRes processChat(@DestinationVariable Long chatRoomId,
                                      @Payload @Valid ChatProcessReq chatProcessReq,
                                      SimpMessageHeaderAccessor headerAccessor // WebSocket 세션의 헤더 정보에 접근
    ) {
        String authHeader = headerAccessor.getFirstNativeHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long memberId = (Long) jwtService.getAuthentication(token).getPrincipal();

            return chatService.processChat(chatRoomId, chatProcessReq, memberId);
        }

        return null;
    }
}
