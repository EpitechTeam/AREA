package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class FacebookOption{

	@SerializedName("data")
	private FcbOptionCard data;

	public void setData(FcbOptionCard data){
		this.data = data;
	}

	public FcbOptionCard getData(){
		return data;
	}

	@Override
 	public String toString(){
		return 
			"FacebookOption{" + 
			"data = '" + data + '\'' +
			"}";
		}
}