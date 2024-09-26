package baro.baro.domain.chat_room.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.SuccessCode.CHATROOM_LIST_OK;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
class ChatRoomControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final static String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    @Test
    public void 채팅방_리스트_조회_성공() throws Exception {
        // given

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
