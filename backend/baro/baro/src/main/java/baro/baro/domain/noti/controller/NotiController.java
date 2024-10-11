package baro.baro.domain.noti.controller;

import baro.baro.domain.noti.dto.response.NotiListRes;
import baro.baro.domain.noti.service.NotiService;
import baro.baro.global.dto.ResponseDto;
import baro.baro.global.oauth.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import static baro.baro.global.statuscode.SuccessCode.FCM_TOKEN_UPDATE_OK;
import static baro.baro.global.statuscode.SuccessCode.NOTIFICATION_LIST_OK;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
public class NotiController {
	private final JwtService jwtService;
	private final NotiService notiService;

	@GetMapping()
	public ResponseEntity<?> notificationList() {
		Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
		NotiListRes result = notiService.getNotiList(memberId);
		return new ResponseEntity<>(ResponseDto.success(NOTIFICATION_LIST_OK, result), OK);
	}

	@PatchMapping("/fcm-register")
	public ResponseEntity<?> addMemberFcmToken(@RequestParam("token") String token) {
		Long memberId = jwtService.getUserId(SecurityContextHolder.getContext());
		notiService.addMemberFcmToken(token, memberId);
		return new ResponseEntity<>(ResponseDto.success(FCM_TOKEN_UPDATE_OK, null), OK);
	}

}
