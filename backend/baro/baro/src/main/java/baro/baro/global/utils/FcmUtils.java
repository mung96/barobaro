package baro.baro.global.utils;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.noti.entity.Noti;
import baro.baro.domain.noti.entity.NotiType;
import baro.baro.domain.noti.repository.NotiRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FcmUtils {
    private final FirebaseMessaging firebaseMessaging;
    private final NotiRepository notiRepository;

    public void sendNotification(Member from, Member to, NotiType notiType, String title, String body) throws
            FirebaseMessagingException {

        Noti notification = Noti.builder()
                .toMember(to)
                .fromMember(from)
                .notiType(notiType)
                .message(body)
                .build();
        notiRepository.save(notification);

        String token = to.getFcmToken();
        Message message = Message.builder()
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .setToken(token)
                .build();
        firebaseMessaging.send(message);
    }

}
