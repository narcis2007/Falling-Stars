package falling.stars.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import falling.stars.model.hibernate.ClickDetail;

public interface ClickDetailRepository extends JpaRepository<ClickDetail, Long> {
	Long countByWebsiteNameAndWebsiteNameIn(String websiteName, List<String> websites);

	Long countByAdvertisementIdAndAdvertisementIdIn(long advertisementId, List<Long> advertisements);
}
