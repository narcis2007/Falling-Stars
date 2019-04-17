package falling.stars.config;

import static com.stormpath.spring.config.StormpathWebSecurityConfigurer.stormpath;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

import falling.stars.filters.AppCorsFilter;

/**
 * @author Narcis
 *
 */
@EnableWebSecurity
@Configuration
@Order(1)
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

	private Log log = LogFactory.getLog(AppSecurityConfig.class);

	@Autowired
	private SecurityProperties securityProperties;

	public AppSecurityConfig() {
		super(true);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		try {

			http.exceptionHandling().and().anonymous().and().servletApi().and().headers().cacheControl().and().and()
					.apply(stormpath()).and().authorizeRequests()
					.antMatchers("/api/auth/**").permitAll()
					.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
					.antMatchers("/**").permitAll()
					.and()
					.addFilterBefore(new AppCorsFilter(), ChannelProcessingFilter.class).httpBasic();
			http
			   .headers()
			      .frameOptions()
			         .disable();
			if (securityProperties.isRequireSsl())
				http.requiresChannel().anyRequest().requiresSecure();
			// Prevent the HTTP response header of "Pragma: no-cache".
	        http.headers().cacheControl().disable();
		} catch (Exception e) {
			log.info(e.getMessage());
		}
	}

}
