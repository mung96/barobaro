package baro.baro.domain.member.dto.request;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member_location.dto.request.MemberLocationReq;
import baro.baro.global.oauth.jwt.entity.JwtRedis;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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

    private List<MemberLocationReq> locations;

    public Member toEntity(String uuid){
        return Member.builder()
                .uuid(uuid)
                .email(email)
                .providerType(providerType)
                .profileImage(profileImage)
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

