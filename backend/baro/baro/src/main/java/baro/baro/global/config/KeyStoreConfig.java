package baro.baro.global.config;

import baro.baro.global.utils.CertificateGeneratorUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Value;
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

    private static final String keyStorePath = "./config/keystore.p12";

    private static final String KEYSTORE_PASSWORD = "ssafya401";

    @Bean
    public KeyStore keyStore() throws Exception {
        Security.addProvider(new BouncyCastleProvider());
        KeyStore keyStore;

        File keyStoreFile = new File(keyStorePath);

        if (keyStoreFile.exists()) {
            // 기존 키스토어 파일이 있으면 로드
            keyStore = KeyStore.getInstance("PKCS12");
            try (FileInputStream fis = new FileInputStream(keyStoreFile)) {
                keyStore.load(fis, KEYSTORE_PASSWORD.toCharArray());
            } catch (Exception e) {
                log.warn("Failed to load keystore", e);
            }
        } else {
            // 키스토어 파일이 없으면 생성
            keyStore = KeyStore.getInstance("PKCS12");
            keyStore.load(null, KEYSTORE_PASSWORD.toCharArray());

            // 키 쌍 및 셀프 서명 인증서 생성
            KeyPair keyPair = CertificateGeneratorUtils.generateKeyPair();
            X509Certificate certificate = CertificateGeneratorUtils.generateSelfCertificate(keyPair);

            // 키스토어에 키와 인증서를 저장
            keyStore.setKeyEntry("barobaro", keyPair.getPrivate(), KEYSTORE_PASSWORD.toCharArray(), new Certificate[]{certificate});

            // 디렉토리가 없으면 생성
            File keyStoreDir = keyStoreFile.getParentFile();
            if (!keyStoreDir.exists()) {
                keyStoreDir.mkdirs(); // 부모 디렉토리 생성
            }

            // 키스토어 파일 저장
            try (FileOutputStream fos = new FileOutputStream(keyStoreFile)) {
                keyStore.store(fos, KEYSTORE_PASSWORD.toCharArray());
            } catch (Exception e) {
                log.warn("Failed to store keystore", e);
            }
        }

        return keyStore;
    }
}
