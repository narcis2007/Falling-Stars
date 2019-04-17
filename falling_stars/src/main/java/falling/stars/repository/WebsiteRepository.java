package falling.stars.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import falling.stars.model.hibernate.Website;

public interface WebsiteRepository extends JpaRepository<Website, String> {

	List<Website> findByUserId(String userId);

}
