package falling.stars.config;

import java.util.Properties;

import javax.servlet.Filter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.stormpath.sdk.account.Account;
import com.stormpath.sdk.application.Application;
import com.stormpath.sdk.client.Client;
import com.stormpath.sdk.group.Group;

/**
 * @author Narcis
 *
 */
@EnableAutoConfiguration
@Configuration
@ComponentScan
public class InitializeAuthentication {
	private Log log = LogFactory.getLog(InitializeAuthentication.class);

	@Autowired
	Application application;

	@Autowired
	Client client;

	@Autowired
	Properties groups;
	
	/**
	 * @return {@link InitializingBean}
	 */
	@Bean
	public InitializingBean insertDefaultUsers() {
		return new InitializingBean() {

			@Override
			public void afterPropertiesSet() {
//				addUser("narcis-group", "narcisc2008@gmail.com", "Testpass1.", groups.getProperty("groups.user"));
//				addUser("admin-group2", "user-group@gmail.com", "Testpass1.",groups.getProperty("groups.admin"));

			}

			private void addUser(String username, String email, String password, String groupHref) {

				Account account = client.instantiate(Account.class);
				Group group = client.getResource(groupHref, Group.class);

				account.setGivenName(username).setSurname(username).setUsername(username)
						.setEmail(email).setPassword(password);
				// System.out.println(client.getDirectories());
				application.createAccount(account);
				account.addGroup(group);
			}

		};
	}

	/**
	 * @return {@link Filter}
	 */
	@Bean
	public Filter characterEncodingFilter() { //don't need this 
		CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
		characterEncodingFilter.setEncoding("UTF-8");
		characterEncodingFilter.setForceEncoding(true);
		return characterEncodingFilter;
	}
}
