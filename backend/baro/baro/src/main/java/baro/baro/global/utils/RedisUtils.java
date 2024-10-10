package baro.baro.global.utils;

import java.util.List;
import java.util.Set;

public interface RedisUtils {

    void setData(String key, Object value);

    void setDataWithExpiration(String key, Object value, Long expiredTime);

    Object getData(String key);

    void addListData(String key, Object value);

    List<Object> getListData(String key);

    void deleteData(String key);

    Set<String> keys(String pattern);

    Boolean lock(String key, Long timeout);

    Boolean lock(String key, String value, Long expireTime);

    void unlock(String key);

    void productRecentlySave(Long memberId, Long productId);
}
