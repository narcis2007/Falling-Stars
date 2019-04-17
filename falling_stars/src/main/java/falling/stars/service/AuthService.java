package falling.stars.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stormpath.sdk.account.Account;
import com.stormpath.sdk.account.PasswordResetToken;
import com.stormpath.sdk.application.Application;
import com.stormpath.sdk.client.Client;
import com.stormpath.sdk.oauth.Authenticators;
import com.stormpath.sdk.oauth.OAuthGrantRequestAuthenticationResult;
import com.stormpath.sdk.oauth.OAuthPasswordGrantRequestAuthentication;
import com.stormpath.sdk.oauth.OAuthPolicy;
import com.stormpath.sdk.oauth.OAuthRequests;

import falling.stars.model.Authorization;
import falling.stars.model.User;

@Service
public class AuthService {

	private static final String SPRING_SECURITY_PERMISSIONS = "springSecurityPermissions";

	@Autowired
	private Application application;

	@Autowired
	private Client client;

	@Autowired
	private Properties groups;

	@Value("${fallingStars.auth.accessTokenTtl}")
	private String accessTokenTtl;

	@Value("${fallingStars.auth.refreshTokenTtl}") // learn how to use this in the future
	private String refreshTokenTtl;

	@Autowired
	private WalletService walletService;

	public Account sendForgotPasswordEmail(User user) {
		PasswordResetToken passwordResetToken = application.sendPasswordResetEmail(user.getEmail());
		Account account = passwordResetToken.getAccount();
		return account;
	}

	public Account resetPassword(String sptoken, String password) {
		Account account = application.resetPassword(sptoken, password);
		return account;
	}

	public Authorization login(String username, String password) {
		OAuthPolicy oauthPolicy = application.getOAuthPolicy();
		oauthPolicy.setAccessTokenTtl(accessTokenTtl);
		oauthPolicy.setRefreshTokenTtl(refreshTokenTtl);
		oauthPolicy.save();

		OAuthPasswordGrantRequestAuthentication passwordGrantRequest = OAuthRequests.OAUTH_PASSWORD_GRANT_REQUEST
				.builder().setLogin(username).setPassword(password).build();
		OAuthGrantRequestAuthenticationResult oauthGrantAuthenticationResult = Authenticators.OAUTH_PASSWORD_GRANT_REQUEST_AUTHENTICATOR
				.forApplication(application).authenticate(passwordGrantRequest);
		return new Authorization("Bearer " + oauthGrantAuthenticationResult.getAccessTokenString());
	}

	public Account registerUser(User user) {
		Account account = client.instantiate(Account.class);
		List<String> defaultPermissions = getDefaultPermissions(user);// the user can do what he wants with his account
		account.setGivenName(user.getFirstName()).setSurname(user.getLastName()).setUsername(user.getUsername())
				.setEmail(user.getEmail()).setPassword(user.getPassword()).getCustomData()
				.put(SPRING_SECURITY_PERMISSIONS, defaultPermissions);
		account = application.createAccount(account);
		account.addGroup(groups.getProperty("groups.user"));
		walletService.createWallet(account.getHref());

		return account;
	}

	private List<String> getDefaultPermissions(User user) {
		List<String> defaultPermissions = new ArrayList<>();
		defaultPermissions.add(user.getUsername() + ":" + "retrieve");
		defaultPermissions.add(user.getUsername() + ":" + "update");
		defaultPermissions.add(user.getUsername() + ":" + "delete");
		return defaultPermissions;
	}

}
