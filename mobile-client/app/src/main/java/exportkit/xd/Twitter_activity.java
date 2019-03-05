package exportkit.xd;


import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Toast;

import com.google.gson.Gson;
import com.twitter.sdk.android.core.Callback;
import com.twitter.sdk.android.core.Result;
import com.twitter.sdk.android.core.Twitter;
import com.twitter.sdk.android.core.TwitterAuthToken;
import com.twitter.sdk.android.core.TwitterCore;
import com.twitter.sdk.android.core.TwitterException;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.core.identity.TwitterLoginButton;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

import static exportkit.xd.login_activity.JSON;

/**
* @author Priyanka
 **/


public class Twitter_activity extends AppCompatActivity {


    //Declaring Twitter loginButton
    TwitterLoginButton loginButton;
String tokenApi;
    /**
     * @param savedInstanceState - saves instance state
     * onCreate method takes savedInstanceState as parameter and calls it's super method
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        //Initializing twitter instance
        Twitter.initialize(this);
        setContentView(R.layout.twitter_login);


        //Instantiating loginButton
        loginButton = (TwitterLoginButton) findViewById(R.id.login_button);

        /*
          Adding a callback to loginButton
          These statements will execute when loginButton is clicked
         */
        tokenApi = ((Global) getApplication()).getToken();
        loginButton.setCallback(new Callback<TwitterSession>() {
            @Override
            public void success(Result<TwitterSession> result) {
                /*
                  This provides TwitterSession as a result
                  This will execute when the authentication is successful
                 */
                final TwitterSession session = TwitterCore.getInstance().getSessionManager().getActiveSession();
                TwitterAuthToken authToken = session.getAuthToken();
                String token = authToken.token;
                String secret = authToken.secret;
                Log.d("Token", token);
                Log.d("Token Secret", secret);

                String postUrl = ((Global) getApplication()).getBaseUrl() +"/twitter/addTwitterConnection";
                String postBody = "{\n" +
                        "    \"token\": \"" + token + "\",\n" +
                        "    \"token_secret\": \"" + secret + "\"\n" +
                        "}";
                OkHttpClient client = new OkHttpClient();
                RequestBody body = RequestBody.create(JSON, postBody);
                Request request = new Request.Builder()
                        .url(postUrl)
                        .addHeader("Authorization", tokenApi)
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
                        Log.d("Twitter login response", rsp);
                    }
                });
                
            }

            @Override
            public void failure(TwitterException exception) {
                //Displaying Toast message
                Toast.makeText(Twitter_activity.this, "Authentication failed!", Toast.LENGTH_LONG).show();
            }
        });
    }


    /**
     * @param requestCode - we'll set it to REQUEST_CAMERA
     * @param resultCode - this will store the result code
     * @param data - data will store an intent
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        loginButton.onActivityResult(requestCode, resultCode, data);
    }
}
