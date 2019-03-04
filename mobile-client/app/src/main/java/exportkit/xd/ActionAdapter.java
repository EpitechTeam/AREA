package exportkit.xd;

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

public class ActionAdapter extends  RecyclerView.Adapter<ActionViewholder> {


     String baseUrl;
    String token;
    Context c;
    List<ArrayItem> action;

    public ActionAdapter (Context c, List<ArrayItem> action, String token, String baseUrl) {
        this.c = c;
        this.action = action;
        this.token = token;
        this.baseUrl = baseUrl;
    }



    @NonNull
    @Override
    public ActionViewholder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(c).inflate(R.layout.model, viewGroup, false);
        return new ActionViewholder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ActionViewholder actionViewholder, final int i) {
        actionViewholder.actionTxt.setText(action.get(i).getTitle());
        actionViewholder.descriptionTxt.setText(action.get(i).getDescription());
        actionViewholder.getView().setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String postUrl =  baseUrl+"/"+ action.get(i).getType()+"/"+action.get(i).getEnableEndpoint();
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
                        Log.d("Card Response", rsp);
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
