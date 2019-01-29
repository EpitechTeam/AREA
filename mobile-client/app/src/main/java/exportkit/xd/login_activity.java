
	 
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


import android.view.View;
import android.widget.TextView;
import android.widget.ImageView;

public class login_activity extends Activity {

	private View _bg__login_ek2;
	private TextView or_register_here;
	private View background;
	private TextView sign_in;
	private View background_ek1;
	private TextView __________;
	private View background_ek2;
	private TextView david_z_1_hotmail_com;
	private ImageView sonar;

	public void loginApi(View v) {
		Intent myIntent = new Intent(this, bottom_navigation_activity.class);
		this.startActivity(myIntent);
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.login);

	}
}
	
	