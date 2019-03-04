package exportkit.xd;

import android.app.Application;

public class Global extends Application {
    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    String baseUrl;
    String token;

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
