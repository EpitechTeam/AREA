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

public class WeatherActivity extends Activity {
    private EditText insee;
    private EditText city;
    private Button button;
    private String tokenApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.weather_activity);
        tokenApi = ((Global) getApplication()).getToken();
        insee = (EditText) findViewById(R.id.insee);
        city = (EditText) findViewById(R.id.city);
        button = (Button) findViewById(R.id.weather_push);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String postUrl = ((Global) getApplication()).getBaseUrl() +"/meteo/addMeteoConnection";
                String postBody = "{\n" +
                        "    \"insee\": \"" + insee.getText().toString() + "\",\n" +
                        "    \"city\": \"" + city.getText().toString() + "\"\n" +
                        "}";
                OkHttpClient client = new OkHttpClient();
                RequestBody body = RequestBody.create(JSON, postBody);
                final Request request = new Request.Builder()
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
                        Log.d("response Sign In Weather", response.body().string());
                            finish();
                    }
                });
            }
        });
    }
}
