
	 
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
import android.widget.TextView;
import android.widget.ImageView;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

	public class login_activity extends Activity {


	public void loginApi(View v) throws IOException {
		ApiServiceManager.postRequest(postUrl,postBody);
		Intent myIntent = new Intent(this, bottom_navigation_activity.class);
		this.startActivity(myIntent);
	}

	public String postUrl= "https://reqres.in/api/users/";
	public String postBody="{\n" +
			"    \"name\": \"morpheus\",\n" +
			"    \"job\": \"leader\"\n" +
			"}";

	public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.login);
	}

}
	
	