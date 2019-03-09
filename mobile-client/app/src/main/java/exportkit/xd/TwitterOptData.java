package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class TwitterOptData{

	@SerializedName("token_secret")
	private String tokenSecret;

	@SerializedName("tweetByMail")
	private boolean tweetByMail;

	@SerializedName("getFollowByMail")
	private boolean getFollowByMail;

	@SerializedName("startFollowSendDirectMessage")
	private boolean startFollowSendDirectMessage;

	@SerializedName("__v")
	private int V;

	@SerializedName("startFollowByMail")
	private boolean startFollowByMail;

	@SerializedName("_id")
	private String id;

	@SerializedName("getUnfollowByMail")
	private boolean getUnfollowByMail;

	@SerializedName("token")
	private String token;

	public void setTokenSecret(String tokenSecret){
		this.tokenSecret = tokenSecret;
	}

	public String getTokenSecret(){
		return tokenSecret;
	}

	public void setTweetByMail(boolean tweetByMail){
		this.tweetByMail = tweetByMail;
	}

	public boolean isTweetByMail(){
		return tweetByMail;
	}

	public void setGetFollowByMail(boolean getFollowByMail){
		this.getFollowByMail = getFollowByMail;
	}

	public boolean isGetFollowByMail(){
		return getFollowByMail;
	}

	public void setStartFollowSendDirectMessage(boolean startFollowSendDirectMessage){
		this.startFollowSendDirectMessage = startFollowSendDirectMessage;
	}

	public boolean isStartFollowSendDirectMessage(){
		return startFollowSendDirectMessage;
	}

	public void setV(int V){
		this.V = V;
	}

	public int getV(){
		return V;
	}

	public void setStartFollowByMail(boolean startFollowByMail){
		this.startFollowByMail = startFollowByMail;
	}

	public boolean isStartFollowByMail(){
		return startFollowByMail;
	}

	public void setId(String id){
		this.id = id;
	}

	public String getId(){
		return id;
	}

	public void setGetUnfollowByMail(boolean getUnfollowByMail){
		this.getUnfollowByMail = getUnfollowByMail;
	}

	public boolean isGetUnfollowByMail(){
		return getUnfollowByMail;
	}

	public void setToken(String token){
		this.token = token;
	}

	public String getToken(){
		return token;
	}

	@Override
 	public String toString(){
		return 
			"TwitterOptData{" + 
			"token_secret = '" + tokenSecret + '\'' + 
			",tweetByMail = '" + tweetByMail + '\'' + 
			",getFollowByMail = '" + getFollowByMail + '\'' + 
			",startFollowSendDirectMessage = '" + startFollowSendDirectMessage + '\'' + 
			",__v = '" + V + '\'' + 
			",startFollowByMail = '" + startFollowByMail + '\'' + 
			",_id = '" + id + '\'' + 
			",getUnfollowByMail = '" + getUnfollowByMail + '\'' + 
			",token = '" + token + '\'' + 
			"}";
		}
	public String getActualCard(String src) {
		switch (src) {
			case "getFollowByMail":
				if (getFollowByMail) {
					return src;
				}
				break;
			case "startFollowSendDirectMessage":
				if (startFollowSendDirectMessage) {
					return src;
				}
				break;
			case "startFollowByMail":
				if (startFollowByMail) {
					return src;
				}
				break;
			case "getUnfollowByMail":
				if (getUnfollowByMail) {
					return src;
				}
				break;
			case "tweetByMail":
				if (tweetByMail) {
					return src;
				}
				break;
		}
		return "";
	}
}