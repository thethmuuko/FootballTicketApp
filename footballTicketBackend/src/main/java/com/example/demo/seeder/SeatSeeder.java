package com.example.demo.seeder;

import com.example.demo.dao.SeatDao;
import com.example.demo.dao.StadiumDao;
import com.example.demo.entity.Seat;
import com.example.demo.entity.SeatType;
import com.example.demo.entity.Stadium;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class SeatSeeder {

    private final SeatDao seatRepository;
    private final StadiumDao stadiumRepository;

    @Transactional
    public void seedSeats() {
        if (seatRepository.count() > 0) return;

        Random random = new Random();
        Map<SeatType, Double> prices = Map.of(
            SeatType.STANDARD, 50.0,
            SeatType.SUPPORTER, 70.0,
            SeatType.FAMILY, 90.0,
            SeatType.VIP, 150.0,
            SeatType.CLUB, 200.0,
            SeatType.SKYBOX, 300.0,
            SeatType.ACCESSIBLE, 55.0
        );

        List<Seat> seatsToSave = new ArrayList<>();

        for (Stadium stadium : stadiumRepository.findAll()) {
            int blocks = random.nextInt(4);
            char blockLetter = 'A';
            for (int b = 0; b < blocks; b++) {
                for (SeatType type : SeatType.values()) {
                    int rows = 1 + random.nextInt(2);
                    int seatsPerRow = 1 + random.nextInt(2);
                    for (int row = 1; row <= rows; row++) {
                        for (int seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                            String seatLabel = blockLetter + String.valueOf(row) + "-" + seatNum;
                            Seat seat = new Seat();
                            seat.setSeatNumber(seatLabel);
                            seat.setAvailable(true);
                            seat.setSeatType(type);
                            seat.setPrice(prices.get(type));
                            seat.setStadium(stadium);
                            seatsToSave.add(seat);
                        }
                    }
                }
                blockLetter++;
            }
        }

        seatRepository.saveAll(seatsToSave);
    }

}
