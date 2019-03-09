package exportkit.xd;

import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class MeteoData{

	@SerializedName("toCalendar")
	private boolean toCalendar;

	@SerializedName("toTwitter")
	private boolean toTwitter;

	@SerializedName("__v")
	private int V;

	@SerializedName("_id")
	private String id;

	@SerializedName("accessToken")
	private String accessToken;

	@SerializedName("done")
	private List<String> done;

	@SerializedName("toEmail")
	private boolean toEmail;

	public void setToCalendar(boolean toCalendar){
		this.toCalendar = toCalendar;
	}

	public boolean isToCalendar(){
		return toCalendar;
	}

	public void setToTwitter(boolean toTwitter){
		this.toTwitter = toTwitter;
	}

	public boolean isToTwitter(){
		return toTwitter;
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

	public void setDone(List<String> done){
		this.done = done;
	}

	public List<String> getDone(){
		return done;
	}

	public void setToEmail(boolean toEmail){
		this.toEmail = toEmail;
	}

	public boolean isToEmail(){
		return toEmail;
	}

	@Override
 	public String toString(){
		return 
			"MeteoData{" + 
			"toCalendar = '" + toCalendar + '\'' + 
			",toTwitter = '" + toTwitter + '\'' + 
			",__v = '" + V + '\'' + 
			",_id = '" + id + '\'' + 
			",accessToken = '" + accessToken + '\'' + 
			",done = '" + done + '\'' + 
			",toEmail = '" + toEmail + '\'' + 
			"}";
		}

	public String getActualCard(String src) {
		switch (src) {
			case "toCalendar":
				if (toCalendar) {
					return src;
				}
				break;
			case "toTwitter":
				if (toTwitter) {
					return src;
				}
				break;
			case "toEmail":
				if (toEmail) {
					return src;
				}
				break;
		}
		return "";
	}

}