package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class OptionsIntra{

	@SerializedName("data")
	private IntraOpt intraOpt;

	public void setIntraOpt(IntraOpt intraOpt){
		this.intraOpt = intraOpt;
	}

	public IntraOpt getIntraOpt(){
		return intraOpt;
	}

	@Override
 	public String toString(){
		return 
			"OptionsIntra{" + 
			"intraOpt = '" + intraOpt + '\'' + 
			"}";
		}
}