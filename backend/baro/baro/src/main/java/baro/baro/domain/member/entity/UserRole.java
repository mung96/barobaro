package baro.baro.domain.member.entity;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    ROLE_USER,
    ROLE_ADMIN,
    ;

    @Override
    public String getAuthority() {
        return ROLE_USER.name();
    }
}