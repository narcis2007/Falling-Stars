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

import falling.stars.model.ClickStats;
import falling.stars.model.hibernate.Website;
import falling.stars.service.ClickDetailService;
import falling.stars.service.WebsiteService;

@RestController
@RequestMapping(value = "websites")
public class WebsiteController {
	private Log log = LogFactory.getLog(WebsiteController.class);
	@Autowired
	WebsiteService websiteService;

	@Autowired
	private ClickDetailService clickDetailService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Website>> getUserDomains() {
		log.info("getDomainsByUser");
		return new ResponseEntity<>(websiteService.getWebsitesByUser(), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Website> addDomain(@RequestBody Website website) {
		log.info("addDomain");
		return new ResponseEntity<>(websiteService.addWebsite(website), HttpStatus.OK);
	}

	@RequestMapping(value = "/stats/{websiteName}", method = RequestMethod.GET)
	public ResponseEntity<ClickStats> getStats(@PathVariable("websiteName") String websiteName) {
		log.info("getStats for " + websiteName);

		return new ResponseEntity<>(clickDetailService.getStatsByWebsite(websiteName), HttpStatus.OK);
	}
}
