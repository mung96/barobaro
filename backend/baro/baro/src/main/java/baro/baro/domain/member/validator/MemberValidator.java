package baro.baro.domain.member.validator;

import baro.baro.global.exception.CustomException;

import static baro.baro.global.statuscode.ErrorCode.INVALID_NICKNAME;

public class MemberValidator {
    private static final String NICKNAME_PATTERN = "^[a-zA-Z0-9가-힣]{1,10}$";

    public static void isInvalidNickname(String nickname) {
        if(nickname == null || !nickname.matches(NICKNAME_PATTERN)) {
            throw new CustomException(INVALID_NICKNAME);
        }
    }
}
