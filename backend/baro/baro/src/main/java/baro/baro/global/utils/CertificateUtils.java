package baro.baro.global.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.*;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;

@Component
@RequiredArgsConstructor
public class CertificateUtils {

    private final KeyStore keyStore;

    //개인 인증서 가져오는 함수.
    public X509Certificate getCertificate(String memberAlias) throws KeyStoreException {
        return (X509Certificate) keyStore.getCertificate(memberAlias);
    }

    //개인키 가져오는 함수. memberPassword는 실제 keyStore에 사용되는 비밀번호. PIN이 아님
    public PrivateKey getPrivateKey(String memberAlias, String memberPassword) throws KeyStoreException, UnrecoverableKeyException, NoSuchAlgorithmException {
        return (PrivateKey) keyStore.getKey(memberAlias, memberPassword.toCharArray());
    }

    /**
     * 최초 PIN 등록시 호출해야하는 함수, 재발급 시에도 사용
     * @param memberId 실제 멤버 id
     * @param uuid     사용할 uuid. 멤버의 uuid 아님. keyStore 에 사용될 비밀번호임. Pin db에 저장해두고 가져오기
     */
    public PrivateKey generateMemberPrivateKey(Long memberId, String uuid) throws Exception {
        KeyPair keypair = CertificateGeneratorUtils.generateKeyPair();
        PrivateKey privateKey = keypair.getPrivate();
        X509Certificate certificate = CertificateGeneratorUtils.generateSelfCertificate(keypair);
        if (keyStore.containsAlias(Long.toString(memberId))) {
            keyStore.deleteEntry(Long.toString(memberId));
        }
        keyStore.setKeyEntry(Long.toString(memberId), privateKey, uuid.toCharArray(), new Certificate[]{certificate});
        return privateKey;
    }

}
