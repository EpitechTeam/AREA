package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class OptionsMeteo{

	@SerializedName("data")
	private MeteoData meteoData;

	public void setMeteoData(MeteoData meteoData){
		this.meteoData = meteoData;
	}

	public MeteoData getMeteoData(){
		return meteoData;
	}

	@Override
 	public String toString(){
		return 
			"OptionsMeteo{" + 
			"meteoData = '" + meteoData + '\'' + 
			"}";
		}
}