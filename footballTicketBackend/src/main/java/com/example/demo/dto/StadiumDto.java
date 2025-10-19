package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StadiumDto {
	private Long id;
	private String name;
	private String address;

	public StadiumDto(Long id, String name, String address) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
	}

}
