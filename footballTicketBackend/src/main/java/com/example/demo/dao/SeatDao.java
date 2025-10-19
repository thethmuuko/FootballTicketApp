package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Seat;
import com.example.demo.entity.Stadium;

public interface SeatDao extends JpaRepository<Seat, Long> {
	List<Seat> findAllSeatByStadium(Stadium stadium);
}