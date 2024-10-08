package baro.baro.global.feigin_client.service;

import baro.baro.global.feigin_client.dto.response.NaverSearchRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "searchFeignClientCustom", url = "https://openapi.naver.com/v1/search/errata.json")
public interface SearchFeignClientCustom {
    @GetMapping
    NaverSearchRes naverSearch(@RequestParam("query") String query,
                          @RequestHeader("X-Naver-Client-Id") String id,
                          @RequestHeader("X-Naver-Client-Secret") String secret);
}
