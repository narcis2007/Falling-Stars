package falling.stars.rest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import falling.stars.model.Response;
import falling.stars.model.ScriptConfiguration;
import falling.stars.model.SiteDetails;
import falling.stars.model.User;
import falling.stars.service.AdvertisementService;
import falling.stars.service.ConfigurationService;

@RestController
@RequestMapping(value = "fallingScript")
public class ScriptConfigurationController {
	private static Log log = LogFactory.getLog(ScriptConfigurationController.class);

	@Autowired
	ConfigurationService configurationService;

	@Autowired
	AdvertisementService advertisementService;
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<ScriptConfiguration> analyze(@RequestBody SiteDetails siteDetails) {
		log.info("analyzing site details: " + siteDetails);
		ScriptConfiguration scriptConfiguration = configurationService.analyze(siteDetails);
		return new ResponseEntity<>(scriptConfiguration, HttpStatus.OK);
	}
	
}
