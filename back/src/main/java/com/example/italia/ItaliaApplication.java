package com.example.italia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;


@SpringBootApplication
public class ItaliaApplication {
    public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().load();
        System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET")); // Charge JWT_SECRET dans les propriétés système
        SpringApplication.run(ItaliaApplication.class, args);
    }
}

