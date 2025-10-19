package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Stadium {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String address;
	@OneToMany(mappedBy = "stadium", cascade = CascadeType.PERSIST)
	private List<Match> matches = new ArrayList<>();
	@OneToMany(mappedBy = "stadium", cascade = CascadeType.PERSIST)
	private List<Seat> seats = new ArrayList<>();

	public void addMatch(Match match) {
		match.setStadium(this);
		this.matches.add(match);
	}
	
	public void addSeat(Seat seat) {
		seat.setStadium(this);
		this.seats.add(seat);
	}

	public Stadium(String name, String address) {
		super();
		this.name = name;
		this.address = address;
	}
}
