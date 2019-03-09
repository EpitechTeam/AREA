package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class LeMonde{

	@SerializedName("data")
	private LemondeRsp lemondeRsp;

	public void setLemondeRsp(LemondeRsp lemondeRsp){
		this.lemondeRsp = lemondeRsp;
	}

	public LemondeRsp getLemondeRsp(){
		return lemondeRsp;
	}

	@Override
 	public String toString(){
		return 
			"LeMonde{" + 
			"lemondeRsp = '" + lemondeRsp + '\'' + 
			"}";
		}
}