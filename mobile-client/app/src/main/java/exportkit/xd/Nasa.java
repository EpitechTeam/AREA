package exportkit.xd;

import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class Nasa{

	@SerializedName("data")
	private NasaOpt nasaOpt;

	public void setNasaOpt(NasaOpt nasaOpt){
		this.nasaOpt = nasaOpt;
	}

	public NasaOpt getNasaOpt(){
		return nasaOpt;
	}

	@Override
 	public String toString(){
		return 
			"Nasa{" + 
			"nasaOpt = '" + nasaOpt + '\'' + 
			"}";
		}
}