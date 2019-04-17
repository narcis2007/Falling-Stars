package falling.stars.rest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import falling.stars.model.Authorization;
import falling.stars.model.User;
import falling.stars.service.AuthService;

@RestController
@RequestMapping("auth/")
public class AuthController {

	private Log log = LogFactory.getLog(AuthController.class);

	@Autowired
	AuthService authService;

	@RequestMapping(value = "forgotPassword", method = RequestMethod.POST)
	public ResponseEntity<Object> forgotPassword(@RequestBody User user) {
		log.info("forgotPassword");
		authService.sendForgotPasswordEmail(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "resetPassword", method = RequestMethod.POST)
	public ResponseEntity<Object> resetPassword(@RequestBody User user, @RequestHeader(value = "sptoken") String sptoken) {
		log.info("resetPassword");
		authService.resetPassword(sptoken, user.getPassword());
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	@PreAuthorize("permitAll()")
	public ResponseEntity<Authorization> login(@RequestBody User user) {
		log.info("login");
		Authorization authorization = authService.login(user.getUsername(), user.getPassword());
		return new ResponseEntity<>(authorization, HttpStatus.OK);

	}

	@RequestMapping(value = "registerAndLogin", method = RequestMethod.POST)
	public ResponseEntity<Object> registerAndLogin(@RequestBody User user) {
		log.info("registerAndLogin");
		authService.registerUser(user);
		Authorization authorization = authService.login(user.getUsername(), user.getPassword());
		return new ResponseEntity<>(authorization, HttpStatus.OK);

	}
}
