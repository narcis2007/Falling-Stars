package falling.stars.model;

public class WordFrequency { //Should change to AdvertisementFrequency

	String text;
	int frequency;
	
	public WordFrequency(){
		
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getFrequency() {
		return frequency;
	}

	public void setFrequency(int frequency) {
		this.frequency = frequency;
	}
	
	
}
