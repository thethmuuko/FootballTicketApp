package com.example.demo.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dao.PaymentDao;
import com.example.demo.dao.UserDao;
import com.example.demo.dto.PaymentAccountDto;
import com.example.demo.dto.RegisterPaymentAccount;
import com.example.demo.entity.PaymentAccount;
import com.example.demo.entity.User;
import com.example.demo.exception.BalanceNotEnoughException;
import com.example.demo.exception.UsernameAlreadyExistsException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
	private final PaymentDao paymentDao;
	private final UserDao userDao;
	
	public String createPaymentAccount(RegisterPaymentAccount registerPaymentAccount) {
		paymentDao.findByUsername(registerPaymentAccount.getUsername()).ifPresent((r) -> {
			throw new UsernameAlreadyExistsException("Username Already Exists");
		});
		
		User user = userDao.findByEmail(registerPaymentAccount.getUserEmail()).orElseThrow(() -> new IllegalArgumentException("Email not found!"));
		PaymentAccount paymentAccount = new PaymentAccount(registerPaymentAccount.getUsername(), registerPaymentAccount.getPassword(), registerPaymentAccount.getFirstName(), registerPaymentAccount.getLastName());
		paymentAccount.setUser(user);
		paymentAccount.setAlreadyTakeLoan(false);
		String username = this.paymentDao.save(paymentAccount).getUsername();
		return username + " was created successfully";
	}
	
	@Transactional
	public String getLoan(PaymentAccountDto loanAccountDto) {
		PaymentAccount loanAccount = this.paymentDao.findByUsername(loanAccountDto.getAccountName()).orElseThrow(() -> new IllegalArgumentException("Invalid Username"));
		if (loanAccount.getAlreadyTakeLoan()) {
			throw new RuntimeException("Please repay your current loan first.");
		}
		loanAccount.setBalance(loanAccount.getBalance().add(BigDecimal.valueOf(loanAccountDto.getAmount())));
		loanAccount.setAlreadyTakeLoan(true);
		this.paymentDao.save(loanAccount);
		return "Withdraw Loan Successfully";
	}
	
	@Transactional
	public String withdrawToPay(PaymentAccountDto from) {
		PaymentAccount fromAccount = this.paymentDao.findByUsername(from.getAccountName()).orElseThrow(() -> new IllegalArgumentException("Invalid Username"));
		if (!from.getPassword().equals(fromAccount.getPassword())) {
			throw new IllegalArgumentException("Invalid Password");
		}
		PaymentAccount toAccount = this.paymentDao.findByUsername("owner").orElseThrow(() -> new IllegalArgumentException("Invalid Username"));
		BigDecimal remainingBalance = fromAccount.getBalance().subtract(BigDecimal.valueOf(from.getAmount()));
		
		if (remainingBalance.floatValue() < 0.0) {
			throw new BalanceNotEnoughException("Not enough balance");
		}
		
		fromAccount.setBalance(fromAccount.getBalance().subtract(BigDecimal.valueOf(from.getAmount())));
		toAccount.setBalance(toAccount.getBalance().add(BigDecimal.valueOf(from.getAmount())));
		this.paymentDao.saveAll(List.of(fromAccount, toAccount));
		return "Finished Payment Successfully";
	}
	
	public PaymentAccountDto findByUsername(String username) {
		return this.paymentDao.findByUsername(username).map(p -> {
			return new PaymentAccountDto(p.getUsername(), p.getPassword(), p.getBalance().doubleValue(), p.getAlreadyTakeLoan());
		}).get();
	}
}