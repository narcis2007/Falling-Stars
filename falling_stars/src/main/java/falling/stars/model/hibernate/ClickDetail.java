package falling.stars.model.hibernate;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "click_details")
public class ClickDetail {

	@Id
	@GeneratedValue
	@Column(name = "id_click_detail")
	private long id;
	
	@Column(name = "id_advertisement")
	private long advertisementId;
	
	@Column(name = "browser")
	String browser;

	@Column(name = "path")
	String path;

	@Column(name = "domain")
	String domain;
	
	@Column(name = "remote_ip")
	String remoteIP;


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "happened_on", nullable = false)
	private Date happenedOn;

	@Column(name = "website_name")
	String websiteName;
	
	@Column(name = "remote_client_IP")
	String remoteClientIp;

	public ClickDetail() {
	}

	@PrePersist
	protected void onCreate() {
		happenedOn = new Date();
	}

	public String getWebsiteName() {
		return websiteName;
	}

	public void setWebsiteName(String websiteName) {
		this.websiteName = websiteName;
	}

	public long getAdvertisementId() {
		return advertisementId;
	}

	public void setAdvertisementId(long advertisementId) {
		this.advertisementId = advertisementId;
	}

	public String getBrowser() {
		return browser;
	}

	public void setBrowser(String browser) {
		this.browser = browser;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getHappenedOn() {
		return happenedOn;
	}

	public void setHappenedOn(Date happenedOn) {
		this.happenedOn = happenedOn;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getRemoteIP() {
		return remoteIP;
	}

	public void setRemoteIP(String remoteIP) {
		this.remoteIP = remoteIP;
	}


}
