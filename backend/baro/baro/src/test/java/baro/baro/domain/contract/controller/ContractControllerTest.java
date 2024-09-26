package baro.baro.domain.contract.controller;

import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.ContractApproveReq;
import baro.baro.domain.contract.dto.request.ContractOptionDetailReq;
import baro.baro.domain.contract.dto.request.ContractRequestDetailReq;
import baro.baro.domain.contract.dto.request.SignatureAddReq;
import baro.baro.domain.product.entity.ReturnType;
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

import java.time.LocalDate;
import java.util.List;

import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
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
class ContractControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

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
    public void 계약_요청_생성_성공() throws Exception {

        //given
        ContractRequestDto contractRequestDto = new ContractRequestDto(
                10000L,
                LocalDate.of(2024, 9, 25),
                LocalDate.of(2024, 10, 1),
                ReturnType.DELIVERY
        );
        String content = objectMapper.writeValueAsString(contractRequestDto);

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/request")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_REQUEST_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_REQUEST_CREATED.getMessage()))
                .andExpect(jsonPath("$.body.desiredStartDate").value("2024-09-25"))
                .andExpect(jsonPath("$.body.desiredEndDate").value("2024-10-01"))
                .andExpect(jsonPath("$.body.returnType").value("DELIVERY"))
                .andDo(document(
                        "계약 요청 생성",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Contract API")
                                .summary("계약 요청 생성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("productId").type(NUMBER).description("대여 물품 아이디"),
                                                fieldWithPath("desiredStartDate").type(STRING).description("희망 대여 시작일"),
                                                fieldWithPath("desiredEndDate").type(STRING).description("희망 대여 반납일"),
                                                fieldWithPath("returnType").type(STRING).description("희망 반납 방법(단일)")
                                        )
                                )

                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.desiredStartDate").type(STRING)
                                                        .description("희망 대여 시작일"),
                                                fieldWithPath("body.desiredEndDate").type(STRING)
                                                        .description("희망 대여 반납일"),
                                                fieldWithPath("body.returnType").type(STRING)
                                                        .description("반납 방법(단일)")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 생성 Request"))
                                .responseSchema(Schema.schema("계약 요청 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_요청_조회_성공() throws Exception {

        //given
        ContractRequestDetailReq contractRequestDetailReq = new ContractRequestDetailReq(
                10000L
        );

        String content = objectMapper.writeValueAsString(contractRequestDetailReq);

        //when
        ResultActions actions = mockMvc.perform(
                get("/contracts/request")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_REQUEST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_REQUEST_OK.getMessage()))
                .andExpect(jsonPath("$.body.productId").value(contractRequestDetailReq.getChatRoomId()))
                .andDo(document(
                        "계약 요청 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Contract API")
                                .summary("계약 요청 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("productId").type(NUMBER).description("조회할 상품 Id")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.desiredStartDate").type(STRING)
                                                        .description("희망 대여 시작일,"),
                                                fieldWithPath("body.desiredEndDate").type(STRING)
                                                        .description("희망 대여 반납일"),
                                                fieldWithPath("body.returnType").type(STRING)
                                                        .description("반납 방법(단일)")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 조회 Request"))
                                .responseSchema(Schema.schema("계약 요청 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_조건_상세_조회_성공() throws Exception {

        //given
        ContractOptionDetailReq contractOptionDetailReq = new ContractOptionDetailReq(
                10000L
        );

        String content = objectMapper.writeValueAsString(contractOptionDetailReq);

        //when
        ResultActions actions = mockMvc.perform(
                get("/contracts")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_REQUEST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_REQUEST_OK.getMessage()))
                .andDo(document(
                        "계약 조건 상세 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Contract API")
                                .summary("계약 조건 상세 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("chatRoomId").type(NUMBER).description("현재 대화중인 채팅방 Id")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.isUsingContract").type(BOOLEAN)
                                                        .description("전자 계약서 사용여부"),
                                                fieldWithPath("body.returnTypes[]").type(ARRAY)
                                                        .description("물품 반납 방법"),
                                                fieldWithPath("body.repairVendor").type(STRING)
                                                        .description("수리 업체"),
                                                fieldWithPath("body.overdueCriteria").type(NUMBER)
                                                        .description("무단 연체 기준"),
                                                fieldWithPath("body.overdueFee").type(NUMBER)
                                                        .description("무단 연체 가격"),
                                                fieldWithPath("body.refundDeadline").type(NUMBER)
                                                        .description("청구 비용 기준")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 조건 상세 조회 Request"))
                                .responseSchema(Schema.schema("계약 조건 상세 조회 Response"))
                                .build()
                        ))
                );
    }
    @Test
    public void 계약_요청_승인_성공() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                10000L
        );

        String content = objectMapper.writeValueAsString(contractApproveReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/approve?type=contract")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_APPROVED_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_APPROVED_OK.getMessage()))
                .andDo(document(
                        "계약 요청 승인 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Contract API")
                                .summary("계약 요청 승인 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("chatRoomId").type(NUMBER).description("현재 대화중인 채팅방 Id")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.chatRoomId").type(NUMBER)
                                                        .description("현재 대화중인 채팅방 Id"),
                                                fieldWithPath("body.fileUrl").type(STRING)
                                                        .description("Pdf가 저장된 Url")

                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }
    @Test
    public void 소유자_계약_서명_성공() throws Exception {

        SignatureAddReq signatureAddReq = new SignatureAddReq(
                10000L, "123456","signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/sign/owner")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_SIGNED_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_SIGNED_OK.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Contract API")
                                .summary("소유자 계약 서명 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("chatRoomId").type(NUMBER).description("현재 대화중인 채팅방 Id"),
                                                fieldWithPath("pinNumber").type(STRING).description("본인의 PIN 6자리"),
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.chatRoomId").type(NUMBER)
                                                        .description("현재 대화중인 채팅방 Id"),
                                                fieldWithPath("body.fileUrl").type(STRING)
                                                        .description("새롭게 갱신된 Pdf 파일 Url"),
                                                fieldWithPath("body.signedAt").type(STRING)
                                                        .description("서명 시간")

                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_성공() throws Exception {

        SignatureAddReq signatureAddReq = new SignatureAddReq(
                10000L, "123456","signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/sign/rental")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_SIGNED_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_SIGNED_OK.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Contract API")
                                .summary("빌리는 측 계약 서명 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("chatRoomId").type(NUMBER).description("현재 대화중인 채팅방 Id"),
                                                fieldWithPath("pinNumber").type(STRING).description("본인의 PIN 6자리"),
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.chatRoomId").type(NUMBER)
                                                        .description("현재 대화중인 채팅방 Id"),
                                                fieldWithPath("body.fileUrl").type(STRING)
                                                        .description("새롭게 갱신된 Pdf 파일 Url"),
                                                fieldWithPath("body.signedAt").type(STRING)
                                                        .description("서명 시간")

                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }
}
