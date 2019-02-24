
	 
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

    public class bottom_navigation_activity extends Activity {

        AccountFragment accountFragment = new AccountFragment();
        String token;
        ServiceManager serviceManager = new ServiceManager();
        MicrosoftGraphService microsoftGraphService = new MicrosoftGraphService();


        public void addWaves(View v) {
            Intent myIntent = new Intent(this, my_waves___add_activity.class);
            this.startActivity(myIntent);
        }

        public void launchGraph(View v) {
            Intent myIntent = new Intent(this, MicrosoftGraphService.class);
            startActivityForResult(myIntent, 23);
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
            LoginResponse log = (LoginResponse) getIntent().getSerializableExtra("Login");
            setContentView(R.layout.bottom_nav);
            BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.bottom_navigation);
            navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
            navigation.setSelectedItemId(R.id.navigation_waves);
            Log.d("AAA", log.toString());
        }

        public void switchToFragmentDiscover() {
            android.app.FragmentManager manager = getFragmentManager();
            manager.beginTransaction().replace(R.id.fragment_container, new discover_fragment()).commit();
        }

        public void switchToFragmentWaves() {
            android.app.FragmentManager manager = getFragmentManager();
            manager.beginTransaction().replace(R.id.fragment_container, new my_waves_fragment()).commit();
        }

        public void switchToFragmentAccount() {
            FragmentManager manager = getFragmentManager();
            manager.beginTransaction().replace(R.id.fragment_container, accountFragment).commit();
        }

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
	
	