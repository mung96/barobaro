package baro.baro.domain.member.dto.response;

import baro.baro.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileDetailsRes {
    private String profileImage;

    private String nickname;

    private String email;

    public ProfileDetailsRes(Member member) {
        this.profileImage = member.getProfileImage();
        this.nickname = member.getNickname();
        this.email = member.getEmail();
    }
}
