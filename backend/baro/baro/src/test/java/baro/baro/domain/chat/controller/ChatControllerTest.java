package baro.baro.domain.chat.controller;

import baro.baro.domain.chat.dto.ChatDto;
import baro.baro.domain.chat.dto.ChatRoomDto;
import baro.baro.domain.chat.dto.response.ChatImageUploadRes;
import baro.baro.domain.chat.dto.response.ChatRoomAndChatsDetailsRes;
import baro.baro.domain.chat.service.ChatService;
import baro.baro.global.oauth.jwt.service.JwtService;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static baro.baro.domain.chat.document.ChatType.USER;
import static baro.baro.domain.chat_room.entity.RentalStatus.AVAILABLE;
import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.SuccessCode.CHATROOM_DETAILS_OK;
import static baro.baro.global.statuscode.SuccessCode.CHAT_IMAGE_UPLOAD_OK;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.JsonFieldType.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser
@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
public class ChatControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private ChatService chatService;

    private String jwtToken;

    @BeforeEach
    public void setup() throws JsonProcessingException {
        jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLZ";

        when(jwtService.createAccessToken(UUID, isCertificated)).thenReturn(jwtToken);
        when(jwtService.getAuthentication(jwtToken)).thenReturn(
                new UsernamePasswordAuthenticationToken(123L, null, List.of())
        );

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(123L, null, List.of())
        );
    }

    @Test
    public void 채팅방_채팅_상세_조회_성공() throws Exception {
        // given
        ChatRoomDto chatRoomDto = new ChatRoomDto(1L, "uuid", "nickname", "profileImage", AVAILABLE);
        List<ChatDto> chatDtos = List.of(
                new ChatDto("uuid", "message", "image", LocalDateTime.now(), USER));
        ChatRoomAndChatsDetailsRes res = new ChatRoomAndChatsDetailsRes(chatRoomDto, chatDtos);

        when(chatService.findChatRoomAndChats(anyLong(), anyLong()))
                .thenReturn(res);

        // when
        ResultActions actions = mockMvc.perform(
                get("/chatrooms/{chatRoomId}", 1L)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_DETAILS_OK.getMessage()))
                .andDo(document(
                        "채팅방 채팅 상세 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Chat API")
                                .summary("채팅방 채팅 상세 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("chatRoomId").description("채팅방 아이디")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.chatRoomDto.chatRoomId").type(NUMBER)
                                                        .description("채팅방 아이디"),
                                                fieldWithPath("body.chatRoomDto.opponentUuid").type(STRING)
                                                        .description("상대방 UUID"),
                                                fieldWithPath("body.chatRoomDto.opponentNickname").type(STRING)
                                                        .description("상대방 닉네임"),
                                                fieldWithPath("body.chatRoomDto.opponentProfileImage").type(STRING)
                                                        .description("상대방 프로필 이미지"),
                                                fieldWithPath("body.chatRoomDto.rentalStatus").type(STRING)
                                                        .description("채팅방 상태"),
                                                fieldWithPath("body.chatDtos[].uuid").type(STRING)
                                                        .description("채팅 유저 UUID"),
                                                fieldWithPath("body.chatDtos[].message").type(STRING)
                                                        .description("채팅 메시지"),
                                                fieldWithPath("body.chatDtos[].image").type(STRING)
                                                        .description("채팅 이미지"),
                                                fieldWithPath("body.chatDtos[].chatTime").type(STRING)
                                                        .description("채팅 전송 시각"),
                                                fieldWithPath("body.chatDtos[].chatType").type(STRING)
                                                        .description("채팅 타입")
                                        )
                                )
                                .requestSchema(Schema.schema("채팅방 채팅 상세 조회 Request"))
                                .responseSchema(Schema.schema("채팅방 채팅 상세 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 채팅_이미지_업로드_성공() throws Exception {
        // given
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "test image content".getBytes());

        ChatImageUploadRes res = new ChatImageUploadRes("image");
        when(chatService.uploadChatImage(any(MockMultipartFile.class)))
                .thenReturn(res);

        // when
        ResultActions actions = mockMvc.perform(RestDocumentationRequestBuilders
                        .multipart("/chatrooms/image")
                        .file(file)
                        .with(csrf())
                        .contentType("multipart/form-data")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHAT_IMAGE_UPLOAD_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHAT_IMAGE_UPLOAD_OK.getMessage()))
                .andDo(document(
                        "채팅 이미지 업로드",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Chat API")
                                .summary("채팅 이미지 업로드 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.image").type(STRING)
                                                        .description("s3 이미지 주소")
                                        )
                                )
                                .responseSchema(Schema.schema("채팅 이미지 업로드 Response"))
                                .build()
                        ))
                );
    }
}
