
	 
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


    import android.support.v4.app.Fragment;
    import android.support.v7.widget.LinearLayoutManager;
    import android.support.v7.widget.RecyclerView;
    import android.util.Log;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.ImageButton;
    import android.widget.ImageView;
    import android.widget.TextView;

    import com.google.gson.Gson;

    import java.io.IOException;
    import java.util.ArrayList;
    import java.util.Collection;
    import java.util.Iterator;
    import java.util.List;
    import java.util.ListIterator;

    import okhttp3.Call;
    import okhttp3.Callback;
    import okhttp3.OkHttpClient;
    import okhttp3.Request;
    import okhttp3.RequestBody;
    import okhttp3.Response;

    import static exportkit.xd.login_activity.JSON;

    public class my_waves_fragment extends android.app.Fragment {

        private ImageButton imageButton;

        private String token;
        private RecyclerView recycle;
        private String baseUrl;


        String facebookcard = "{\"data\":[\n" +
                "   {\n" +
                "      \"id\":0,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"enabled\":false,\n" +
                "      \"title\":\"Event to Twitter\",\n" +
                "      \"key\":\"eventToTwitter\",\n" +
                "      \"enableEndpoint\":\"addEventToTwitter\",\n" +
                "      \"disableEndpoint\":\"removeEventToTwitter\",\n" +
                "      \"description\":\"Tweet when you subscribe to an event\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":1,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"eventToCalendar\",\n" +
                "      \"title\":\"Event to Calendar\",\n" +
                "      \"enableEndpoint\":\"addEventToCalendar\",\n" +
                "      \"disableEndpoint\":\"removeEventToCalendar\",\n" +
                "      \"description\":\"Add an event to your calendar when you subscribe to an event\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":2,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Event to Email\",\n" +
                "      \"key\":\"eventToEmail\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addEventToEmail\",\n" +
                "      \"disableEndpoint\":\"removeEventToEmail\",\n" +
                "      \"description\":\"Send you and email when you subscribe to an event\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":3,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Status to Email\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"statusToEmail\",\n" +
                "      \"enableEndpoint\":\"addStatusToEmail\",\n" +
                "      \"disableEndpoint\":\"removeStatusToEmail\",\n" +
                "      \"description\":\"Send you and email when you change your status\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":4,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Profile picture to Email\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"photosToEmail\",\n" +
                "      \"enableEndpoint\":\"addPhotosToEmail\",\n" +
                "      \"disableEndpoint\":\"removePhotosToEmail\",\n" +
                "      \"description\":\"Send you and email when you change your profile picture\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":5,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Location to Email\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"locationToEmail\",\n" +
                "      \"enableEndpoint\":\"addLocationToEmail\",\n" +
                "      \"disableEndpoint\":\"removeLocationToEmail\",\n" +
                "      \"description\":\"Send you and email when you change your location\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":6,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Religion to Email\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"religionToEmail\",\n" +
                "      \"enableEndpoint\":\"addReligionToEmail\",\n" +
                "      \"disableEndpoint\":\"removeReligionToEmail\",\n" +
                "      \"description\":\"Send you and email when you change your religion\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":7,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Hometown to Email\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"hometownToEmail\",\n" +
                "      \"enableEndpoint\":\"addHometownToEmail\",\n" +
                "      \"disableEndpoint\":\"removeHometownToEmail\",\n" +
                "      \"description\":\"Send you and email when you change your hometown\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":8,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Friend to Email\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"friendsToEmail\",\n" +
                "      \"enableEndpoint\":\"addFriendsToEmail\",\n" +
                "      \"disableEndpoint\":\"removeFriendsToEmail\",\n" +
                "      \"description\":\"Send you and email when you add a friend\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":9,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Work to Email\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"workToEmail\",\n" +
                "      \"enableEndpoint\":\"addWorkToEmail\",\n" +
                "      \"disableEndpoint\":\"removeWorkToEmail\",\n" +
                "      \"description\":\"Send you and email when you add a work\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":10,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Education to Email\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"educationToEmail\",\n" +
                "      \"enableEndpoint\":\"addEducationToEmail\",\n" +
                "      \"disableEndpoint\":\"removeEducationToEmail\",\n" +
                "      \"description\":\"Send you and email when you add an education place\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":11,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Photo to Twitter\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"photosToTwitter\",\n" +
                "      \"enableEndpoint\":\"addPhotosToTwitter\",\n" +
                "      \"disableEndpoint\":\"removePhotosToTwitter\",\n" +
                "      \"description\":\"Tweets your profile/cover picture\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":12,\n" +
                "      \"type\":\"facebook\",\n" +
                "      \"title\":\"Facebook post to Twitter\",\n" +
                "      \"enabled\":false,\n" +
                "      \"key\":\"statusToTwitter\",\n" +
                "      \"enableEndpoint\":\"addStatusToTwitter\",\n" +
                "      \"disableEndpoint\":\"removeStatusToTwitter\",\n" +
                "      \"description\":\"Tweets your Facebook posts\",\n" +
                "      \"class\":\"card-facebook\"\n" +
                "   }\n" +
                "]}";

        String twitterCard = "{\"data\":[\n" +
                "   {\n" +
                "      \"id\":0,\n" +
                "      \"type\":\"twitter\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addTweetByMail\",\n" +
                "      \"disableEndpoint\":\"removeTweetByMail\",\n" +
                "      \"key\":\"tweetByMail\",\n" +
                "      \"title\":\"Tweet to Email\",\n" +
                "      \"description\":\"Each time you tweet, you receive a copy by email\",\n" +
                "      \"class\":\"card-twitter\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":1,\n" +
                "      \"type\":\"twitter\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addStartFollowByMail\",\n" +
                "      \"disableEndpoint\":\"removeStartFollowByMail\",\n" +
                "      \"key\":\"startFollowByMail\",\n" +
                "      \"title\":\"Following to Email\",\n" +
                "      \"description\":\"Each time you follow, you receive an email\",\n" +
                "      \"class\":\"card-twitter\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":2,\n" +
                "      \"type\":\"twitter\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addGetFollowByMail\",\n" +
                "      \"disableEndpoint\":\"removeGetFollowByMail\",\n" +
                "      \"key\":\"getFollowByMail\",\n" +
                "      \"title\":\"Followed to Email\",\n" +
                "      \"description\":\"Each time you are followed, you receive an email\",\n" +
                "      \"class\":\"card-twitter\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":3,\n" +
                "      \"type\":\"twitter\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addGetUnfollowByMail\",\n" +
                "      \"disableEndpoint\":\"removeGetUnfollowByMail\",\n" +
                "      \"key\":\"getUnfollowByMail\",\n" +
                "      \"title\":\"Unfollowing to Email\",\n" +
                "      \"description\":\"Each time you unfollow, you receive an email\",\n" +
                "      \"class\":\"card-twitter\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":4,\n" +
                "      \"type\":\"twitter\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addStartFollowSendDirectMessage\",\n" +
                "      \"disableEndpoint\":\"removeStartFollowSendDirectMessage\",\n" +
                "      \"key\":\"startFollowSendDirectMessage\",\n" +
                "      \"title\":\"Followed to Direct Message\",\n" +
                "      \"description\":\"Each time you are followed, you send a direct message\",\n" +
                "      \"class\":\"card-twitter\"\n" +
                "   }\n" +
                "]}";

        String intraCard = "{\"data\":[\n" +
                "   {\n" +
                "      \"id\":0,\n" +
                "      \"type\":\"intra\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addGPAChangeByMail\",\n" +
                "      \"disableEndpoint\":\"removeGPAChangeByMail\",\n" +
                "      \"key\":\"GPAChange\",\n" +
                "      \"title\":\"GPA change to Email\",\n" +
                "      \"description\":\"You receive an email when your GPA changes\",\n" +
                "      \"class\":\"card-intra\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":1,\n" +
                "      \"type\":\"intra\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addMessageNotificationByMail\",\n" +
                "      \"disableEndpoint\":\"removeMessageNotificationByMail\",\n" +
                "      \"key\":\"messageNotificationByMail\",\n" +
                "      \"title\":\"Notifications to Email\",\n" +
                "      \"description\":\"You receive an email when your have an Intra notification\",\n" +
                "      \"class\":\"card-intra\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":2,\n" +
                "      \"type\":\"intra\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addActivityByMail\",\n" +
                "      \"disableEndpoint\":\"removeActivityByMail\",\n" +
                "      \"key\":\"activityToEmail\",\n" +
                "      \"title\":\"Register to activity to Email\",\n" +
                "      \"description\":\"You receive an email when your register to an activity\",\n" +
                "      \"class\":\"card-intra\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":3,\n" +
                "      \"type\":\"intra\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addActivityToCalendar\",\n" +
                "      \"disableEndpoint\":\"removeActivityToCalendar\",\n" +
                "      \"key\":\"activityToCalendar\",\n" +
                "      \"title\":\"Register to activity to Calendar\",\n" +
                "      \"description\":\"Add the activity event to your Calendar\",\n" +
                "      \"class\":\"card-intra\"\n" +
                "   }\n" +
                "]}";
        String outlookCard = "{\"data\":[\n" +
                "   {\n" +
                "      \"id\":0,\n" +
                "      \"type\":\"outlook\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addFileToOne_drive\",\n" +
                "      \"disableEndpoint\":\"removeFileToOne_drive\",\n" +
                "      \"key\":\"fileToOneDrive\",\n" +
                "      \"title\":\"Email attachment to OneDrive\",\n" +
                "      \"description\":\"Adds an email attachment to your OneDrive root's folder\",\n" +
                "      \"class\":\"card-outlook\"\n" +
                "   }\n" +
                "]}";

        String meteoCard = "{\"data\":[\n" +
                "   {\n" +
                "      \"id\":0,\n" +
                "      \"type\":\"meteo\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addMeteoToEmail\",\n" +
                "      \"disableEndpoint\":\"removeFromEmail\",\n" +
                "      \"key\":\"toEmail\",\n" +
                "      \"title\":\"Weather to Email\",\n" +
                "      \"description\":\"Send you the weather by email =)\",\n" +
                "      \"class\":\"card-meteo\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":1,\n" +
                "      \"type\":\"meteo\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addMeteoToCalendar\",\n" +
                "      \"disableEndpoint\":\"removeFromCalendar\",\n" +
                "      \"key\":\"toCalendar\",\n" +
                "      \"title\":\"Weather to Calendar\",\n" +
                "      \"description\":\"Set the weather to Calendar\",\n" +
                "      \"class\":\"card-meteo\"\n" +
                "   },\n" +
                "   {\n" +
                "      \"id\":2,\n" +
                "      \"type\":\"meteo\",\n" +
                "      \"enabled\":false,\n" +
                "      \"enableEndpoint\":\"addMeteoToTwitter\",\n" +
                "      \"disableEndpoint\":\"removeFromTwitter\",\n" +
                "      \"key\":\"toTwitter\",\n" +
                "      \"title\":\"Weather to Twitter\",\n" +
                "      \"description\":\"Tweets the weather\",\n" +
                "      \"class\":\"card-meteo\"\n" +
                "   }\n" +
                "]}";


        CardApi fake = new Gson().fromJson(twitterCard, CardApi.class);
        private OptionAdapter adapter;

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View view = inflater.inflate(R.layout.my_waves, container, false);
            baseUrl = ((Global) this.getActivity().getApplication()).getBaseUrl();
            recycle = (RecyclerView) view.findViewById(R.id.recycle_option);
            imageButton = (ImageButton) view.findViewById(R.id.add_ek2);
            imageButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent myIntent = new Intent(getContext(), my_waves___add_activity.class);
                    myIntent.putExtra("facebookcard", facebookcard);
                    myIntent.putExtra("twitterCard", twitterCard);
                    myIntent.putExtra("meteoCard", meteoCard);
                    myIntent.putExtra("intraCard", intraCard);
                    myIntent.putExtra("outlookCard", outlookCard);
                    startActivity(myIntent);
                }
            });
            token = ((Global) getActivity().getApplication()).getToken();

            recycle.setLayoutManager(new LinearLayoutManager(getContext()));
            adapter = new OptionAdapter(getContext(), fake.getArray(), token, baseUrl);
            recycle.setAdapter(adapter);
            return view;
        }

        @Override
        public void onViewCreated(View view, Bundle savedInstanceState) {
            super.onViewCreated(view, savedInstanceState);

        }

        @Override
        public void onResume() {
            super.onResume();
            for (Iterator<ArrayItem> iter = fake.getArray().listIterator(); iter.hasNext(); ) {
                ArrayItem a = iter.next();
                iter.remove();
            }
            String postUrl = ((Global) getActivity().getApplication()).getBaseUrl() + "/facebook/myOption";
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
                    String rsp = response.body().string();
                    Log.d("response facebook option", rsp);
                    String jsonString = rsp;
                    FacebookOption data = new FacebookOption();
                    Gson gson = new Gson();
                    data = gson.fromJson(jsonString, FacebookOption.class);
                    Gson gson1 = new Gson();
                    CardApi data1 = gson1.fromJson(facebookcard, CardApi.class);
                    for (int i = 0; i < data1.getArray().size(); i++) {
                        if (data1.getArray().get(i).getKey().equals(data))
                            fake.getArray().add(data1.getArray().get(i));
                    }

                }
            });
            String postUrlTwitter = ((Global) getActivity().getApplication()).getBaseUrl() + "/twitter/myOption";
            OkHttpClient clientTwitter = new OkHttpClient();
            Request requestTwitter = new Request.Builder()
                    .url(postUrlTwitter)
                    .addHeader("Authorization", token)
                    .build();
            clientTwitter.newCall(requestTwitter).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {

                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    String rsp = response.body().string();
                    Log.d("response Twitter option", rsp);
                    String jsonString = rsp;
                    OptionsTwitter data;
                    Gson gson = new Gson();
                    data = gson.fromJson(jsonString, OptionsTwitter.class);
                    Gson gson1 = new Gson();
                    CardApi data1 = gson1.fromJson(twitterCard, CardApi.class);
                    for (int i = 0; i < data1.getArray().size(); i++) {
                        ArrayItem myVar = data1.getArray().get(i);
                        if (myVar.getKey().equals(data.getTwitterOptData().getActualCard(myVar.getKey())))
                            fake.getArray().add(data1.getArray().get(i));
                    }
                    getActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            adapter.notifyDataSetChanged();
                        }
                    });
                }
            });
            String postUrlMeteo = ((Global) getActivity().getApplication()).getBaseUrl() + "/meteo/myOption";
            OkHttpClient clientMeteo = new OkHttpClient();
            Request requestMeteo = new Request.Builder()
                    .url(postUrlTwitter)
                    .addHeader("Authorization", token)
                    .build();
            clientTwitter.newCall(requestMeteo).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {

                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    String rsp = response.body().string();
                    Log.d("response Meteo option", rsp);
                    String jsonString = rsp;
                    OptionsTwitter data;
                    Gson gson = new Gson();
                    data = gson.fromJson(jsonString, OptionsTwitter.class);
                    Gson gson1 = new Gson();
                    CardApi data1 = gson1.fromJson(meteoCard, CardApi.class);
                    for (int i = 0; i < data1.getArray().size(); i++) {
                        ArrayItem myVar = data1.getArray().get(i);
                        if (myVar.getKey().equals(data.getTwitterOptData().getActualCard(myVar.getKey())))
                            fake.getArray().add(data1.getArray().get(i));
                    }
                }
            });
            String postUrlIntra = ((Global) getActivity().getApplication()).getBaseUrl() + "/intra/myOption";
            OkHttpClient clientIntra = new OkHttpClient();
            Request requestIntra = new Request.Builder()
                    .url(postUrlIntra)
                    .addHeader("Authorization", token)
                    .build();
            clientTwitter.newCall(requestTwitter).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {

                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    String rsp = response.body().string();
                    Log.d("response Intra option", rsp);
                    String jsonString = rsp;
                    OptionsTwitter data;
                    Gson gson = new Gson();
                    data = gson.fromJson(jsonString, OptionsTwitter.class);
                    Gson gson1 = new Gson();
                    CardApi data1 = gson1.fromJson(intraCard, CardApi.class);
                    for (int i = 0; i < data1.getArray().size(); i++) {
                        ArrayItem myVar = data1.getArray().get(i);
                        if (myVar.getKey().equals(data.getTwitterOptData().getActualCard(myVar.getKey())))
                            fake.getArray().add(data1.getArray().get(i));
                    }
                    getActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            recycle.setLayoutManager(new LinearLayoutManager(getContext()));
                            OptionAdapter adapter = new OptionAdapter(getContext(), fake.getArray(), token, baseUrl);
                            recycle.setAdapter(adapter);
                        }
                    });
                }
            });
            String postUrlOutlook = ((Global) getActivity().getApplication()).getBaseUrl() + "/outlook/myOption";
            OkHttpClient clientOutlook = new OkHttpClient();
            Request requestOutlook = new Request.Builder()
                    .url(postUrlOutlook)
                    .addHeader("Authorization", token)
                    .build();
            clientTwitter.newCall(requestOutlook).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {

                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    String rsp = response.body().string();
                    Log.d("response  option", rsp);
                    String jsonString = rsp;
                    OptionsOutlook data;
                    Gson gson = new Gson();
                    data = gson.fromJson(jsonString, OptionsOutlook.class);
                    Gson gson1 = new Gson();
                    CardApi data1 = gson1.fromJson(outlookCard, CardApi.class);
                    for (int i = 0; i < data1.getArray().size(); i++) {
                        ArrayItem myVar = data1.getArray().get(i);
                        if (myVar.getKey().equals(data.getOutlookOpt().getActualCard(myVar.getKey())))
                            fake.getArray().add(data1.getArray().get(i));
                    }
                    getActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                           adapter.notifyDataSetChanged();
                        }
                    });
                }
            });
        }
    }
	
	