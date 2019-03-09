package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class OptionsOutlook{

	@SerializedName("data")
	private OutlookOpt outlookOpt;

	public void setOutlookOpt(OutlookOpt outlookOpt){
		this.outlookOpt = outlookOpt;
	}

	public OutlookOpt getOutlookOpt(){
		return outlookOpt;
	}

	@Override
 	public String toString(){
		return 
			"OptionsOutlook{" + 
			"outlookOpt = '" + outlookOpt + '\'' + 
			"}";
		}
}