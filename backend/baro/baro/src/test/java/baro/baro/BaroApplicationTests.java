package baro.baro;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Security;

@SpringBootTest
class BaroApplicationTests {

	@Test
	void contextLoads() {
		Security.addProvider(new BouncyCastleProvider());
	}

}
