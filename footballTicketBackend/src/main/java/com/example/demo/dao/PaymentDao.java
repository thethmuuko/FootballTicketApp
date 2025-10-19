package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.PaymentAccount;

public interface PaymentDao extends JpaRepository<PaymentAccount, String> {
	public Optional<PaymentAccount> findByUsername(String username);
}
