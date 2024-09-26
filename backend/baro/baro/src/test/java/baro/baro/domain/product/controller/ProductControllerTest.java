package baro.baro.domain.product.controller;

import baro.baro.domain.contract.dto.request.ContractConditionReq;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.request.ProductModifyReq;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.global.oauth.jwt.service.JwtService;
import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.epages.restdocs.apispec.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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
import java.util.ArrayList;
import java.util.List;

import static baro.baro.domain.product.entity.Category.LIGHT_STICK;
import static baro.baro.domain.product.entity.ReturnType.DIRECT;
import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.*;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
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
class ProductControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

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
    public void 대여_물품_등록_성공() throws Exception {
        //given
        List<ReturnType> returnTypes = new ArrayList<>();
        returnTypes.add(DIRECT);

        ContractConditionReq contractConditionReq = new ContractConditionReq(
                "물품 이름", "물품 일련번호", "제조사 또는 공식 수입사의 AS 센터",
                5, 2, 7, 7);

        ProductAddReq productAddReq = new ProductAddReq("제목",
                LocalDate.of(2024, 9, 30),
                LocalDate.of(2024, 10, 24),
                15000,
                "고척스카이돔 중앙출입문C게이트앞",
                37.50,
                126.87,
                returnTypes,
                "서울특별시 강남구 테헤란로 212",
                "본문내용본문내용용용",
                LIGHT_STICK,
                contractConditionReq);

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", mapper.writeValueAsBytes(productAddReq));

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/products")
                        .file(file1)
                        .file(file2)
                        .file(dto)
                        .header("Authorization", jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_CREATED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_CREATED.getMessage()))
                .andDo(document(
                        "대여 물품 등록 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("대여 물품 등록 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.productId").type(NUMBER)
                                                        .description("물품 ID"),
                                                fieldWithPath("body.writerId").type(STRING)
                                                        .description("작성자 ID(UUID)"),
                                                fieldWithPath("body.writerProfileImage").type(STRING)
                                                        .description("작성자 프로필 url"),
                                                fieldWithPath("body.writerNickname").type(STRING)
                                                        .description("작성자 닉네임"),
                                                fieldWithPath("body.imageList[]").type(ARRAY)
                                                        .description("물품 이미지 URL 리스트"),
                                                fieldWithPath("body.productStatus").type(STRING)
                                                        .description("물품 상태"),
                                                fieldWithPath("body.title").type(STRING)
                                                        .description("게시글 제목"),
                                                fieldWithPath("body.category").type(STRING)
                                                        .description("물품 카테고리"),
                                                fieldWithPath("body.dong").type(STRING)
                                                        .description("직거래 동네"),
                                                fieldWithPath("body.createdAt").type(STRING)
                                                        .description("물품 등록 시간"),
                                                fieldWithPath("body.wishCount").type(NUMBER)
                                                        .description("찜한 사람 수"),
                                                fieldWithPath("body.content").type(STRING)
                                                        .description("게시글 본문"),
                                                fieldWithPath("body.place").type(STRING)
                                                        .description("직거래 세부 장소"),
                                                fieldWithPath("body.latitude").type(NUMBER)
                                                        .description("위도"),
                                                fieldWithPath("body.longitude").type(NUMBER)
                                                        .description("경도"),
                                                fieldWithPath("body.isWriteContract").type(BOOLEAN)
                                                        .description("전자계약서 작성여부"),
                                                fieldWithPath("body.contractCondition.repairVendor").type(STRING)
                                                        .description("수리 업체").optional(),
                                                fieldWithPath("body.contractCondition.overdueCriteria").type(NUMBER)
                                                        .description("무단 연체 기준").optional(),
                                                fieldWithPath("body.contractCondition.overdueFee").type(NUMBER)
                                                        .description("무단 연체 가격").optional(),
                                                fieldWithPath("body.contractCondition.theftCriteria").type(NUMBER)
                                                        .description("도난 기준").optional(),
                                                fieldWithPath("body.contractCondition.refundDeadline").type(NUMBER)
                                                        .description("청구 비용 기준").optional(),
                                                fieldWithPath("body.returnTypes[]").type(ARRAY)
                                                        .description("물품 반환 방법"),
                                                fieldWithPath("body.startDate").type(STRING)
                                                        .description("물품 대여 시작일"),
                                                fieldWithPath("body.endDate").type(STRING)
                                                        .description("물품 대여 반납일"),
                                                fieldWithPath("body.rentalFee").type(NUMBER)
                                                        .description("물품 대여비"),
                                                fieldWithPath("body.isMine").type(BOOLEAN)
                                                        .description("나의 게시글 여부")

                                        )
                                )
                                .requestSchema(Schema.schema("대여 물품 등록 Request"))
                                .responseSchema(Schema.schema("대여 물품 등록 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 대여_물품_상세_조회_성공() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/products/{productId}", 1L)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_DETAILS_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_DETAILS_OK.getMessage()))
                .andDo(document(
                        "대여 물품 상세 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("대여 물품 상세 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.productId").type(NUMBER)
                                                        .description("물품 ID"),
                                                fieldWithPath("body.writerId").type(STRING)
                                                        .description("작성자 ID(UUID)"),
                                                fieldWithPath("body.writerProfileImage").type(STRING)
                                                        .description("작성자 프로필 url"),
                                                fieldWithPath("body.writerNickname").type(STRING)
                                                        .description("작성자 닉네임"),
                                                fieldWithPath("body.imageList[]").type(ARRAY)
                                                        .description("물품 이미지 URL 리스트"),
                                                fieldWithPath("body.productStatus").type(STRING)
                                                        .description("물품 상태"),
                                                fieldWithPath("body.title").type(STRING)
                                                        .description("게시글 제목"),
                                                fieldWithPath("body.category").type(STRING)
                                                        .description("물품 카테고리"),
                                                fieldWithPath("body.dong").type(STRING)
                                                        .description("직거래 동네"),
                                                fieldWithPath("body.createdAt").type(STRING)
                                                        .description("물품 등록 시간"),
                                                fieldWithPath("body.wishCount").type(NUMBER)
                                                        .description("찜한 사람 수"),
                                                fieldWithPath("body.content").type(STRING)
                                                        .description("게시글 본문"),
                                                fieldWithPath("body.place").type(STRING)
                                                        .description("직거래 세부 장소"),
                                                fieldWithPath("body.latitude").type(NUMBER)
                                                        .description("위도"),
                                                fieldWithPath("body.longitude").type(NUMBER)
                                                        .description("경도"),
                                                fieldWithPath("body.isWriteContract").type(BOOLEAN)
                                                        .description("전자계약서 작성여부"),
                                                fieldWithPath("body.contractCondition.repairVendor").type(STRING)
                                                        .description("수리 업체"),
                                                fieldWithPath("body.contractCondition.overdueCriteria").type(NUMBER)
                                                        .description("무단 연체 기준"),
                                                fieldWithPath("body.contractCondition.overdueFee").type(NUMBER)
                                                        .description("무단 연체 가격"),
                                                fieldWithPath("body.contractCondition.theftCriteria").type(NUMBER)
                                                        .description("도난 기준"),
                                                fieldWithPath("body.contractCondition.refundDeadline").type(NUMBER)
                                                        .description("청구 비용 기준"),
                                                fieldWithPath("body.returnTypes[]").type(ARRAY)
                                                        .description("물품 반환 방법"),
                                                fieldWithPath("body.startDate").type(STRING)
                                                        .description("물품 대여 시작일"),
                                                fieldWithPath("body.endDate").type(STRING)
                                                        .description("물품 대여 반납일"),
                                                fieldWithPath("body.rentalFee").type(NUMBER)
                                                        .description("물품 대여비"),
                                                fieldWithPath("body.isMine").type(BOOLEAN)
                                                        .description("나의 게시글 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("대여 물품 상세 조회 Request"))
                                .responseSchema(Schema.schema("대여 물품 상세 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 최근_본_대여_물품_리스트_조회_성공() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/products/recently-viewed")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_RECENTLY_VIEWED_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_RECENTLY_VIEWED_LIST_OK.getMessage()))
                .andDo(document(
                        "최근 본 대여 물품 리스트 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("최근 본 대여 물품 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.[].productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.[].productMainImage").type(STRING)
                                                        .description("대여 물품 대표 이미지"),
                                                fieldWithPath("body.[].isWished").type(BOOLEAN)
                                                        .description("찜한 여부"),
                                                fieldWithPath("body.[].startDate").type(STRING)
                                                        .description("대여 시작일"),
                                                fieldWithPath("body.[].endDate").type(STRING)
                                                        .description("대여 마감일"),
                                                fieldWithPath("body.[].rentalFee").type(NUMBER)
                                                        .description("대여비"),
                                                fieldWithPath("body.[].title").type(STRING)
                                                        .description("게시글 제목")

                                        )
                                )
                                .responseSchema(Schema.schema("최근 본 대여 물품 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 최근_올라온_대여_물품_리스트_조회_성공() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/products/recently-uploaded")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_RECENTLY_UPLOADED_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_RECENTLY_UPLOADED_LIST_OK.getMessage()))
                .andDo(document(
                        "최근 올라온 대여 물품 리스트 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("최근 올라온 대여 물품 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.[].productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.[].productMainImage").type(STRING)
                                                        .description("대여 물품 대표 이미지"),
                                                fieldWithPath("body.[].isWished").type(BOOLEAN)
                                                        .description("찜한 여부"),
                                                fieldWithPath("body.[].startDate").type(STRING)
                                                        .description("대여 시작일"),
                                                fieldWithPath("body.[].endDate").type(STRING)
                                                        .description("대여 마감일"),
                                                fieldWithPath("body.[].rentalFee").type(NUMBER)
                                                        .description("대여비"),
                                                fieldWithPath("body.[].title").type(STRING)
                                                        .description("게시글 제목")

                                        )
                                )
                                .responseSchema(Schema.schema("최근 올라온 대여 물품 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 대여_물품_수정_성공() throws Exception {
        //given
        List<ReturnType> returnTypes = new ArrayList<>();
        returnTypes.add(DIRECT);

        ContractConditionReq contractConditionReq = new ContractConditionReq(
                "물품 이름", "물품 일련번호", "제조사 또는 공식 수입사의 AS 센터",
                5, 2, 7, 7);

        ProductModifyReq productModifyReq = new ProductModifyReq("제목",
                LocalDate.of(2024, 9, 30),
                LocalDate.of(2024, 10, 24),
                15000,
                "고척스카이돔 중앙출입문C게이트앞",
                37.50,
                126.87,
                returnTypes,
                "서울특별시 강남구 테헤란로 212",
                "본문내용본문내용용용",
                LIGHT_STICK,
                contractConditionReq);

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", mapper.writeValueAsBytes(productModifyReq));

        //when
        ResultActions actions = mockMvc.perform(
                multipart("/products/{productId}", 1L)
                        .file(file1)
                        .file(file2)
                        .file(dto)
                        .header("Authorization", jwtToken)
                        .contentType("multipart/form-data")
                        .accept(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_MODIFIED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_MODIFIED.getMessage()))
                .andDo(document(
                        "대여 물품 수정 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("대여 물품 수정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.productId").type(NUMBER)
                                                        .description("물품 ID"),
                                                fieldWithPath("body.writerId").type(STRING)
                                                        .description("작성자 ID(UUID)"),
                                                fieldWithPath("body.writerProfileImage").type(STRING)
                                                        .description("작성자 프로필 url"),
                                                fieldWithPath("body.writerNickname").type(STRING)
                                                        .description("작성자 닉네임"),
                                                fieldWithPath("body.imageList[]").type(ARRAY)
                                                        .description("물품 이미지 URL 리스트"),
                                                fieldWithPath("body.productStatus").type(STRING)
                                                        .description("물품 상태"),
                                                fieldWithPath("body.title").type(STRING)
                                                        .description("게시글 제목"),
                                                fieldWithPath("body.category").type(STRING)
                                                        .description("물품 카테고리"),
                                                fieldWithPath("body.dong").type(STRING)
                                                        .description("직거래 동네"),
                                                fieldWithPath("body.createdAt").type(STRING)
                                                        .description("물품 등록 시간"),
                                                fieldWithPath("body.wishCount").type(NUMBER)
                                                        .description("찜한 사람 수"),
                                                fieldWithPath("body.content").type(STRING)
                                                        .description("게시글 본문"),
                                                fieldWithPath("body.place").type(STRING)
                                                        .description("직거래 세부 장소"),
                                                fieldWithPath("body.latitude").type(NUMBER)
                                                        .description("위도"),
                                                fieldWithPath("body.longitude").type(NUMBER)
                                                        .description("경도"),
                                                fieldWithPath("body.isWriteContract").type(BOOLEAN)
                                                        .description("전자계약서 작성여부"),
                                                fieldWithPath("body.contractCondition.repairVendor").type(STRING)
                                                        .description("수리 업체"),
                                                fieldWithPath("body.contractCondition.overdueCriteria").type(NUMBER)
                                                        .description("무단 연체 기준"),
                                                fieldWithPath("body.contractCondition.overdueFee").type(NUMBER)
                                                        .description("무단 연체 가격"),
                                                fieldWithPath("body.contractCondition.theftCriteria").type(NUMBER)
                                                        .description("도난 기준"),
                                                fieldWithPath("body.contractCondition.refundDeadline").type(NUMBER)
                                                        .description("청구 비용 기준"),
                                                fieldWithPath("body.returnTypes[]").type(ARRAY)
                                                        .description("물품 반환 방법"),
                                                fieldWithPath("body.startDate").type(STRING)
                                                        .description("물품 대여 시작일"),
                                                fieldWithPath("body.endDate").type(STRING)
                                                        .description("물품 대여 반납일"),
                                                fieldWithPath("body.rentalFee").type(NUMBER)
                                                        .description("물품 대여비"),
                                                fieldWithPath("body.isMine").type(BOOLEAN)
                                                        .description("나의 게시글 여부")

                                        )
                                )
                                .requestSchema(Schema.schema("대여 물품 수정 Request"))
                                .responseSchema(Schema.schema("대여 물품 수정 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 대여_물품_삭제_성공() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                delete("/products/{productId}", 1L)
                        .header("Authorization", jwtToken)
                        .characterEncoding("UTF-8")
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isNoContent())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_DELETED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_DELETED.getMessage()))
                .andDo(document(
                        "대여 물품 삭제 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("대여 물품 삭제 API")
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
                                .responseSchema(Schema.schema("대여 물품 삭제 Response"))
                                .build()
                        ))
                );
    }

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
                                                fieldWithPath("body.*[].productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.*[].productMainImage").type(STRING)
                                                        .description("대여 물품 대표 이미지"),
                                                fieldWithPath("body.*[].title").type(STRING)
                                                        .description("대여 물품 제목"),
                                                fieldWithPath("body.*[].title").type(STRING)
                                                        .description("대여 물품 제목"),
                                                fieldWithPath("body.*[].startDate").type(STRING)
                                                        .description("대여 시작일"),
                                                fieldWithPath("body.*[].endDate").type(STRING)
                                                        .description("대여 마감일"),
                                                fieldWithPath("body.*[].rentalFee").type(NUMBER)
                                                        .description("대여비"),
                                                fieldWithPath("body.*[].productStatus").type(STRING)
                                                        .description("대여 상태")

                                        )
                                )
                                .responseSchema(Schema.schema("빌린 내역 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌려준_내역_리스트_조회_성공() throws Exception {
        // given


        // when
        ResultActions actions = mockMvc.perform(
                get("/members/me/owner")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(OWNER_PRODUCT_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(OWNER_PRODUCT_LIST_OK.getMessage()))
                .andDo(document(
                        "빌려준 내역 리스트 조회",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("빌려준 내역 리스트 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.*[].productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.*[].productMainImage").type(STRING)
                                                        .description("대여 물품 대표 이미지"),
                                                fieldWithPath("body.*[].title").type(STRING)
                                                        .description("대여 물품 제목"),
                                                fieldWithPath("body.*[].title").type(STRING)
                                                        .description("대여 물품 제목"),
                                                fieldWithPath("body.*[].startDate").type(STRING)
                                                        .description("대여 시작일"),
                                                fieldWithPath("body.*[].endDate").type(STRING)
                                                        .description("대여 마감일"),
                                                fieldWithPath("body.*[].rentalFee").type(NUMBER)
                                                        .description("대여비"),
                                                fieldWithPath("body.*[].productStatus").type(STRING)
                                                        .description("대여 상태")

                                        )
                                )
                                .responseSchema(Schema.schema("빌려준 내역 리스트 조회 Response"))
                                .build()
                        ))
                );
    }
}
