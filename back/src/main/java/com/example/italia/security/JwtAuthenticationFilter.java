package com.example.italia.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Collections;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.italia.dto.UserDTO;
import com.example.italia.model.User;
import com.example.italia.repository.UserRepository;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserRepository userRepository;

    Dotenv dotenv = Dotenv.load();
    private String secretKey = dotenv.get("JWT_SECRET");

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain)
            throws java.io.IOException, jakarta.servlet.ServletException {

        Key hmacKey = new SecretKeySpec(
            secretKey.getBytes(StandardCharsets.UTF_8), // Utilise la clé secrète existante
            SignatureAlgorithm.HS256.getJcaName() // Algorithme JCA
        );
        
        String token = request.getHeader("Authorization");


        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try {
                Claims claims = Jwts.parserBuilder()
                    .setSigningKey(hmacKey) // Définit la clé de signature
                    .build() // Construit le parser
                    .parseClaimsJws(token) // Analyse le JWT
                    .getBody();

               String email = claims.getSubject();
                User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
                UserDTO userDTO = new UserDTO(user);
                
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                        userDTO,
                        null,
                        Collections.emptyList()
                    );
                
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                System.out.println("JWT invalid : " + e.getMessage());
                e.printStackTrace();
            }
        }

        filterChain.doFilter(request, response);
    }
}
