package com.example.demo.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingId implements Serializable {
	
	private Long matchId;
	private Long seatId;
	
	@Override
	public int hashCode() {
		return Objects.hash(matchId, seatId);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BookingId other = (BookingId) obj;
		return Objects.equals(matchId, other.matchId) && Objects.equals(seatId, other.seatId);
	}
}