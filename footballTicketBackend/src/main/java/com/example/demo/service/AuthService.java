package com.example.demo.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dao.RoleDao;
import com.example.demo.dao.UserDao;
import com.example.demo.dto.LoginDto;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterDto;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.EmailAlreadyExistException;
import com.example.demo.security.JwtGenerater;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final UserDao userDao;
	private final RoleDao roleDao;
	private final JwtGenerater jwtGenerater;
	
	public String register(RegisterDto registerDto) {
		if (userDao.findByEmail(registerDto.email()).isPresent()) {
			throw new EmailAlreadyExistException("Email Already Exist");
		}
		User user = new User(registerDto.email(), passwordEncoder.encode(registerDto.password()), registerDto.firstName(), registerDto.lastName());
		roleDao.findByRoleName("ROLE_USER").ifPresentOrElse((r) -> {
			user.addRole(r);
			this.userDao.saveAndFlush(user);
		}, () -> {
			Role role = new Role();
			role.setRoleName("ROLE_USER");
			roleDao.save(role);
			user.addRole(role);
			this.userDao.saveAndFlush(user);
		});
		return "Register successfully";
	}
	
	public LoginResponse login(LoginDto loginDto) {
		var usernamePasswordToken = new UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password());
		Authentication authentication = authenticationManager.authenticate(usernamePasswordToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		StringBuilder stringBuilder = new StringBuilder();
		for (GrantedAuthority ga : authentication.getAuthorities()) {
			stringBuilder.append(ga.getAuthority());
		}
		String token = jwtGenerater.generateToken(authentication.getName());
		return new LoginResponse(token, stringBuilder.toString());
	}
}
