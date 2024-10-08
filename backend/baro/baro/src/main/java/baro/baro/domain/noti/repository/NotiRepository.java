package baro.baro.domain.noti.repository;

import baro.baro.domain.noti.entity.Noti;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotiRepository extends JpaRepository<Noti, Long> {
}
