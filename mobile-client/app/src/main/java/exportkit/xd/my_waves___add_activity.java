
	 
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
    import android.widget.Button;
    import android.widget.ImageButton;
    import android.widget.ImageView;
    import android.widget.TextView;

    import com.google.gson.Gson;

    public class my_waves___add_activity extends Activity {

        private String twitterCard;
        private String facebookcard;
        private String intraCard;
        private String meteoCard;
        private String outlookCard;
        private String leMondeCard;
        private String nasaCard;


        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.my_waves___add);
            ImageButton facebookButton = (ImageButton) findViewById(R.id.facebook_wave_entry);
            facebookButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent myIntent = new Intent(getBaseContext(), my_waves___add___action_activity.class);
                    myIntent.putExtra("facebookcard", facebookcard);
                    startActivity(myIntent);
                }
            });
            ImageButton twitterButton = (ImageButton) findViewById(R.id.item_ek6);
            twitterButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent myIntent = new Intent(getBaseContext(), my_waves___add___action_activity.class);
                    myIntent.putExtra("facebookcard", twitterCard);
                    startActivity(myIntent);
                }
            });
            ImageButton intraButton = (ImageButton) findViewById(R.id.intra_wave_enty);
            intraButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent myIntent = new Intent(getBaseContext(), my_waves___add___action_activity.class);
                    myIntent.putExtra("facebookcard", intraCard);
                    startActivity(myIntent);
                      }
            });
            Button meteoButton = (Button) findViewById(R.id.meteo_waves_entry);
            meteoButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent myIntent = new Intent(getBaseContext(), my_waves___add___action_activity.class);
                    myIntent.putExtra("facebookcard", meteoCard);
                    startActivity(myIntent);
                }
            });
            Button outlookButton = (Button) findViewById(R.id.outlook_wave_entry);
            outlookButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent myIntent = new Intent(getBaseContext(), my_waves___add___action_activity.class);
                    myIntent.putExtra("facebookcard", outlookCard);
                    startActivity(myIntent);
                }
            });
            ImageButton leMondeButton = (ImageButton) findViewById(R.id.le_monde);
            leMondeButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent myIntent = new Intent(getBaseContext(), my_waves___add___action_activity.class);
                    myIntent.putExtra("facebookcard", leMondeCard);
                    startActivity(myIntent);
                }
            });
            ImageButton nasaButton = (ImageButton) findViewById(R.id.nasa);
            nasaButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent myIntent = new Intent(getBaseContext(), my_waves___add___action_activity.class);
                    myIntent.putExtra("facebookcard", nasaCard);
                    startActivity(myIntent);
                }
            });
            Intent intent = getIntent();
            facebookcard = intent.getStringExtra("facebookcard");
            twitterCard = intent.getStringExtra("twitterCard");
            intraCard = intent.getStringExtra("intraCard");
            meteoCard = intent.getStringExtra("meteoCard");
            outlookCard = intent.getStringExtra("outlookCard");
            leMondeCard = intent.getStringExtra("leMondeCard");
            nasaCard = intent.getStringExtra("nasaCard");
        }
    }
	
	