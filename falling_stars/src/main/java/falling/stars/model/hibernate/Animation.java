package falling.stars.model.hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "animations")
public class Animation {
	@Id
	@GeneratedValue
	@Column(name = "id_animation")
	private long id;

	@Column(name = "name")
	private String name;

	public Animation() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}