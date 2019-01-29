package exportkit.xd;

import android.app.Activity;
import android.support.v4.app.Fragment;

import java.io.Serializable;

public class ServiceManager implements Serializable {

    private FacebookService facebookService;

    public FacebookService getFacebookService() {
        return facebookService;
    }

    public ServiceManager() {
        super();
        facebookService = new FacebookService();
    }

}
