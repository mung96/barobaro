package baro.baro.domain.noti.controller;

import baro.baro.domain.noti.dto.response.NotiDto;
import baro.baro.domain.noti.dto.response.NotiListRes;
import baro.baro.domain.noti.service.NotiService;
import baro.baro.global.oauth.jwt.service.JwtService;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
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

import java.util.ArrayList;
import java.util.List;

import static baro.baro.domain.noti.entity.NotiType.CONTRACT_REQUEST;
import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.SuccessCode.NOTIFICATION_LIST_OK;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.JsonFieldType.STRING;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser
@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith(RestDocumentationExtension.class)
class NotiControllerTest {
	private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
	private final static Boolean isCertificated = false;

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private JwtService jwtService;

	@MockBean
	private NotiService notiService;

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
	public void 알림_리스트_조회_성공() throws Exception {
		//given
		List<NotiDto> notis = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
			String fromMemberId = java.util.UUID.randomUUID().toString();
			NotiDto dto = NotiDto.builder()
					.message("ㅇㅇㅇ" + "님이 계약 요청을 했습니다.")
					.fromMemberId(fromMemberId)
					.fromMemberImage(
							"https://static.coupangcdn.com/image/coupang/common/pc_header_img_sprite_new_gnb.svg#person")
					.fromMemberNickName("멤버 닉네임")
					.notiType(CONTRACT_REQUEST)
					.build();
			notis.add(dto);
		}

		NotiListRes result = new NotiListRes(notis);

		when(notiService.getNotiList(anyLong())).thenReturn(result);

		//when
		ResultActions actions = mockMvc.perform(
			get("/notifications")
				.header("Authorization", jwtToken)
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
		);

		// then
		actions
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.header.httpStatusCode").value(NOTIFICATION_LIST_OK.getHttpStatusCode()))
			.andExpect(jsonPath("$.header.message").value(NOTIFICATION_LIST_OK.getMessage()))
			.andDo(document(
				"알림 리스트 조회",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				resource(ResourceSnippetParameters.builder()
					.tag("Notification API")
					.summary("알림 리스트 조회 API")
					.requestHeaders(
						headerWithName("Authorization")
							.description("JWT 토큰")
					)
					.responseFields(
						getCommonResponseFields(
							fieldWithPath("body.*[].message").type(STRING)
								.description("알림 메시지"),
							fieldWithPath("body.*[].fromMemberId").type(STRING)
								.description("요청한 사람의 UUID"),
							fieldWithPath("body.*[].fromMemberImage").type(STRING)
								.description("요청한 사람의 프로필사진"),
							fieldWithPath("body.*[].fromMemberNickName").type(STRING)
								.description("요청한 사람의 닉네임"),
							fieldWithPath("body.*[].notiType").type(STRING)
								.description("알림 종류")
						)
					)
					.responseSchema(Schema.schema("알림 리스트 조회 Response"))
					.build()
				))
			);
	}
}
