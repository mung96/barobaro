package baro.baro.global.utils;

import org.bouncycastle.asn1.x500.X500Name;
import org.bouncycastle.cert.X509v3CertificateBuilder;
import org.bouncycastle.cert.jcajce.JcaX509CertificateConverter;
import org.bouncycastle.cert.jcajce.JcaX509v3CertificateBuilder;
import org.bouncycastle.operator.ContentSigner;
import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.security.*;
import java.security.cert.X509Certificate;
import java.util.Calendar;
import java.util.Date;

@Component
public class CertificateGeneratorUtils {
    //"CN=Your Name, OU=Your Unit, O=Your Organization, L=Your City, ST=Your State, C=Your Country"
    private static final String BAROBARO_DN = "CN=BaroBaro, OU=BaroBaro, O=BaroBaro, L=Seoul, ST=Seoul, C=Korea";

    public static KeyPair generateKeyPair() throws Exception {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(512);
        return keyPairGenerator.generateKeyPair();
    }

    public static X509Certificate generateSelfCertificate(KeyPair keyPair) throws Exception {
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();

        // 인증서 유효 기간 설정
        Calendar calendar = Calendar.getInstance();
        Date startDate = calendar.getTime();
        calendar.add(Calendar.YEAR, 1); // 1년 유효
        Date endDate = calendar.getTime();

        // 인증서 고유 ID 설정
        BigInteger serialNumber = new BigInteger(64, new SecureRandom());

        // X.509 인증서 생성
        X500Name issuerName = new X500Name(BAROBARO_DN);
        X509v3CertificateBuilder certBuilder = new JcaX509v3CertificateBuilder(
                issuerName,
                serialNumber,
                startDate,
                endDate,
                issuerName, //subjectName
                publicKey
        );

        // 인증서에 서명
        ContentSigner contentSigner = new JcaContentSignerBuilder("SHA256withRSA").build(privateKey);

        // 인증서 빌드
        return new JcaX509CertificateConverter()
                .setProvider("BC")
                .getCertificate(certBuilder.build(contentSigner));
    }
}
