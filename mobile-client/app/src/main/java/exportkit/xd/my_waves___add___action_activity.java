
	 
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


    import android.support.v7.widget.LinearLayoutManager;
    import android.support.v7.widget.RecyclerView;
    import android.view.View;
    import android.widget.ImageView;
    import android.widget.TextView;

    import com.google.gson.Gson;

    import java.util.ArrayList;

    public class my_waves___add___action_activity extends Activity {


        private RecyclerView recycleView;
        private CardApi data;
        private String token;
        private String baseUrl;
        private String facebookcard;


        @Override
        public void onCreate(Bundle savedInstanceState) {

            super.onCreate(savedInstanceState);
            setContentView(R.layout.my_waves___add___action);

            Intent intent = getIntent();
            facebookcard = intent.getStringExtra("facebookcard");
            recycleView = (RecyclerView) findViewById(R.id.recycle);
            token = ((Global) getApplication()).getToken();
            baseUrl = ((Global) getApplication()).getBaseUrl();
            Gson gson = new Gson();
            data = gson.fromJson(facebookcard, CardApi.class);

            recycleView.setLayoutManager(new LinearLayoutManager(this));


            //adapter
            ActionAdapter adapter = new ActionAdapter(this, data.getArray(), token, baseUrl);
            recycleView.setAdapter(adapter);

        }

    }
	
	