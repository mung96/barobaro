package baro.baro.domain.product.controller;

import baro.baro.domain.contract.dto.ContractConditionDto;
import baro.baro.domain.contract.dto.request.ContractConditionReq;
import baro.baro.domain.product.dto.MyProductDto;
import baro.baro.domain.product.dto.ProductDetails;
import baro.baro.domain.product.dto.ProductDto;
import baro.baro.domain.product.dto.request.ProductAddReq;
import baro.baro.domain.product.dto.request.ProductModifyReq;
import baro.baro.domain.product.dto.response.MyProductListRes;
import baro.baro.domain.product.dto.response.RecentlyUploadedListRes;
import baro.baro.domain.product.dto.response.RecentlyViewListRes;
import baro.baro.domain.product.entity.ReturnType;
import baro.baro.domain.product.service.ProductService;
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

import static baro.baro.domain.product.entity.Category.LIGHT_STICK;
import static baro.baro.domain.product.entity.ProductStatus.IN_PROGRESS;
import static baro.baro.domain.product.entity.ReturnType.DELIVERY;
import static baro.baro.domain.product.entity.ReturnType.DIRECT;
import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.formatter.DateFormatter.calculateTime;
import static baro.baro.global.statuscode.ErrorCode.*;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes.*;
import static org.mockito.ArgumentMatchers.*;
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

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private ProductService productService;

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
        List<String> returnTypes = new ArrayList<>();
        returnTypes.add("DIRECT");
        returnTypes.add("DELIVERY");

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
                "LIGHT_STICK",
                contractConditionReq);

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(productAddReq));

        List<String> images = new ArrayList<>();
        images.add("이미지1");
        images.add("이미지2");

        ContractConditionDto contractConditionDto = ContractConditionDto.builder()
                .repairVendor("제조사 또는 공식 수입사의 AS 센터")
                .overdueCriteria(5)
                .overdueFee(2)
                .theftCriteria(7)
                .refundDeadline(7)
                .build();

        List<ReturnType> returnTypeList = new ArrayList<>();
        returnTypeList.add(DELIVERY);

        ProductDetails result = ProductDetails.builder()
                .productId(1L)
                .writerId("ffefwsfd-sfewwertwet-3rrsefsedf")
                .writerProfileImage("유저 image url")
                .writerNickname("유저 닉네임")
                .imageList(images)
                .productStatus(IN_PROGRESS)
                .title("제목")
                .category(LIGHT_STICK)
                .dong("봉천동")
                .createdAt(calculateTime(LocalDateTime.now()))
                .wishCount(0)
                .content("본문내용본문내용용용")
                .place("고척스카이돔 중앙출입문C게이트앞")
                .latitude(37.50)
                .longitude(126.87)
                .isWriteContract(true)
                .contractCondition(contractConditionDto)
                .returnTypes(returnTypeList)
                .startDate(LocalDate.of(2024, 9, 30))
                .endDate(LocalDate.of(2024, 10, 24))
                .rentalFee(10000)
                .isMine(true)
                .build();

        when(productService.addProduct(any(), anyList(), anyLong())).thenReturn(result);

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
    public void 대여_물품_등록_실패_현재_시간보다_이전인_대여시작일() throws Exception {
        //given
        List<String> returnTypes = new ArrayList<>();
        returnTypes.add("DIRECT");

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
                "LIGHT_STICK",
                contractConditionReq);

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(productAddReq));

        when(productService.addProduct(any(), anyList(), anyLong())).thenThrow(new CustomException(INVALID_DATE_OPTION));

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
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_DATE_OPTION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_DATE_OPTION.getMessage()))
                .andDo(document(
                        "대여 물품 등록 실패 - 잘못된 날짜 범위(현재 시간보다 이전인 대여시작일)",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("대여 물품 등록 Request"))
                                .responseSchema(Schema.schema("대여 물품 등록 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 대여_물품_등록_실패_현재_시간보다_이전인_대여마감일() throws Exception {
        //given
        List<String> returnTypes = new ArrayList<>();
        returnTypes.add("DIRECT");

        ContractConditionReq contractConditionReq = new ContractConditionReq(
                "물품 이름", "물품 일련번호", "제조사 또는 공식 수입사의 AS 센터",
                5, 2, 7, 7);

        ProductAddReq productAddReq = new ProductAddReq("제목",
                LocalDate.now(),
                LocalDate.of(2024, 9, 24),
                15000,
                "고척스카이돔 중앙출입문C게이트앞",
                37.50,
                126.87,
                returnTypes,
                "서울특별시 강남구 테헤란로 212",
                "본문내용본문내용용용",
                "LIGHT_STICK",
                contractConditionReq);

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(productAddReq));

        when(productService.addProduct(any(), anyList(), anyLong())).thenThrow(new CustomException(INVALID_DATE_OPTION));

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
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_DATE_OPTION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_DATE_OPTION.getMessage()))
                .andDo(document(
                        "대여 물품 등록 실패 - 잘못된 날짜 범위(현재 시간보다 이전인 대여마감일)",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("대여 물품 등록 Request"))
                                .responseSchema(Schema.schema("대여 물품 등록 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 대여_물품_등록_실패_대여시작일보다_빠른_대여마감일() throws Exception {
        //given
        List<String> returnTypes = new ArrayList<>();
        returnTypes.add("DIRECT");

        ContractConditionReq contractConditionReq = new ContractConditionReq(
                "물품 이름", "물품 일련번호", "제조사 또는 공식 수입사의 AS 센터",
                5, 2, 7, 7);

        ProductAddReq productAddReq = new ProductAddReq("제목",
                LocalDate.of(2024, 10, 30),
                LocalDate.of(2024, 10, 24),
                15000,
                "고척스카이돔 중앙출입문C게이트앞",
                37.50,
                126.87,
                returnTypes,
                "서울특별시 강남구 테헤란로 212",
                "본문내용본문내용용용",
                "LIGHT_STICK",
                contractConditionReq);

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(productAddReq));

        when(productService.addProduct(any(), anyList(), anyLong())).thenThrow(new CustomException(INVALID_DATE_OPTION));

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
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_DATE_OPTION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_DATE_OPTION.getMessage()))
                .andDo(document(
                        "대여 물품 등록 실패 - 잘못된 날짜 범위(대여시작일보다 대여마감일이 빠른 경우)",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("대여 물품 등록 Request"))
                                .responseSchema(Schema.schema("대여 물품 등록 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 대여_물품_등록_실패_유효하지_않은_리턴타입() throws Exception {
        //given
        List<String> returnTypes = new ArrayList<>();
        returnTypes.add("TYPE");

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
                "LIGHT_STICK",
                contractConditionReq);

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(productAddReq));

        when(productService.addProduct(any(), anyList(), anyLong())).thenThrow(new CustomException(INVALID_RETURN_TYPE));

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
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_RETURN_TYPE.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_RETURN_TYPE.getMessage()))
                .andDo(document(
                        "대여 물품 등록 실패 - 잘못된 날짜 범위(유효하지 않은 리턴타입)",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("대여 물품 등록 Request"))
                                .responseSchema(Schema.schema("대여 물품 등록 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 대여_물품_등록_실패_택배반납_선택후_주소없음() throws Exception {
        //given
        List<String> returnTypes = new ArrayList<>();
        returnTypes.add("DELIVERY");

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
                null,
                "본문내용본문내용용용",
                "LIGHT_STICK",
                contractConditionReq);

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(productAddReq));

        when(productService.addProduct(any(), anyList(), anyLong())).thenThrow(new CustomException(RETURN_ADDRESS_REQUIRED));

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
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(RETURN_ADDRESS_REQUIRED.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(RETURN_ADDRESS_REQUIRED.getMessage()))
                .andDo(document(
                        "대여 물품 등록 실패 - 잘못된 날짜 범위(택배반납 선택 후 반납 주소가 없는 경우)",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("대여 물품 등록 Request"))
                                .responseSchema(Schema.schema("대여 물품 등록 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 대여_물품_등록_실패_유효하지_않은_카테고리() throws Exception {
        //given
        List<String> returnTypes = new ArrayList<>();
        returnTypes.add("DIRECT");

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
                "STICK",
                contractConditionReq);

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(productAddReq));

        when(productService.addProduct(any(), anyList(), anyLong())).thenThrow(new CustomException(CATEGORY_NOT_FOUND));

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
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(CATEGORY_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(CATEGORY_NOT_FOUND.getMessage()))
                .andDo(document(
                        "대여 물품 등록 실패 - 잘못된 날짜 범위(유효하지 않은 카테고리)",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("대여 물품 등록 Request"))
                                .responseSchema(Schema.schema("대여 물품 등록 Response"))
                                .build()
                        ))
                );

    }

    @Test
    public void 대여_물품_등록_실패_사진_개수_초과() throws Exception {
        //given
        List<String> returnTypes = new ArrayList<>();
        returnTypes.add("DIRECT");

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
                "STICK",
                contractConditionReq);

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());
        MockMultipartFile file3 = new MockMultipartFile("files", "sample3.jpg", "image/jpeg", "image/sample3.jpg".getBytes());
        MockMultipartFile file4 = new MockMultipartFile("files", "sample4.jpg", "image/jpeg", "image/sample4.jpg".getBytes());
        MockMultipartFile file5 = new MockMultipartFile("files", "sample5.jpg", "image/jpeg", "image/sample5.jpg".getBytes());
        MockMultipartFile file6 = new MockMultipartFile("files", "sample6.jpg", "image/jpeg", "image/sample6.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(productAddReq));

        when(productService.addProduct(any(), anyList(), anyLong())).thenThrow(new CustomException(PRODUCT_PHOTO_LIMIT));

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
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_PHOTO_LIMIT.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_PHOTO_LIMIT.getMessage()))
                .andDo(document(
                        "대여 물품 등록 실패 - 잘못된 날짜 범위(사진 5개 초과한 경우)",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
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
        List<String> images = new ArrayList<>();
        images.add("이미지1");
        images.add("이미지2");

        ContractConditionDto contractConditionDto = ContractConditionDto.builder()
                .repairVendor("제조사 또는 공식 수입사의 AS 센터")
                .overdueCriteria(5)
                .overdueFee(2)
                .theftCriteria(7)
                .refundDeadline(7)
                .build();

        List<ReturnType> returnTypeList = new ArrayList<>();
        returnTypeList.add(DELIVERY);

        ProductDetails result = ProductDetails.builder()
                .productId(1L)
                .writerId("ffefwsfd-sfewwertwet-3rrsefsedf")
                .writerProfileImage("유저 image url")
                .writerNickname("유저 닉네임")
                .imageList(images)
                .productStatus(IN_PROGRESS)
                .title("제목")
                .category(LIGHT_STICK)
                .dong("봉천동")
                .createdAt(calculateTime(LocalDateTime.now()))
                .wishCount(0)
                .content("본문내용본문내용용용")
                .place("고척스카이돔 중앙출입문C게이트앞")
                .latitude(37.50)
                .longitude(126.87)
                .isWriteContract(true)
                .contractCondition(contractConditionDto)
                .returnTypes(returnTypeList)
                .startDate(LocalDate.of(2024, 9, 30))
                .endDate(LocalDate.of(2024, 10, 24))
                .rentalFee(10000)
                .isMine(true)
                .build();

        when(productService.findProduct(anyLong(), anyLong())).thenReturn(result);

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
    public void 대여_물품_상세_조회_실패_없는_상품_ID() throws Exception {
        //given
        when(productService.findProduct(anyLong(), anyLong()))
                .thenThrow(new CustomException(PRODUCT_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                get("/products/{productId}", 123L)
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(PRODUCT_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(PRODUCT_NOT_FOUND.getMessage()))
                .andDo(document(
                        "대여 물품 상세 조회 실패 - 없는 상품 ID",
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
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
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
        List<ProductDto> products = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            Long id = 1000L+i;

            if(i % 2 == 0) {
                ProductDto dto = ProductDto.builder()
                        .productId(id)
                        .productMainImage("상품 대표 이미지 url")
                        .isWished(true)
                        .startDate(LocalDate.of(2024, 9, 30))
                        .endDate(LocalDate.of(2024, 10, 30))
                        .rentalFee(10000+1000*i)
                        .title("제목")
                        .build();
                products.add(dto);
            } else {
                ProductDto dto = ProductDto.builder()
                        .productId(id)
                        .productMainImage("상품 대표 이미지 url")
                        .isWished(false)
                        .startDate(LocalDate.of(2024, 9, 26))
                        .endDate(LocalDate.of(2024, 10, 26))
                        .rentalFee(10000+1000*i)
                        .title("제목")
                        .build();
                products.add(dto);
            }
        }

        RecentlyViewListRes result = new RecentlyViewListRes(products);

        when(productService.recentlyViewedProducts(anyLong())).thenReturn(result);

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
                                                fieldWithPath("body.products[].productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.products[].productMainImage").type(STRING)
                                                        .description("대여 물품 대표 이미지"),
                                                fieldWithPath("body.products[].isWished").type(BOOLEAN)
                                                        .description("찜한 여부"),
                                                fieldWithPath("body.products[].startDate").type(STRING)
                                                        .description("대여 시작일"),
                                                fieldWithPath("body.products[].endDate").type(STRING)
                                                        .description("대여 마감일"),
                                                fieldWithPath("body.products[].rentalFee").type(NUMBER)
                                                        .description("대여비"),
                                                fieldWithPath("body.products[].title").type(STRING)
                                                        .description("게시글 제목")

                                        )
                                )
                                .requestSchema(Schema.schema("최근 본 대여 물품 리스트 조회 Request"))
                                .responseSchema(Schema.schema("최근 본 대여 물품 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 최근_올라온_대여_물품_리스트_조회_성공() throws Exception {
        //given
        List<ProductDto> products = new ArrayList<>();

        for(int i = 0; i < 10; i++) {
            Long id = 1000L+i;

            if(i % 2 == 0) {
                ProductDto dto = ProductDto.builder()
                        .productId(id)
                        .productMainImage("상품 대표 이미지 url")
                        .isWished(true)
                        .startDate(LocalDate.of(2024, 9, 30))
                        .endDate(LocalDate.of(2024, 10, 30))
                        .rentalFee(10000+1000*i)
                        .title("제목")
                        .build();
                products.add(dto);
            } else {
                ProductDto dto = ProductDto.builder()
                        .productId(id)
                        .productMainImage("상품 대표 이미지 url")
                        .isWished(false)
                        .startDate(LocalDate.of(2024, 9, 26))
                        .endDate(LocalDate.of(2024, 10, 26))
                        .rentalFee(10000+1000*i)
                        .title("제목")
                        .build();
                products.add(dto);
            }
        }

        RecentlyUploadedListRes result = new RecentlyUploadedListRes(products);

        when(productService.recentlyUpdatedProducts(anyLong())).thenReturn(result);

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
                                                fieldWithPath("body.products[].productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.products[].productMainImage").type(STRING)
                                                        .description("대여 물품 대표 이미지"),
                                                fieldWithPath("body.products[].isWished").type(BOOLEAN)
                                                        .description("찜한 여부"),
                                                fieldWithPath("body.products[].startDate").type(STRING)
                                                        .description("대여 시작일"),
                                                fieldWithPath("body.products[].endDate").type(STRING)
                                                        .description("대여 마감일"),
                                                fieldWithPath("body.products[].rentalFee").type(NUMBER)
                                                        .description("대여비"),
                                                fieldWithPath("body.products[].title").type(STRING)
                                                        .description("게시글 제목")
                                        )
                                )
                                .requestSchema(Schema.schema("최근 올라온 대여 물품 리스트 조회 Request"))
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

        MockMultipartFile file1 = new MockMultipartFile("files", "sample1.jpg", "image/jpeg", "image/sample1.jpg".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "sample2.jpg", "image/jpeg", "image/sample2.jpg".getBytes());

        MockMultipartFile dto = new MockMultipartFile("dto", "", "application/json", objectMapper.writeValueAsBytes(productModifyReq));

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
                                .requestSchema(Schema.schema("대여 물품 삭제 Request"))
                                .responseSchema(Schema.schema("대여 물품 삭제 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 빌린_내역_리스트_조회_성공() throws Exception {
        // given
        List<MyProductDto> res = List.of(
                MyProductDto.builder()
                        .productId(1L)
                        .productMainImage("productMainImage")
                        .title("title")
                        .startDate(LocalDate.of(2024, 10, 4))
                        .endDate(LocalDate.of(2024, 10, 14))
                        .rentalFee(10000)
                        .productStatus(IN_PROGRESS)
                        .build()
        );
        when(productService.findRentalProducts(anyLong()))
                .thenReturn(new MyProductListRes(res));

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
                                .requestSchema(Schema.schema("빌린 내역 리스트 조회 Request"))
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
                                .requestSchema(Schema.schema("빌려준 내역 리스트 조회 Request"))
                                .responseSchema(Schema.schema("빌려준 내역 리스트 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 물품_검색_성공() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/search/products")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("locationId","11010530")
                        .param("keyword", "세븐틴")
                        .param("category", "LIGHT_STICK")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(SEARCH_PRODUCT_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(SEARCH_PRODUCT_OK.getMessage()))
                .andDo(document(
                        "물품 검색",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("물품 검색 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("keyword").description("검색 할 단어"),
                                        parameterWithName("category").description("카테고리"),
                                        parameterWithName("locationId").description("지역 아이디"),
                                        parameterWithName("lastProductId").description("마지막으로 조회한 물품 Id(Optional)").optional()
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.products[].productId").type(NUMBER)
                                                        .description("대여 물품 아이디"),
                                                fieldWithPath("body.products[].productMainImage").type(STRING)
                                                        .description("대여 물품 대표 이미지"),
                                                fieldWithPath("body.products[].title").type(STRING)
                                                        .description("대여 물품 제목"),
                                                fieldWithPath("body.products[].startDate").type(STRING)
                                                        .description("대여 시작일"),
                                                fieldWithPath("body.products[].endDate").type(STRING)
                                                        .description("대여 마감일"),
                                                fieldWithPath("body.products[].dong").type(STRING)
                                                        .description("거래 희망 동 정보"),
                                                fieldWithPath("body.products[].uploadDate").type(STRING)
                                                        .description("게시글 작성일"),
                                                fieldWithPath("body.products[].rentalFee").type(NUMBER)
                                                        .description("대여비"),
                                                fieldWithPath("body.products[].wishCount").type(NUMBER)
                                                        .description("찜한 사람 수")
                                        )
                                )
                                .requestSchema(Schema.schema("물품 검색 Request"))
                                .responseSchema(Schema.schema("물품 검색 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 검색어_자동완성_성공() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/search/suggestions")
                        .header("Authorization", jwtToken)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("keyword", "세븐틴")
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(SUGGEST_KEYWORD_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(SUGGEST_KEYWORD_LIST_OK.getMessage()))
                .andDo(document(
                        "검색어 자동완성",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Product API")
                                .summary("검색어 자동완성 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("keyword").description("검색 할 단어")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.keywords[].name").type(STRING)
                                                        .description("자동완성된 검색어")
                                        )
                                )
                                .requestSchema(Schema.schema("검색어 자동완성 Request"))
                                .responseSchema(Schema.schema("검색어 자동완성 Response"))
                                .build()
                        ))
                );
    }
}
