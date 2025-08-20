package com.example.italia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.italia.model.User;
import com.example.italia.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        // Vérifier si l'email existe déjà
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already used !");
        }

        // Hache le mot de passe
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        // Enregistrer l'utilisateur
        return userRepository.save(user);
    }

    public boolean authenticate(CharSequence rawPassword, String encodedPassword) {
        // Vérifie si le mot de passe correspond
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    
}
