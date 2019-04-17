package falling.stars.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import falling.stars.bitcoin.BitcoinWalletClient;
import falling.stars.bitcoin.model.Transaction;
import falling.stars.bitcoin.model.TransactionFeesEstimation;
import falling.stars.bitcoin.model.TransactionRequest;
import falling.stars.bitcoin.model.TransactionStatus;
import falling.stars.bitcoin.model.Webhook;
import falling.stars.bitcoin.model.hibernate.Wallet;
import falling.stars.repository.WalletRepository;

@Service
public class WalletService {

	private static Log log = LogFactory.getLog(WalletService.class);

	@Autowired
	WalletRepository walletRepository;

	@Autowired
	private BitcoinWalletClient bitGoClient;

	@Value("${wallet.default.passphrase}")
	String defaultWalletPassphrase;

	@Value("${MAIN_WALLET_ADDRESS}")
	private String mainWalletAddress;

	@Value("${MAIN_WALLET_PASSPHRASE}")
	private String mainWalletPassphrase;

	@Value("${HOST}")
	private String hostName;// TODO: deploy on cloud and don't use localhost as a hostname

	private final String WEBHOOK_PATH = "%s/api/wallet/webhooks?userId=%s";

	@PreAuthorize("isAuthenticated()")
	public Wallet getAuthenticatedUserExternalWallet() {
		log.info("getAuthenticatedUserExternalWallet");
		String walletAddress = walletRepository
				.findByUserId(SecurityContextHolder.getContext().getAuthentication().getName()).getAddress();
		Wallet externalWallet = bitGoClient.getWallet(walletAddress);
		// Wallet internalWallet = walletRepository.findOne(externalWallet.getAddress());
		// TO Think: maybe I should merge the external and the internal wallet
		return externalWallet;

	}

	/**
	 * when a new user registers we create an empty wallet for him
	 * 
	 * @param userId
	 * @return the created wallet
	 */
	public Wallet createWallet(String userId) {
		Wallet wallet = new Wallet(userId, defaultWalletPassphrase);
		wallet = bitGoClient.createWallet(wallet);
		Webhook webhook = new Webhook();
		String url = null;
		try {
			url = String.format(WEBHOOK_PATH, hostName, URLEncoder.encode(userId, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		webhook.setUrl(url);
		webhook = bitGoClient.addWebHook(webhook, wallet.getAddress());
		log.info("webhook added: " + webhook.getUrl());

		return walletRepository.save(wallet);
	}
	
	@PreAuthorize("isAuthenticated()")
	public TransactionStatus performFullWithdrawalFromUserWallet(String destinationAddress) {
		// TODO: at withdraw set the click count to 0 since it's a full withdraw
		// TODO: make a withdrawy based on the clicks:
		// (total website clicks of an user - total advertisement clicks of an user) * PRICE_PER_CLICK
		Wallet wallet = walletRepository.findByUserId(SecurityContextHolder.getContext().getAuthentication().getName());
		int fee = getTransactionFee();
		if (wallet.getAmountThatCanBeWithdrawed() <= fee)
			return new TransactionStatus("Balance too low, must be above " + fee + " Satoshi");
		TransactionRequest transaction = new TransactionRequest();
		transaction.setWalletPassphrase(mainWalletPassphrase);
		transaction.setAmount(wallet.getAmountThatCanBeWithdrawed() - fee);
		transaction.setAddress(destinationAddress);
		transaction.setFee(fee);

		TransactionStatus transactionStatus = bitGoClient.performTransaction(mainWalletAddress, transaction);
		if ("accepted".equals(transactionStatus.getStatus())) {
			wallet.resetCounts();
			walletRepository.save(wallet);// the wallet is external so it resets the counts
		}
		return transactionStatus;
	}

	private int getTransactionFee() {
		TransactionFeesEstimation feeEstimation = bitGoClient.getTransactionFeeEstimation();
		int fee = feeEstimation.getFeeByBlockTarget().get("4") / 2;// target the block 4
		return fee;
	}

	public void processWebhook(String userId) {
		String walletAddress = walletRepository.findByUserId(userId).getAddress();
		List<Transaction> transactions = bitGoClient.getConfirmedTransactions(walletAddress).getTransactions();
		transactions.stream().sorted((t1, t2) -> t2.getDate().compareTo(t1.getDate())).findFirst().ifPresent(t -> {
			boolean isMainWalletInvolved = t.getEntries().stream()
					.filter(entry -> entry.getValue() > 0 && entry.getAccount().equals(mainWalletAddress)).count() == 1;
			if (!isMainWalletInvolved) {
				Wallet wallet = bitGoClient.getWallet(walletAddress);

				Wallet internalWallet = actualizeClicksRemaining(wallet);
				walletRepository.save(internalWallet);

				int fee = getTransactionFee();
				if (wallet.getBalance() < fee)
					throw new RuntimeException("Balance too low, must be above " + fee + " Satoshi");
				TransactionRequest transaction = new TransactionRequest();
				transaction.setWalletPassphrase(defaultWalletPassphrase);
				transaction.setAmount(wallet.getBalance() - fee);
				transaction.setAddress(mainWalletAddress);
				transaction.setFee(fee);

				bitGoClient.performTransaction(wallet.getAddress(), transaction);
			} else {
				log.info("main wallet involved, ignoring webhook");
			}

		});

	}

	/**
	 * 
	 * @param wallet
	 *            - the external wallet
	 * @return the internal wallet
	 */
	//TODO: iau in considerare doar valoarea ultimei sume primite, daca se efectueaza foarte repede si banii inca nu s-au transferat e posibil sa adauge mult mai mult decat s-a transferat
	private Wallet actualizeClicksRemaining(Wallet wallet) {
		Wallet internalWallet = walletRepository.findByUserId(wallet.getUserId());
		internalWallet.setPaidClicks((long) ((wallet.getBalance()- wallet.getBalance()*wallet.getDefaultCommission()) / wallet.getDefaultPricePerClick()+ internalWallet.getPaidClicks()));
		return internalWallet;
	}

	public Wallet getAuthenticatedUserInternalWallet() {
		return walletRepository.findByUserId(SecurityContextHolder.getContext().getAuthentication().getName());
	}
}
