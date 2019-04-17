package falling.stars.model;

public class Response {
	boolean success;
	
	public Response(boolean success){
		this.success=success;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	
}
