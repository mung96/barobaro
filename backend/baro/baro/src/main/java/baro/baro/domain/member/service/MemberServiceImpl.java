package baro.baro.domain.member.service;

import baro.baro.domain.location.repository.LocationRepository;
import baro.baro.domain.member.dto.request.SignupReq;
import baro.baro.domain.member.dto.response.SignUpInfoRes;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.member_location.repository.MemberLocationRepository;
import baro.baro.global.exception.CustomException;
import baro.baro.global.oauth.jwt.entity.JwtRedis;
import baro.baro.global.oauth.jwt.service.JwtService;
import baro.baro.global.s3.Images3Service;
import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

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

    @Value("${BUCKET_URL}")
    private String bucketUrl;

    @Override
    @Transactional
    public String signup(SignupReq signupReq, MultipartFile file) throws IOException {
        String uuid = UUID.randomUUID().toString();

        if (memberRepository.findByEmail(signupReq.getEmail()) != null){
            throw new CustomException(ALREADY_EXIST_MEMBER);
        }

        if(file != null || !file.isEmpty()) {
            String newImageUrl = images3Service.upload(file, bucketUrl + "/profile");

            signupReq.setProfileImage(newImageUrl);
        }

        if(signupReq.getProfileImage() == null || signupReq.getProfileImage().isEmpty()) {
            signupReq.setProfileImage(bucketUrl + "/profile/default.png");
        }

        Member member = signupReq.toEntity(uuid);

        if(signupReq.getLocations() == null || signupReq.getLocations().isEmpty()) {
            throw new CustomException(LOCATION_IS_EMPTY);
        }

        if(signupReq.getLocations().size() > 3) {
            throw new CustomException(INVALID_LOCATION_SIZE);
        }

        memberRepository.save(member);

        signupReq.getLocations()
                .forEach(location -> {
                    locationRepository.findById(location.getLocationId())
                                    .orElseThrow(() -> new CustomException(LOCATION_NOT_FOUND));

                    memberLocationRepository.insertMemberLocations(member.getId(),
                            location.getLocationId(),
                            location.getIsMain());
                });

        JwtRedis jwtRedis = signupReq.toRedis(uuid, member.getId(), jwtService.createRefreshToken(uuid));
        redisUtils.setData(uuid, jwtRedis);

        return jwtService.createAccessToken(uuid, false);
    }


    @Override
    public SignUpInfoRes signupDetails(String key) {
        log.info("signupDetails Service함수 " + key);
        SignUpInfoRes result = (SignUpInfoRes) redisUtils.getData(key + "_signin_key");
        log.info("redis " + (SignUpInfoRes) redisUtils.getData(key + "_signin_key"));
        redisUtils.deleteData(key + "_signin_key");

        return result;
    }
}
