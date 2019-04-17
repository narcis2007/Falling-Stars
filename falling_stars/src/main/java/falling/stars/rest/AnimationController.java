package falling.stars.rest;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import falling.stars.model.hibernate.Animation;
import falling.stars.service.AnimationService;

@RestController
@RequestMapping(value = "animations")
public class AnimationController {
	private Log log = LogFactory.getLog(AnimationController.class);
	@Autowired
	AnimationService animationService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Animation>> getAnimations() {
		log.info("getAnimations");
		return new ResponseEntity<>(animationService.getAnimations(), HttpStatus.OK);
	}

}
