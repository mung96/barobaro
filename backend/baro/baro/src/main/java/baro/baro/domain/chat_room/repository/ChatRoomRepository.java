package baro.baro.domain.chat_room.repository;

import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.entity.RentalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>, ChatRoomRepositoryCustom {
    Optional<ChatRoom> findByProductIdAndOwnerIdAndRentalId(Long productId, Long ownerId, Long rentalId);

    List<ChatRoom> findByRentalIdAndRentalStatusNot(Long rentalId, RentalStatus rentalStatus);

    List<ChatRoom> findByOwnerIdAndRentalStatusNot(Long ownerId, RentalStatus rentalStatus);

    @Modifying
    @Transactional
    @Query("DELETE FROM ChatRoom c " +
            "WHERE c.product.id = :productId")
    void deleteByProductId(@Param("productId") Long productId);
}
