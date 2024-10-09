package baro.baro.domain.member.service;

import baro.baro.domain.location.repository.LocationRepository;
import baro.baro.domain.member.dto.request.PasswordAddReq;
import baro.baro.domain.member.dto.request.SignupReq;
import baro.baro.domain.member.dto.response.ProfileDetailsRes;
import baro.baro.domain.member.dto.response.SignUpInfoRes;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.entity.Pin;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.member.repository.PinRepository;
import baro.baro.domain.member_location.repository.MemberLocationRepository;
import baro.baro.global.exception.CustomException;
import baro.baro.global.oauth.jwt.entity.JwtRedis;
import baro.baro.global.oauth.jwt.service.JwtService;
import baro.baro.global.s3.Images3Service;
import baro.baro.global.utils.CertificateUtils;
import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.PrivateKey;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.IntStream;

import static baro.baro.domain.location.validator.LocationValidator.validateLocationAddRequest;
import static baro.baro.global.statuscode.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final LocationRepository locationRepository;
    private final MemberLocationRepository memberLocationRepository;
    private final JwtService jwtService;
    private final RedisUtils redisUtils;
    private final Images3Service images3Service;
    private final PinRepository pinRepository;
    private final CertificateUtils certificateUtils;

    @Value("${BUCKET_URL}")
    private String bucketUrl;

    @Override
    @Transactional
    public String signup(SignupReq signupReq, MultipartFile file) throws IOException {
        String uuid = UUID.randomUUID().toString();

        if (memberRepository.findByEmail(signupReq.getEmail()) != null) {
            throw new CustomException(ALREADY_EXIST_MEMBER);
        }

        if (file != null && !file.isEmpty()) {
            String newImageUrl = images3Service.upload(file, "profile");

            signupReq.setProfileImage(newImageUrl);

            log.info("이미지 파일 성공!");
        } else {
            if (signupReq.getProfileImage() == null || signupReq.getProfileImage().isEmpty()) {
                signupReq.setProfileImage(bucketUrl + "/profile/default.png");
                log.info("없으니까 디폴트값!");
            }
        }

        Member member = signupReq.toEntity(uuid);

        log.info("멤버 Entity 성공");
        validateLocationAddRequest(signupReq.getLocations());

        log.info("지역 예외처리 통과");

        memberRepository.save(member);

        log.info("지역 멤버DB에저장~");

        IntStream.range(0, signupReq.getLocations().size())
                .forEach(index -> {
                    Long locationId = signupReq.getLocations().get(index);

                    locationRepository.findById(locationId)
                            .orElseThrow(() -> new CustomException(LOCATION_NOT_FOUND));

                    if (index == 0) {
                        memberLocationRepository.insertMemberLocations(member.getId(),
                                locationId, true);
                    } else {
                        memberLocationRepository.insertMemberLocations(member.getId(),
                                locationId, true);
                    }
                });

        JwtRedis jwtRedis = signupReq.toRedis(uuid, member.getId(), jwtService.createRefreshToken(uuid));
        redisUtils.setData(uuid, jwtRedis);

        return jwtService.createAccessToken(uuid, false);
    }


    @Override
    public SignUpInfoRes signupDetails(String key) {
        SignUpInfoRes result = (SignUpInfoRes) redisUtils.getData(key + "_signin_key");
        redisUtils.deleteData(key + "_signin_key");

        return result;
    }

    @Override
    @Transactional
    public void addPassword(Long memberId, PasswordAddReq passwordAddReq) throws Exception {
        // 1. 핀번호 != 다시 입력한 핀번호
        // 2. 이미 핀번호가 있는 경우

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        if(!member.getIsCertificated()) {
            throw new CustomException(AUTHENTICATION_REQUIRED);
        }

        String password = passwordAddReq.getPassword();
        String checkPassword = passwordAddReq.getCheckPassword();
        if(!password.equals(checkPassword)) {
            throw new CustomException(PIN_MISMATCH);
        }

        Optional<Pin> pin = pinRepository.findByMemberId(memberId);
        if(pin.isPresent()) {
            throw new CustomException(ALREADY_EXIST_PIN);
        }

        String uuid = UUID.randomUUID().toString();
        pinRepository.save(passwordAddReq.toEntity(member, uuid));
        PrivateKey privateKey = certificateUtils.generateMemberPrivateKey(memberId, uuid);
        if(privateKey == null) {
            throw new CustomException(PRIVATE_CREATED_FAIL);
        }
    }

    public Boolean verifyPassword(String key, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        if (!member.getPin().getPinNumber().equals(key)) {
            throw new CustomException(INVALID_PIN_NUMBER);
        }
        return Boolean.TRUE;
    }

    public ProfileDetailsRes getProfileDetails(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        return ProfileDetailsRes.toDto(member);
    }
}
