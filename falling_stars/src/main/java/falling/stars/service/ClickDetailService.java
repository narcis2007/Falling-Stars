package falling.stars.service;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import falling.stars.bitcoin.model.hibernate.Wallet;
import falling.stars.model.ClickStats;
import falling.stars.model.hibernate.Advertisement;
import falling.stars.model.hibernate.ClickDetail;
import falling.stars.model.hibernate.Website;
import falling.stars.repository.AdvertisementRepository;
import falling.stars.repository.ClickDetailRepository;
import falling.stars.repository.WalletRepository;
import falling.stars.repository.WebsiteRepository;

@Service
public class ClickDetailService {
	private static Log log = LogFactory.getLog(ClickDetailService.class);

	@Autowired
	ClickDetailRepository clickDetailRepository;

	@Autowired
	WebsiteRepository websiteRepository;

	@Autowired
	AdvertisementRepository advertisementRepository;

	@Autowired
	WalletRepository walletRepository;

	@PreAuthorize("isAuthenticated()")
	public ClickStats getStatsByWebsite(String websiteName) {

		String userId = SecurityContextHolder.getContext().getAuthentication().getName();
		List<String> websites = websiteRepository.findByUserId(userId).stream().map(adv -> adv.getName())
				.collect(Collectors.toList());

		ClickStats stat = new ClickStats();
		stat.setClickCount(clickDetailRepository.countByWebsiteNameAndWebsiteNameIn(websiteName, websites));
		return stat;
	}

	@PreAuthorize("isAuthenticated()")
	public ClickStats getStatsByAdvertisement(long advertisementId) {

		String userId = SecurityContextHolder.getContext().getAuthentication().getName();

		List<Long> advertisements = advertisementRepository.findByUserId(userId).stream().map(adv -> adv.getId())
				.collect(Collectors.toList());
		ClickStats stat = new ClickStats();
		stat.setClickCount(
				clickDetailRepository.countByAdvertisementIdAndAdvertisementIdIn(advertisementId, advertisements));
		return stat;
	}

	public void processClickDetail(ClickDetail clickDetails) {//make a repository for clickDetails which calls a stored procedure and updates all the fields there
		clickDetailRepository.save(clickDetails);

		// TODO: check wallet click count(both advertiser and publisher user wallet) and then proceed

		Website website = websiteRepository.findOne(clickDetails.getWebsiteName());
		Advertisement advertisement = advertisementRepository.findOne(clickDetails.getAdvertisementId());

		Wallet advertisementOwnerWallet = walletRepository.findByUserId(advertisement.getUserId());

		if (advertisementOwnerWallet.hasAvailableClicks()) {// nu folosesc atatea metode/calls to bd, in schimb sa folosesc o procedura stocata care
															// face toata treaba
			increaseAdvertisementOwnerClickCount(advertisementOwnerWallet);
			increaseWebsiteOwnerClickCount(website);
			incrementAdvertisementClickCount(advertisement);
			incrementWebsiteClickCount(website);
		}

	}

	private void increaseWebsiteOwnerClickCount(Website website) {
		Wallet websiteOwnerWallet = walletRepository.findByUserId(website.getUserId());
		websiteOwnerWallet.setWebsitesClickCount(websiteOwnerWallet.getWebsitesClickCount() + 1);
		walletRepository.save(websiteOwnerWallet);
	}

	private void increaseAdvertisementOwnerClickCount(Wallet advertisementOwnerWallet) {
		advertisementOwnerWallet
				.setAdvertisementsClickCount(advertisementOwnerWallet.getAdvertisementsClickCount() + 1);
		walletRepository.save(advertisementOwnerWallet);
	}

	private void incrementWebsiteClickCount(Website website) {
		website.setClickCount(website.getClickCount() + 1);
		websiteRepository.save(website);
	}

	private void incrementAdvertisementClickCount(Advertisement advertisement) {
		long count = advertisement.getClickCount();
		advertisement.setClickCount(count + 1);
		advertisement = advertisementRepository.save(advertisement);
	}

}
