package baro.baro.domain.member.controller;

import baro.baro.domain.member.dto.request.PasswordModifyReq;
import baro.baro.domain.member.dto.request.ProfileModifyReq;
import baro.baro.domain.member.dto.request.SignupReq;
import baro.baro.domain.member.dto.response.SignUpInfoRes;
import baro.baro.domain.member.service.MemberService;
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

import java.util.ArrayList;
import java.util.List;

import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.ErrorCode.INVALID_NICKNAME;
import static baro.baro.global.statuscode.ErrorCode.LOCATION_NOT_FOUND;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.mockito.ArgumentMatchers.any;
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
class MemberControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private MemberService memberService;

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
    public void 회원가입_성공() throws Exception {
        // given
        SignupReq req = new SignupReq();
        req.setEmail("test@gmail.com");
        req.setProviderType("google");
        req.setNickname("Member123");
        req.setProfileImage("s3 url");

        List<Long> memberLocationReq = new ArrayList<>();
        memberLocationReq.add(11010530L);
        memberLocationReq.add(11010540L);

        req.setLocations(memberLocationReq);

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(req));
        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        when(memberService.signup(any(), any())).thenReturn(MEMBER_CREATED.getMessage());

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/members/signup")
                        .file(dto)
                        .file(file)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(MEMBER_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(MEMBER_CREATED.getMessage()))
                .andDo(document(
                        "회원가입",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Member API")
                                .summary("회원가입 API")
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("회원 가입 Request"))
                                .responseSchema(Schema.schema("회원 가입 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 회원가입_실패_닉네임_10자_이상() throws Exception {
        // given
        SignupReq req = new SignupReq();
        req.setEmail("test@gmail.com");
        req.setProviderType("google");
        req.setNickname("Member1234535");
        req.setProfileImage("s3 url");

        List<Long> memberLocationReq = new ArrayList<>();
        memberLocationReq.add(11010530L);
        memberLocationReq.add(11010531L);

        req.setLocations(memberLocationReq);

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(req));
        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        when(memberService.signup(any(), any()))
                .thenThrow(new CustomException(INVALID_NICKNAME));

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/members/signup")
                        .file(dto)
                        .file(file)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_NICKNAME.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_NICKNAME.getMessage()))
                .andDo(document(
                        "회원가입 실패 - 올바르지 않은 닉네임 형식",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Member API")
                                .summary("회원가입 API")
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").
                                                        type(OBJECT).description("에러 상세")
                                                        .optional().ignored()
                                        )
                                )
                                .requestSchema(Schema.schema("회원 가입 Request"))
                                .responseSchema(Schema.schema("회원 가입 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 회원가입_실패_존재하지_않는_지역() throws Exception {
        //given
        SignupReq req = new SignupReq();
        req.setEmail("test@gmail.com");
        req.setProviderType("google");
        req.setNickname("Member12");
        req.setProfileImage("s3 url");

        List<Long> memberLocationReq = new ArrayList<>();
        memberLocationReq.add(11010530L);
        memberLocationReq.add(11010531L);

        req.setLocations(memberLocationReq);

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(req));
        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        when(memberService.signup(any(), any()))
                .thenThrow(new CustomException(LOCATION_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/members/signup")
                        .file(dto)
                        .file(file)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(LOCATION_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(LOCATION_NOT_FOUND.getMessage()))
                .andDo(document(
                        "회원가입 실패 - 존재하지 않는 지역",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Member API")
                                .summary("회원가입 API")
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").
                                                        type(OBJECT).description("에러 상세")
                                                        .optional().ignored()
                                        )
                                )
                                .requestSchema(Schema.schema("회원 가입 Request"))
                                .responseSchema(Schema.schema("회원 가입 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 로그아웃_성공() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/members/logout")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(MEMBER_LOGOUT.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(MEMBER_LOGOUT.getMessage()))
                .andDo(document(
                        "로그아웃",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Member API")
                                .summary("로그아웃 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("로그아웃 Request"))
                                .responseSchema(Schema.schema("로그아웃 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 회원가입을_위한_회원_정보조회_성공()  throws Exception {
        //given
        SignUpInfoRes res = new SignUpInfoRes("KAKAO", "test@naver.com", "닉네임", "src");

        when(memberService.signupDetails(any())).thenReturn(res);

        // when
        ResultActions actions = mockMvc.perform(
                get("/members/signup/info")
                        .param("key", "test@naver.com")
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(MEMBER_SIGNUP_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(MEMBER_SIGNUP_DETAILS_OK.getMessage()))
                .andDo(document(
                        "회원가입을 위한 회원 정보조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Member API")
                                .summary("회원가입을 위한 회원 정보조회 API")
                                .queryParameters(
                                        parameterWithName("key").description("이메일주소")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.providerType").type(STRING)
                                                        .description("소셜 종류"),
                                                fieldWithPath("body.email").type(STRING)
                                                        .description("이메일"),
                                                fieldWithPath("body.nickName").type(STRING)
                                                        .description("닉네임"),
                                                fieldWithPath("body.profileImage").type(STRING)
                                                        .description("프로필 사진")
                                        )
                                )
                                .requestSchema(Schema.schema("회원가입을 위한 회원 정보조회 Request"))
                                .responseSchema(Schema.schema("회원가입을 위한 회원 정보조회 Response"))
                                .build()
                        ))
                );
    }

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
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PASSWORD_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PASSWORD_MODIFIED.getMessage()))
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
                                                fieldWithPath("nowPassword").type(STRING).description("기존 PIN번호"),
                                                fieldWithPath("modifyPassword").type(STRING).description("변경할 PIN번호"),
                                                fieldWithPath("checkPassword").type(STRING).description("변경할 PIN번호 확인")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.password").type(STRING).description("변경된 PIN번호")
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
                                                fieldWithPath("body.profileImage").type(STRING)
                                                        .description("프로필 이미지"),
                                                fieldWithPath("body.nickname").type(STRING)
                                                        .description("닉네임"),
                                                fieldWithPath("body.phoneNumber").type(STRING)
                                                        .description("핸드폰 번호"),
                                                fieldWithPath("body.email").type(STRING)
                                                        .description("이메일"),
                                                fieldWithPath("body.name").type(STRING)
                                                        .description("이름")
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
        ProfileModifyReq req = new ProfileModifyReq("수정할 닉네임");

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(req));
        MockMultipartFile file = new MockMultipartFile("file", "sample.jpg", "image/jpeg", "image/sample.jpg".getBytes());

        // when
        ResultActions actions = mockMvc.perform(
                multipart("/members/me/profile")
                        .file(dto)
                        .file(file)
                        .header("Authorization", jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PROFILE_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PROFILE_MODIFIED.getMessage()))
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
                                                fieldWithPath("body.profileImage").type(STRING)
                                                        .description("프로필 이미지"),
                                                fieldWithPath("body.nickname").type(STRING)
                                                        .description("닉네임"),
                                                fieldWithPath("body.phoneNumber").type(STRING)
                                                        .description("핸드폰 번호"),
                                                fieldWithPath("body.email").type(STRING)
                                                        .description("이메일"),
                                                fieldWithPath("body.name").type(STRING)
                                                        .description("이름")
                                        )
                                )
                                .requestSchema(Schema.schema("프로필 수정 Request"))
                                .responseSchema(Schema.schema("프로필 수정 Response"))
                                .build()
                        ))
                );
    }
}
