
	 
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
    import android.app.Notification;
    import android.content.Context;
    import android.content.Intent;
    import android.os.Bundle;
    import android.util.Log;
    import android.view.View;
    import android.widget.EditText;
    import android.widget.Toast;

    import com.google.gson.Gson;

    import java.io.IOException;

    import okhttp3.Call;
    import okhttp3.Callback;
    import okhttp3.OkHttpClient;
    import okhttp3.Request;
    import okhttp3.RequestBody;

    import static exportkit.xd.login_activity.JSON;

    public class register_activity extends Activity {


        private EditText register_username;
        private EditText register_password;
        private EditText register_first;
        private EditText register_last;
        private EditText register_confirm_password;
        private EditText editBaseUrl;

        public void registerClick(View v) throws IOException {
            ((Global) this.getApplication()).setBaseUrl(editBaseUrl.getText().toString());
            if (register_password != null && register_confirm_password != null)
                if (!register_password.getText().toString().equals(register_confirm_password.getText().toString())) {
                    Context context = getApplicationContext();
                    CharSequence text = "Password and Password Confirmation not same! Please retry after edit.";
                    int duration = Toast.LENGTH_SHORT;

                    Toast toast = Toast.makeText(context, text, duration);
                    toast.show();
                    return;
                }
            String postUrl = ((Global) this.getApplication()).getBaseUrl() +"/register";
            String postBody = "{\n" +
                    "\"email\": \"" + (register_username != null ? register_username.getText().toString() : null) + "\"," +
                    "\"first_name\": \"" + (register_first != null ? register_first.getText().toString() : null) + "\"," +
                    " \"last_name\": \"" + (register_last != null ? register_last.getText().toString() : null) + "\"," +
                    " \"password\": \"" + (register_password != null ? register_password.getText().toString() : null) + "\"" +
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
                    startActivity(intent);
                }
            });

        }

        @Override
        public void onCreate(Bundle savedInstanceState) {

            super.onCreate(savedInstanceState);
            setContentView(R.layout.register);
            register_username = (EditText) findViewById(R.id.register_username);
            register_password = (EditText) findViewById(R.id.register_password);
            register_confirm_password = (EditText) findViewById(R.id.register_confirm_password);
            register_first = (EditText) findViewById(R.id.register_first);
            register_last = (EditText) findViewById(R.id.register_last);
            editBaseUrl = (EditText) findViewById(R.id.editRegisterBaseUrl);
        }

    }
	
	