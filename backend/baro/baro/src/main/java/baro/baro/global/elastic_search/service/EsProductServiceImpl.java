package baro.baro.global.elastic_search.service;

import baro.baro.global.elastic_search.domain.EsProduct;
import baro.baro.global.elastic_search.repository.EsProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EsProductServiceImpl implements EsProductService {
    private final EsProductRepository esProductRepository;

    @Override
    public void saveEsProduct(Long productId, String title, Long locationId, String category) {
        EsProduct esProduct = EsProduct.toDocument(productId, title, locationId, category);

        esProductRepository.save(esProduct);
    }

    @Override
    public List<EsProduct> searchProduct(String title, Long locationId, String category) {
        return esProductRepository.findEsProductsByTitleAndLocationIdAndCategory(title, locationId, category);
    }

    @Override
    public List<EsProduct> searchAllProduct(String title, Long locationId) {
        return esProductRepository.findEsProductsByTitleAndLocationId(title, locationId);
    }
}
