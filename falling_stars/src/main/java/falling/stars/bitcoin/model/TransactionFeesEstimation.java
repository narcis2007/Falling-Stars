package falling.stars.bitcoin.model;

import java.util.Map;

public class TransactionFeesEstimation {
	private int feePerKb;
	private Map<String, Integer> feeByBlockTarget;// 24 is the last block

	public int getFeePerKb() {
		return feePerKb;
	}

	public void setFeePerKb(int feePerKb) {
		this.feePerKb = feePerKb;
	}

	public Map<String, Integer> getFeeByBlockTarget() {
		return feeByBlockTarget;
	}

	public void setFeeByBlockTarget(Map<String, Integer> feeByBlockTarget) {
		this.feeByBlockTarget = feeByBlockTarget;
	}

}
