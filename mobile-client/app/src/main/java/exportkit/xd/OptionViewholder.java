package exportkit.xd;

import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

public class OptionViewholder extends RecyclerView.ViewHolder {
    View view;
    TextView descriptionTxt;
    TextView actionTxt;

    public OptionViewholder(@NonNull View itemView) {
        super(itemView);
        actionTxt = (TextView) itemView.findViewById(R.id.actionTxt);
        descriptionTxt = (TextView) itemView.findViewById(R.id.descriptionTxt);
        view = itemView;
    }

    public View getView() {
        return view;
    }
}
