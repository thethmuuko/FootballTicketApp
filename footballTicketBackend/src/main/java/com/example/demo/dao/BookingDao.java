package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Booking;
import com.example.demo.entity.BookingId;

public interface BookingDao extends JpaRepository<Booking, BookingId> {

}
