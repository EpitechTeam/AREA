package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class OptionsTwitter{

	@SerializedName("data")
	private TwitterOptData twitterOptData;

	public void setTwitterOptData(TwitterOptData twitterOptData){
		this.twitterOptData = twitterOptData;
	}

	public TwitterOptData getTwitterOptData(){
		return twitterOptData;
	}

	@Override
 	public String toString(){
		return 
			"OptionsTwitter{" + 
			"twitterOptData = '" + twitterOptData + '\'' + 
			"}";
		}
}