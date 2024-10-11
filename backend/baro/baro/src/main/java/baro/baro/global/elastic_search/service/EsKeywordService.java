package baro.baro.global.elastic_search.service;

import baro.baro.global.elastic_search.domain.EsKeyword;

import java.util.List;

public interface EsKeywordService {
    void saveEsKeyword(String keyword);
    List<EsKeyword> findKeyword(String keyword);
}
