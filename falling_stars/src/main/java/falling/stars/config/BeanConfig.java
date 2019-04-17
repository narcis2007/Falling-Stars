package falling.stars.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;

import falling.stars.http.HeaderRequestInterceptor;

@Configuration
@EnableAutoConfiguration
public class BeanConfig {

	@Value("${BITGO_AUTHORIZATION_TOKEN}")
	String authorzation;

	@Bean
	public RestTemplate restTemplate() {
		List<ClientHttpRequestInterceptor> interceptors = new ArrayList<ClientHttpRequestInterceptor>();
		interceptors.add(new HeaderRequestInterceptor("Content-Type", MediaType.APPLICATION_JSON_VALUE));
		interceptors.add(new HeaderRequestInterceptor("Authorization", "Bearer " + authorzation));
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.setInterceptors(interceptors);
		return restTemplate;
	}

//	@Bean
//	public ObjectMapper mapper() {
//		return new ObjectMapper();
//	}

//	@Bean
//	public EmbeddedServletContainerFactory tomcatEmbeddedServletContainerFactory() {
//		final TomcatEmbeddedServletContainerFactory factory = new TomcatEmbeddedServletContainerFactory();
//		factory.addAdditionalTomcatConnectors(this.createConnection());
//		return factory;
//	}

//	private Connector createConnection() {
//		final String protocol = "org.apache.coyote.http11.Http11NioProtocol";
//		final Connector connector = new Connector(protocol);
//
//		connector.setScheme("http");
//		connector.setPort(8080);
//		return connector;
//	}
}
