package exportkit.xd;

import java.io.Serializable;

public class ServiceManager implements Serializable {

    private FacebookService facebookService;
    private GoogleService googleService;
    private LoginResponse login;

    public FacebookService getFacebookService() {
        return facebookService;
    }

    public GoogleService getGoogleService() {
        return googleService;
    }

    public LoginResponse getLogin() {
        return login;
    }

    public void setLogin(LoginResponse login) {
        this.login = login;
    }

    public ServiceManager() {
        super();
        facebookService = new FacebookService();
        googleService = new GoogleService();
    }

}
