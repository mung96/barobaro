package baro.baro.domain.chat_room.controller;

import baro.baro.domain.chat_room.dto.ChatRoomDto;
import baro.baro.domain.chat_room.dto.request.ChatRoomAddReq;
import baro.baro.domain.chat_room.dto.response.ChatRoomAddRes;
import baro.baro.domain.chat_room.dto.response.ChatRoomListRes;
import baro.baro.domain.chat_room.service.ChatRoomService;
import baro.baro.global.exception.CustomException;
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
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static baro.baro.domain.chat_room.dto.ChatRoomStatus.OWNER;
import static baro.baro.domain.chat_room.dto.ChatRoomStatus.RENTAL;
import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.ErrorCode.*;
import static baro.baro.global.statuscode.SuccessCode.CHATROOM_CREATED;
import static baro.baro.global.statuscode.SuccessCode.CHATROOM_LIST_OK;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.JsonFieldType.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser
@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
class ChatRoomControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private ChatRoomService chatRoomService;

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
    public void 채팅방_생성_성공() throws Exception {
        // given
        ChatRoomAddReq req = new ChatRoomAddReq();
        req.setProductId(20000L);

        String content = objectMapper.writeValueAsString(req);

        ChatRoomAddRes res = new ChatRoomAddRes(1L);
        when(chatRoomService.addChatRoom(anyLong(), any()))
                .thenReturn(res);

        // when
        ResultActions actions = mockMvc.perform(
                post("/chatrooms")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_CREATED.getMessage()))
                .andDo(document(
                        "채팅방 생성",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("ChatRoom API")
                                .summary("채팅방 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("productId").type(NUMBER)
                                                .description("대여 물품 어아디")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.chatRoomId").type(NUMBER)
                                                        .description("채팅방 아이디")
                                        )
                                )
                                .requestSchema(Schema.schema("채팅방 생성 Request"))
                                .responseSchema(Schema.schema("채팅방 생성 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 채팅방_생성_실패_존재하지_않는_대여_물품() throws Exception {
        // given
        ChatRoomAddReq req = new ChatRoomAddReq();
        req.setProductId(30000L);

        String content = objectMapper.writeValueAsString(req);

        ChatRoomAddRes res = new ChatRoomAddRes(1L);
        when(chatRoomService.addChatRoom(anyLong(), any()))
                .thenThrow(new CustomException(PRODUCT_NOT_FOUND));

        // when
        ResultActions actions = mockMvc.perform(
                post("/chatrooms")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "채팅방 생성 실패 - 존재하지 않는 대여 물품의 채팅방을 만드는 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("ChatRoom API")
                                .summary("채팅방 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("productId").type(NUMBER)
                                                .description("대여 물품 어아디")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("채팅방 생성 Request"))
                                .responseSchema(Schema.schema("채팅방 생성 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 채팅방_생성_실패_존재하지_않는_사용자가_올린_대여_물품() throws Exception {
        // given
        ChatRoomAddReq req = new ChatRoomAddReq();
        req.setProductId(20001L);

        String content = objectMapper.writeValueAsString(req);

        ChatRoomAddRes res = new ChatRoomAddRes(1L);
        when(chatRoomService.addChatRoom(anyLong(), any()))
                .thenThrow(new CustomException(MEMBER_NOT_FOUND));

        // when
        ResultActions actions = mockMvc.perform(
                post("/chatrooms")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(MEMBER_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(MEMBER_NOT_FOUND.getMessage()))
                .andDo(document(
                        "채팅방 생성 실패 - 존재하지 않는 사용자가 올린 대여 물품일 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("ChatRoom API")
                                .summary("채팅방 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("productId").type(NUMBER)
                                                .description("대여 물품 어아디")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("채팅방 생성 Request"))
                                .responseSchema(Schema.schema("채팅방 생성 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 채팅방_생성_실패_본인이_올린_대여_상품() throws Exception {
        // given
        ChatRoomAddReq req = new ChatRoomAddReq();
        req.setProductId(20002L);

        String content = objectMapper.writeValueAsString(req);

        ChatRoomAddRes res = new ChatRoomAddRes(1L);
        when(chatRoomService.addChatRoom(anyLong(), any()))
                .thenThrow(new CustomException(CHATROOM_SELF_CREATED));

        // when
        ResultActions actions = mockMvc.perform(
                post("/chatrooms")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_SELF_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_SELF_CREATED.getMessage()))
                .andDo(document(
                        "채팅방 생성 실패 - 본인이 올린 대여 상품인 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("ChatRoom API")
                                .summary("채팅방 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("productId").type(NUMBER)
                                                .description("대여 물품 어아디")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("채팅방 생성 Request"))
                                .responseSchema(Schema.schema("채팅방 생성 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 채팅방_생성_실패_거래_불가능한_대여_상품() throws Exception {
        // given
        ChatRoomAddReq req = new ChatRoomAddReq();
        req.setProductId(20003L);

        String content = objectMapper.writeValueAsString(req);

        ChatRoomAddRes res = new ChatRoomAddRes(1L);
        when(chatRoomService.addChatRoom(anyLong(), any()))
                .thenThrow(new CustomException(PRODUCT_UNAVAILABLE));

        // when
        ResultActions actions = mockMvc.perform(
                post("/chatrooms")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_UNAVAILABLE.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_UNAVAILABLE.getMessage()))
                .andDo(document(
                        "채팅방 생성 실패 - 거래 불가능한 대여 상품인 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("ChatRoom API")
                                .summary("채팅방 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("productId").type(NUMBER)
                                                .description("대여 물품 어아디")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("채팅방 생성 Request"))
                                .responseSchema(Schema.schema("채팅방 생성 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 채팅방_리스트_조회_성공() throws Exception {
        // given

        List<ChatRoomDto> res = List.of(
                ChatRoomDto.builder()
                        .chatRoomId(1L)
                        .profileImage("profileImage")
                        .nickname("nickname")
                        .productMainImage("productMainImage")
                        .lastChat("lastChat")
                        .lastChatTime(LocalDateTime.now())
                        .chatRoomStatus(OWNER)
                        .build()
        );
        when(chatRoomService.findChatRooms(anyLong()))
                .thenReturn(new ChatRoomListRes(res));

        // when
        ResultActions actions = mockMvc.perform(
                get("/chatrooms")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_LIST_OK.getMessage()))
                .andDo(document(
                        "채팅방 리스트 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("ChatRoom API")
                                .summary("채팅방 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.*[].chatRoomId").type(NUMBER)
                                                        .description("채팅방 아이디"),
                                                fieldWithPath("body.*[].profileImage").type(STRING)
                                                        .description("상대방 프로필 이미지"),
                                                fieldWithPath("body.*[].nickname").type(STRING)
                                                        .description("상대방 닉네임"),
                                                fieldWithPath("body.*[].productMainImage").type(STRING)
                                                        .description("대여 상품 대표 이미지"),
                                                fieldWithPath("body.*[].lastChat").type(STRING)
                                                        .description("마지막 채팅 메세지"),
                                                fieldWithPath("body.*[].lastChatTime").type(STRING)
                                                        .description("마지막 채팅 시각"),
                                                fieldWithPath("body.*[].chatRoomStatus").type(STRING)
                                                        .description("채팅방 상태")
                                        )
                                )
                                .responseSchema(Schema.schema("채팅방 리스트 조회 Response"))
                                .build()
                        ))
                );
    }
}
