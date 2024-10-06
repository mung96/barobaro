package baro.baro.global.config;

import baro.baro.global.utils.CertificateGeneratorUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.KeyPair;
import java.security.KeyStore;
import java.security.Security;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class KeyStoreConfig {

    private static final String KEYSTORE_PATH = "src/main/resources/keystore.p12";
    private static final String KEYSTORE_PASSWORD = "ssafya401";

    @Bean
    public KeyStore keyStore() throws Exception {
        Security.addProvider(new BouncyCastleProvider());

        File keyStoreFile = new File(KEYSTORE_PATH);
        KeyStore keyStore;
        if (keyStoreFile.exists()) {
            keyStore = KeyStore.getInstance("PKCS12");
            try (FileInputStream fis = new FileInputStream(keyStoreFile)) {
                keyStore.load(fis, KEYSTORE_PASSWORD.toCharArray());
            } catch (Exception e) {
                log.warn("Failed to load keystore", e);
            }
        } else {
            keyStore = KeyStore.getInstance("PKCS12");
            keyStore.load(null, KEYSTORE_PASSWORD.toCharArray());

            //우리 측 key, 인증서 생성
            KeyPair keyPair = CertificateGeneratorUtils.generateKeyPair();
            X509Certificate certificate = CertificateGeneratorUtils.generateSelfCertificate(keyPair);

            //우리 측 인증서 저장
            keyStore.setKeyEntry("barobaro", keyPair.getPrivate(), KEYSTORE_PASSWORD.toCharArray(), new Certificate[]{certificate});

            try (FileOutputStream fos = new FileOutputStream(KEYSTORE_PATH)) {
                keyStore.store(fos, KEYSTORE_PASSWORD.toCharArray());
            } catch (Exception e) {
                //키스토어 파일화로 저장하는데 에러 발생.
                log.warn("Failed to store keystore", e);
            }
        }
        return keyStore;
    }


}
