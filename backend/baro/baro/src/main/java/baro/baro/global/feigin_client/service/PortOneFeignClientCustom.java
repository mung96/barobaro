package baro.baro.global.feigin_client.service;

import baro.baro.global.feigin_client.dto.request.PortOneTokenReq;
import baro.baro.global.feigin_client.dto.response.PortOneCiRes;
import baro.baro.global.feigin_client.dto.response.PortOneTokenRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "portOneFeignClientCustom", url = "https://api.iamport.kr")
public interface PortOneFeignClientCustom {
    @PostMapping(value = "/users/getToken", consumes = MediaType.APPLICATION_JSON_VALUE)
    PortOneTokenRes getToken(@RequestBody PortOneTokenReq request);

    @GetMapping(value = "/certifications/{imp_uid}", produces = MediaType.APPLICATION_JSON_VALUE)
    PortOneCiRes getCi(@PathVariable("imp_uid") String imp_uid,
                       @RequestHeader("Authorization") String authorization);
}
