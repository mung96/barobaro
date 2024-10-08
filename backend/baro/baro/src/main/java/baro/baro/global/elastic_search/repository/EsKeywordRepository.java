package baro.baro.global.elastic_search.repository;

import baro.baro.global.elastic_search.domain.EsKeyword;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface EsKeywordRepository extends ElasticsearchRepository<EsKeyword, Long> {
    @Query("{\"match\": {\"keyword\": \"?0\"}}")
    List<EsKeyword> findByKeyword(String keyword);
}