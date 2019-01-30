package exportkit.xd;

import android.app.Activity;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.View;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.login.LoginBehavior;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

import java.io.Serializable;

import static com.facebook.FacebookSdk.getApplicationContext;

public class FacebookService implements Serializable {


    private LoginResult loginResult;
    private boolean isLoged;

    public boolean isLoged() {
        return isLoged;
    }

    public FacebookService() {
        super();
        loginResult = null;
        isLoged = false;
    }

    public void init(AccountFragment accountFragment, View view, CallbackManager callbackManager){
        final LoginButton loginButton = (LoginButton) view.findViewById(R.id.facebook_login_button);
        loginButton.setFragment(accountFragment);
        loginButton.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult _loginResult) {
               loginResult = _loginResult;
               isLoged = true;
            }

            @Override
            public void onCancel() {
                // App code
            }

            @Override
            public void onError(FacebookException exception) {
                // App code
            }
        });
    }

    public String getToken(){
        return loginResult.getAccessToken().getToken();
    }
}
