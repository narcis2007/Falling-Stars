package falling.stars.bitcoin.model;

import falling.stars.bitcoin.model.hibernate.Wallet;

public class CreateWalletResponse {

	private Wallet wallet;

	public Wallet getWallet() {
		return wallet;
	}

	public void setWallet(Wallet wallet) {
		this.wallet = wallet;
	}

}
