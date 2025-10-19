package com.example.demo.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.httpBasic(c -> {
			c.authenticationEntryPoint(new JwtAuthenticationEntryPoint());
		});
		http.csrf(c -> c.disable());
		http.cors(c -> {
			CorsConfigurationSource configurationSource = new CorsConfigurationSource() {
				
				@Override
				public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
					CorsConfiguration config=
							new CorsConfiguration();
					config.setAllowedOrigins(List.of("http://localhost:5173"));
					config.setAllowedMethods(List.of("*"));
					config.setAllowedHeaders(List.of("*"));
					config.addExposedHeader("*");
					config.setAllowCredentials(true);
					return config;
				}
			};
			c.configurationSource(configurationSource);
		});
		
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		http.authorizeHttpRequests(c -> {
			c.requestMatchers("/api/auth/**").permitAll();
			c.anyRequest().authenticated();
		});
		return http.build();
	}
}