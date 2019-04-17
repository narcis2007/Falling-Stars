package falling.stars.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Maps all AngularJS routes to index so that they work with direct linking.
 */
@Controller
class Routes {

	@RequestMapping(value = { "/", "/login", "/forgotPassword", "/resetPassword", "/register", "/logout", "/addAdvertisement",
			"/registerWebsite", "/websiteList", "/websiteStats", "/advertisementList", "/wallet" })
	public String index() {
		return "forward:/index.html";
	}
	
	@RequestMapping("/demo")
	public String demo() {
		return "forward:/demo-adds.html";
	}
}
