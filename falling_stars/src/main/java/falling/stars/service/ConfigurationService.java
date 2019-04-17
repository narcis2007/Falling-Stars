package falling.stars.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import falling.stars.bitcoin.model.hibernate.Wallet;
import falling.stars.model.ScriptConfiguration;
import falling.stars.model.SiteDetails;
import falling.stars.model.hibernate.Advertisement;
import falling.stars.model.hibernate.Website;
import falling.stars.repository.WalletRepository;

@Service
public class ConfigurationService {

	private static Log log = LogFactory.getLog(ConfigurationService.class);

	@Autowired
	AdvertisementService advertisementService;

	@Autowired
	WebsiteService websiteService;

	@Autowired
	WalletRepository walletRepository;

	static final int PAGE_SIZE = 100;

	public ScriptConfiguration analyze(SiteDetails siteDetails) {
		log.info("analize siteDetails");
		
		Website website = websiteService.getWebsite(siteDetails.getWebsite());
		List<Advertisement> shownAdvertisements = getWordsBasedOnContentAndKeyWords(siteDetails.getContent(),//revizuit 
				website.getKeyWords());
		if (shownAdvertisements.size() == 0) {//revizuit 
			shownAdvertisements = getWordsBasedOnContent(siteDetails);//revizuit , un singur fetch si abstractizare
		}//fiecare fetch are logica lui/ fetch logic return else fetchlogic return /optional build
		ScriptConfiguration scriptConfiguration = new ScriptConfiguration();
		scriptConfiguration.setAdvertisements(shownAdvertisements);
		scriptConfiguration.setPercentage(50);
		scriptConfiguration.setFollow(false);
		scriptConfiguration.setInAnimation(website.getInAnimation());
		scriptConfiguration.setOutAnimation(website.getOutAnimation());
		return scriptConfiguration;
	}

	private List<Advertisement> getWordsBasedOnContent(SiteDetails siteDetails) {
		List<Advertisement> shownAdvertisements = new ArrayList<>();
		int pages = ((int) advertisementService.getCount()) / PAGE_SIZE;

		for (int page = 1; shownAdvertisements.size() == 0 && page < pages; page++) {
			Pageable pageable = new PageRequest(page, PAGE_SIZE, Direction.ASC, "id");
			Page<Advertisement> advertisements = advertisementService.getAdvertisements(pageable);
			shownAdvertisements.addAll(advertisements.getContent().stream()
					.filter(adv -> isContentContainingAdvertisementText(siteDetails.getContent(), adv))
					.collect(Collectors.toList()));
		}
		return shownAdvertisements;
	}

	private List<Advertisement> getWordsBasedOnContentAndKeyWords(String content, List<String> keyWords) {

		List<Advertisement> advertisements = advertisementService.getDistinctByKeyWords(keyWords);

		return advertisements.stream().filter(adv -> isContentContainingAdvertisementText(content, adv))
				.collect(Collectors.toList());
	}

	private boolean isContentContainingAdvertisementText(String content, Advertisement advertisement) {
		Wallet wallet = walletRepository.findByUserId(advertisement.getUserId());
		return wallet.hasAvailableClicks() && content.contains(advertisement.getText());
	}

}
