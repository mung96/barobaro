package baro.baro.global.event;

import baro.baro.global.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class UnlockEventListener {

    private final RedisUtils redisUtils;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMPLETION)
    public void onUnlockEvent(UnlockEvent event) {
        String key = event.getKey();
        redisUtils.unlock(key);;
    }
}
