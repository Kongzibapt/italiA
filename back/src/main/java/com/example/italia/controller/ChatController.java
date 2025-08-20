package com.example.italia.controller;

import com.example.italia.dto.ChatDTO;
import com.example.italia.dto.ChatMessageDTO;
import com.example.italia.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<?> createChat(@RequestBody ChatDTO chatDTO) {
        // Logique de création
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{chatId}/messages")
    public ResponseEntity<?> addMessage(
        @PathVariable Long chatId,
        @RequestBody ChatMessageDTO messageDTO
    ) {
        // Logique d'ajout de message
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{chatId}/messages")
    public ResponseEntity<?> getChatMessages(@PathVariable Long chatId) {
        // Logique de récupération des messages
        return ResponseEntity.ok().build();
    }
}
