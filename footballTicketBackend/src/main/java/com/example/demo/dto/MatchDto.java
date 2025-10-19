package com.example.demo.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MatchDto {
	private Long id;
	private TeamDto homeTeam;
	private TeamDto awayTeam;
	private String statium;
	private String statiumAddress;
	private String league;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime kickOff;

	public MatchDto(Long id, TeamDto homeTeam, TeamDto awayTeam, String statium, String statiumAddress,LocalDateTime kickOff, String league) {
		super();
		this.id = id;
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
		this.statium = statium;
		this.statiumAddress = statiumAddress;
		this.kickOff = kickOff;
		this.league = league;
	}

}
