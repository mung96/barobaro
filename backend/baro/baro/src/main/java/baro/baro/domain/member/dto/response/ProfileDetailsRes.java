package baro.baro.domain.member.dto.response;

import baro.baro.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProfileDetailsRes {
    private String profileImage;

    private String uuid;

    private String nickname;

    private String phoneNumber;

    private String email;

    private String name;

    private Boolean isAuthenticated;

    public static ProfileDetailsRes toDto(Member member) {
        return ProfileDetailsRes.builder()
                .profileImage(member.getProfileImage())
                .uuid(member.getUuid())
                .nickname(member.getNickname())
                .phoneNumber(member.getPhoneNumber())
                .email(member.getEmail())
                .name(member.getName())
                .isAuthenticated(member.getPin() != null)
                .build();
    }
}
