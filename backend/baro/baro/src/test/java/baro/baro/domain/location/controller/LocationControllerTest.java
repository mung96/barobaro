package baro.baro.domain.location.controller;

import baro.baro.domain.location.dto.LocationDto;
import baro.baro.domain.location.dto.request.DefaultLocationReq;
import baro.baro.domain.location.dto.request.LocationsAddReq;
import baro.baro.domain.location.dto.response.DefaultLocationRes;
import baro.baro.domain.location.dto.response.LocationsAddRes;
import baro.baro.domain.location.dto.response.MyLocationListRes;
import baro.baro.domain.location.service.LocationService;
import baro.baro.domain.member_location.dto.request.MemberLocationReq;
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

import java.util.ArrayList;
import java.util.List;

import static baro.baro.global.ResponseFieldUtils.getCommonResponseFields;
import static baro.baro.global.statuscode.ErrorCode.*;
import static baro.baro.global.statuscode.SuccessCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.parameterWithName;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.mockito.ArgumentMatchers.any;
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
public class LocationControllerTest {
    private final static String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
    private final static Boolean isCertificated = false;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private LocationService locationService;

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
    public void 지역검색_성공() throws Exception {
        // given
        String name = "역삼";

        //when
        ResultActions actions = mockMvc.perform(
                get("/search/locations")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("name", name)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(SEARCH_LOCATION_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(SEARCH_LOCATION_OK.getMessage()))
                .andDo(document(
                        "지역 검색 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("지역 검색 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .queryParameters(
                                        parameterWithName("name").description("검색어")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.result[].locationId").type(NUMBER)
                                                        .description("지역 아이디"),
                                                fieldWithPath("body.result[].name").type(STRING)
                                                        .description("시군동 이름"),
                                                fieldWithPath("body.result[].dong").type(STRING)
                                                        .description("동 이름")
                                        )
                                )
                                .requestSchema(Schema.schema("지역 검색 Request"))
                                .responseSchema(Schema.schema("지역 검색 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 지역설정_성공() throws Exception {
        // given
        List<MemberLocationReq> locations = new ArrayList<>();
        locations.add(new MemberLocationReq(11010540L, true));
        locations.add(new MemberLocationReq(11010550L, false));

        LocationsAddReq req = new LocationsAddReq();
        req.setLocations(locations);

        String content = objectMapper.writeValueAsString(req);

        List<LocationDto> locationList = new ArrayList<>();

        for(int i = 0; i < 3; i++) {
            LocationDto location = LocationDto.builder()
                    .locationId(11010530L + (10*i))
                    .name("서울특별시 종로구 사직동(시군동)")
                    .dong("사직동(동만)")
                    .isMain(i == 0)
                    .build();

            locationList.add(location);
        }

        LocationsAddRes result = new LocationsAddRes(locationList);

        when(locationService.addLocations(any(), anyLong())).thenReturn(result);

        //when
        ResultActions actions = mockMvc.perform(
                post("/members/me/locations")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(LOCATION_SETTING_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(LOCATION_SETTING_OK.getMessage()))
                .andDo(document(
                        "지역 설정 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("지역 설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                            fieldWithPath("locations[].locationId").type(NUMBER)
                                                    .description("지역 ID"),
                                            fieldWithPath("locations[].isMain").type(BOOLEAN)
                                                    .description("대표 지역 여부")
                                            )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.locations[].locationId").type(NUMBER)
                                                        .description("지역 아이디"),
                                                fieldWithPath("body.locations[].name").type(STRING)
                                                        .description("시군동 이름"),
                                                fieldWithPath("body.locations[].dong").type(STRING)
                                                        .description("동 이름"),
                                                fieldWithPath("body.locations[].isMain").type(BOOLEAN)
                                                        .description("대표 지역 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("지역 설정 Request"))
                                .responseSchema(Schema.schema("지역 설정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 지역설정_실패_없는_지역() throws Exception {
        // given
        List<MemberLocationReq> locations = new ArrayList<>();
        locations.add(new MemberLocationReq(11010541L, true));
        locations.add(new MemberLocationReq(11010550L, false));

        LocationsAddReq req = new LocationsAddReq();
        req.setLocations(locations);

        String content = objectMapper.writeValueAsString(req);

        when(locationService.addLocations(any(), anyLong())).thenThrow(new CustomException(LOCATION_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                post("/members/me/locations")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(LOCATION_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(LOCATION_NOT_FOUND.getMessage()))
                .andDo(document(
                        "지역 설정 실패 - 없는 지역 PK",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("지역 설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("locations[].locationId").type(NUMBER)
                                                        .description("지역 ID"),
                                                fieldWithPath("locations[].isMain").type(BOOLEAN)
                                                        .description("대표 지역 여부")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("지역 설정 Request"))
                                .responseSchema(Schema.schema("지역 설정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 지역설정_실패_중복된_지역값() throws Exception {
        // given
        List<MemberLocationReq> locations = new ArrayList<>();
        locations.add(new MemberLocationReq(11010540L, true));
        locations.add(new MemberLocationReq(11010540L, false));

        LocationsAddReq req = new LocationsAddReq();
        req.setLocations(locations);

        String content = objectMapper.writeValueAsString(req);

        when(locationService.addLocations(any(), anyLong())).thenThrow(new CustomException(DUPLICATED_LOCATION));

        //when
        ResultActions actions = mockMvc.perform(
                post("/members/me/locations")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DUPLICATED_LOCATION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DUPLICATED_LOCATION.getMessage()))
                .andDo(document(
                        "지역 설정 실패 - 중복된 지역 PK",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("지역 설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("locations[].locationId").type(NUMBER)
                                                        .description("지역 ID"),
                                                fieldWithPath("locations[].isMain").type(BOOLEAN)
                                                        .description("대표 지역 여부")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("지역 설정 Request"))
                                .responseSchema(Schema.schema("지역 설정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 지역설정_실패_입력값_없음() throws Exception {
        // given
        List<MemberLocationReq> locations = new ArrayList<>();

        LocationsAddReq req = new LocationsAddReq();
        req.setLocations(locations);

        String content = objectMapper.writeValueAsString(req);

        when(locationService.addLocations(any(), anyLong())).thenThrow(new CustomException(LOCATION_IS_EMPTY));

        //when
        ResultActions actions = mockMvc.perform(
                post("/members/me/locations")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(LOCATION_IS_EMPTY.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(LOCATION_IS_EMPTY.getMessage()))
                .andDo(document(
                        "지역 설정 실패 - 입력값이 없는 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("지역 설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("locations[]").type(ARRAY)
                                                        .description("입력값 없음")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("지역 설정 Request"))
                                .responseSchema(Schema.schema("지역 설정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 지역설정_실패_개수_초과() throws Exception {
        // given
        List<MemberLocationReq> locations = new ArrayList<>();
        locations.add(new MemberLocationReq(11010540L, true));
        locations.add(new MemberLocationReq(11010550L, false));
        locations.add(new MemberLocationReq(11010560L, false));
        locations.add(new MemberLocationReq(11010570L, false));

        LocationsAddReq req = new LocationsAddReq();
        req.setLocations(locations);

        String content = objectMapper.writeValueAsString(req);

        when(locationService.addLocations(any(), anyLong())).thenThrow(new CustomException(DUPLICATED_LOCATION));

        //when
        ResultActions actions = mockMvc.perform(
                post("/members/me/locations")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DUPLICATED_LOCATION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DUPLICATED_LOCATION.getMessage()))
                .andDo(document(
                        "지역 설정 실패 - 지역 최대 개수 초과",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("지역 설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("locations[].locationId").type(NUMBER)
                                                        .description("지역 ID"),
                                                fieldWithPath("locations[].isMain").type(BOOLEAN)
                                                        .description("대표 지역 여부")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("지역 설정 Request"))
                                .responseSchema(Schema.schema("지역 설정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 지역설정_실패_대표_지역이_없음() throws Exception {
        // given
        List<MemberLocationReq> locations = new ArrayList<>();
        locations.add(new MemberLocationReq(11010540L, false));
        locations.add(new MemberLocationReq(11010550L, false));
        locations.add(new MemberLocationReq(11010560L, false));

        LocationsAddReq req = new LocationsAddReq();
        req.setLocations(locations);

        String content = objectMapper.writeValueAsString(req);

        when(locationService.addLocations(any(), anyLong())).thenThrow(new CustomException(INVALID_LOCATION));

        //when
        ResultActions actions = mockMvc.perform(
                post("/members/me/locations")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.header.httpStatusCode").value(INVALID_LOCATION.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(INVALID_LOCATION.getMessage()))
                .andDo(document(
                        "지역 설정 실패 - 지역 최대 개수 초과",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("지역 설정 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        List.of(
                                                fieldWithPath("locations[].locationId").type(NUMBER)
                                                        .description("지역 ID"),
                                                fieldWithPath("locations[].isMain").type(BOOLEAN)
                                                        .description("대표 지역 여부")
                                        )
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("지역 설정 Request"))
                                .responseSchema(Schema.schema("지역 설정 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 나의_지역_목록_조회_성공() throws Exception {
        // given
        List<LocationDto> locations = new ArrayList<>();

        for(int i = 0; i < 3; i++) {
            LocationDto location = LocationDto.builder()
                    .locationId(11010530L + (10*i))
                    .name("서울특별시 종로구 사직동(시군동)")
                    .dong("사직동(동만)")
                    .isMain(i == 0)
                    .build();

            locations.add(location);
        }

        MyLocationListRes result = new MyLocationListRes(locations);

        when(locationService.findLocations(anyLong())).thenReturn(result);

        //when
        ResultActions actions = mockMvc.perform(
                get("/members/me/locations")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(LOCATION_LIST_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(LOCATION_LIST_OK.getMessage()))
                .andDo(document(
                        "나의 지역 목록 조회 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("나의 지역 목록 조회 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.locations[].locationId").type(NUMBER)
                                                        .description("지역 아이디"),
                                                fieldWithPath("body.locations[].name").type(STRING)
                                                        .description("시군동 이름"),
                                                fieldWithPath("body.locations[].dong").type(STRING)
                                                        .description("동 이름"),
                                                fieldWithPath("body.locations[].isMain").type(BOOLEAN)
                                                        .description("대표 지역 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("나의 지역 목록 조회 Request"))
                                .responseSchema(Schema.schema("나의 지역 목록 조회 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 대표_지역_변경_성공() throws Exception {
        // given
        DefaultLocationReq req = new DefaultLocationReq();
        req.setLocationId(11010540L);

        String content = objectMapper.writeValueAsString(req);

        LocationDto location = new LocationDto(110105340L,"서울특별시 종로구 사직동(시군동)", "사직동(동만)", true);

        DefaultLocationRes result = new DefaultLocationRes(location);

        when(locationService.updateDefaultLocation(any(), anyLong())).thenReturn(result);

        //when
        ResultActions actions = mockMvc.perform(
                post("/members/me/default-location")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.header.httpStatusCode").value(DEFAULT_LOCATION_UPDATE_OK.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(DEFAULT_LOCATION_UPDATE_OK.getMessage()))
                .andDo(document(
                        "대표 지역 변경 성공",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("대표 지역 변경 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("locationId").description("변경할 지역 ID")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body.location.locationId").type(NUMBER)
                                                        .description("지역 아이디"),
                                                fieldWithPath("body.location.name").type(STRING)
                                                        .description("시군동 이름"),
                                                fieldWithPath("body.location.dong").type(STRING)
                                                        .description("동 이름"),
                                                fieldWithPath("body.location.isMain").type(BOOLEAN)
                                                        .description("대표 지역 여부")
                                        )
                                )
                                .requestSchema(Schema.schema("대표 지역 변경 Request"))
                                .responseSchema(Schema.schema("대표 지역 변경 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 대표_지역_변경_실패_없는_지역() throws Exception {
        // given
        DefaultLocationReq req = new DefaultLocationReq();
        req.setLocationId(11010541L);

        String content = objectMapper.writeValueAsString(req);

        when(locationService.updateDefaultLocation(any(), anyLong())).thenThrow(new CustomException(LOCATION_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                post("/members/me/default-location")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(LOCATION_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(LOCATION_NOT_FOUND.getMessage()))
                .andDo(document(
                        "대표 지역 변경 실패 - 없는 지역 PK",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("대표 지역 변경 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("locationId").description("변경할 지역 ID")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("대표 지역 변경 Request"))
                                .responseSchema(Schema.schema("대표 지역 변경 Response"))
                                .build()
                        ))
                );
    }

    @Test
    public void 대표_지역_변경_실패_내가_설정한_지역이_아닌_경우() throws Exception {
        // given
        DefaultLocationReq req = new DefaultLocationReq();
        req.setLocationId(11010580L);

        String content = objectMapper.writeValueAsString(req);

        when(locationService.updateDefaultLocation(any(), anyLong())).thenThrow(new CustomException(MEMBER_LOCATION_NOT_FOUND));

        //when
        ResultActions actions = mockMvc.perform(
                post("/members/me/default-location")
                        .header("Authorization", jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
        );

        //then
        actions
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.header.httpStatusCode").value(MEMBER_LOCATION_NOT_FOUND.getHttpStatusCode()))
                .andExpect(jsonPath("$.header.message").value(MEMBER_LOCATION_NOT_FOUND.getMessage()))
                .andDo(document(
                        "대표 지역 변경 실패 - 내가 설정한 지역이 아닌 경우",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        resource(ResourceSnippetParameters.builder()
                                .tag("Location API")
                                .summary("대표 지역 변경 API")
                                .requestHeaders(
                                        headerWithName("Authorization")
                                                .description("JWT 토큰")
                                )
                                .requestFields(
                                        fieldWithPath("locationId").description("변경할 지역 ID")
                                )
                                .responseFields(
                                        getCommonResponseFields(
                                                fieldWithPath("body").type(NULL)
                                                        .description("본문 없음")
                                        )
                                )
                                .requestSchema(Schema.schema("대표 지역 변경 Request"))
                                .responseSchema(Schema.schema("대표 지역 변경 Response"))
                                .build()
                        ))
                );
    }
}
