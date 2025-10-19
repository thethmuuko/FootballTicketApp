package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dao.BookingDao;
import com.example.demo.dao.MatchDao;
import com.example.demo.dao.SeatDao;
import com.example.demo.dao.StadiumDao;
import com.example.demo.dao.TeamDao;
import com.example.demo.dao.UserDao;
import com.example.demo.dto.BookingDto;
import com.example.demo.dto.MatchDto;
import com.example.demo.dto.SeatDto;
import com.example.demo.dto.StadiumDto;
import com.example.demo.dto.TeamDto;
import com.example.demo.entity.Booking;
import com.example.demo.entity.League;
import com.example.demo.entity.Match;
import com.example.demo.entity.Seat;
import com.example.demo.entity.Stadium;
import com.example.demo.entity.Team;
import com.example.demo.entity.User;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FootballTicketService {
	private final TeamDao teamDao;
	private final MatchDao matchDao;
	private final SeatDao seatDao;
	private final BookingDao bookingDao;
	private final StadiumDao stadiumDao;
	private final UserDao userDao;
	
	public String saveTeam(TeamDto teamDto) {
		Stadium stadium = this.stadiumDao.findByName(teamDto.getStadium().getName()).orElseThrow(() -> new IllegalArgumentException("Stadium not found!"));
		Team team = new Team(teamDto.getTeamName(), teamDto.getLogo(), League.valueOf(teamDto.getLeague()), stadium);
		team.setId(teamDto.getTeamId());
		this.teamDao.save(team);
		return "Save Team Successfully";
	}
	
	public List<TeamDto> getAllTeam() {
		return this.teamDao.findAll().stream().map(team -> {
			return new TeamDto(team.getId(), team.getName(), team.getLogo(), toStadiumDto(team.getStadium()), team.getLeague());
		}).toList();
	}
	
	public String saveStatium(StadiumDto stadiumDto) {
		Stadium stadium = new Stadium(stadiumDto.getName(), stadiumDto.getAddress());
		stadium.setId(stadiumDto.getId());
		this.stadiumDao.save(stadium);
		return "Save Stadium Successfully";
	}
	
	public List<StadiumDto> getAllStatium() {
		return this.stadiumDao.findAll().stream().map(statium -> {
			return new StadiumDto(statium.getId(), statium.getName(), statium.getAddress());
		}).toList();
	}
	
	public String saveMatch(MatchDto matchDto) {
		Team homeTeam = this.teamDao.findByName(matchDto.getHomeTeam().getTeamName()).orElseThrow(() -> new IllegalArgumentException("Home Team not found!"));
		Team awayTeam = this.teamDao.findByName(matchDto.getAwayTeam().getTeamName()).orElseThrow(() -> new IllegalArgumentException("Away Team not found!"));
		Stadium stadium = this.stadiumDao.findByName(matchDto.getStatium()).orElseThrow(() -> new IllegalArgumentException("Stadium not found!"));
		Match match = new Match(homeTeam, awayTeam, stadium, matchDto.getKickOff(), League.valueOf(matchDto.getLeague()));
		this.matchDao.save(match);
		return "Save Match Successfully";
	}
	
	public List<MatchDto> getAllMatch() {
		return this.matchDao.findAll().stream().map(match -> {
			return new MatchDto(match.getId(), toTeamDto(match.getHomeTeam()), toTeamDto(match.getAwayTeam()), match.getStadium().getName(), match.getStadium().getAddress(), match.getKickOff(), match.getLeague().name());
		}).toList();
	}
	
	private TeamDto toTeamDto(Team team) {
		return new TeamDto(team.getId(), team.getName(), team.getLogo(),toStadiumDto(team.getStadium()), team.getLeague());
	}
	
	private StadiumDto toStadiumDto(Stadium stadium) {
		return new StadiumDto(stadium.getId(), stadium.getName(), stadium.getAddress());
	}
	
	public String saveSeat(SeatDto seatDto) {
		Seat seat = new Seat(seatDto.getSeatNumber(), seatDto.isAvailable());
		seat.setId(seatDto.getId());
		this.seatDao.save(seat);
		return "Save Seat Successfully";
	}
	
	public List<SeatDto> getAllSeat() {
		return this.seatDao.findAll().stream().map(seat -> {
			return toSeatDto(seat);
		}).toList();
	}

	public SeatDto toSeatDto(Seat seat) {
		return new SeatDto(seat.getId(), seat.getSeatNumber(), seat.isAvailable(), seat.getSeatType(), seat.getPrice());
	}
	
	public List<SeatDto> getAllSeatByStatiumName(String statiumName) {
		Stadium stadium = this.stadiumDao.findByName(statiumName).orElseThrow(() -> new IllegalArgumentException("Stadium not found"));
		List<SeatDto> seats = this.seatDao.findAllSeatByStadium(stadium).stream().map(seat -> {
			return toSeatDto(seat);
		}).toList();
		return seats;
	}
	
	@Transactional
	public String bookSeats(BookingDto bookingDto) {
	    Match match = matchDao.findById(bookingDto.getMatchId())
	            .orElseThrow(() -> new IllegalArgumentException("Match not found!"));
	    
	    User user = userDao.findByEmail(bookingDto.getEmail()).orElseThrow(() -> new IllegalArgumentException("User not found!"));

	    List<Seat> seats = seatDao.findAllById(bookingDto.getSeatIds());

	    if (seats.size() != bookingDto.getSeatIds().size()) {
	        throw new IllegalArgumentException("Some seats not found!");
	    }

	    List<Booking> bookings = new ArrayList<>();
	    for (Seat seat : seats) {
	        if (!seat.isAvailable()) {
	            throw new IllegalStateException("Seat " + seat.getSeatNumber() + " is already booked!");
	        }

	        seat.setAvailable(false);
	        Booking booking = new Booking(match, seat, LocalDateTime.now());
	        booking.setUser(user);
	        bookings.add(booking);
	    }

	    bookingDao.saveAll(bookings);

	    return "Reserved Successfully (" + bookings.size() + " seats)";
	}

}