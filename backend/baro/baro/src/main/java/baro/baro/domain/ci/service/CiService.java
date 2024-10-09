package baro.baro.domain.ci.service;

import baro.baro.domain.ci.dto.request.CiAddReq;

public interface CiService {
    void addCi(CiAddReq req, Long memberId);
}
