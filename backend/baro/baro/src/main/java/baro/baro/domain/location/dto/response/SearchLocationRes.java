package baro.baro.domain.location.dto.response;

import baro.baro.domain.location.dto.SearchLocationDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchLocationRes {
    List<SearchLocationDto> result;

}
