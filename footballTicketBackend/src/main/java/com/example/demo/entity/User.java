package com.example.demo.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
public class User {
	@Id
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
	private List<PaymentAccount> paymentAccounts = new ArrayList<>();
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
	private Set<Role> roles = new HashSet<>();
	
	public void addRole(Role role) {
		this.roles.add(role);
	}
	
	public void addPaymentAccount(PaymentAccount paymentAccount) {
		paymentAccount.setUser(this);
		this.paymentAccounts.add(paymentAccount);
	}
	
	
	public User(String email, String password, String firstName, String lastName) {
		super();
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}