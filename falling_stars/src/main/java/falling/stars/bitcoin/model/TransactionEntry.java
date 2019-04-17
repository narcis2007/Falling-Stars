package falling.stars.bitcoin.model;

public class TransactionEntry {
	
	private String account;
	private long value;

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public long getValue() {
		return value;
	}

	public void setValue(long value) {
		this.value = value;
	}

}
