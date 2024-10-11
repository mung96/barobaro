package baro.baro.domain.noti.service;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.domain.noti.dto.response.NotiDto;
import baro.baro.domain.noti.dto.response.NotiListRes;
import baro.baro.domain.noti.repository.NotiRepository;
import baro.baro.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static baro.baro.global.statuscode.ErrorCode.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class NotiServiceImpl implements NotiService {
    private final static int MAX_NOTI_SIZE = 10;

    private final NotiRepository notiRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void addMemberFcmToken(final String fcmToken, final Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        member.updateFcmToken(fcmToken);
        memberRepository.save(member);
    }

    @Override
    public NotiListRes getNotiList(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        Pageable pageable = PageRequest.of(0, MAX_NOTI_SIZE);

        List<NotiDto> result = notiRepository.findNotisByMemberId(member.getId(), pageable);

        return new NotiListRes(result);
    }
}
