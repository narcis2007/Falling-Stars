package falling.stars.rest;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import falling.stars.model.AdvertisementStatus;
import falling.stars.model.hibernate.ClickDetail;
import falling.stars.service.AdvertisementService;
import falling.stars.service.ClickDetailService;

@RestController
@RequestMapping(value = "clickDetails")
public class ClickDetailController {
	private static Log log = LogFactory.getLog(ClickDetailController.class);

	@Autowired
	ClickDetailService clickDetailService;

	@Autowired
	AdvertisementService advertisementService;

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<AdvertisementStatus> clickCount(@RequestBody ClickDetail clickDetails, HttpServletRequest request) {
		log.info("advertisement " + clickDetails.getAdvertisementId() + " clicked");
		String remoteIP = request.getHeader("X-FORWARDED-FOR");//anotatie
		if (remoteIP == null) {
			remoteIP = request.getRemoteAddr();// if client is behind any proxy then you will get IP address of proxy :
		}
		log.info("remote ip:" + remoteIP);
		clickDetails.setRemoteIP(remoteIP);

		String domain = request.getHeader("Origin");
		clickDetails.setDomain(domain);
		clickDetails.setPath(request.getHeader("Referer").split(domain)[1]);

		
		
		clickDetailService.processClickDetail(clickDetails);
		return new ResponseEntity<>(advertisementService.getAdvertisementStatus(clickDetails), HttpStatus.OK);
	}

}
