package exportkit.xd;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import java.io.Serializable;

public class GoogleService implements Serializable {

    private GoogleSignInClient mGoogleSignInClient;
    private int RC_SIGN_IN = 9797;
    private SignInButton signInButton;
    private GoogleSignInAccount account;
    private Activity activity;
    private View view;
    private Button signOutButton;

    public GoogleService() {
        super();
        mGoogleSignInClient = null;
        signInButton = null;
        account = null;
        activity = null;
         view = null;
        signOutButton = null;

    }

    private void signOut() {
        mGoogleSignInClient.signOut();
        mGoogleSignInClient.revokeAccess();
        signInButton = view.findViewById(R.id.google_sign_in);
        signInButton.setVisibility(View.VISIBLE);
        signOutButton.setVisibility(View.INVISIBLE);
    }

    private void signIn() {
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        activity.startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    public void checkAlreadyConnnect(Context context) {
        account = GoogleSignIn.getLastSignedInAccount(context);
        if (account != null) {
            signInButton.setVisibility(View.INVISIBLE);
            signOutButton.setVisibility(View.VISIBLE);
        }
    }

    public void isLog(Context context) {
        return;
    }

    public void init(View _view, Activity _activity) {
        activity = _activity;
        view = _view;
        signInButton = view.findViewById(R.id.google_sign_in);
        signInButton.setSize(SignInButton.SIZE_STANDARD);
        signInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switch (v.getId()) {
                    case R.id.google_sign_in:
                        signIn();
                        break;
                }
            }
        });
        signOutButton = view.findViewById(R.id.google_sign_out);
        signOutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switch (v.getId()) {
                    // ...
                    case R.id.google_sign_out:
                        signOut();
                        break;
                    // ...
                }
            }
        });
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(activity, gso);
    }

    public int getRC_SIGN_IN() {
        return RC_SIGN_IN;
    }

    public void handleSignInResult(Intent data) {
        Task<GoogleSignInAccount> completedTask = GoogleSignIn.getSignedInAccountFromIntent(data);
        try {
            account = completedTask.getResult(ApiException.class);
        } catch (ApiException e) {
            Log.w("GOOGLE+ LOG ERROR", "signInResult:failed code=" + e.getStatusCode());
        }
    }
}
