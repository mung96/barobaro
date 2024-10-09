package baro.baro.domain.ci.controller;

import baro.baro.domain.ci.dto.request.CiAddReq;
import baro.baro.domain.ci.service.CiService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static baro.baro.global.statuscode.SuccessCode.AUTH_CI_CREATED;
import static org.springframework.http.HttpStatus.CREATED;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CiController {
    private final JwtService jwtService;
    private final CiService ciService;

    @PostMapping("/auth/authentication")
    public ResponseEntity<?> ciAdd(@RequestBody final CiAddReq ciAddReq) {
        Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
        ciService.addCi(ciAddReq, memberId);

        return new ResponseEntity<>(ResponseDto.success(AUTH_CI_CREATED, null), CREATED);
    }
}