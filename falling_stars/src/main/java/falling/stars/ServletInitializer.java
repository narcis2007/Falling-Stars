package falling.stars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

@Configuration
public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(FallingStarsApplication.class);
	}

	@Autowired
	private ApplicationContext context;

	@Bean
	public ServletRegistrationBean restApi() {
		XmlWebApplicationContext applicationContext = new XmlWebApplicationContext();
		applicationContext.setParent(context);
		applicationContext.setConfigLocation("classpath:/rest.xml");

		DispatcherServlet dispatcherServlet = new DispatcherServlet();
		dispatcherServlet.setApplicationContext(applicationContext);

		ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean(dispatcherServlet, "/api/*");
		servletRegistrationBean.setName("restApi");

		return servletRegistrationBean;
	}

}