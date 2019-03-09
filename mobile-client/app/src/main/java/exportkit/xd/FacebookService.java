package exportkit.xd;

import android.app.Activity;
import android.content.Intent;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.View;

import com.facebook.AccessToken;
import com.facebook.AccessTokenTracker;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.login.LoginBehavior;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

import java.io.IOException;
import java.io.Serializable;
import java.util.Arrays;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

import static com.facebook.FacebookSdk.getApplicationContext;
import static exportkit.xd.login_activity.JSON;

public class FacebookService  {


    private LoginResult loginResult;
    private boolean isLoged;
    private String token;

    public boolean isLoged() {
        return isLoged;
    }

    public FacebookService() {
        super();
        loginResult = null;
        isLoged = false;
    }

    public void init(final AccountFragment accountFragment, View view, CallbackManager callbackManager) {
        final LoginButton loginButton = (LoginButton) view.findViewById(R.id.facebook_login_button);
        loginButton.setFragment(accountFragment);
        loginButton.setReadPermissions(Arrays.asList("email", "user_likes", "user_events", "user_tagged_places", "user_posts", "user_photos,user_birthday",
                "user_hometown", "user_location", "user_likes", "user_events", "user_photos",
                "user_friends", "user_status", "user_tagged_places", "user_posts", "user_gender",
                "user_link,manage_pages", "pages_show_list", "public_profile"));
        token = ((Global) accountFragment.getActivity().getApplication()).getToken();
        loginButton.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult _loginResult) {
                loginResult = _loginResult;
                Log.d("Token Facebook", loginResult.getAccessToken().getToken());
                Log.d("Token Facebook", loginResult.getAccessToken().getUserId());

                String postUrl = ((Global)  accountFragment.getActivity().getApplication()).getBaseUrl() +"/facebook/addFacebookConnection";
                String postBody = "{\n" +
                        "\"accessToken\": \"" + loginResult.getAccessToken().getToken() + "\",\n" +
                        "\"id\":\"" + loginResult.getAccessToken().getUserId() + "\"\n" +
                        "}";
                OkHttpClient client = new OkHttpClient();
                RequestBody body = RequestBody.create(JSON, postBody);
                Request request = new Request.Builder()
                        .url(postUrl)
                        .addHeader("Authorization", token)
                        .post(body)
                        .build();
                client.newCall(request).enqueue(new okhttp3.Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        call.cancel();
                    }

                    @Override
                    public void onResponse(Call call, okhttp3.Response response) throws IOException {
                        String rsp = response.body().string();
                        Log.d("Facebook login response", rsp);
                    }
                });

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

    public String getToken() {
        return loginResult.getAccessToken().getToken();
    }
}
