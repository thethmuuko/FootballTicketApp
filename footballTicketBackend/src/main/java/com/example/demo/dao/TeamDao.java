package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Team;

public interface TeamDao extends JpaRepository<Team, Long> {
	Optional<Team> findByName(String name);
}
