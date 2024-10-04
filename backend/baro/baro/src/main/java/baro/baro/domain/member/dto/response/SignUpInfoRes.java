package baro.baro.domain.member.dto.response;

import baro.baro.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SignUpInfoRes {
    private String providerType;

    private String email;

    private String nickName;

    private String profileImage;

    public static SignUpInfoRes toDto(Member member) {
        return SignUpInfoRes.builder()
                .providerType(member.getProviderType())
                .email(member.getEmail())
                .nickName(member.getNickname())
                .profileImage(member.getProfileImage())
                .build();
    }
}
