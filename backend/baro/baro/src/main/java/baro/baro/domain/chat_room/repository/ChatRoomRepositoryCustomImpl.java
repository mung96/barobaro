package baro.baro.domain.chat_room.repository;

import baro.baro.domain.chat_room.dto.ChatRoomDto;
import baro.baro.domain.chat_room.dto.ChatRoomStatus;
import baro.baro.domain.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import static baro.baro.domain.chat_room.dto.ChatRoomStatus.OWNER;
import static baro.baro.domain.chat_room.dto.ChatRoomStatus.RENTAL;
import static baro.baro.domain.chat_room.entity.QChatRoom.chatRoom;
import static baro.baro.domain.product_image.entity.QProductImage.productImage;

@RequiredArgsConstructor
public class ChatRoomRepositoryCustomImpl implements ChatRoomRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ChatRoomDto> findAllChatRooms(Long memberId) {
        return queryFactory
                .selectFrom(chatRoom)
                .where(chatRoom.owner.id.eq(memberId).or(chatRoom.rental.id.eq(memberId)))
                .orderBy(chatRoom.lastChatTime.desc())
                .fetch() // 유저가 참여한 모든 채팅방 목록 가져오기
                .stream()
                .map(room -> {
                    String productMainImage = queryFactory
                            .select(productImage.src)
                            .from(productImage)
                            .where(productImage.product.id.eq(room.getProduct().getId()).and(productImage.isMain.isTrue()))
                            .fetchOne(); // 메인 이미지 가져오기

                    Member member;
                    ChatRoomStatus chatRoomStatus;

                    if (room.getOwner().getId().equals(memberId)) {
                        chatRoomStatus = OWNER;
                        member = room.getRental();
                    } else {
                        chatRoomStatus = RENTAL;
                        member = room.getOwner();
                    }

                    return ChatRoomDto.toDto(room, member, productMainImage, chatRoomStatus);
                })
                .collect(Collectors.toList());
    }
}
