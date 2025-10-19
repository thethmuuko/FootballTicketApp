package com.example.demo.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingDto {
	private Long matchId;
	private List<Long> seatIds;
	private String email;
	private Double price;
}
