package baro.baro.domain.account.controller;

import baro.baro.domain.account.dto.request.AccountAddReq;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.google.gson.Gson;
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

import java.util.List;

import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final static String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    @Test
    public void 계좌_리스트_조회_성공() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/members/me/accounts")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ACCOUNT_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ACCOUNT_LIST_OK.getMessage()))
                .andDo(document(
                        "계좌 리스트 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Account API")
                                .summary("계좌 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.*[].bank").type(JsonFieldType.STRING)
                                                        .description("은행"),
                                                fieldWithPath("body.*[].accountNumber").type(JsonFieldType.STRING)
                                                        .description("계좌 번호"),
                                                fieldWithPath("body.*[].accountId").type(JsonFieldType.NUMBER)
                                                        .description("계좌 식별자"),
                                                fieldWithPath("body.*[].main").type(JsonFieldType.BOOLEAN)
                                                        .description("대표 계좌 여부")

                                        )
                                )
                                .responseSchema(Schema.schema("계좌 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계좌_연결_성공() throws Exception {
        // given
        AccountAddReq req = new AccountAddReq();
        req.setAccountNumber("3333-05-681789");

        String content = gson.toJson(req);

        // when
        ResultActions actions = mockMvc.perform(
                post("/members/me/accounts")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ACCOUNT_ADD_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ACCOUNT_ADD_CREATED.getMessage()))
                .andDo(document(
                        "계좌 연결",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Account API")
                                .summary("계좌 연결 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("accountNumber").type(JsonFieldType.STRING)
                                                .description("계좌 번호")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.accountNumber").type(JsonFieldType.STRING)
                                                        .description("계좌 번호")
                                        )
                                )
                                .requestSchema(Schema.schema("계좌 연결 Request"))
                                .responseSchema(Schema.schema("계좌 연결 Response"))
                                .build()
                        ))
                );
    }
}