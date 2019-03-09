package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class ArrayItem{

	@SerializedName("description")
	private String description;

	@SerializedName("id")
	private int id;

	@SerializedName("type")
	private String type;

	@SerializedName("title")
	private String title;

	@SerializedName("enabled")
	private String enabled;

	@SerializedName("key")
	private String key;

	@SerializedName("enableEndpoint")
	private String enableEndpoint;

	@SerializedName("disableEndpoint")
	private String disableEndpoint;

	public void setDescription(String description){
		this.description = description;
	}

	public String getDescription(){
		return description;
	}

	public void setId(int id){
		this.id = id;
	}

	public int getId(){
		return id;
	}

	public void setType(String type){
		this.type = type;
	}

	public String getType(){
		return type;
	}

	public void setTitle(String title){
		this.title = title;
	}

	public String getTitle(){
		return title;
	}

	public void setEnabled(String enabled){
		this.enabled = enabled;
	}

	public String getEnabled(){
		return enabled;
	}

	public void setKey(String key){
		this.key = key;
	}

	public String getKey(){
		return key;
	}

	public void setEnableEndpoint(String enableEndpoint){
		this.enableEndpoint = enableEndpoint;
	}

	public String getEnableEndpoint(){
		return enableEndpoint;
	}

	public void setDisableEndpoint(String disableEndpoint){
		this.disableEndpoint = disableEndpoint;
	}

	public String getDisableEndpoint(){
		return disableEndpoint;
	}

	@Override
 	public String toString(){
		return 
			"ArrayItem{" + 
			"description = '" + description + '\'' + 
			",id = '" + id + '\'' + 
			",type = '" + type + '\'' + 
			",title = '" + title + '\'' + 
			",enabled = '" + enabled + '\'' + 
			",key = '" + key + '\'' + 
			",enableEndpoint = '" + enableEndpoint + '\'' + 
			",disableEndpoint = '" + disableEndpoint + '\'' + 
			"}";
		}
}