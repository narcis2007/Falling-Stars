package falling.stars.model.hibernate;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name = "advertisements")
public class Advertisement {

	@Id
	@GeneratedValue
	@Column(name = "id_advertisement")
	private long id;

	@Column(name = "text")
	private String text;

	@Column(name = "url")
	private String url;

	@Column(name = "id_user")
	private String userId;

	@Column(name = "click_count")
	Long clickCount;

	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "key_words")
	List<String> keyWords;

	public Advertisement() {

	}
	
	@PrePersist
	public void defaultClickCount() {
	    if(clickCount == null) {
	    	clickCount = 0l;
	    }
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<String> getKeyWords() {
		return keyWords;
	}

	public void setKeyWords(List<String> keyWords) {
		this.keyWords = keyWords;
	}

	public Long getClickCount() {
		return clickCount;
	}

	public void setClickCount(Long clickCount) {
		this.clickCount = clickCount;
	}
	
	

}
