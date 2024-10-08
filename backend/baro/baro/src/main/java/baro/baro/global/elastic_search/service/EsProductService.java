package baro.baro.global.elastic_search.service;

import baro.baro.global.elastic_search.domain.EsProduct;

import java.util.List;

public interface EsProductService {
    void saveEsProduct(Long productId, String title, Long locationId, String category);
    List<EsProduct> searchProduct(String title, Long locationId, String category);
    List<EsProduct> searchAllProduct(String title, Long locationId);
}
