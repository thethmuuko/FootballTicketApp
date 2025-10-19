package com.example.demo.dto;

import com.example.demo.entity.SeatType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SeatDto {
	private Long id;
	private String seatNumber;
	private boolean available;
	private String seatType;
	private double price;

	public SeatDto(Long id, String seatNumber, boolean available, SeatType seatType, double price) {
		super();
		this.id = id;
		this.seatNumber = seatNumber;
		this.available = available;
		this.seatType = seatType.name();
		this.price = price;
	}

}
