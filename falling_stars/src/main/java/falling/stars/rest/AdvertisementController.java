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
import falling.stars.model.hibernate.Advertisement;
import falling.stars.model.hibernate.Website;
import falling.stars.service.AdvertisementService;
import falling.stars.service.ClickDetailService;

@RestController
@RequestMapping(value = "advertisements")
public class AdvertisementController {
	private static Log log = LogFactory.getLog(AdvertisementController.class);

	@Autowired
	AdvertisementService advertisementService;

	@Autowired
	ClickDetailService clickDetailService;

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Advertisement> addAdvertisement(@RequestBody Advertisement advertisement) {
		log.info("add advertisement");
		return new ResponseEntity<>(advertisementService.addAdvertisement(advertisement), HttpStatus.OK);
	}

	@RequestMapping(value = "/stats/{advertisementId}", method = RequestMethod.GET)
	public ResponseEntity<ClickStats> getStats(@PathVariable("advertisementId") long advertisementId) {
		log.info("getStats for " + advertisementId);

		return new ResponseEntity<>(clickDetailService.getStatsByAdvertisement(advertisementId), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Advertisement>> getUserAdvertisements() {
		log.info("getUserAdvertisements");
		return new ResponseEntity<>(advertisementService.getUserAdvertisements(), HttpStatus.OK);
	}

}
