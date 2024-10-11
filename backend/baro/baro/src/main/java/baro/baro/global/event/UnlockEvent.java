package baro.baro.global.event;

import org.springframework.context.ApplicationEvent;

public class UnlockEvent extends ApplicationEvent {

    private final String key;

    public UnlockEvent(final Object source, String key) {
        super(source);
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}
