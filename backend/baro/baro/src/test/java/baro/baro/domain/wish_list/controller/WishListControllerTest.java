package baro.baro.domain.wish_list.controller;

import baro.baro.domain.product.dto.SearchProductDto;
import baro.baro.domain.product.dto.response.SearchProductRes;
import baro.baro.domain.wish_list.dto.WishDto;
import baro.baro.domain.wish_list.dto.response.MyWishListRes;
import baro.baro.domain.wish_list.service.WishListService;
import baro.baro.global.oauth.jwt.service.JwtService;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.formatter.DateFormatter.calculateTime;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.BOOLEAN;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.NUMBER;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.JsonFieldType.NULL;
import static org.springframework.restdocs.payload.JsonFieldType.STRING;
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
public class WishListControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private WishListService wishListService;

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
    public void 관심내역_추가_성공() throws Exception {
        //given
        WishDto result = new WishDto(true, 3);

        when(wishListService.addWishList(anyLong(), anyLong())).thenReturn(result);

        //when
        ResultActions actions = mockMvc.perform(
                post("/wish-list/{productId}", 1L)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(WISH_LIST_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(WISH_LIST_CREATED.getMessage()))
                .andDo(document(
                        "관심 내역 추가",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("WishList API")
                                .summary("관심 내역 추가 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.isWished").type(BOOLEAN)
                                                        .description("찜 여부"),
                                                fieldWithPath("body.wishCount").type(NUMBER)
                                                        .description("찜한 사람 수")
                                        )
                                )
                                .requestSchema(Schema.schema("관심 내역 추가 Request"))
                                .responseSchema(Schema.schema("관심 내역 추가 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 관심내역_삭제_성공() throws Exception {
        //given
        WishDto result = new WishDto(false, 3);

        when(wishListService.deleteWishList(anyLong(), anyLong())).thenReturn(result);

        //when
        ResultActions actions = mockMvc.perform(
                delete("/wish-list/{productId}", 1L)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(WISH_LIST_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(WISH_LIST_DELETED.getMessage()))
                .andDo(document(
                        "관심 내역 삭제",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("WishList API")
                                .summary("관심 내역 삭제 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.isWished").type(BOOLEAN)
                                                        .description("찜 여부"),
                                                fieldWithPath("body.wishCount").type(NUMBER)
                                                        .description("찜한 사람 수")
                                        )
                                )
                                .requestSchema(Schema.schema("관심 내역 삭제 Request"))
                                .responseSchema(Schema.schema("관심 내역 삭제 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 관심내역_조회_성공() throws Exception {
        // given
        List<SearchProductDto> products = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            Long id = 10000L + i;

            SearchProductDto dto = SearchProductDto.builder()
                    .productId(id)
                    .productMainImage("대표 이미지 " + id)
                    .title("제목 " + id)
                    .startDate(LocalDate.of(2024, 1, 2))
                    .endDate(LocalDate.of(2024, 5, 24))
                    .dong("역삼동")
                    .uploadDate(calculateTime(LocalDateTime.now()))
                    .rentalFee(100000)
                    .wishCount(10*i)
                    .build();

            products.add(dto);
        }

        MyWishListRes result = new MyWishListRes(products);

        when(wishListService.getWishList(anyLong())).thenReturn(result);

        // when
        ResultActions actions = mockMvc.perform(
                get("/wish-list")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(WISH_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(WISH_LIST_OK.getMessage()))
                .andDo(document(
                        "관심내역 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("WishList API")
                                .summary("관심내역 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.products[].productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.products[].productMainImage").type(JsonFormatTypes.STRING)
                                                        .description("대여 물품 대표 이미지"),
                                                fieldWithPath("body.products[].title").type(JsonFormatTypes.STRING)
                                                        .description("대여 물품 제목"),
                                                fieldWithPath("body.products[].startDate").type(JsonFormatTypes.STRING)
                                                        .description("대여 시작일"),
                                                fieldWithPath("body.products[].endDate").type(JsonFormatTypes.STRING)
                                                        .description("대여 마감일"),
                                                fieldWithPath("body.products[].dong").type(JsonFormatTypes.STRING)
                                                        .description("거래 희망 동 정보"),
                                                fieldWithPath("body.products[].uploadDate").type(JsonFormatTypes.STRING)
                                                        .description("게시글 작성일"),
                                                fieldWithPath("body.products[].rentalFee").type(NUMBER)
                                                        .description("대여비"),
                                                fieldWithPath("body.products[].wishCount").type(NUMBER)
                                                        .description("찜한 사람 수")
                                        )
                                )
                                .requestSchema(Schema.schema("관심 내역 조회 Request"))
                                .responseSchema(Schema.schema("관심 내역 조회 Response"))
                                .build()
                        ))
                );
    }
}
