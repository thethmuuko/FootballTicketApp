package com.example.demo.exception;

public class EmailAlreadyExistException extends RuntimeException {
    private static final long serialVersionUID = 6743305291260288574L;

	public EmailAlreadyExistException(String message) {
        super(message);
    }
}
