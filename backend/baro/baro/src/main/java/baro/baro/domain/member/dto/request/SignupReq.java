package baro.baro.domain.member.dto.request;

import baro.baro.domain.member.entity.Member;
import baro.baro.global.oauth.jwt.entity.JwtRedis;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignupReq {
    @NotNull
    private String email;

    private String providerType;

    private String profileImage;

    @NotNull
    private String nickname;

    public Member toEntity(String uuid, String bucketUrl){
        return Member.builder()
                .uuid(uuid)
                .email(email)
                .providerType(providerType)
                .profileImage(profileImage == null ? bucketUrl + "profile/default.png" : profileImage)
                .nickname(nickname)
                .isDeleted(false)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public JwtRedis toRedis(String uuid, Long memberId, String refreshToken){
        return JwtRedis.builder()
                .uuid(uuid)
                .memberId(memberId)
                .refreshToken(refreshToken)
                .build();
    }
}

