package exportkit.xd;

import java.io.Serializable;
import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.SerializedName;

@Generated("com.robohorse.robopojogenerator")
public class CardApi implements Serializable {

	@SerializedName("array")
	private List<ArrayItem> array;

	public void setArray(List<ArrayItem> array){
		this.array = array;
	}

	public List<ArrayItem> getArray(){
		return array;
	}

	@Override
 	public String toString(){
		return 
			"CardApi{" + 
			"array = '" + array + '\'' + 
			"}";
		}
}