package falling.stars.bitcoin.model;

public class TransactionStatus {
	private String status;
	private String hash;
	private long fee;
	
	public TransactionStatus() {
	}

	public TransactionStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public long getFee() {
		return fee;
	}

	public void setFee(long fee) {
		this.fee = fee;
	}
}
