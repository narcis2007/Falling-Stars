package falling.stars.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Authorization {
	
	public String authorization;

	public Authorization(String authorization) {
		this.authorization=authorization;
	}

	@JsonProperty("Authorization")
	public String getAuthorization() {
		return authorization;
	}

	public void setAuthorization(String authorization) {
		this.authorization = authorization;
	}
	
	

}
