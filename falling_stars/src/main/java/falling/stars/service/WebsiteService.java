package falling.stars.service;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import falling.stars.model.hibernate.Website;
import falling.stars.repository.WebsiteRepository;

@Service
public class WebsiteService {
	private static Log log = LogFactory.getLog(WebsiteService.class);
	@Autowired
	WebsiteRepository websiteRepository;

	@PreAuthorize("isAuthenticated()")
	public Website addWebsite(Website website) {
		log.info("addWebsite");
		website.setUserId(SecurityContextHolder.getContext().getAuthentication().getName());
		return websiteRepository.save(website);
	}

	@PreAuthorize("isAuthenticated()")
	public List<Website> getWebsitesByUser() {

		return websiteRepository.findByUserId(SecurityContextHolder.getContext().getAuthentication().getName());

	}

	public Website getWebsite(String website) {
		return websiteRepository.findOne(website);
	}

}
