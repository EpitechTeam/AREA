
	 
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
    import android.os.Build;
    import android.os.Bundle;
    import android.support.annotation.RequiresApi;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.Button;

    import com.facebook.CallbackManager;
    import com.facebook.login.LoginResult;
    import com.facebook.login.widget.LoginButton;
    import com.google.android.gms.auth.api.signin.GoogleSignIn;
    import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
    import com.google.android.gms.common.SignInButton;

    import java.io.IOException;

    public class AccountFragment extends android.app.Fragment {

        private LoginButton loginButton;
        private LoginResult loginResult;
        private CallbackManager callbackManager;
        View view;


        @RequiresApi(api = Build.VERSION_CODES.M)
        private void googleAlreadyAuth() {
            GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(this.getContext());
            if (account != null) {
                SignInButton signInButton = view.findViewById(R.id.google_sign_in);
                signInButton.setVisibility(View.INVISIBLE);
                Button signOutButton = view.findViewById(R.id.google_sign_out);
                signOutButton.setVisibility(View.VISIBLE);
            }
        }


        @RequiresApi(api = Build.VERSION_CODES.M)
        @Override
        public void onStart() {
            super.onStart();
            googleAlreadyAuth();
        }

        @Override
        public void onResume() {
            super.onResume();
            googleAlreadyAuth();
        }

        ServiceManager serviceManager = new ServiceManager();

        @RequiresApi(api = Build.VERSION_CODES.M)
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            view = inflater.inflate(R.layout.account, container, false);

            callbackManager = CallbackManager.Factory.create();
            serviceManager.getFacebookService().init(this, view, callbackManager);
            serviceManager.getGoogleService().init(view, this.getActivity());
            return view;
        }


        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            callbackManager.onActivityResult(requestCode, resultCode, data);
            super.onActivityResult(requestCode, resultCode, data);
            if (requestCode == serviceManager.getGoogleService().getRC_SIGN_IN())
                serviceManager.getGoogleService().handleSignInResult(data);
        }

    }
	
	