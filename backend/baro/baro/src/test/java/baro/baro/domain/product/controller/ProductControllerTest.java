package baro.baro.domain.product.controller;

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
import static baro.baro.global.statuscode.SuccessCode.RENTAL_PRODUCT_LIST_OK;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Transactional
class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final static String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    @Test
    public void 빌린_내역_리스트_조회_성공() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/members/me/rental")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(RENTAL_PRODUCT_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(RENTAL_PRODUCT_LIST_OK.getMessage()))
                .andDo(document(
                        "빌린 내역 리스트 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("빌린 내역 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.*[].product_id").type(JsonFieldType.NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.*[].product_main_image").type(JsonFieldType.STRING)
                                                        .description("대여 물품 대표 이미지"),
                                                fieldWithPath("body.*[].title").type(JsonFieldType.STRING)
                                                        .description("대여 물품 제목"),
                                                fieldWithPath("body.*[].title").type(JsonFieldType.STRING)
                                                        .description("대여 물품 제목"),
                                                fieldWithPath("body.*[].startDate").type(JsonFieldType.STRING)
                                                        .description("대여 시작일"),
                                                fieldWithPath("body.*[].endDate").type(JsonFieldType.STRING)
                                                        .description("대여 마감일"),
                                                fieldWithPath("body.*[].rentalFee").type(JsonFieldType.NUMBER)
                                                        .description("대여비"),
                                                fieldWithPath("body.*[].productStatus").type(JsonFieldType.STRING)
                                                        .description("대여 상태")

                                        )
                                )
                                .responseSchema(Schema.schema("빌린 내역 리스트 조회 Response"))
                                .build()
                        ))
                );
    }
}
