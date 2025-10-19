package com.example.demo.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PaymentAccount {
	@Id
	private String username;
	private String firstName;
	private String lastName;
	private BigDecimal balance;
	private String password;
	@Column(name = "already_take_loan", nullable = false, columnDefinition = "TINYINT(1)")
	private Boolean alreadyTakeLoan;
	@ManyToOne
	private User user;
	public PaymentAccount(String username, String password, String firstName, String lastName) {
		super();
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.balance = new BigDecimal(0);
		this.alreadyTakeLoan = false;
	}
	
	
}
