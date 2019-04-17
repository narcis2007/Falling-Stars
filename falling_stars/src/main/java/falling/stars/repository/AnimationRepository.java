package falling.stars.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import falling.stars.model.hibernate.Animation;

public interface AnimationRepository extends JpaRepository<Animation, Long> {

}
