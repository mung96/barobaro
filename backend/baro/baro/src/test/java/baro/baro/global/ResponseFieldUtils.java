package baro.baro.global;

import org.springframework.restdocs.payload.FieldDescriptor;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.restdocs.payload.JsonFieldType.NUMBER;
import static org.springframework.restdocs.payload.JsonFieldType.STRING;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

public class ResponseFieldUtils {
    public static List<FieldDescriptor> getCommonResponseFields(FieldDescriptor... additionalFields) {
        List<FieldDescriptor> responseFields = new ArrayList<>();

        responseFields.add(fieldWithPath("header.httpStatusCode").type(NUMBER).description("응답 코드"));
        responseFields.add(fieldWithPath("header.message").type(STRING).description("응답 메시지"));

        if (additionalFields != null && additionalFields.length > 0) {
            responseFields.addAll(List.of(additionalFields));
        }
        return responseFields;
    }
}
