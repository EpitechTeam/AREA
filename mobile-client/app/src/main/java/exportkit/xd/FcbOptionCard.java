package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class FcbOptionCard{

	@SerializedName("eventToCalendar")
	private boolean eventToCalendar;

	@SerializedName("statusToEmail")
	private boolean statusToEmail;

	@SerializedName("workToEmail")
	private boolean workToEmail;

	@SerializedName("educationToEmail")
	private boolean educationToEmail;

	@SerializedName("eventToTwitter")
	private boolean eventToTwitter;

	@SerializedName("photosToTwitter")
	private boolean photosToTwitter;

	@SerializedName("accessToken")
	private String accessToken;

	@SerializedName("religionToEmail")
	private boolean religionToEmail;

	@SerializedName("statusToTwitter")
	private boolean statusToTwitter;

	@SerializedName("locationToEmail")
	private boolean locationToEmail;

	@SerializedName("user_id")
	private String userId;

	@SerializedName("photosToEmail")
	private boolean photosToEmail;

	@SerializedName("__v")
	private int V;

	@SerializedName("eventToEmail")
	private boolean eventToEmail;

	@SerializedName("friendsToEmail")
	private boolean friendsToEmail;

	@SerializedName("_id")
	private String id;

	@SerializedName("hometownToEmail")
	private boolean hometownToEmail;

	public void setEventToCalendar(boolean eventToCalendar){
		this.eventToCalendar = eventToCalendar;
	}

	public boolean isEventToCalendar(){
		return eventToCalendar;
	}

	public void setStatusToEmail(boolean statusToEmail){
		this.statusToEmail = statusToEmail;
	}

	public boolean isStatusToEmail(){
		return statusToEmail;
	}

	public void setWorkToEmail(boolean workToEmail){
		this.workToEmail = workToEmail;
	}

	public boolean isWorkToEmail(){
		return workToEmail;
	}

	public void setEducationToEmail(boolean educationToEmail){
		this.educationToEmail = educationToEmail;
	}

	public boolean isEducationToEmail(){
		return educationToEmail;
	}

	public void setEventToTwitter(boolean eventToTwitter){
		this.eventToTwitter = eventToTwitter;
	}

	public boolean isEventToTwitter(){
		return eventToTwitter;
	}

	public void setPhotosToTwitter(boolean photosToTwitter){
		this.photosToTwitter = photosToTwitter;
	}

	public boolean isPhotosToTwitter(){
		return photosToTwitter;
	}

	public void setAccessToken(String accessToken){
		this.accessToken = accessToken;
	}

	public String getAccessToken(){
		return accessToken;
	}

	public void setReligionToEmail(boolean religionToEmail){
		this.religionToEmail = religionToEmail;
	}

	public boolean isReligionToEmail(){
		return religionToEmail;
	}

	public void setStatusToTwitter(boolean statusToTwitter){
		this.statusToTwitter = statusToTwitter;
	}

	public boolean isStatusToTwitter(){
		return statusToTwitter;
	}

	public void setLocationToEmail(boolean locationToEmail){
		this.locationToEmail = locationToEmail;
	}

	public boolean isLocationToEmail(){
		return locationToEmail;
	}

	public void setUserId(String userId){
		this.userId = userId;
	}

	public String getUserId(){
		return userId;
	}

	public void setPhotosToEmail(boolean photosToEmail){
		this.photosToEmail = photosToEmail;
	}

	public boolean isPhotosToEmail(){
		return photosToEmail;
	}

	public void setV(int V){
		this.V = V;
	}

	public int getV(){
		return V;
	}

	public void setEventToEmail(boolean eventToEmail){
		this.eventToEmail = eventToEmail;
	}

	public boolean isEventToEmail(){
		return eventToEmail;
	}

	public void setFriendsToEmail(boolean friendsToEmail){
		this.friendsToEmail = friendsToEmail;
	}

	public boolean isFriendsToEmail(){
		return friendsToEmail;
	}

	public void setId(String id){
		this.id = id;
	}

	public String getId(){
		return id;
	}

	public void setHometownToEmail(boolean hometownToEmail){
		this.hometownToEmail = hometownToEmail;
	}

	public boolean isHometownToEmail(){
		return hometownToEmail;
	}

	@Override
 	public String toString(){
		return 
			"FcbOptionCard{" + 
			"eventToCalendar = '" + eventToCalendar + '\'' + 
			",statusToEmail = '" + statusToEmail + '\'' + 
			",workToEmail = '" + workToEmail + '\'' + 
			",educationToEmail = '" + educationToEmail + '\'' + 
			",eventToTwitter = '" + eventToTwitter + '\'' + 
			",photosToTwitter = '" + photosToTwitter + '\'' + 
			",accessToken = '" + accessToken + '\'' + 
			",religionToEmail = '" + religionToEmail + '\'' + 
			",statusToTwitter = '" + statusToTwitter + '\'' + 
			",locationToEmail = '" + locationToEmail + '\'' + 
			",user_id = '" + userId + '\'' + 
			",photosToEmail = '" + photosToEmail + '\'' + 
			",__v = '" + V + '\'' + 
			",eventToEmail = '" + eventToEmail + '\'' + 
			",friendsToEmail = '" + friendsToEmail + '\'' + 
			",_id = '" + id + '\'' + 
			",hometownToEmail = '" + hometownToEmail + '\'' + 
			"}";
		}

	public String getActualCard(String src) {
		switch (src) {
			case "eventToCalendar":
				if (eventToCalendar) {
					return src;
				}
				break;
			case "statusToEmail":
				if (statusToEmail) {
					return src;
				}
				break;
			case "workToEmail":
				if (workToEmail) {
					return src;
				}
				break;
			case "educationToEmail":
				if (educationToEmail) {
					return src;
				}
				break;
			case "eventToTwitter":
				if (eventToTwitter) {
					return src;
				}
				break;
			case "religionToEmail":
				if (religionToEmail) {
					return src;
				}
				break;
			case "photosToTwitter":
				if (photosToTwitter) {
					return src;
				}
				break;
			case "statusToTwitter":
				if (statusToTwitter) {
					return src;
				}
				break;
			case "locationToEmail":
				if (locationToEmail) {
					return src;
				}
				break;
			case "photosToEmail":
				if (photosToEmail) {
					return src;
				}
				break;
			case "hometownToEmail":
				if (hometownToEmail) {
					return src;
				}
				break;
			case "friendsToEmail":
				if (friendsToEmail) {
					return src;
				}
				break;
		}
		return "";
	}
}