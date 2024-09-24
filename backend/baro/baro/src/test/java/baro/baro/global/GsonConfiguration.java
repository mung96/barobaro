package baro.baro.global;

import org.springframework.boot.autoconfigure.gson.GsonBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class GsonConfiguration {

    @Bean
    public GsonBuilderCustomizer typeAdapterRegistration(){
        return gsonBuilder ->
                gsonBuilder.registerTypeAdapter(LocalDate.class, new LocalDateTypeAdapter());
    }
}
