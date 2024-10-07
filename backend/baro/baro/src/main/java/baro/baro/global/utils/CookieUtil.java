package baro.baro.global.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;

public class CookieUtil {
    @Value("${FRONT_URL}")
    private static String frontUrl;

    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie token = new Cookie(name, value);
        token.setHttpOnly(true);
        token.setSecure(true);
        token.setAttribute("SameSite", "None");
        token.setDomain(frontUrl);
        token.setMaxAge(maxAge);

        response.addCookie(token);
    }

    public static void deleteCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
