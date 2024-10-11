package baro.baro.global.event;

import baro.baro.global.utils.FcmUtils;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FcmEventListener {
    private final FcmUtils fcmUtils;

    @EventListener
    public void handleFcmNotificationEvent(FcmEvent event) throws FirebaseMessagingException {
        // FCM 메시지 전송
        fcmUtils.sendNotification(event.getFrom(), event.getTo(), event.getNotiType(), event.getTitle(), event.getMessage());
    }
}

