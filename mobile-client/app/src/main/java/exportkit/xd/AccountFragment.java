
	 
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
    import android.app.FragmentTransaction;
    import android.content.Intent;
    import android.media.FaceDetector;
    import android.os.Build;
    import android.os.Bundle;
    import android.support.annotation.RequiresApi;
    import android.util.Log;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.Button;
    import android.widget.Toast;

    import com.facebook.AccessToken;
    import com.facebook.AccessTokenTracker;
    import com.facebook.CallbackManager;
    import com.facebook.login.LoginManager;
    import com.facebook.login.LoginResult;
    import com.facebook.login.widget.LoginButton;
    import com.google.android.gms.auth.api.signin.GoogleSignIn;
    import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
    import com.google.android.gms.common.SignInButton;
    import com.google.gson.Gson;

    import java.io.IOException;

    import okhttp3.Call;
    import okhttp3.Callback;
    import okhttp3.OkHttpClient;
    import okhttp3.Request;
    import okhttp3.RequestBody;
    import okhttp3.Response;

    import static com.facebook.FacebookSdk.getApplicationContext;
    import static exportkit.xd.login_activity.JSON;

    public class AccountFragment extends android.app.Fragment {

        private LoginResult loginResult;
        private CallbackManager callbackManager;
        View view;
        FacebookService facebookService = new FacebookService();

        private Button azureButton;
        private Button twitterbutton;
        private LoginButton facebookButton;
        private String token;
        private Button facebookLogout;

        @Override
        public void onResume() {
            super.onResume();
            String postUrl = ((Global) this.getActivity().getApplication()).getBaseUrl() + "/outlook/isConnected";
            token = ((Global) getActivity().getApplication()).getToken();
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url(postUrl)
                    .addHeader("Authorization", token)
                    .build();
            Log.d("=request", request.toString());
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    call.cancel();
                }

                @Override
                public void onResponse(Call call, okhttp3.Response response) throws IOException {
                        String rsp = response.body().string();
                        Log.d("response isconnected microsoft", rsp);
                        String jsonString = rsp;
                        IsConnected data = new IsConnected();
                        Gson gson = new Gson();
                        data = gson.fromJson(jsonString, IsConnected.class);
                    if (data.isType()) {
                        azureButton.setText("Microsoft Graph Sign out");
                        azureButton.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                String postUrl = ((Global) getActivity().getApplication()).getBaseUrl() + "/outlook/logout";

                                OkHttpClient client = new OkHttpClient();
                                Request request = new Request.Builder()
                                        .url(postUrl)
                                        .addHeader("Authorization", token)
                                        .build();
                                client.newCall(request).enqueue(new Callback() {
                                    @Override
                                    public void onFailure(Call call, IOException e) {

                                    }

                                    @Override
                                    public void onResponse(Call call, Response response) throws IOException {
                                        azureButton.setText("Microsoft Graph Sign in");
                                        azureButton.setOnClickListener(new View.OnClickListener() {
                                            @Override
                                            public void onClick(View v) {
                                                Intent myIntent = new Intent(getActivity(), MicrosoftGraphService.class);
                                                startActivityForResult(myIntent, 23);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        azureButton.setText("Microsoft Graph Sign in");
                        azureButton.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                Intent myIntent = new Intent(getActivity(), MicrosoftGraphService.class);
                                startActivityForResult(myIntent, 23);
                            }
                        });
                    }
                }
            });
            String postUrl1 = ((Global) this.getActivity().getApplication()).getBaseUrl() + "/twitter/isConnected";
            OkHttpClient client1 = new OkHttpClient();
            Request request1 = new Request.Builder()
                    .url(postUrl1)
                    .addHeader("Authorization", token)
                    .build();
            client1.newCall(request1).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    call.cancel();
                }

                @Override
                public void onResponse(Call call, okhttp3.Response response) throws IOException {
                    String rsp = response.body().string();
                    String jsonString = rsp;
                    IsConnected data = new IsConnected();
                    Gson gson = new Gson();
                    data = gson.fromJson(jsonString, IsConnected.class);
                    if (data.isType()) {
                        getActivity().runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                twitterbutton.setText("Twitter Sign out");
                                twitterbutton.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View v) {
                                        String postUrl = ((Global) getActivity().getApplication()).getBaseUrl() + "/twitter/logout";
                                        OkHttpClient client = new OkHttpClient();
                                        Request request = new Request.Builder()
                                                .url(postUrl)
                                                .addHeader("Authorization", token)
                                                .build();
                                        client.newCall(request).enqueue(new Callback() {
                                            @Override
                                            public void onFailure(Call call, IOException e) {

                                            }

                                            @Override
                                            public void onResponse(Call call, Response response) throws IOException {
                                                getActivity().runOnUiThread(new Runnable() {

                                                    @Override
                                                    public void run() {
                                                        twitterbutton.setText("Twitter Sign in");
                                                        twitterbutton.setOnClickListener(new View.OnClickListener() {
                                                            @Override
                                                            public void onClick(View v) {
                                                                Intent myIntent = new Intent(getActivity(), Twitter_activity.class);
                                                                startActivityForResult(myIntent, 23);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        getActivity().runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                twitterbutton.setText("Twitter Sign in");
                                twitterbutton.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View v) {
                                        Intent myIntent = new Intent(getActivity(), Twitter_activity.class);
                                        startActivityForResult(myIntent, 23);
                                    }
                                });
                            }
                        });
                    }
                }
            });

            AccessTokenTracker accessTokenTracker = new AccessTokenTracker() {
                @Override
                protected void onCurrentAccessTokenChanged(AccessToken oldAccessToken,
                                                           AccessToken currentAccessToken) {
                    if (currentAccessToken == null) {
                        String postUrl = ((Global) getActivity().getApplication()).getBaseUrl() + "/facebook/logout";
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder()
                                .url(postUrl)
                                .addHeader("Authorization", token)
                                .build();
                        client.newCall(request).enqueue(new Callback() {
                            @Override
                            public void onFailure(Call call, IOException e) {

                            }

                            @Override
                            public void onResponse(Call call, Response response) throws IOException {
                                Log.d("Log out Api Facebook", "ok");
                                LoginManager.getInstance().logOut();
                            }
                        });
                    }
                }
            };

            String postUrl2 = ((Global) this.getActivity().getApplication()).getBaseUrl() + "/facebook/isConnected";
            OkHttpClient client2 = new OkHttpClient();
            Request request2 = new Request.Builder()
                    .url(postUrl2)
                    .addHeader("Authorization", token)
                    .build();
            client2.newCall(request2).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {

                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    String rsp = response.body().string();
                    Log.d("response isconnected Facebook", rsp);
                    String jsonString = rsp;
                    IsConnected data = new IsConnected();
                    Gson gson = new Gson();
                    data = gson.fromJson(jsonString, IsConnected.class);
                    if (data.isType()) {
                        getActivity().runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                facebookButton.setVisibility(View.INVISIBLE);
                                facebookLogout.setVisibility(View.VISIBLE);
                                facebookLogout.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View v) {
                                        String postUrl = ((Global) getActivity().getApplication()).getBaseUrl() + "/facebook/logout";
                                        OkHttpClient client = new OkHttpClient();
                                        Request request = new Request.Builder()
                                                .url(postUrl)
                                                .addHeader("Authorization", token)
                                                .build();
                                        client.newCall(request).enqueue(new Callback() {
                                            @Override
                                            public void onFailure(Call call, IOException e) {

                                            }

                                            @Override
                                            public void onResponse(Call call, Response response) throws IOException {
                                                Log.d("Log out Api Facebook", "ok1");
                                                LoginManager.getInstance().logOut();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        getActivity().runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                facebookButton.setVisibility(View.VISIBLE);
                                facebookLogout.setVisibility(View.INVISIBLE);
                            }
                        });
                    }
                }
            });

        }

        @RequiresApi(api = Build.VERSION_CODES.M)
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            view = inflater.inflate(R.layout.account, container, false);
            azureButton = (Button) view.findViewById(R.id.callGraph);
            twitterbutton = (Button) view.findViewById(R.id.twitter_button);
            facebookButton = (LoginButton) view.findViewById(R.id.facebook_login_button);
            facebookLogout = (Button) view.findViewById(R.id.facebook_logout);
            Bundle b = getArguments();
            callbackManager = CallbackManager.Factory.create();
            facebookService.init(this, view, callbackManager);
            return view;
        }


        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            callbackManager.onActivityResult(requestCode, resultCode, data);
            super.onActivityResult(requestCode, resultCode, data);
        }

    }
	
	