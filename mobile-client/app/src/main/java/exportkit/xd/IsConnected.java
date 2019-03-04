package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class IsConnected{

	@SerializedName("type")
	private boolean type;

	public void setType(boolean type){
		this.type = type;
	}

	public boolean isType(){
		return type;
	}

	@Override
 	public String toString(){
		return 
			"IsConnected{" + 
			"type = '" + type + '\'' + 
			"}";
		}
}