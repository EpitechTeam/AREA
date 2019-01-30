package exportkit.xd;

import android.app.Activity;
import android.support.v4.app.Fragment;

import java.io.Serializable;

public class ServiceManager implements Serializable {

    private FacebookService facebookService;
    private GoogleService googleService;

    public FacebookService getFacebookService() {
        return facebookService;
    }

    public GoogleService getGoogleService() {
        return googleService;
    }

    public ServiceManager() {
        super();
        facebookService = new FacebookService();
        googleService = new GoogleService();
    }

}
