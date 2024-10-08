package baro.baro.global.statuscode;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    //대여 물품
    PRODUCT_CREATED(CREATED.value(), "대여 물품 등록에 성공했습니다."),
    PRODUCT_MODIFIED(OK.value(), "대여 물품 수정에 성공했습니다."),
    PRODUCT_DELETED(NO_CONTENT.value(), "대여 물품 삭제에 성공했습니다."),
    PRODUCT_DETAILS_OK(OK.value(), "대여 물품 상세 조회에 성공했습니다."),
    PRODUCT_RECENTLY_VIEWED_LIST_OK(OK.value(), "최근 본 대여 물품 리스트 조회에 성공했습니다."),
    PRODUCT_RECENTLY_UPLOADED_LIST_OK(OK.value(), "최근 올라온 대여 물품 리스트 조회에 성공했습니다."),

    //계약
    CONTRACT_REQUEST_CREATED(CREATED.value(), "계약 요청에 성공했습니다."),
    CONTRACT_REQUEST_OK(OK.value(), "계약 요청 조회에 성공했습니다."),
    CONTRACT_OPTION_DETAIL_OK(OK.value(),"계약 조건 상세 조회에 성공했습니다."),
    CONTRACT_APPROVED_OK(OK.value(),"계약 요청이 승인되었습니다."),
    CONTRACT_SIGNED_OK(OK.value(),"계약 서명에 성공했습니다."),
    CONTRACT_TERMINATED_OK(OK.value(), "물품 회수가 확인되었습니다."),
    PRODUCT_VIDEO_UPLOADED_OK(OK.value(), "영상이 정상 제출되었습니다."),
    PRODUCT_VIDEO_DETAILS_OK(OK.value(), "등록된 영상 정보 조회에 성공했습니다."),
    PDF_GENERATE_OK(OK.value(), "pdf 생성에 성공했습니다"),

    //채팅
    CHATROOM_CREATED(CREATED.value(), "채팅방 생성에 성공했습니다."),
    CHATROOM_LIST_OK(OK.value(), "채팅방 리스트 조회에 성공했습니다."),
    CHATROOM_DETAILS_OK(OK.value(), "채팅방과 채팅 상세 조회에 성공했습니다."),
    CHAT_IMAGE_UPLOAD_OK(OK.value(), "채팅 사진 업로드에 성공했습니다."),

    //검색
    SEARCH_LOCATION_OK(OK.value(), "지역 조회에 성공했습니다."),
    SEARCH_PRODUCT_OK(OK.value(), "상품 검색에 성공했습니다."),
    SUGGEST_KEYWORD_LIST_OK(OK.value(), "검색어 자동완성에 성공했습니다"),

    //본인인증
    PASSWORD_VALIDATION_OK(OK.value(),"PIN번호가 유효합니다"),
    //알림 및 푸시
    NOTIFICATION_LIST_OK(OK.value(), "알림 리스트 조회에 성공했습니다."),

    //찜
    WISH_LIST_CREATED(CREATED.value(), "관심내역 추가에 성공했습니다."),
    WISH_LIST_DELETED(NO_CONTENT.value(), "관심내역 삭제에 성공했습니다."),
    WISH_LIST_OK(OK.value(), "관심내역 리스트 조회에 성공했습니다."),

    //마이페이지
    RENTAL_PRODUCT_LIST_OK(OK.value(), "빌린 내역 리스트 조회에 성공했습니다."),
    OWNER_PRODUCT_LIST_OK(OK.value(), "빌려준 내역 리스트 조회에 성공했습니다."),

    ACCOUNT_LIST_OK(OK.value(), "계좌 리스트 조회에 성공했습니다."),
    ACCOUNT_CREATED(CREATED.value(), "계좌 연결에 성공했습니다."),
    ACCOUNT_ADD_MAIN_OK(OK.value(), "대표 계좌 설정에 성공했습니다."),
    ACCOUNT_DELETED(NO_CONTENT.value(), "대표 계좌 설정에 성공했습니다."),
    PASSWORD_MODIFIED(OK.value(), "PIN번호 변경에 성공했습니다."),
    PROFILE_DETAILS_OK(OK.value(), "프로필 조회에 성공했습니다."),
    PROFILE_MODIFIED(OK.value(), "프로필 수정에 성공했습니다."),



    //지역 설정
    LOCATION_SETTING_OK(OK.value(), "지역 설정에 성공했습니다."),
    LOCATION_LIST_OK(OK.value(), "지역 리스트 조회에 성공했습니다."),
    DEFAULT_LOCATION_UPDATE_OK(OK.value(), "대표 지역 변경에 성공했습니다."),

    //회원가입 및 로그인
    MEMBER_CREATED(CREATED.value(), "회원 가입에 성공했습니다."),
    MEMBER_LOGOUT(OK.value(), "로그아웃에 성공했습니다."),
    MEMBER_SIGNUP_DETAILS_OK(OK.value(),"회원가입을 위한 멤버 정보 조회에 성공했습니다"),
    REISSUED_ACCESS_TOKEN(FORBIDDEN.value(), "accessToken을 재발급했습니다."),
    ;

    private final int httpStatusCode;

    private final String message;
}
