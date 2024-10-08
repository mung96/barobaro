package baro.baro.global.elastic_search.service;

import baro.baro.global.elastic_search.domain.EsKeyword;
import baro.baro.global.elastic_search.repository.EsKeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EsKeywordServiceImpl implements EsKeywordService {
    private final EsKeywordRepository esKeywordRepository;

    @Override
    public void saveEsKeyword(String keyword) {
        EsKeyword esKeyword = EsKeyword.builder().keyword(keyword).build();

        esKeywordRepository.save(esKeyword);
    }
}
