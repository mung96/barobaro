package baro.baro.global.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisUtilsImpl implements RedisUtils {

    private final RedisTemplate<String, Object> redisTemplate;

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

    public Boolean lock(String key, Long timeout) {
        return this.lock(key, "", timeout);
    }

    public Boolean lock(String key, Object value, Long timeout) {
        Boolean success =  redisTemplate.opsForValue().setIfAbsent("lock_" + key, value, Duration.ofMillis(timeout));
        return success !=null && success;
    }

    public void unlock(String key) {
        redisTemplate.delete("lock_" + key);
    }
}
