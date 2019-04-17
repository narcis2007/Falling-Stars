package falling.stars.bitcoin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import falling.stars.bitcoin.model.ConfirmedTransactionsResponse;
import falling.stars.bitcoin.model.CreateWalletResponse;
import falling.stars.bitcoin.model.TransactionFeesEstimation;
import falling.stars.bitcoin.model.TransactionRequest;
import falling.stars.bitcoin.model.TransactionStatus;
import falling.stars.bitcoin.model.Webhook;
import falling.stars.bitcoin.model.hibernate.Wallet;

@Component
public class BitcoinWalletClient {

	@Autowired
	RestTemplate restTemplate;

	@Value("${BITGO_HOST}")
	String bitGoHost;

	@Value("${BITGO_EXPRESS_HOST}")
	String bitGoExpressHost;

	@Autowired
	ObjectMapper mapper;

	private final String ADD_WALLET_PATH = "%s/api/v1/wallets/simplecreate";

	private final String SEND_COINS_PATH = "%s/api/v1/wallet/%s/sendcoins";
	private final String ADD_WEBHOOK_PATH = "%s/api/v1/wallet/%s/webhooks";//url builder - url dinamic - api spring

	private final String GET_WALET_PATH = "%s/api/v1/wallet/%s";

	private final String GET_WALET_TRANSACTIONS_PATH = "%s/api/v1/wallet/%s/tx";

	public Wallet createWallet(Wallet wallet) {

		return restTemplate
				.postForObject(String.format(ADD_WALLET_PATH, bitGoExpressHost), wallet, CreateWalletResponse.class)
				.getWallet();
	}

	public Wallet getWallet(String walletAddress) {
		return restTemplate.getForObject(String.format(GET_WALET_PATH, bitGoHost, walletAddress), Wallet.class);
	}

	public TransactionStatus performTransaction(String address, TransactionRequest transaction) {
		return restTemplate.postForObject(String.format(SEND_COINS_PATH, bitGoExpressHost, address), transaction,
				TransactionStatus.class);
	}

	public Webhook addWebHook(Webhook webhook, String walletId) {
		return restTemplate.postForObject(String.format(ADD_WEBHOOK_PATH, bitGoExpressHost, walletId), webhook,
				Webhook.class);
	}

	public TransactionFeesEstimation getTransactionFeeEstimation() {
		// hardcode the url because it is only available in prod
		return restTemplate.getForObject("https://www.bitgo.com/api/v1/tx/fee", TransactionFeesEstimation.class);
	}

	public ConfirmedTransactionsResponse getConfirmedTransactions(String walletAddress) {
		return restTemplate.getForObject(String.format(GET_WALET_TRANSACTIONS_PATH, bitGoHost, walletAddress),
				ConfirmedTransactionsResponse.class);
	}

}
