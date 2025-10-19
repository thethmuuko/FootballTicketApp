package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PaymentAccountDto;
import com.example.demo.dto.RegisterPaymentAccount;
import com.example.demo.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {
	private final PaymentService paymentService;
	
	@PostMapping("/create-account")
	public ResponseEntity<String> createPaymentAccount(@RequestBody RegisterPaymentAccount registerPaymentAccount) {
		String response = this.paymentService.createPaymentAccount(registerPaymentAccount);
		return ResponseEntity.ok().body(response);
	}
	
	@PostMapping("/withdraw")
	public ResponseEntity<String> Pay(@RequestBody PaymentAccountDto fromAccount) {
		String response = this.paymentService.withdrawToPay(fromAccount);
		return ResponseEntity.ok().body(response);
	}
	
	@PostMapping("/get-loan")
	public ResponseEntity<String> getLoan(@RequestBody PaymentAccountDto toAccount) {
		String response = this.paymentService.getLoan(toAccount);
		return ResponseEntity.ok().body(response);
	}
	
	@GetMapping("/find-by-username/{username}")
	public ResponseEntity<PaymentAccountDto> findByUsername(@PathVariable String username) {
		return ResponseEntity.ok().body(this.paymentService.findByUsername(username));
	}
}