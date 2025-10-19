package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Stadium;

public interface StadiumDao extends JpaRepository<Stadium, Long> {
	Optional<Stadium> findByName(String name);
}
