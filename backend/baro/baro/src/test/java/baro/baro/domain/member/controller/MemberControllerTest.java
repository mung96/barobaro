package baro.baro.domain.member.controller;

import baro.baro.domain.member.dto.request.PasswordModifyReq;
import baro.baro.domain.member.dto.request.ProfileModifyReq;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
class MemberControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final static String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    @Test
    public void PIN번호_변경_성공() throws Exception {
        // given
        PasswordModifyReq req = new PasswordModifyReq();
        req.setNowPassword("123456");
        req.setModifyPassword("654321");
        req.setCheckPassword("654321");

        String content = objectMapper.writeValueAsString(req);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/members/me/password")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PASSWORD_MODIFY_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PASSWORD_MODIFY_OK.getMessage()))
                .andDo(document(
                        "PIN번호 변경",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Member API")
                                .summary("PIN번호 변경 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("nowPassword").type(JsonFieldType.STRING).description("기존 PIN번호"),
                                                fieldWithPath("modifyPassword").type(JsonFieldType.STRING).description("변경할 PIN번호"),
                                                fieldWithPath("checkPassword").type(JsonFieldType.STRING).description("변경할 PIN번호 확인")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.password").type(JsonFieldType.STRING).description("변경된 PIN번호")
                                        )
                                )
                                .requestSchema(Schema.schema("PIN번호 변경 Request"))
                                .responseSchema(Schema.schema("PIN번호 변경 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 프로필_조회_성공() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/members/me/profile")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PROFILE_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PROFILE_DETAILS_OK.getMessage()))
                .andDo(document(
                        "프로필 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Member API")
                                .summary("프로필 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.profileImage").type(JsonFieldType.STRING)
                                                        .description("프로필 이미지"),
                                                fieldWithPath("body.nickname").type(JsonFieldType.STRING)
                                                        .description("닉네임"),
                                                fieldWithPath("body.phoneNumber").type(JsonFieldType.STRING)
                                                        .description("핸드폰 번호"),
                                                fieldWithPath("body.email").type(JsonFieldType.STRING)
                                                        .description("이메일")
                                        )
                                )
                                .responseSchema(Schema.schema("프로필 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 프로필_수정_성공() throws Exception {
        // given
        ObjectMapper mapper = new ObjectMapper();

        ProfileModifyReq req = new ProfileModifyReq("수정할 닉네임");

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", mapper.writeValueAsBytes(req));
        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/members/me/profile")
                        .file(dto)
                        .file(file)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PROFILE_MODIFY_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PROFILE_MODIFY_OK.getMessage()))
                .andDo(document(
                        "프로필 수정",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Member API")
                                .summary("프로필 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.profileImage").type(JsonFieldType.STRING)
                                                        .description("프로필 이미지"),
                                                fieldWithPath("body.nickname").type(JsonFieldType.STRING)
                                                        .description("닉네임"),
                                                fieldWithPath("body.phoneNumber").type(JsonFieldType.STRING)
                                                        .description("핸드폰 번호"),
                                                fieldWithPath("body.email").type(JsonFieldType.STRING)
                                                        .description("이메일")
                                        )
                                )
                                .requestSchema(Schema.schema("프로필 수정 Request"))
                                .responseSchema(Schema.schema("프로필 수정 Response"))
                                .build()
                        ))
                );
    }
}
