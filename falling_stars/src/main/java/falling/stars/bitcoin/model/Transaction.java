package falling.stars.bitcoin.model;

import java.util.Date;
import java.util.List;

public class Transaction {

	private Date date;
	private int fee;
	private boolean pending;
	private List<TransactionEntry> entries;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getFee() {
		return fee;
	}

	public void setFee(int fee) {
		this.fee = fee;
	}

	public boolean isPending() {
		return pending;
	}

	public void setPending(boolean pending) {
		this.pending = pending;
	}

	public List<TransactionEntry> getEntries() {
		return entries;
	}

	public void setEntries(List<TransactionEntry> entries) {
		this.entries = entries;
	}

}
