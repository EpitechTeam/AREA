package exportkit.xd;

import android.app.Activity;
import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okio.BufferedSink;

public class OptionAdapter extends RecyclerView.Adapter<OptionViewholder> {

    private final Activity acti;
    String baseUrl;
    String token;
    Context c;
    List<ArrayItem> action;

    public OptionAdapter(Context c, List<ArrayItem> action, String token, String baseUrl, Activity activity) {
        this.c = c;
        this.action = action;
        this.token = token;
        this.baseUrl = baseUrl;
        this.acti = activity;
    }

    @NonNull
    @Override
    public OptionViewholder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(c).inflate(R.layout.model, viewGroup, false);
        return new OptionViewholder(v);
    }

    private void getActionImage(@NonNull OptionViewholder actionViewholder, int i) {
        switch (action.get(i).getType()) {
            case "facebook":
                actionViewholder.img_action.setImageResource(R.drawable.facebook_banner);
                break;
            case "twitter":
                actionViewholder.img_action.setImageResource(R.drawable.twitter_banner);
                break;
            case "intra":
                actionViewholder.img_action.setImageResource(R.drawable.epitech_banner);
                break;
            case "meteo":
                actionViewholder.img_action.setImageResource(R.drawable.meteo_banner);
                break;
            case "outlook":
                actionViewholder.img_action.setImageResource(R.drawable.outlook_banner);
                break;
            case "lemonde":
                actionViewholder.img_action.setImageResource(R.drawable.le_monde_banner);
                break;
            case "nasa":
                actionViewholder.img_action.setImageResource(R.drawable.nasa);
                break;
        }
    }

    @Override
    public void onBindViewHolder(@NonNull OptionViewholder actionViewholder, final int i) {
        actionViewholder.actionTxt.setText(action.get(i).getTitle());
        actionViewholder.descriptionTxt.setText(action.get(i).getDescription());
        getActionImage(actionViewholder, i);
        actionViewholder.getView().setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String postUrl = baseUrl + "/" + action.get(i).getType() + "/" + action.get(i).getDisableEndpoint();
                OkHttpClient client = new OkHttpClient();
                Request request = new Request.Builder()
                        .url(postUrl)
                        .put(new RequestBody() {
                            @NotNull
                            @Override
                            public MediaType contentType() {
                                return null;
                            }

                            @Override
                            public void writeTo(BufferedSink sink) throws IOException {

                            }
                        })
                        .addHeader("Authorization", token)
                        .build();
                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {

                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        String rsp = response.body().string();
                        Log.d("Disable Card Response", rsp);
                        acti.runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                action.remove(i);
                                notifyItemRemoved(i);
                                notifyItemRangeChanged(i, action.size());
                            }
                        });
                    }
                });
            }
        });
    }

    @Override
    public int getItemCount() {
        return action.size();
    }
}
