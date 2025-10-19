package com.example.demo.seeder;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ControlSeeder {
    private final StadiumSeeder stadiumSeeder;
    private final TeamSeeder teamSeeder;
    private final MatchSeeder matchSeeder;
    private final SeatSeeder seatSeeder;
    private final AdminSeeder adminSeeder;

    @PostConstruct
    public void runAll() {
    	adminSeeder.seedAdmin();
        stadiumSeeder.seedStadiums();
        teamSeeder.seedTeams();
        matchSeeder.seedMatches();
        seatSeeder.seedSeats();
    }
}
