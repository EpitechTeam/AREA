
package exportkit.xd;

import android.app.Activity;
import android.app.FragmentManager;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.google.gson.Gson;

import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


public class bottom_navigation_activity extends Activity {


    AccountFragment accountFragment = new AccountFragment();
    my_waves_fragment my_waves_fragment = new my_waves_fragment();
    private LoginResponse loginResponse;


    public void launchGraph(View v) {
        Intent myIntent = new Intent(this, MicrosoftGraphService.class);
        startActivityForResult(myIntent, 23);
    }

    public void signOut(View v) {
        finish();
    }


    public void launchMeteo(View v) {
        Intent myIntent = new Intent(this, WeatherActivity.class);
        this.startActivity(myIntent);
    }


    public void launchTwitter(View v) {
        Intent myIntent = new Intent(this, Twitter_activity.class);
        this.startActivity(myIntent);
    }

    public void launchIntra(View v) {
        Intent myIntent = new Intent(this, Intra_activity.class);
        this.startActivity(myIntent);
    }


    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_waves:
                    switchToFragmentWaves();
                    item.setChecked(true);
                    break;
                case R.id.navigation_account:
                    switchToFragmentAccount();
                    item.setChecked(true);
                    break;
                case R.id.navigation_discover:
                    switchToFragmentDiscover();
                    item.setChecked(true);
                    break;
            }
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(this);
        AppEventsLogger.activateApp(this);
        loginResponse = ((LoginResponse) getIntent().getSerializableExtra("Login"));
        String postUrl = ((Global) getApplication()).getBaseUrl() + "/lemonde/addLemondeConnection";
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(postUrl)
                .addHeader("Authorization", loginResponse.getData().getToken())
                .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {

            }
        });
        setContentView(R.layout.bottom_nav);
        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.bottom_navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.setSelectedItemId(R.id.navigation_waves);
    }

    public void switchToFragmentDiscover() {
        android.app.FragmentManager manager = getFragmentManager();
        manager.beginTransaction().replace(R.id.fragment_container, new discover_fragment()).commit();
    }

    public void switchToFragmentWaves() {
        android.app.FragmentManager manager = getFragmentManager();
        manager.beginTransaction().replace(R.id.fragment_container, my_waves_fragment).commit();
    }

    public void switchToFragmentAccount() {
        FragmentManager manager = getFragmentManager();
        Bundle bundle = new Bundle();
        bundle.putString("name", loginResponse.getData().getFirstName() + " " + loginResponse.getData().getLastName());
        accountFragment.setArguments(bundle);
        manager.beginTransaction().replace(R.id.fragment_container, accountFragment).commit();
    }

    ;

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 23) {
            if (resultCode == 54) {
                String myStr = data.getStringExtra("MyData");
                Log.d("OKOKOKOK", myStr);
            }
        }
    }

}
	
	