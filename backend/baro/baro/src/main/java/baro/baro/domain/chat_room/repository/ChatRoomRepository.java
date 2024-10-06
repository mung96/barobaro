package baro.baro.domain.chat_room.repository;

import baro.baro.domain.chat_room.entity.ChatRoom;
import baro.baro.domain.chat_room.entity.RentalStatus;
import baro.baro.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>, ChatRoomRepositoryCustom {
    Optional<ChatRoom> findByProductIdAndOwnerIdAndRentalId(Long productId, Long ownerId, Long rentalId);

    List<ChatRoom> findByRentalIdAndRentalStatusNot(Long rentalId, RentalStatus rentalStatus);

    List<ChatRoom> findByOwnerIdAndRentalStatusNot(Long ownerId, RentalStatus rentalStatus);
}
