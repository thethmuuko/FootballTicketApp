package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentAccountDto {
	private String accountName;
	private String password;
	private double amount;
	private boolean alreadyTakeLoan;
}