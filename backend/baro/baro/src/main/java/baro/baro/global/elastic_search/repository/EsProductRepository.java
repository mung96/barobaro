package baro.baro.global.elastic_search.repository;

import baro.baro.global.elastic_search.domain.EsProduct;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface EsProductRepository extends ElasticsearchRepository<EsProduct, Long> {
    List<EsProduct> findEsProductsByTitleAndLocationIdAndCategory(String title, Long locationId, String category);
    List<EsProduct> findEsProductsByTitleAndLocationId(String title, Long locationId);
}
