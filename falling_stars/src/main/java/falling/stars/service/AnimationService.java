package falling.stars.service;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import falling.stars.model.hibernate.Animation;
import falling.stars.repository.AnimationRepository;

@Service
public class AnimationService {
	private static Log log = LogFactory.getLog(AnimationService.class);
	@Autowired
	AnimationRepository animationRepository;

	public List<Animation> getAnimations(){
		return animationRepository.findAll();
	}
}
