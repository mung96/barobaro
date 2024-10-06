package baro.baro.global.config;

import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@Configuration
public class PdfConfig {

    @Bean
    public PdfFont koreanFont() throws IOException {
        ClassPathResource fontResource = new ClassPathResource("PretendardVariable.ttf");
        String fontPath = fontResource.getPath();
        return PdfFontFactory.createFont(fontPath, "Identity-H",true);
    }
}
