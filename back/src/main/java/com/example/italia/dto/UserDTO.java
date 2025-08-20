package com.example.italia.dto;

import com.example.italia.model.User;

public class UserDTO {
    private Long id;
    private String email;

    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
    }

    public User toUser() {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        return user;
    }
}
