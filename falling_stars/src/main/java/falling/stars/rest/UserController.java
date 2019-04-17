package falling.stars.rest;

import java.util.List;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import falling.stars.model.Response;
import falling.stars.model.User;
import falling.stars.service.AuthService;
import falling.stars.service.UserService;

@RestController
@RequestMapping(value = "users")
public class UserController {

	private static Log log = LogFactory.getLog(UserController.class);
	
	@Autowired
	UserService userService;
	
	@Autowired
	AuthService authService;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<User> getUsers() {
		return userService.getAllUsers();
	}
	
	
	@RequestMapping(value = "/{username}",method = RequestMethod.PUT)
	public ResponseEntity<User> updateUser(@PathVariable("username") String username, @RequestBody User user) {
		log.info("update user: "+username);
		user.setUsername(username);
		return new ResponseEntity<>(userService.updateUser(user),HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<User> addUser(@RequestBody User user) {
		log.info("add user: "+user.getUsername());
		return new ResponseEntity<>(new User(authService.registerUser(user)),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{username}",method = RequestMethod.DELETE)
	public ResponseEntity<Response> deleteUser(@PathVariable("username") String username) {
		log.info("delete user: "+username);
		return new ResponseEntity<>(new Response(userService.deleteUser(username)),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{username}",method = RequestMethod.GET)
	public ResponseEntity<User> getUser(@PathVariable("username") String username) {
		log.info("get user: "+username);
		return new ResponseEntity<>(userService.getUser(username),HttpStatus.OK);
	}
}
