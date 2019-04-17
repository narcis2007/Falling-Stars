package falling.stars.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.stormpath.sdk.account.Account;
import com.stormpath.sdk.account.AccountList;
import com.stormpath.sdk.application.Application;
import com.stormpath.sdk.client.Client;

import falling.stars.exception.ResourceNotFoundException;
import falling.stars.model.User;

@Service
public class UserService {

	@Autowired
	Application application;

	@Autowired
	Client client;

	@PreAuthorize("hasPermission('users','retrieve')")
	public List<User> getAllUsers() {
		AccountList accounts = application.getAccounts();
		List<User> accountList = new ArrayList<>();
		accounts.forEach((a) -> accountList.add(new User(a)));
		return accountList;
	}

	@PreAuthorize("hasPermission('users','update') or hasPermission(#user.getUsername(),'update')")
	public User updateUser(User user) {
		Map<String, Object> queryParams = new HashMap<>();
		queryParams.put("username", user.getUsername());
		AccountList accounts = application.getAccounts(queryParams);
		Account account = accounts.single();
		updateAccount(user, account);
		account.save();
		// return account.saveWithResponseOptions(AccountOptions<T>); - don't know how to use this yet
		return new User(account);
	}

	private void updateAccount(User user, Account account) {
		if (user.getEmail() != null)
			account.setEmail(user.getEmail());
		if (user.getPassword() != null)
			account.setPassword(user.getPassword());
		if (user.getLastName() != null)
			account.setSurname(user.getLastName());
		if (user.getFirstName() != null)
			account.setGivenName(user.getFirstName());
		if (user.getEmail() != null)
			account.setEmail(user.getEmail());
	}

	@PreAuthorize("hasPermission('users','delete') or hasPermission(#username,'delete')")
	public Boolean deleteUser(String username) {
		Map<String, Object> queryParams = new HashMap<>();
		queryParams.put("username", username);
		AccountList accounts = application.getAccounts(queryParams);
		try {
			Account account = accounts.single();
			account.delete();
			return true;
		} catch (IllegalStateException e) {
			throw new ResourceNotFoundException("user not found");
		}
	}

	// @PreAuthorize("hasPermission('users','create')")
	// public User createUser(User user) {
	// Account account = client.instantiate(Account.class);
	// List<String> defaultPermissions = getDefaultPermissions(user);// the user can do what he wants with his account
	// account.setGivenName(user.getFirstName()).setSurname(user.getLastName()).setUsername(user.getUsername()).setEmail(user.getEmail()).setPassword(user.getPassword()).getCustomData().put(SPRING_SECURITY_PERMISSIONS,
	// defaultPermissions);
	// account = application.createAccount(account);
	// account.addGroup(groups.getProperty("groups.user"));
	// return new User(account);
	// }
	//
	// private List<String> getDefaultPermissions(User user) {
	// List<String> defaultPermissions = new ArrayList<>();
	// defaultPermissions.add(user.getUsername() + ":" + "retrieve");
	// defaultPermissions.add(user.getUsername() + ":" + "update");
	// defaultPermissions.add(user.getUsername() + ":" + "delete");
	// return defaultPermissions;
	// }//duplicated - moved to authService

	@PreAuthorize("hasPermission('users','retrieve') or hasPermission(#username,'retrieve')")
	public User getUser(String username) {
		Map<String, Object> queryParams = new HashMap<>();
		queryParams.put("username", username);
		AccountList accounts = application.getAccounts(queryParams);
		try {
			Account account = accounts.single();
			return new User(account);
		} catch (IllegalStateException e) {
			throw new ResourceNotFoundException("user not found");
		}

	}
}
