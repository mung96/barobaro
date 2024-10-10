package baro.baro.domain.chat.repository;

import baro.baro.domain.chat.document.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends MongoRepository<Chat, Long> {
    List<Chat> findByChatRoomIdOrderByChatTime(Long chatRoomId);
}
