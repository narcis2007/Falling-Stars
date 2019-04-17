package falling.stars.rest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import falling.stars.service.HelloService;

@RestController
public class HelloController {
	private Log log = LogFactory.getLog(HelloController.class);
	@Autowired
	HelloService helloService;

	@RequestMapping(value = "hello", method = RequestMethod.GET)
	public String addPost() {
		return helloService.hello();
	}
}
