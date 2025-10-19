package com.example.demo.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Team {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	@Lob
	private String logo;
	@OneToOne
	private Stadium stadium;
	@Enumerated(EnumType.STRING)
	private League league;
	
	@OneToMany(mappedBy = "homeTeam", cascade = CascadeType.PERSIST)
	private Set<Match> homeMatches = new HashSet<>();
	
	@OneToMany(mappedBy = "awayTeam", cascade = CascadeType.PERSIST)
	private Set<Match> awayMatches = new HashSet<>();
	
	public void addHomeMatch(Match match) {
		match.setHomeTeam(this);
		this.homeMatches.add(match);
	}
	
	public void addAwayMatch(Match match) {
		match.setAwayTeam(this);
		this.homeMatches.add(match);
	}
	
	public Team(String name, String logo, League league, Stadium stadium) {
		super();
		this.name = name;
		this.logo = logo;
		this.league = league;
		this.stadium = stadium;
	}
}