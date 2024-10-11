package baro.baro.global.oauth;

import baro.baro.domain.member.entity.Member;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import static baro.baro.domain.member.entity.UserRole.ROLE_USER;

@Data
public class PrincipalDetails implements UserDetails, OAuth2User {
    private Member member;
    private Map<String, Object> attributes;

    public PrincipalDetails(Member member) {
        this.member = member;
    }

    //Oauth 로그인을 할때 사용하는 생성자
    public PrincipalDetails(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return ROLE_USER.name();
            }
        });
        return collect;
    }

    @Override
    public String getPassword() {
        return member.getEmail();
    }

    @Override
    public String getUsername() {
        return member.getNickname();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return null;
    }
}