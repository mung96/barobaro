package baro.baro.global.elastic_search.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Builder
@Document(indexName = "keyword")
@Setting(settingPath = "elastic/keyword-setting.json")
@Mapping(mappingPath = "elastic/keyword-mapping.json")
public class EsKeyword {
    @Id
    private String id;

    private String keyword;
}
