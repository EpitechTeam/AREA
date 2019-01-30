
	 
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

    import android.content.Intent;
    import android.os.Build;
    import android.os.Bundle;


    import android.support.annotation.RequiresApi;
    import android.util.Log;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;

    import com.facebook.CallbackManager;
    import com.facebook.FacebookCallback;
    import com.facebook.FacebookException;
    import com.facebook.FacebookSdk;
    import com.facebook.login.LoginResult;
    import com.facebook.login.widget.LoginButton;

    public class AccountFragment extends android.app.Fragment  {

        private ServiceManager serviceManager;
        private LoginButton loginButton;
        private LoginResult loginResult;
        private CallbackManager callbackManager;

        public AccountFragment() {

        }

        @RequiresApi(api = Build.VERSION_CODES.M)
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View view = inflater.inflate(R.layout.account, container, false);
            Bundle bundle = getArguments();
            ServiceManager serviceManager = (ServiceManager) bundle.getSerializable("ServiceManager");
            callbackManager = CallbackManager.Factory.create();
            serviceManager.getFacebookService().init(this, view, callbackManager);
            return view;
        }

        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            callbackManager.onActivityResult(requestCode, resultCode, data);
            super.onActivityResult(requestCode, resultCode, data);
        }
    }
	
	