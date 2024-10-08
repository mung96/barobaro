package baro.baro.domain.noti.service;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static baro.baro.global.statuscode.ErrorCode.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class NotiServiceImpl implements NotiService {

    private final MemberRepository memberRepository;

    @Transactional
    public void addMemberFcmToken(final String fcmToken, final Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        member.updateFcmToken(fcmToken);
        memberRepository.save(member);
    }
}
