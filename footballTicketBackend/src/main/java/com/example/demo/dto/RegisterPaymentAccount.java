package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegisterPaymentAccount {
	private String userEmail;
	private String firstName;
	private String lastName;
	private String username;
	private String password;
	
	public RegisterPaymentAccount(String userEmail, String username, String password) {
		super();
		this.userEmail = userEmail;
		this.username = username;
		this.password = password;
	}	
}