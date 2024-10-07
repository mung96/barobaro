package baro.baro.global.elastic_search.domain;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "products")
@Getter
@Builder
public class EsProduct {
    @Id
    private Long id;

    private String title;

    public static EsProduct toDocument(Long id, String title) {
        return EsProduct.builder()
                .id(id)
                .title(title)
                .build();
    }

}
