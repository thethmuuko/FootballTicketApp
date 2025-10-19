package com.example.demo.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
    private static final long serialVersionUID = 6743305291260288574L;

	public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
