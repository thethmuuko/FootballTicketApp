package com.example.demo.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtGenerater {
	@Value("${jwt.secret}")
	private String jwtKey;
	@Value("${jwt.access.expiration}")
	private long jwtAccessTokenExpiration;
	@Value("${jwt.refresh.expiration}")
	private long jwtRefreshTokenExpiration;
	private SecretKey key;
	
	@PostConstruct
	public void init() {
	    this.key = Keys.hmacShaKeyFor(jwtKey.getBytes(StandardCharsets.UTF_8));
	}
	
	public String getUserNameFromToken(String token) {
		Claims claims=Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
		return claims.getSubject();
	}
	
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parse(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
	
	public String generateToken(String username) {
		Date currentDate=new Date();
		Date expirationDate = new Date(currentDate.getTime()+
				jwtAccessTokenExpiration);
		String token = Jwts.builder()
				.subject(username)
				.issuedAt(new Date())
				.expiration(expirationDate)
				.signWith(key)
				.compact();
		
		return token;
	}
	
    public String generateRefreshToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtRefreshTokenExpiration);

        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }
	
}