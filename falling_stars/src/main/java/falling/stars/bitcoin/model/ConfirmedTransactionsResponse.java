package falling.stars.bitcoin.model;

import java.util.List;

public class ConfirmedTransactionsResponse {

	private List<Transaction> transactions;

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

}
