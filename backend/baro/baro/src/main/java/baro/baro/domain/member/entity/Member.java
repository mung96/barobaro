package baro.baro.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String nickname;

    private String profileImage;

    private String address;

    private String uuid;

    private String name;

    private LocalDate birthDate;

    private String phoneNumber;

    private String fcmToken;

    private String providerType;

    private Boolean isDeleted;

    private Boolean isCertificated;

    private LocalDateTime createdAt;
}
