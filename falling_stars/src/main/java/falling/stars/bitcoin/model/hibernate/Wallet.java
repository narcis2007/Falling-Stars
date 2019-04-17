package falling.stars.bitcoin.model.hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "wallets")
public class Wallet {

	@Id
	@Column(name = "address")
	private String address;

	@Column(name = "paid_clicks")
	private Long paidClicks;

	@Column(name = "advertisements_click_count")
	private Long advertisementsClickCount;

	@Column(name = "websites_click_count")
	private Long websitesClickCount;

	@JsonProperty("label")
	@Column(name = "id_user")
	private String userId;

	@Transient
	private long balance;

	@Transient
	private long unconfirmedSends;

	@Transient
	private long unconfirmedReceives;

	@Transient
	private String passphrase;

	@Transient
	private long defaultPricePerClick = 100000;// 100 000 Satoshi

	@Transient
	private double defaultCommission = 0.1;// 10%

	public Wallet(String userId, String passphrase) {
		this.userId = userId;
		this.passphrase = passphrase;
	}

	public Wallet() {
	}

	@JsonProperty("address")
	public String getAddress() {
		return address;
	}

	@JsonProperty("id")
	public void setAddress(String address) {
		this.address = address;
	}

	@PrePersist
	private void setDefaultPaidClicks() {
		if (paidClicks == null) {
			paidClicks = 0l;
		}
		if (advertisementsClickCount == null) {
			advertisementsClickCount = 0l;
		}
		if (websitesClickCount == null) {
			websitesClickCount = 0l;
		}
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public long getBalance() {
		return balance;
	}

	public void setBalance(long balance) {
		this.balance = balance;
	}

	public long getUnconfirmedSends() {
		return unconfirmedSends;
	}

	public void setUnconfirmedSends(long unconfirmedSends) {
		this.unconfirmedSends = unconfirmedSends;
	}

	public long getUnconfirmedReceives() {
		return unconfirmedReceives;
	}

	public void setUnconfirmedReceives(long unconfirmedReceives) {
		this.unconfirmedReceives = unconfirmedReceives;
	}

	@Override
	public String toString() {
		return "Wallet [address=" + address + ", userId=" + userId + "]";
	}

	public String getPassphrase() {
		return passphrase;
	}

	public void setPassphrase(String passphrase) {
		this.passphrase = passphrase;
	}

	public long getPaidClicks() {
		return paidClicks != null ? paidClicks : 0;
	}

	public void setPaidClicks(long paidClicks) {
		this.paidClicks = paidClicks;
	}

	public long getAdvertisementsClickCount() {
		return advertisementsClickCount != null ? advertisementsClickCount : 0;
	}

	public void setAdvertisementsClickCount(long advertisementsClickCount) {
		this.advertisementsClickCount = advertisementsClickCount;
	}

	public long getWebsitesClickCount() {
		return websitesClickCount != null ? websitesClickCount : 0;
	}

	public void setWebsitesClickCount(long websitesClickCount) {
		this.websitesClickCount = websitesClickCount;
	}

	public long getAvailableClicks() {
		return getPaidClicks() + getWebsitesClickCount() - getAdvertisementsClickCount();
	}

	public boolean hasAvailableClicks() {
		return getAvailableClicks() > 0;
	}

	public long getDefaultPricePerClick() {
		return defaultPricePerClick;
	}

	public void setDefaultPricePerClick(long defaultPricePerClick) {
		this.defaultPricePerClick = defaultPricePerClick;
	}

	public double getDefaultCommission() {
		return defaultCommission;
	}

	public void setDefaultCommission(double defaultCommission) {
		this.defaultCommission = defaultCommission;
	}

	public long getAmountThatCanBeWithdrawed() {
		return (long) ((getAvailableClicks() * getDefaultPricePerClick())-(getAvailableClicks() * getDefaultPricePerClick())*getDefaultCommission());
	}

	public void resetCounts() {
		advertisementsClickCount=0l;
		websitesClickCount=0l;
		paidClicks=0l;
		
	}
}
