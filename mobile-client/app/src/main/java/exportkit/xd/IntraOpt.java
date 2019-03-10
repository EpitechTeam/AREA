package exportkit.xd;

import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class IntraOpt{

	@SerializedName("GPAChange")
	private boolean gPAChange;

	@SerializedName("messageNotificationByMail")
	private boolean messageNotificationByMail;

	@SerializedName("activityToEmail")
	private boolean activityToEmail;

	@SerializedName("GPA_intra")
	private float gPAIntra;

	@SerializedName("activityToCalendar")
	private boolean activityToCalendar;

	@SerializedName("__v")
	private int V;

	@SerializedName("_id")
	private String id;

	@SerializedName("accessToken")
	private String accessToken;

	@SerializedName("done")
	private List<Object> done;

	public void setGPAChange(boolean gPAChange){
		this.gPAChange = gPAChange;
	}

	public boolean isGPAChange(){
		return gPAChange;
	}

	public void setMessageNotificationByMail(boolean messageNotificationByMail){
		this.messageNotificationByMail = messageNotificationByMail;
	}

	public boolean isMessageNotificationByMail(){
		return messageNotificationByMail;
	}

	public void setActivityToEmail(boolean activityToEmail){
		this.activityToEmail = activityToEmail;
	}

	public boolean isActivityToEmail(){
		return activityToEmail;
	}

	public void setGPAIntra(float gPAIntra){
		this.gPAIntra = gPAIntra;
	}

	public float getGPAIntra(){
		return gPAIntra;
	}

	public void setActivityToCalendar(boolean activityToCalendar){
		this.activityToCalendar = activityToCalendar;
	}

	public boolean isActivityToCalendar(){
		return activityToCalendar;
	}

	public void setV(int V){
		this.V = V;
	}

	public int getV(){
		return V;
	}

	public void setId(String id){
		this.id = id;
	}

	public String getId(){
		return id;
	}

	public void setAccessToken(String accessToken){
		this.accessToken = accessToken;
	}

	public String getAccessToken(){
		return accessToken;
	}

	public void setDone(List<Object> done){
		this.done = done;
	}

	public List<Object> getDone(){
		return done;
	}

	@Override
 	public String toString(){
		return 
			"IntraOpt{" + 
			"gPAChange = '" + gPAChange + '\'' + 
			",messageNotificationByMail = '" + messageNotificationByMail + '\'' + 
			",activityToEmail = '" + activityToEmail + '\'' + 
			",gPA_intra = '" + gPAIntra + '\'' + 
			",activityToCalendar = '" + activityToCalendar + '\'' + 
			",__v = '" + V + '\'' + 
			",_id = '" + id + '\'' + 
			",accessToken = '" + accessToken + '\'' + 
			",done = '" + done + '\'' + 
			"}";
		}
	public String getActualCard(String src) {
		switch (src) {
			case "gPAChange":
				if (gPAChange) {
					return src;
				}
				break;
			case "messageNotificationByMail":
				if (messageNotificationByMail) {
					return src;
				}
				break;
			case "activityToEmail":
				if (activityToEmail) {
					return src;
				}
				break;
			case "activityToCalendar":
				if (activityToCalendar) {
					return src;
				}
				break;
		}
		return "";
	}
}