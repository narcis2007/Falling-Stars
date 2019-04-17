package falling.stars.bitcoin.model;

public class TransactionRequest {

	private String address;
	private long amount;
	private String walletPassphrase;
	private long fee;

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public long getAmount() {
		return amount;
	}

	public void setAmount(long amount) {
		this.amount = amount;
	}

	public String getWalletPassphrase() {
		return walletPassphrase;
	}

	public void setWalletPassphrase(String walletPassphrase) {
		this.walletPassphrase = walletPassphrase;
	}

	public long getFee() {
		return fee;
	}

	public void setFee(long fee) {
		this.fee = fee;
	}

}
