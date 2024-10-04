package baro.baro.domain.location.repository;

import baro.baro.domain.location.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query(value = "SELECT * " +
            "FROM location " +
            "WHERE ST_Contains(geom, ST_Transform(ST_SetSRID(ST_Point(:longitude, :latitude), 4326), 5186))", nativeQuery = true)
    Location findLocation(@Param("latitude") double latitude, @Param("longitude") double longitude);
}
