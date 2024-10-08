package baro.baro.global.elastic_search.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Builder
@Document(indexName = "product")
@Setting(settingPath = "elastic/product-setting.json")
@Mapping(mappingPath = "elastic/product-mapping.json")
public class EsProduct {
    @Id
    private Long id;

    private String title;

    private Long locationId;

    private String category;

    public static EsProduct toDocument(Long id, String title, Long locationId, String category) {
        return EsProduct.builder()
                .id(id)
                .title(title)
                .locationId(locationId)
                .category(category)
                .build();
    }

}
