package exportkit.xd;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class Data implements Serializable {

	@SerializedName("password")
	private String password;

	@SerializedName("__v")
	private int V;

	@SerializedName("last_name")
	private String lastName;

	@SerializedName("_id")
	private String id;

	@SerializedName("services")
	private String services;

	@SerializedName("first_name")
	private String firstName;

	@SerializedName("email")
	private String email;

	@SerializedName("token")
	private String token;

	public void setPassword(String password){
		this.password = password;
	}

	public String getPassword(){
		return password;
	}

	public void setV(int V){
		this.V = V;
	}

	public int getV(){
		return V;
	}

	public void setLastName(String lastName){
		this.lastName = lastName;
	}

	public String getLastName(){
		return lastName;
	}

	public void setId(String id){
		this.id = id;
	}

	public String getId(){
		return id;
	}

	public void setServices(String services){
		this.services = services;
	}

	public String getServices(){
		return services;
	}

	public void setFirstName(String firstName){
		this.firstName = firstName;
	}

	public String getFirstName(){
		return firstName;
	}

	public void setEmail(String email){
		this.email = email;
	}

	public String getEmail(){
		return email;
	}

	public void setToken(String token){
		this.token = token;
	}

	public String getToken(){
		return token;
	}

	@Override
 	public String toString(){
		return 
			"Data{" + 
			"password = '" + password + '\'' + 
			",__v = '" + V + '\'' + 
			",last_name = '" + lastName + '\'' + 
			",_id = '" + id + '\'' + 
			",services = '" + services + '\'' + 
			",first_name = '" + firstName + '\'' + 
			",email = '" + email + '\'' + 
			",token = '" + token + '\'' + 
			"}";
		}
}