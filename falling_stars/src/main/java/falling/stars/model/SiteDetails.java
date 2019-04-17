package falling.stars.model;

public class SiteDetails {
	String content;
	String website;
	String country;

	public SiteDetails() {
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	@Override
	public String toString() {
		return "SiteDetails [website=" + website + ", country=" + country + "]";
	}

}
