package com.example.italia.controller;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.italia.model.User;
import com.example.italia.repository.UserRepository;
import com.example.italia.service.UserService;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Permet les requêtes depuis ton frontend
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    Dotenv dotenv = Dotenv.load();
    private String secretKey = dotenv.get("JWT_SECRET");

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        Key hmacKey = new SecretKeySpec(
            secretKey.getBytes(StandardCharsets.UTF_8), // Utilise la clé secrète existante
            SignatureAlgorithm.HS256.getJcaName() // Algorithme JCA
        );

        try {
            User registeredUser = userService.registerUser(user);

            // Génère un token JWT pour l'utilisateur inscrit
            String token = Jwts.builder()
                    .setSubject(registeredUser.getEmail())
                    .signWith(hmacKey)
                    .compact();

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("email", registeredUser.getEmail());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        Key hmacKey = new SecretKeySpec(
            secretKey.getBytes(StandardCharsets.UTF_8), // Utilise la clé secrète existante
            SignatureAlgorithm.HS256.getJcaName() // Algorithme JCA
        );

        // Vérifie les informations de connexion
        User existingUser = userRepository.findByEmail(user.getEmail())
        .orElseThrow(() -> new RuntimeException("User not found"));

        if (userService.authenticate(user.getPassword(), existingUser.getPassword())) {
            // Génère le JWT
            String token = Jwts.builder()
                    .setSubject(existingUser.getEmail())
                    .signWith(hmacKey)
                    .compact();

            return ResponseEntity.ok(Collections.singletonMap("token", token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

}
