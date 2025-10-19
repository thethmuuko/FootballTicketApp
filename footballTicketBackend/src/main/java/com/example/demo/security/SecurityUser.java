package com.example.demo.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.entity.User;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SecurityUser implements UserDetails {
	private static final long serialVersionUID = 1L;
	private final User user;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.user.getRoles()
				.stream()
				.map(r -> new SimpleGrantedAuthority(r.getRoleName())).toList();
	}

	@Override
	public String getPassword() {
		return this.user.getPassword();
	}

	@Override
	public String getUsername() {
		return this.user.getEmail();
	}
	
	
}
