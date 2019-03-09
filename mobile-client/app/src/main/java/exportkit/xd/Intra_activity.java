package exportkit.xd;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import static exportkit.xd.login_activity.JSON;

public class Intra_activity extends Activity {


    private Button intraButton;
    private EditText intraLog;
    private String tokenApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.intra_activity);
        tokenApi = ((Global) getApplication()).getToken();
        intraLog = (EditText) findViewById(R.id.autologin);
        intraButton = (Button) findViewById(R.id.autolog_push);
        intraButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String postUrl = ((Global) getApplication()).getBaseUrl() +"/intra/addIntraConnection";
                String postBody = "{\n" +
                        "\"token\": \"" + intraLog.getText().toString() + "\"\n" +
                        "}";
                OkHttpClient client = new OkHttpClient();
                RequestBody body = RequestBody.create(JSON, postBody);
                Request request = new Request.Builder()
                        .url(postUrl)
                        .addHeader("Authorization", tokenApi)
                        .post(body)
                        .build();
                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {

                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        Log.d("intra connection", response.body().string());
                        finish();
                    }
                });
            }
        });
    }
}
