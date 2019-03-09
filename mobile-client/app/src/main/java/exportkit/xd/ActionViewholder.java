package exportkit.xd;

import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

public class ActionViewholder extends RecyclerView.ViewHolder {
    ImageView img_action;
    View view;
    TextView descriptionTxt;
    TextView actionTxt;

    public ActionViewholder(@NonNull View itemView) {
        super(itemView);
        actionTxt = (TextView) itemView.findViewById(R.id.actionTxt);
        descriptionTxt = (TextView) itemView.findViewById(R.id.descriptionTxt);
        img_action = (ImageView) itemView.findViewById(R.id.img_action);
        view = itemView;
    }

    public View getView() {
        return view;
    }
}
