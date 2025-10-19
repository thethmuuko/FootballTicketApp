package com.example.demo.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Booking {
	@EmbeddedId
	private BookingId bookingId;

	@ManyToOne
	@MapsId("matchId")
	@JoinColumn(name = "match_id")
	private Match match;

	@ManyToOne
	@MapsId("seatId")
	@JoinColumn(name = "seat_id")
	private Seat seat;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "d/M/yyyy HH:mm:ss")
	private LocalDateTime bookingTime;

	public Booking(Match match, Seat seat, LocalDateTime bookingTime) {
	    this.match = match;
	    this.seat = seat;
	    this.bookingTime = bookingTime;

	    BookingId id = new BookingId(match.getId(), seat.getId());
	    this.bookingId = id;
	}

}