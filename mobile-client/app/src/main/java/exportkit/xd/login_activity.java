
	 
	/*
     *	This content is generated from the PSD File Info.
     *	(Alt+Shift+Ctrl+I).
     *
     *	@desc
     *	@file 		login
     *	@date 		0
     *	@title 		Login
     *	@author
     *	@keywords
     *	@generator 	Export Kit v1.2.8.xd
     *
     */


    package exportkit.xd;

    import android.app.Activity;
    import android.content.Intent;
    import android.os.Bundle;
    import android.util.Log;
    import android.view.View;
    import android.widget.EditText;

    import com.google.gson.Gson;


    import java.io.IOException;

    import okhttp3.Call;
    import okhttp3.Callback;
    import okhttp3.MediaType;
    import okhttp3.OkHttpClient;
    import okhttp3.Request;
    import okhttp3.RequestBody;

    public class login_activity extends Activity {

        private EditText editBaseUrl;

        ApiServiceManager apiServiceManager = new ApiServiceManager();
        EditText email;
        EditText password;

        public void clickText(View v) {
            Intent intent = new Intent();
            intent.setClass(getApplicationContext(), register_activity.class);
            startActivity(intent);
        }

        public void loginApi(View v) throws IOException {
            ((Global) this.getApplication()).setBaseUrl(editBaseUrl.getText().toString());
            String postUrl = ((Global) this.getApplication()).getBaseUrl() +"/login";
            String postBody = "{\n" +
                    "    \"email\": \"" + (email != null ? email.getText().toString() : null) + "\",\n" +
                    "    \"password\": \"" + (password != null ? password.getText().toString() : null) + "\"\n" +
                    "}";
            OkHttpClient client = new OkHttpClient();
            RequestBody body = RequestBody.create(JSON, postBody);
            Request request = new Request.Builder()
                    .url(postUrl)
                    .post(body)
                    .build();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    call.cancel();
                }

                @Override
                public void onResponse(Call call, okhttp3.Response response) throws IOException {
                    String rsp = response.body().string();
                    Log.d("tes srx fdp?", rsp);
                    String jsonString = rsp;
                    LoginResponse data = new LoginResponse();
                    Gson gson = new Gson();
                    data = gson.fromJson(jsonString, LoginResponse.class);
                    Intent intent = new Intent();
                    intent.setClass(getApplicationContext(), bottom_navigation_activity.class);
                    intent.putExtra("Login", data);
                    ((Global) getApplication()).setToken(data.getData().getToken());
                    startActivity(intent);
                }
            });
        }

        public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.login);
            editBaseUrl = (EditText) findViewById(R.id.baseUrl);
            email = (EditText) findViewById(R.id.email);
            password = (EditText) findViewById(R.id.password);
        }
    }
	
	