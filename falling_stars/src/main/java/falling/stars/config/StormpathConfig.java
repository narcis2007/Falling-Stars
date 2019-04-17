package falling.stars.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.access.expression.SecurityExpressionHandler;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;

import com.stormpath.sdk.application.Application;
import com.stormpath.spring.security.authz.permission.evaluator.WildcardPermissionEvaluator;
import com.stormpath.spring.security.provider.DefaultGroupGrantedAuthorityResolver;
import com.stormpath.spring.security.provider.GroupGrantedAuthorityResolver;
import com.stormpath.spring.security.provider.StormpathAuthenticationProvider;

@Configuration
@EnableGlobalMethodSecurity()
public class StormpathConfig {
	@Bean
	public Properties errorMessages() throws IOException {
		Properties prop = new Properties();
		InputStream input = null;
		input = new FileInputStream(getClass().getClassLoader().getResource("stormpath/errorMessages.properties").getPath());

		prop.load(input);
		return prop;
	}
	
	@Bean
	public Properties groups() throws IOException {
		Properties prop = new Properties();
		InputStream input = null;
		input = new FileInputStream(getClass().getClassLoader().getResource("stormpath/groups.properties").getPath());

		prop.load(input);
		return prop;
	}

	@Bean
	public GroupGrantedAuthorityResolver defaultGroupGrantedAuthorityResolver() {
		DefaultGroupGrantedAuthorityResolver resolver = new DefaultGroupGrantedAuthorityResolver();
		Set<DefaultGroupGrantedAuthorityResolver.Mode> modes = new HashSet<>();
		modes.add(DefaultGroupGrantedAuthorityResolver.Mode.NAME);
		resolver.setModes(modes);
		return resolver;
	}

	@Bean
	// @Autowired
	public StormpathAuthenticationProvider stormpathAuthenticationProvider(Application application) {
		StormpathAuthenticationProvider provider = new StormpathAuthenticationProvider(application);
		provider.setGroupGrantedAuthorityResolver(defaultGroupGrantedAuthorityResolver());
		return provider;
	}

	@Bean
	public PermissionEvaluator stormpathWildcardPermissionEvaluator() {
		return new WildcardPermissionEvaluator();
	}

	@Bean
	public SecurityExpressionHandler methodSecurityExpressionHandler() {
		DefaultMethodSecurityExpressionHandler expressionHandler = new DefaultMethodSecurityExpressionHandler();
		expressionHandler.setPermissionEvaluator(stormpathWildcardPermissionEvaluator());
		return expressionHandler;
	}

	@Bean
	public SecurityExpressionHandler webSecurityExpressionHandler() {
		DefaultWebSecurityExpressionHandler expressionHandler = new DefaultWebSecurityExpressionHandler();
		expressionHandler.setPermissionEvaluator(stormpathWildcardPermissionEvaluator());
		return expressionHandler;
	}

}
