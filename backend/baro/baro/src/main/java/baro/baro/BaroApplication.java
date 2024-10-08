package baro.baro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients // Feign 클라이언트 활성화
public class BaroApplication {

	public static void main(String[] args) {
		SpringApplication.run(BaroApplication.class, args);
	}

}
