package falling.stars.exception;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class ErrorCodeConverter {
	@Autowired
	@Qualifier("errorMessages")
	private Properties errorMessages;
	
	public final static String DEFAULT_MESSAGE="ORIGINAL_MESSAGE";
	
	
	public String getMessage(int errorCode){
		String message=errorMessages.getProperty(String.valueOf(errorCode));
		
		if(message!=null)
			return message;
		return errorMessages.getProperty("default");
		
	}
}
