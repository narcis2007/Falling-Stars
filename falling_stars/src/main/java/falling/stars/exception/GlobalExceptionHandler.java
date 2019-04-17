package falling.stars.exception;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.stormpath.sdk.resource.ResourceException;

import falling.stars.model.ErrorMessage;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

	private Log log = LogFactory.getLog(GlobalExceptionHandler.class);

	@Autowired
	private ErrorCodeConverter errorCodeConverter;

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(value = ResourceException.class)
	public ErrorMessage handleBaseException(ResourceException e) {
		log.error("handling stormpath ResourceException:");
		String message = errorCodeConverter.getMessage(e.getCode());
		if (message.equals(ErrorCodeConverter.DEFAULT_MESSAGE))
			message = e.getDeveloperMessage();
		return new ErrorMessage(message);
	}

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(value = ResourceNotFoundException.class)
	public ErrorMessage handleBaseException(ResourceNotFoundException e) {
		log.error("caught ResourceNotFoundException :", e);
		return new ErrorMessage(e.getMessage());
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(value = Exception.class)
	public ErrorMessage handleException(Exception e) {
		log.error("caught exception :", e);
		return new ErrorMessage(e.getMessage()); // or simply let the
													// exception pass?
	}

	// @ResponseStatus(HttpStatus.FORBIDDEN)
	@ExceptionHandler(value = AccessDeniedException.class)
	public ResponseEntity<?> handleAccesDeniedException(Exception e) {
		log.error("caught exception :", e);

		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorMessage(e.getMessage()));
		// return new ErrorMessage(e.getMessage());
	}

}
