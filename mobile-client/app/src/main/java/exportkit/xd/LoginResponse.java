package exportkit.xd;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
class LoginResponse implements Serializable {

	@SerializedName("data")
	private Data data;

	@SerializedName("type")
	private boolean type;

	public void setData(Data data){
		this.data = data;
	}

	public Data getData(){
		return data;
	}

	public void setType(boolean type){
		this.type = type;
	}

	public boolean isType(){
		return type;
	}

	@Override
 	public String toString(){
		return 
			"LoginResponse{" +
			"data = '" + data + '\'' + 
			",type = '" + type + '\'' + 
			"}";
		}
}