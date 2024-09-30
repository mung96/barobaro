package baro.baro.domain.chat_room.repository;

import baro.baro.domain.chat_room.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>, ChatRoomRepositoryCustom {
    Optional<ChatRoom> findByProductIdAndOwnerIdAndRentalId(Long productId, Long ownerId, Long rentalId);
}
