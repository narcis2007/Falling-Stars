package falling.stars.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import falling.stars.model.hibernate.Advertisement;

public interface AdvertisementRepository extends PagingAndSortingRepository<Advertisement, Long> {

	List<Advertisement> findByText(String text);

	List<Advertisement> findByUserId(String userId);

	List<Advertisement> findDistinctByKeyWordsInAndText(List<String> keyWords, String text);

	List<Advertisement> findDistinctByKeyWordsIn(List<String> keyWords);

}
