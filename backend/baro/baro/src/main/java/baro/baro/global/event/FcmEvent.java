package baro.baro.global.event;

import baro.baro.domain.member.entity.Member;
import baro.baro.domain.noti.entity.NotiType;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class FcmEvent extends ApplicationEvent {
    private final Member from;
    private final Member to;
    private final NotiType notiType;
    private final String title;
    private final String message;

    public FcmEvent(Object source,
                    Member from, Member to, NotiType notiType,
                    String title, String message
    ) {
        super(source);
        this.from = from;
        this.to = to;
        this.notiType = notiType;
        this.title = title;
        this.message = message;
    }
}
