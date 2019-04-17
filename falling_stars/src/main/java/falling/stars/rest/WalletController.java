package falling.stars.rest;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import falling.stars.bitcoin.model.TransactionRequest;
import falling.stars.bitcoin.model.TransactionStatus;
import falling.stars.bitcoin.model.hibernate.Wallet;
import falling.stars.service.WalletService;

@RestController()
@RequestMapping(value = "/wallet") // TODO: use plural
public class WalletController {

	private static Log log = LogFactory.getLog(WalletController.class);

	@Autowired
	WalletService walletService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Wallet> getWallet() {
		log.info("getWallet");
		Wallet wallet = walletService.getAuthenticatedUserInternalWallet();
		return new ResponseEntity<>(wallet, HttpStatus.OK);
	}

	@RequestMapping(value = "/withdraw", method = RequestMethod.POST)
	public ResponseEntity<TransactionStatus> withdraw(@RequestBody TransactionRequest transaction) {
		log.info("withdraw");
		TransactionStatus status = walletService.performFullWithdrawalFromUserWallet(transaction.getAddress());
		return new ResponseEntity<>(status, HttpStatus.OK);
	}

	@RequestMapping(value = "/webhooks", method = RequestMethod.POST)
	public boolean webhookTriggered(@RequestParam("userId") String userId) {
		try {
			userId = URLDecoder.decode(userId, "UTF-8");//convertor
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		log.info("webhookTriggered for userId " + userId);
		walletService.processWebhook(userId);
		return true;

	}
}
