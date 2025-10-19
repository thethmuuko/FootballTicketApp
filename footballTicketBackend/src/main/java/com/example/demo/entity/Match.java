package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "matches")
public class Match {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	private Team homeTeam;
	@ManyToOne
	private Team awayTeam;
	@ManyToOne
	private Stadium stadium;
	private LocalDateTime kickOff;
	@Enumerated(EnumType.STRING)
	private League league;

	public Match(Team homeTeam, Team awayTeam, Stadium stadium, LocalDateTime kickOff, League league) {
		super();
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
		this.stadium = stadium;
		this.kickOff = kickOff;
		this.league = league;
	}
}