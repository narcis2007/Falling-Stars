package falling.stars.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import falling.stars.bitcoin.model.hibernate.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, String> {

	Wallet findByUserId(String userId);

}
