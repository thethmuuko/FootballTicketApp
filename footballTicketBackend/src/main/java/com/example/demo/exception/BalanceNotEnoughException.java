package com.example.demo.exception;

public class BalanceNotEnoughException extends RuntimeException {

	private static final long serialVersionUID = 2438443015240694536L;

	public BalanceNotEnoughException(String reason) {
		super(reason);
	}
}