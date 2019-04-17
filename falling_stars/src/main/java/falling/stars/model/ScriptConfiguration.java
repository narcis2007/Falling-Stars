package falling.stars.model;

import java.util.List;

import falling.stars.model.hibernate.Advertisement;
import falling.stars.model.hibernate.Animation;

public class ScriptConfiguration {
	private List<Advertisement> advertisements;
	private int percentage; // should change to use a class percentage
	private List<String> elements;
	private boolean follow = false;
	private Animation inAnimation;
	private Animation outAnimation;

	public ScriptConfiguration() {

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

	public List<Advertisement> getAdvertisements() {
		return advertisements;
	}

	public void setAdvertisements(List<Advertisement> advertisements) {
		this.advertisements = advertisements;
	}

	public int getPercentage() {
		return percentage;
	}

	public void setPercentage(int percentage) {
		this.percentage = percentage;
	}

	public List<String> getElements() {
		return elements;
	}

	public void setElements(List<String> elements) {
		this.elements = elements;
	}

	public boolean isFollow() {
		return follow;
	}

	public void setFollow(boolean follow) {
		this.follow = follow;
	}

}
