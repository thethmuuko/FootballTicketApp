package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.BookingDto;
import com.example.demo.dto.MatchDto;
import com.example.demo.dto.SeatDto;
import com.example.demo.service.FootballTicketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/football")
@RequiredArgsConstructor
public class FootballTicketController {
	private final FootballTicketService footballTicketService;
	
	@GetMapping("/list-all-match")
	public ResponseEntity<List<MatchDto>> listAllMatch() {
		List<MatchDto> teams = this.footballTicketService.getAllMatch();
		return ResponseEntity.ok().body(teams);
	}
	
	@GetMapping("/list-all-seat")
	public ResponseEntity<List<SeatDto>> listAllSeat() {
		List<SeatDto> seats = this.footballTicketService.getAllSeat();
		return ResponseEntity.ok().body(seats);
	}
	
	@GetMapping("/seats-by-stadium-name/{stadiumName}")
	public ResponseEntity<List<SeatDto>> listAllSeatByStatiumName(@PathVariable String stadiumName) {
		List<SeatDto> seats = this.footballTicketService.getAllSeatByStatiumName(stadiumName);
		return ResponseEntity.ok().body(seats);
	}
	
	@PostMapping("/book-seat")
	public ResponseEntity<String> bookSeat(@RequestBody BookingDto bookingDto) {
		String response = this.footballTicketService.bookSeats(bookingDto);
		return ResponseEntity.ok().body(response);
	}
}