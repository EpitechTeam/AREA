package exportkit.xd;

import java.util.List;

import javax.annotation.Generated;

import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class LemondeRsp {

    @SerializedName("__v")
    private int V;

    @SerializedName("isConnected")
    private boolean isConnected;

    @SerializedName("_id")
    private String id;

    @SerializedName("done")
    private List<Object> done;

    @SerializedName("newToEmail")
    private boolean newToEmail;

    public void setV(int V) {
        this.V = V;
    }

    public int getV() {
        return V;
    }

    public void setIsConnected(boolean isConnected) {
        this.isConnected = isConnected;
    }

    public boolean isIsConnected() {
        return isConnected;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setDone(List<Object> done) {
        this.done = done;
    }

    public List<Object> getDone() {
        return done;
    }

    public void setNewToEmail(boolean newToEmail) {
        this.newToEmail = newToEmail;
    }

    public boolean isNewToEmail() {
        return newToEmail;
    }

    @Override
    public String toString() {
        return
                "LemondeRsp{" +
                        "__v = '" + V + '\'' +
                        ",isConnected = '" + isConnected + '\'' +
                        ",_id = '" + id + '\'' +
                        ",done = '" + done + '\'' +
                        ",newToEmail = '" + newToEmail + '\'' +
                        "}";
    }

    public String getActualCard(String key) {
        switch (key) {
            case "newToEmail":
                if (newToEmail)
                    return key;
        }
        return "";
    }
}
