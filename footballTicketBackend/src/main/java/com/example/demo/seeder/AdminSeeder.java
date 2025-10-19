package com.example.demo.seeder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.dao.PaymentDao;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.PaymentAccount;
import com.example.demo.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminSeeder {
	private final UserDao userDao;
	private final PaymentDao paymentDao;
	private final PasswordEncoder passwordEncoder;
	
	public void seedAdmin() {
		if (paymentDao.count() > 0 && userDao.count() > 0) {
			return;
		}
		
		User user = new User("admin@gmail.com", passwordEncoder.encode("admin12345"), "", "");
		PaymentAccount paymentAccount = new PaymentAccount("owner", "owner12345", "John", "Smith");
		paymentAccount.setUser(user);
		userDao.save(user);
		paymentDao.save(paymentAccount);
	}
}
