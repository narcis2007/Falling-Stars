package falling.stars.model.hibernate;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name = "websites")
public class Website {

	@Id
	@Column(name = "name", unique = true, nullable = false)
	String name;

	@Column(name = "max_words")
	int maxWords;

	@Column(name = "click_count")
	private Long clickCount;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "website_key_words")
	List<String> keyWords;

	@Column(name = "user_id")
	String userId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "in_animation", insertable = false, updatable = false)
	private Animation inAnimation;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "out_animation", insertable = false, updatable = false)
	private Animation outAnimation;

	@Column(name = "in_animation")
	long inAnimationId;

	@Column(name = "out_animation")
	long outAnimationId;

	public Website() {

	}

	@PrePersist
	public void defaultClickCount() {
		if (clickCount == null) {
			clickCount = 0l;
		}
	}

	public long getInAnimationId() {
		return inAnimationId;
	}

	public void setInAnimationId(long inAnimationId) {
		this.inAnimationId = inAnimationId;
	}

	public long getOutAnimationId() {
		return outAnimationId;
	}

	public void setOutAnimationId(long outAnimationId) {
		this.outAnimationId = outAnimationId;
	}

	public int getMaxWords() {
		return maxWords;
	}

	public void setMaxWords(int maxWords) {
		this.maxWords = maxWords;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String user_id) {
		this.userId = user_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<String> getKeyWords() {
		return keyWords;
	}

	public void setKeyWords(List<String> keyWords) {
		this.keyWords = keyWords;
	}

	public Animation getInAnimation() {
		return inAnimation;
	}

	public void setInAnimation(Animation inAnimation) {
		this.inAnimation = inAnimation;
	}

	public Animation getOutAnimation() {
		return outAnimation;
	}

	public void setOutAnimation(Animation outAnimation) {
		this.outAnimation = outAnimation;
	}

	public Long getClickCount() {
		return clickCount;
	}

	public void setClickCount(Long clickCount) {
		this.clickCount = clickCount;
	}

	
}
