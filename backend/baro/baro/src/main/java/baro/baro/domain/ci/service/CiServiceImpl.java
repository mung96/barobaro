package baro.baro.domain.ci.service;

import baro.baro.domain.ci.dto.request.CiAddReq;
import baro.baro.domain.ci.entity.Ci;
import baro.baro.domain.ci.repository.CiRepository;
import baro.baro.domain.member.entity.Member;
import baro.baro.domain.member.repository.MemberRepository;
import baro.baro.global.exception.CustomException;
import baro.baro.global.feigin_client.dto.response.PortOneCiRes;
import baro.baro.global.feigin_client.service.PortOneService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static baro.baro.global.statuscode.ErrorCode.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Slf4j
public class CiServiceImpl implements CiService{
    private final MemberRepository memberRepository;
    private final CiRepository ciRepository;
    private final PortOneService portOneService;

    @Override
    @Transactional
    public void addCi(CiAddReq req, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        if(!ciRepository.existsCiByMember(member.getId())) {
            log.info("1111" + req.getImpUid());
            PortOneCiRes portOneCiRes = portOneService.getPortOneToken(req.getImpUid());

            updateMember(portOneCiRes, member);

            Ci ci = req.toEntity(portOneCiRes.getResponse().getUnique_key(), member);

            ciRepository.save(ci);
        }
    }

    private void updateMember(PortOneCiRes portOneCiRes, Member member) {
        member.updateName(portOneCiRes.getResponse().getName());
        member.updateBirthDate(LocalDate.parse(portOneCiRes.getResponse().getBirthday()));
        member.updatePhoneNumber(portOneCiRes.getResponse().getPhone());
        member.updateIsCertificated(true);
    }
}
