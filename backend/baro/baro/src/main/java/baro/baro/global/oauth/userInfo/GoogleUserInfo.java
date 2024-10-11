package baro.baro.global.oauth.userInfo;

import java.util.Map;

public class GoogleUserInfo implements Oauth2UserInfo {
    private Map<String, Object> attributes; //getAttributes()

    public GoogleUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    @Override
    public String getProviderId() {
        return (String)attributes.get("sub");
    }

    @Override
    public String getProvider() {
        return "google";
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        if(attributes.get("name") == null){
            return "barobaro_" + (System.currentTimeMillis()/1000);
        }
        return (String) attributes.get("name");
    }

    @Override
    public String getProfileUrl() {
        return (String) attributes.get("picture");
    }

}
