package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class OutlookOpt{

	@SerializedName("__v")
	private int V;

	@SerializedName("_id")
	private String id;

	@SerializedName("accessToken")
	private String accessToken;

	@SerializedName("subscriptionId")
	private Object subscriptionId;

	@SerializedName("fileToOneDrive")
	private boolean fileToOneDrive;

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

	public void setSubscriptionId(Object subscriptionId){
		this.subscriptionId = subscriptionId;
	}

	public Object getSubscriptionId(){
		return subscriptionId;
	}

	public void setFileToOneDrive(boolean fileToOneDrive){
		this.fileToOneDrive = fileToOneDrive;
	}

	public boolean isFileToOneDrive(){
		return fileToOneDrive;
	}

	@Override
 	public String toString(){
		return 
			"OutlookOpt{" + 
			"__v = '" + V + '\'' + 
			",_id = '" + id + '\'' + 
			",accessToken = '" + accessToken + '\'' + 
			",subscriptionId = '" + subscriptionId + '\'' + 
			",fileToOneDrive = '" + fileToOneDrive + '\'' + 
			"}";
		}
	public String getActualCard(String src) {
		switch (src) {
			case "fileToOneDrive":
				if (fileToOneDrive) {
					return src;
				}
				break;
		}
		return "";
	}
}