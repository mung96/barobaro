package baro.baro.domain.location.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.MultiPolygon;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "location_id")
    private Long id;

    private String name;

    private String dong;

    @Column(columnDefinition = "geometry(MultiPolygon, 5186)")
    private MultiPolygon geom;
}
