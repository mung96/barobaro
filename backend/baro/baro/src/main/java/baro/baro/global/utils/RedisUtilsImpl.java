package baro.baro.global.utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisUtilsImpl implements RedisUtils {

    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<String, String> redisStringTemplate;

    public void setData(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public void setDataWithExpiration(String key, Object value, Long expiredTime) {
        redisTemplate.opsForValue().set(key, value, expiredTime, TimeUnit.SECONDS);
    }

    public Object getData(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void addListData(String key, Object value) {
        redisTemplate.opsForList().rightPush(key, value);
    }

    public List<Object> getListData(String key) {
        Long size = redisTemplate.opsForList().size(key);
        if (size != null) {
            return redisTemplate.opsForList().range(key, 0, size);
        } else {
            return null;
        }
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    public Set<String> keys(String pattern) {
        return redisTemplate.keys(pattern);
    }

    public void productRecentlySave(Long memberId, Long productId) {
        String key = "product_recently_" + memberId;

        redisTemplate.opsForList().leftPush(key, productId.toString());
        redisTemplate.opsForList().trim(key, 0, 9);
    }

    public Boolean lock(String key, Long timeout) {
        return this.lock(key, "lock", timeout);
    }

    public Boolean lock(String key, String value, Long timeout) {
//        Boolean success =  redisTemplate.opsForValue().setIfAbsent("lock_" + key, value, Duration.ofMillis(timeout));
//        log.info("lock info : "+success);
//        return success !=null && success;
        try {
            Boolean success = redisStringTemplate.opsForValue().setIfAbsent("lock_" + key, value, Duration.ofMillis(timeout));
            if (success == null) {
                log.warn("Redis setIfAbsent returned null. Key: " + key);
                return false; // null인 경우 false 반환
            }
            log.info("Lock info: " + success);
            return success;
        } catch (Exception e) {
            log.error("Error while trying to acquire lock: ", e);
            return false; // 예외 발생 시 false 반환
        }
    }

    public void unlock(String key) {
        redisStringTemplate.delete("lock_" + key);
    }
}
