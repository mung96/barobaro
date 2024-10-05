package baro.baro.global.config;

import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class PdfConfig {

    @Bean
    public PdfFont koreanFont() throws IOException {
        String fontPath = "src/main/resources/PretendardVariable.ttf";
        return PdfFontFactory.createFont(fontPath, "Identity-H",true);
    }
}
