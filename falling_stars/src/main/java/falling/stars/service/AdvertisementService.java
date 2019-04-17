package falling.stars.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import falling.stars.bitcoin.model.hibernate.Wallet;
import falling.stars.model.AdvertisementStatus;
import falling.stars.model.hibernate.Advertisement;
import falling.stars.model.hibernate.ClickDetail;
import falling.stars.repository.AdvertisementRepository;
import falling.stars.repository.WalletRepository;

@Service
public class AdvertisementService {
	private static Log log = LogFactory.getLog(AdvertisementService.class);
	@Autowired
	AdvertisementRepository advertisementRepository;

	@Autowired
	WalletRepository walletRepository;

	@PreAuthorize("isAuthenticated()")
	public Advertisement addAdvertisement(Advertisement advertisement) {
		advertisement.setUserId(SecurityContextHolder.getContext().getAuthentication().getName());
		return advertisementRepository.save(advertisement);
	}

	public List<Advertisement> findByText(String text) {
		return advertisementRepository.findByText(text);
	}
	
	@PreAuthorize("isAuthenticated()")
	public List<Advertisement> getUserAdvertisements() {
		return advertisementRepository.findByUserId(SecurityContextHolder.getContext().getAuthentication().getName());
	}

	public List<Advertisement> getDistinctByKeyWordsAndText(List<String> keyWords, String text) {
		return advertisementRepository.findDistinctByKeyWordsInAndText(keyWords, text);
	}

	public List<Advertisement> getByText(String text) {
		return advertisementRepository.findByText(text);
	}

	public List<Advertisement> getDistinctByKeyWords(List<String> keyWords) {
		return advertisementRepository.findDistinctByKeyWordsIn(keyWords);
	}

	public List<Advertisement> getAdvertisements() {
		return StreamSupport.stream(advertisementRepository.findAll().spliterator(), false)
				.collect(Collectors.toList());
	}

	public long getCount() {
		return advertisementRepository.count();
	}

	public Page<Advertisement> getAdvertisements(Pageable pageable) {
		// TODO Auto-generated method stub
		return advertisementRepository.findAll(pageable);
	}

	public AdvertisementStatus getAdvertisementStatus(ClickDetail clickDetails) {

		Advertisement advertisement = advertisementRepository.findOne(clickDetails.getAdvertisementId());
		Wallet wallet = walletRepository.findByUserId(advertisement.getUserId());

		AdvertisementStatus advertisementStatus = new AdvertisementStatus();
		advertisementStatus.setGoalReached(!wallet.hasAvailableClicks());
		return advertisementStatus;
	}

}
