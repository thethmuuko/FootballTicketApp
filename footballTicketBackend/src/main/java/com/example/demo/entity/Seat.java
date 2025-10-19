package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Seat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String seatNumber;
	@Column(name = "is_available", nullable = false, columnDefinition = "TINYINT(1)")
	private boolean isAvailable;
	@Enumerated(EnumType.STRING)
	private SeatType seatType;
	private Double price;
	
	@ManyToOne
	@JoinColumn(name = "stadium_id")
	private Stadium stadium;

	public Seat(String seatNumber, boolean isAvailable) {
		super();
		this.seatNumber = seatNumber;
		this.isAvailable = isAvailable;
	}

}