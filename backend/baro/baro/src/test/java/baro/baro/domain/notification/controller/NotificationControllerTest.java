package baro.baro.domain.notification.controller;

import static baro.baro.global.ResponseFieldUtils.*;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.*;
import static com.epages.restdocs.apispec.ResourceDocumentation.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.google.gson.Gson;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
class NotificationControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private Gson gson;

	private final static String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

	@Test
	public void 알림_리스트_조회_성공() throws Exception {
		//given

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
							fieldWithPath("body.*[].message").type(JsonFieldType.STRING)
								.description("알림 메시지"),
							fieldWithPath("body.*[].fromMemberId").type(JsonFieldType.STRING)
								.description("요청한 사람의 UUID"),
							fieldWithPath("body.*[].notificationType").type(JsonFieldType.STRING)
								.description("알림 종류")
						)
					)
					.responseSchema(Schema.schema("알림 리스트 조회 Response"))
					.build()
				))
			);
	}
}
