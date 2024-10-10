package baro.baro.domain.account.controller;

import baro.baro.domain.account.dto.AccountDto;
import baro.baro.domain.account.dto.request.AccountAddReq;
import baro.baro.domain.account.dto.response.AccountAddMainRes;
import baro.baro.domain.account.dto.response.AccountListRes;
import baro.baro.domain.account.service.AccountService;
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

import java.util.List;

import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.ErrorCode.ACCOUNT_NOT_FOUND;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
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
class AccountControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private AccountService accountService;

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
    public void 계좌_리스트_조회_성공() throws Exception {
        // given
        List<AccountDto> res = List.of(
                AccountDto.builder()
                        .bank("싸피은행")
                        .accountNumber("12345678")
                        .accountId(1L)
                        .main(true)
                        .build()
        );
        when(accountService.findAccounts(anyLong()))
                .thenReturn(new AccountListRes(res));

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
                                                fieldWithPath("body.*[].bank").type(STRING)
                                                        .description("은행"),
                                                fieldWithPath("body.*[].accountNumber").type(STRING)
                                                        .description("계좌 번호"),
                                                fieldWithPath("body.*[].accountId").type(NUMBER)
                                                        .description("계좌 식별자"),
                                                fieldWithPath("body.*[].main").type(BOOLEAN)
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

        String content = objectMapper.writeValueAsString(req);

        // when
        ResultActions actions = mockMvc.perform(
                post("/members/me/accounts")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ACCOUNT_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ACCOUNT_CREATED.getMessage()))
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
                                        fieldWithPath("accountNumber").type(STRING)
                                                .description("계좌 번호")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.accountNumber").type(STRING)
                                                        .description("계좌 번호")
                                        )
                                )
                                .requestSchema(Schema.schema("계좌 연결 Request"))
                                .responseSchema(Schema.schema("계좌 연결 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계좌_삭제_성공() throws Exception {
        // given
        Long accountId = 10000L;

        // when
        ResultActions actions = mockMvc.perform(
                delete("/members/me/accounts/{accountId}", 10000L)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ACCOUNT_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ACCOUNT_DELETED.getMessage()))
                .andDo(document(
                        "계좌 삭제",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Account API")
                                .summary("계좌 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("accountId")
                                                .description("계좌 식별자")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계좌 삭제 Request"))
                                .responseSchema(Schema.schema("계좌 삭제 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 대표_계좌_설정_성공() throws Exception {
        // given
        AccountAddMainRes res = AccountAddMainRes.builder()
                .bank("카카오뱅크")
                .accountNumber("3333-05-681789")
                .accountId(1L)
                .main(true)
                .build();

        when(accountService.addMainAccount(anyLong(), anyLong()))
                .thenReturn(res);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/members/me/accounts/{accountId}", 1L)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ACCOUNT_ADD_MAIN_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ACCOUNT_ADD_MAIN_OK.getMessage()))
                .andDo(document(
                        "대표 계좌 설정",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Account API")
                                .summary("대표 계좌 설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("accountId")
                                                .description("계좌 식별자")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.bank").type(STRING)
                                                        .description("은행"),
                                                fieldWithPath("body.accountNumber").type(STRING)
                                                        .description("계좌 번호"),
                                                fieldWithPath("body.accountId").type(NUMBER)
                                                        .description("계좌 식별자"),
                                                fieldWithPath("body.main").type(BOOLEAN)
                                                        .description("대표 계좌 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("대표 계좌 설정 Request"))
                                .responseSchema(Schema.schema("대표 계좌 설정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 대표_계좌_설정_실패_존재하지_않는_계좌를_대표_계좌로_설정() throws Exception {
        // given
        when(accountService.addMainAccount(anyLong(), anyLong()))
                .thenThrow(new CustomException(ACCOUNT_NOT_FOUND));

        // when
        ResultActions actions = mockMvc.perform(
                patch("/members/me/accounts/{accountId}", 1L)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(ACCOUNT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(ACCOUNT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "대표 계좌 설정 실패 - 존재하지 않는 계좌를 대표 계좌로 설정한 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Account API")
                                .summary("대표 계좌 설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("accountId")
                                                .description("계좌 식별자")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("대표 계좌 설정 Request"))
                                .responseSchema(Schema.schema("대표 계좌 설정 Response"))
                                .build()
                        ))
                );
    }
}
