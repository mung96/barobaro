package baro.baro.domain.contract.controller;

import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.contract.dto.ContractRequestDto;
import baro.baro.domain.contract.dto.request.*;
import baro.baro.domain.contract.dto.response.ContractApproveRes;
import baro.baro.domain.contract.dto.response.ContractOptionDetailRes;
import baro.baro.domain.contract.dto.response.ContractSignedRes;
import baro.baro.domain.contract.service.ContractService;
import baro.baro.domain.product.entity.ReturnType;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static baro.baro.domain.product.entity.ReturnType.DELIVERY;
import static baro.baro.domain.product.entity.ReturnType.DIRECT;
import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.ErrorCode.*;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static java.lang.Boolean.TRUE;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
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
class ContractControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private ContractService contractService;

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
                1L,
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(4),
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 아이디"),
                                                fieldWithPath("desiredStartDate").type(STRING).description("희망 대여 시작일"),
                                                fieldWithPath("desiredEndDate").type(STRING).description("희망 대여 반납일"),
                                                fieldWithPath("returnType").type(STRING).description("희망 반납 방법(단일)")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )

                                .requestSchema(Schema.schema("계약 요청 생성 Request"))
                                .responseSchema(Schema.schema("계약 요청 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_요청_생성_실패_존재하지_않는_채팅방() throws Exception {
        //given
        ContractRequestDto contractRequestDto = new ContractRequestDto(
                1L,
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(4),
                ReturnType.DELIVERY
        );
        String content = objectMapper.writeValueAsString(contractRequestDto);
        doThrow(new CustomException(CHATROOM_NOT_FOUND)).when(contractService).addContractRequest(any(), anyLong());
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_FOUND.getMessage()))
                .andDo(document(
                        "계약 요청 생성 실패 - 존재하지 않는 채팅방의 id를 사용한 경우",
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 아이디"),
                                                fieldWithPath("desiredStartDate").type(STRING).description("희망 대여 시작일"),
                                                fieldWithPath("desiredEndDate").type(STRING).description("희망 대여 반납일"),
                                                fieldWithPath("returnType").type(STRING).description("희망 반납 방법(단일)")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )

                                .requestSchema(Schema.schema("계약 요청 생성 Request"))
                                .responseSchema(Schema.schema("계약 요청 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_요청_생성_실패_참여하지_않는_채팅방() throws Exception {
        //given
        ContractRequestDto contractRequestDto = new ContractRequestDto(
                1L,
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(4),
                ReturnType.DELIVERY
        );
        String content = objectMapper.writeValueAsString(contractRequestDto);
        doThrow(new CustomException(CHATROOM_NOT_ENROLLED)).when(contractService).addContractRequest(any(), anyLong());
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
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_ENROLLED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_ENROLLED.getMessage()))
                .andDo(document(
                        "계약 요청 생성 실패 - 채팅방 참여자가 아닌 경우",
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 아이디"),
                                                fieldWithPath("desiredStartDate").type(STRING).description("희망 대여 시작일"),
                                                fieldWithPath("desiredEndDate").type(STRING).description("희망 대여 반납일"),
                                                fieldWithPath("returnType").type(STRING).description("희망 반납 방법(단일)")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )

                                .requestSchema(Schema.schema("계약 요청 생성 Request"))
                                .responseSchema(Schema.schema("계약 요청 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_요청_생성_실패_존재하지_않는_상품() throws Exception {
        //given
        ContractRequestDto contractRequestDto = new ContractRequestDto(
                1L,
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(4),
                ReturnType.DELIVERY
        );
        String content = objectMapper.writeValueAsString(contractRequestDto);
        doThrow(new CustomException(PRODUCT_NOT_FOUND)).when(contractService).addContractRequest(any(), anyLong());
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "계약 요청 생성 실패 - 상품이 존재하지 않는 경우",
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 아이디"),
                                                fieldWithPath("desiredStartDate").type(STRING).description("희망 대여 시작일"),
                                                fieldWithPath("desiredEndDate").type(STRING).description("희망 대여 반납일"),
                                                fieldWithPath("returnType").type(STRING).description("희망 반납 방법(단일)")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )

                                .requestSchema(Schema.schema("계약 요청 생성 Request"))
                                .responseSchema(Schema.schema("계약 요청 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_요청_생성_실패_분산락_획득_실패() throws Exception {
        //given
        ContractRequestDto contractRequestDto = new ContractRequestDto(
                1L,
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(4),
                ReturnType.DELIVERY
        );
        String content = objectMapper.writeValueAsString(contractRequestDto);
        doThrow(new CustomException(CONFLICT_WITH_OTHER)).when(contractService).addContractRequest(any(), anyLong());
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
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONFLICT_WITH_OTHER.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONFLICT_WITH_OTHER.getMessage()))
                .andDo(document(
                        "계약 요청 생성 실패 - 분산락 획득 실패",
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 아이디"),
                                                fieldWithPath("desiredStartDate").type(STRING).description("희망 대여 시작일"),
                                                fieldWithPath("desiredEndDate").type(STRING).description("희망 대여 반납일"),
                                                fieldWithPath("returnType").type(STRING).description("희망 반납 방법(단일)")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )

                                .requestSchema(Schema.schema("계약 요청 생성 Request"))
                                .responseSchema(Schema.schema("계약 요청 생성 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_요청_생성_실패_다른사람이_진행중인_계약_물품() throws Exception {
        //given
        ContractRequestDto contractRequestDto = new ContractRequestDto(
                1L,
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(4),
                ReturnType.DELIVERY
        );
        String content = objectMapper.writeValueAsString(contractRequestDto);
        doThrow(new CustomException(CONTRACT_IN_PROGRESS_BY_OTHERS)).when(contractService).addContractRequest(any(), anyLong());
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
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_IN_PROGRESS_BY_OTHERS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_IN_PROGRESS_BY_OTHERS.getMessage()))
                .andDo(document(
                        "계약 요청 생성 실패 - 다른 사람이 계약을 진행 중인 경우",
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 아이디"),
                                                fieldWithPath("desiredStartDate").type(STRING).description("희망 대여 시작일"),
                                                fieldWithPath("desiredEndDate").type(STRING).description("희망 대여 반납일"),
                                                fieldWithPath("returnType").type(STRING).description("희망 반납 방법(단일)")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
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
                1L
        );

        String content = objectMapper.writeValueAsString(contractRequestDetailReq);
        ContractRequestDto res = new ContractRequestDto(1L, LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(4),
                ReturnType.DELIVERY);
        when(contractService.findContractRequestDetail(any(), anyLong()))
                .thenReturn(res);
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
                .andExpect(jsonPath("$.body.chatRoomId").value(contractRequestDetailReq.getChatRoomId()))
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 Id")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.chatRoomId").type(NUMBER)
                                                        .description("채팅방 아이디"),
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
    public void 계약_요청_조회_실패_존재하지_않는_채팅방() throws Exception {
        //given
        ContractRequestDetailReq contractRequestDetailReq = new ContractRequestDetailReq(
                1L
        );

        String content = objectMapper.writeValueAsString(contractRequestDetailReq);
        when(contractService.findContractRequestDetail(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_FOUND));
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_FOUND.getMessage()))
                .andDo(document(
                        "계약 요청 조회 실패 - 존재하지 않는 채팅방인 경우",
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 Id")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 조회 Request"))
                                .responseSchema(Schema.schema("계약 요청 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_요청_조회_실패_참여하지_않는_채팅방() throws Exception {
        //given
        ContractRequestDetailReq contractRequestDetailReq = new ContractRequestDetailReq(
                1L
        );

        String content = objectMapper.writeValueAsString(contractRequestDetailReq);
        when(contractService.findContractRequestDetail(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_ENROLLED));
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
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_ENROLLED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_ENROLLED.getMessage()))
                .andDo(document(
                        "계약 요청 조회 실패 - 참여하지 않는 채팅방인 경우",
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 Id")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 조회 Request"))
                                .responseSchema(Schema.schema("계약 요청 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_요청_조회_실패_존재하지_않는_상품() throws Exception {
        //given
        ContractRequestDetailReq contractRequestDetailReq = new ContractRequestDetailReq(
                1L
        );

        String content = objectMapper.writeValueAsString(contractRequestDetailReq);
        when(contractService.findContractRequestDetail(any(), anyLong()))
                .thenThrow(new CustomException(PRODUCT_NOT_FOUND));
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "계약 요청 조회 실패 - 존재하지 않는 상품인 경우",
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 Id")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 조회 Request"))
                                .responseSchema(Schema.schema("계약 요청 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_요청_조회_실패_존재하지_않는_계약_요청() throws Exception {
        //given
        ContractRequestDetailReq contractRequestDetailReq = new ContractRequestDetailReq(
                1L
        );

        String content = objectMapper.writeValueAsString(contractRequestDetailReq);
        when(contractService.findContractRequestDetail(any(), anyLong()))
                .thenThrow(new CustomException(CONTRACT_REQUEST_NOT_FOUND));
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_REQUEST_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_REQUEST_NOT_FOUND.getMessage()))
                .andDo(document(
                        "계약 요청 조회 실패 - 계약 요청이 존재하지 않는 경우",
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
                                                fieldWithPath("chatRoomId").type(NUMBER).description("채팅방 Id")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
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
                1L
        );
        List<ReturnType> returnTypes = new ArrayList<>();
        returnTypes.add(DIRECT);
        returnTypes.add(DELIVERY);
        ContractConditionDto contractConditionDto = new ContractConditionDto(
                "제조사 또는 공식 수입사의 AS 센터",
                5, 2, 7, 7
        );
        ContractOptionDetailRes res = new ContractOptionDetailRes(
                TRUE, returnTypes, contractConditionDto
        );
        String content = objectMapper.writeValueAsString(contractOptionDetailReq);
        when(contractService.findContractOptionDetail(any(), anyLong()))
                .thenReturn(res);
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
                                                fieldWithPath("body.isWriteContract").type(BOOLEAN)
                                                        .description("전자 계약서 사용여부"),
                                                fieldWithPath("body.returnTypes[]").type(ARRAY)
                                                        .description("물품 반납 방법"),
                                                fieldWithPath("body.contractCondition").type(OBJECT).optional()
                                                        .description("계약 조건 (optional, 전자 계약서를 사용하지 않은 경우 null)"),
                                                fieldWithPath("body.contractCondition.repairVendor").type(STRING).optional()
                                                        .description("수리 업체 (optional)"),
                                                fieldWithPath("body.contractCondition.overdueCriteria").type(NUMBER).optional()
                                                        .description("무단 연체 기준 (optional)"),
                                                fieldWithPath("body.contractCondition.overdueFee").type(NUMBER).optional()
                                                        .description("무단 연체 가격 (optional)"),
                                                fieldWithPath("body.contractCondition.theftCriteria").type(NUMBER).optional()
                                                        .description("도난 기준 (optional)"),
                                                fieldWithPath("body.contractCondition.refundDeadline").type(NUMBER).optional()
                                                        .description("청구 비용 기준 (optional)")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 조건 상세 조회 Request"))
                                .responseSchema(Schema.schema("계약 조건 상세 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_조건_상세_조회_실패_존재하지_않는_채팅방() throws Exception {
        //given
        ContractOptionDetailReq contractOptionDetailReq = new ContractOptionDetailReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractOptionDetailReq);
        when(contractService.findContractOptionDetail(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_FOUND));
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_FOUND.getMessage()))
                .andDo(document(
                        "계약 조건 상세 조회 실패 - 존재하지 않는 채팅방인 경우",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 조건 상세 조회 Request"))
                                .responseSchema(Schema.schema("계약 조건 상세 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_조건_상세_조회_실패_참여하지_않는_채팅방() throws Exception {
        //given
        ContractOptionDetailReq contractOptionDetailReq = new ContractOptionDetailReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractOptionDetailReq);
        when(contractService.findContractOptionDetail(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_ENROLLED));
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
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_ENROLLED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_ENROLLED.getMessage()))
                .andDo(document(
                        "계약 조건 상세 조회 실패 - 참여하지 않는 채팅방인 경우",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 조건 상세 조회 Request"))
                                .responseSchema(Schema.schema("계약 조건 상세 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 계약_조건_상세_조회_실패_존재하지_않는_상품() throws Exception {
        //given
        ContractOptionDetailReq contractOptionDetailReq = new ContractOptionDetailReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractOptionDetailReq);
        when(contractService.findContractOptionDetail(any(), anyLong()))
                .thenThrow(new CustomException(PRODUCT_NOT_FOUND));
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "계약 조건 상세 조회 실패 - 상품이 존재하지 않는 경우",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 조건 상세 조회 Request"))
                                .responseSchema(Schema.schema("계약 조건 상세 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_없는_계약_요청_승인_성공() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        ContractApproveRes result = new ContractApproveRes(1L, null);
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithoutContract(any(), anyLong()))
                .thenReturn(result);

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/approve?type=default")
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
                        "전자계약 없는 계약 요청 승인 성공",
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
                                                fieldWithPath("body.fileUrl").type(STRING).optional()
                                                        .description("Pdf가 저장된 Url(NULL)")

                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_없는_계약_요청_승인_실패_존재하지_않는_채팅방() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithoutContract(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/approve?type=default")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_FOUND.getMessage()))
                .andDo(document(
                        "전자계약 없는 계약 요청 승인 실패 - 존재하지 않는 채팅방",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")

                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_없는_계약_요청_승인_실패_소유자가_아님() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithoutContract(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_ENROLLED));

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/approve?type=default")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_ENROLLED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_ENROLLED.getMessage()))
                .andDo(document(
                        "전자계약 없는 계약 요청 승인 실패 - 소유자가 아님",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")

                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_없는_계약_요청_승인_실패_존재하지_않는_상품() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithoutContract(any(), anyLong()))
                .thenThrow(new CustomException(PRODUCT_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/approve?type=default")
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
                        "전자계약 없는 계약 요청 승인 실패 - 존재하지 않는 상품",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")

                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_없는_계약_요청_승인_실패_다른_사람이_거래중() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithoutContract(any(), anyLong()))
                .thenThrow(new CustomException(CONTRACT_IN_PROGRESS_BY_OTHERS));

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/approve?type=default")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_IN_PROGRESS_BY_OTHERS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_IN_PROGRESS_BY_OTHERS.getMessage()))
                .andDo(document(
                        "전자계약 없는 계약 요청 승인 실패 - 다른 사람이 거래중",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")

                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_없는_계약_요청_승인_실패_존재하지_않는_계약_요청() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithoutContract(any(), anyLong()))
                .thenThrow(new CustomException(CONTRACT_REQUEST_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/approve?type=default")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_REQUEST_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_REQUEST_NOT_FOUND.getMessage()))
                .andDo(document(
                        "전자계약 없는 계약 요청 승인 실패 - 존재하지 않는 계약 요청",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("내용 없음")

                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_있는_계약_요청_승인_성공() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        ContractApproveRes result = new ContractApproveRes(1L, "https://barobaro.s3.ap-northeast-2.amazonaws.com/contract/151ef683-a504-4a8d-9843-639d8fddeaf0_2024-10-04_22_21_39.pdf");
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithContract(any(), anyLong()))
                .thenReturn(result);

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
    public void 전자계약_있는_계약_요청_승인_실패_존재하지_않는_채팅방() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithContract(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_FOUND));

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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_FOUND.getMessage()))
                .andDo(document(
                        "전자계약 있는 계약 요청 승인 실패 - 존재하지 않는 채팅방",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_있는_계약_요청_승인_실패_물품_소유자가_아님() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithContract(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_ENROLLED));

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
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_ENROLLED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_ENROLLED.getMessage()))
                .andDo(document(
                        "전자계약 있는 계약 요청 승인 실패 - 물품 소유자가 아님",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_있는_계약_요청_승인_실패_존재하지_않는_상품() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithContract(any(), anyLong()))
                .thenThrow(new CustomException(PRODUCT_NOT_FOUND));

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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "전자계약 있는 계약 요청 승인 실패 - 존재하지 않는 상품",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_있는_계약_요청_승인_실패_분산락_획득_실패() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithContract(any(), anyLong()))
                .thenThrow(new CustomException(CONFLICT_WITH_OTHER));

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
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONFLICT_WITH_OTHER.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONFLICT_WITH_OTHER.getMessage()))
                .andDo(document(
                        "전자계약 있는 계약 요청 승인 실패 - 분산락 획득 실패",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_있는_계약_요청_승인_실패_다른_사람이_대여중() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithContract(any(), anyLong()))
                .thenThrow(new CustomException(CONTRACT_IN_PROGRESS_BY_OTHERS));

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
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_IN_PROGRESS_BY_OTHERS.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_IN_PROGRESS_BY_OTHERS.getMessage()))
                .andDo(document(
                        "전자계약 있는 계약 요청 승인 실패 - 다른 사람이 계약 진행중인 물품",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_있는_계약_요청_승인_실패_존재하지_않는_계약요청() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithContract(any(), anyLong()))
                .thenThrow(new CustomException(CONTRACT_REQUEST_NOT_FOUND));

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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_REQUEST_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_REQUEST_NOT_FOUND.getMessage()))
                .andDo(document(
                        "전자계약 있는 계약 요청 승인 실패 - 존재하지 않는 계약 요청",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("계약 요청 승인 Request"))
                                .responseSchema(Schema.schema("계약 요청 승인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 전자계약_있는_계약_요청_승인_실패_문서_생성중_에러발생() throws Exception {

        //given
        ContractApproveReq contractApproveReq = new ContractApproveReq(
                1L
        );
        String content = objectMapper.writeValueAsString(contractApproveReq);
        when(contractService.approveRequestWithContract(any(), anyLong()))
                .thenThrow(new CustomException(PDF_GENERATE_FAILED));

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
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PDF_GENERATE_FAILED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PDF_GENERATE_FAILED.getMessage()))
                .andDo(document(
                        "전자계약 있는 계약 요청 승인 실패 - 존재하지 않는 계약 요청",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
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

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        ContractSignedRes result = new ContractSignedRes(
                1L, "http://s3.url.com/contract/fileName", LocalDateTime.now()
        );
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenReturn(result);

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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
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
    public void 소유자_계약_서명_실패_존재하지_않는_채팅방() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_FOUND));

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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_FOUND.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 존재하지 않는 채팅방",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }


    @Test
    public void 소유자_계약_서명_실패_물품_소유자가_아님() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_ENROLLED));

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
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_ENROLLED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_ENROLLED.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 물품 소유자가 아님",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 소유자_계약_서명_실패_존재하지_않는_상품() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(PRODUCT_NOT_FOUND));

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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 존재하지 않는 상품",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 소유자_계약_서명_실패_등록된_PIN_없음() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(PIN_NOT_FOUND));

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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PIN_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PIN_NOT_FOUND.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 등록된 PIN 없음",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 소유자_계약_서명_실패_유효하지_않은_PIN() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(NOT_VALID_PIN_NUMBER));

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
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(NOT_VALID_PIN_NUMBER.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(NOT_VALID_PIN_NUMBER.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 유효하지 않은 PIN 번호",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 소유자_계약_서명_실패_분산락_획득_실패() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(CONFLICT_WITH_OTHER));

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
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONFLICT_WITH_OTHER.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONFLICT_WITH_OTHER.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 다른 사람이 거래중",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 소유자_계약_서명_실패_진행중인_계약_없음() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(CONTRACT_NOT_FOUND));

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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 진행 중인 계약 없음",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 소유자_계약_서명_실패_개인키_에러() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(PRIVATE_KEY_EXCEPTION));

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
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRIVATE_KEY_EXCEPTION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRIVATE_KEY_EXCEPTION.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 개인 키 에러",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 소유자_계약_서명_실패_인증서_에러() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(CERTIFICATE_EXCEPTION));

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
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CERTIFICATE_EXCEPTION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CERTIFICATE_EXCEPTION.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 인증서 에러",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("소유자 계약 서명 Request"))
                                .responseSchema(Schema.schema("소유자 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 소유자_계약_서명_실패_서명_에러() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addOwnerSignature(any(), anyLong()))
                .thenThrow(new CustomException(EXCEPTION_DURING_SIGNING));

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
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.header.httpStatusCode").value(EXCEPTION_DURING_SIGNING.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(EXCEPTION_DURING_SIGNING.getMessage()))
                .andDo(document(
                        "소유자 계약 서명 실패 - 서명 에러",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("승인 API 로 받아온 s3 전체 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
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

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        ContractSignedRes result = new ContractSignedRes(1L, "http://s3.url.com/contract/rentalSignedfileName", LocalDateTime.now());
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenReturn(result);
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
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

    @Test
    public void 빌리는_측_계약_서명_실패_존재하지_않는_채팅방() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_FOUND));
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_FOUND.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 존재하지 않는 채팅창",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_실패_채팅_참여자가_아님() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(CHATROOM_NOT_ENROLLED));
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
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CHATROOM_NOT_ENROLLED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CHATROOM_NOT_ENROLLED.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 참여하지 않는 채팅창",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_실패_존재하지_않는_상품() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(PRODUCT_NOT_FOUND));
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 존재하지 않는 상품",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_실패_설정된_PIN_없음() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(PIN_NOT_FOUND));
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PIN_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PIN_NOT_FOUND.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 설정된 PIN 없음",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_실패_유효하지_않은_PIN() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(NOT_VALID_PIN_NUMBER));
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
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(NOT_VALID_PIN_NUMBER.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(NOT_VALID_PIN_NUMBER.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 유효하지 않은 PIN",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_실패_다른_사람이_계약중() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(CONFLICT_WITH_OTHER));
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
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONFLICT_WITH_OTHER.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONFLICT_WITH_OTHER.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 다른 사람이 계약 중인 경우",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_실패_계약_정보_없음() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(CONTRACT_NOT_FOUND));
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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 계약 정보가 없는 경우",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_실패_비밀키_에러() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(PRIVATE_KEY_EXCEPTION));
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
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRIVATE_KEY_EXCEPTION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRIVATE_KEY_EXCEPTION.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 비밀키 에러",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_실패_인증서_에러() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(CERTIFICATE_EXCEPTION));
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
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CERTIFICATE_EXCEPTION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CERTIFICATE_EXCEPTION.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 인증서 에러",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌리는_측_계약_서명_실패_서명_에러() throws Exception {

        //given
        SignatureAddReq signatureAddReq = new SignatureAddReq(
                1L, "123456", "data:image/png;base64,imgData==", "signatureData"
        );

        String content = objectMapper.writeValueAsString(signatureAddReq);
        when(contractService.addRentalSignature(any(), anyLong()))
                .thenThrow(new CustomException(EXCEPTION_DURING_SIGNING));
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
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.header.httpStatusCode").value(EXCEPTION_DURING_SIGNING.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(EXCEPTION_DURING_SIGNING.getMessage()))
                .andDo(document(
                        "빌리는 측 계약 서명 실패 - 서명 에러",
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
                                                fieldWithPath("signatureData").type(STRING).description("서명 이미지 BASE64 인코딩된 값"),
                                                fieldWithPath("s3FileUrl").type(STRING).description("서명할 문서의 s3 주소")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("정보 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("빌리는 측 계약 서명 Request"))
                                .responseSchema(Schema.schema("빌리는 측 계약 서명 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 물품_수령_확인_성공() throws Exception {

        //given
        ProductTakeBackReq productTakeBackReq = new ProductTakeBackReq(
                10000L
        );

        String content = objectMapper.writeValueAsString(productTakeBackReq);

        //when
        ResultActions actions = mockMvc.perform(
                post("/contracts/terminate")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CONTRACT_TERMINATED_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CONTRACT_TERMINATED_OK.getMessage()))
                .andDo(document(
                        "물품 수령 확인 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Contract API")
                                .summary("물품 수령 확인 API")
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
                                                        .description("현재 대화중인 채팅방 Id")
                                        )
                                )
                                .requestSchema(Schema.schema("물품 수령 확인 Request"))
                                .responseSchema(Schema.schema("물품 수령 확인 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 물품_영상_제출_성공() throws Exception {

        //given
        Long chatRoomId = 10000L;
        MockMultipartFile file = new MockMultipartFile("file", "originalName.mp4", "video/type", "originalName.mp4".getBytes());

        //when

        ResultActions actions = mockMvc.perform(
                multipart("/contracts/{chatRoomId}/video", chatRoomId)
                        .file(file)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_VIDEO_UPLOADED_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_VIDEO_UPLOADED_OK.getMessage()))
                .andDo(document(
                        "물품_영상_제출_성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Contract API")
                                .summary("물품 영상 제출 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("chatRoomId").description("현재 대화중인 채팅방 Id")
                                )

                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.videoUrl").type(STRING)
                                                        .description("업로드 된 동영상 Url")
                                        )
                                )
                                .requestSchema(Schema.schema("물품 영상 제출 Request"))
                                .responseSchema(Schema.schema("물품 영상 제출 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 물품_영상_정보_조회_성공() throws Exception {

        //given
        Long chatRoomId = 10000L;

        //when

        ResultActions actions = mockMvc.perform(
                get("/contracts/{chatRoomId}/video", chatRoomId)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_VIDEO_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_VIDEO_DETAILS_OK.getMessage()))
                .andDo(document(
                        "물품_영상_정보_조회_성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Contract API")
                                .summary("물품 영상 정보 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .pathParameters(
                                        parameterWithName("chatRoomId").description("현재 대화중인 채팅방 Id")
                                )

                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.videoUrl").type(STRING)
                                                        .description("업로드 된 동영상 Url")
                                        )
                                )
                                .requestSchema(Schema.schema("물품 영상 정보 조회 Request"))
                                .responseSchema(Schema.schema("물품 영상 정보 조회 Response"))
                                .build()
                        ))
                );
    }
}
