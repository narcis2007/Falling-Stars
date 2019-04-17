package falling.stars.service;

import org.springframework.stereotype.Service;

@Service
public class HelloService {

	// @PreAuthorize("hasPermission('user','hello')")
	public String hello() {
		return "Hello from server!";
	}

}
