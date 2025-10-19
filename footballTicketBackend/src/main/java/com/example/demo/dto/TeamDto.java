package com.example.demo.dto;


import com.example.demo.entity.League;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TeamDto {
	private Long teamId;
	private String teamName;
	private String logo;
	private StadiumDto stadium;
	private String league;
	
	public TeamDto(Long teamId, String teamName, String logo, StadiumDto statium, League league) {
		super();
		this.teamId = teamId;
		this.teamName = teamName;
		this.logo = logo;
		this.stadium = statium;
		this.league = league.name();
	}
}
