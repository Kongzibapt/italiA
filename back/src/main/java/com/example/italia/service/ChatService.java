package com.example.italia.service;

import com.example.italia.model.Chat;
import com.example.italia.model.ChatMessage;
import com.example.italia.repository.ChatMessageRepository;
import com.example.italia.repository.ChatRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public Chat createChat(Long userId, String lessonId) {
        Chat chat = new Chat();
        // Configurer le chat
        return chatRepository.save(chat);
    }

    public ChatMessage addMessage(
        Long chatId,
        String senderId,
        String content
    ) {
        ChatMessage message = new ChatMessage();
        // Configurer le message
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getChatMessages(Long chatId) {
        return chatMessageRepository.findByChatIdOrderByTimestampAsc(chatId);
    }

    public List<Chat> getUserChats(Long userId) {
        return chatRepository.findByUserId(userId);
    }
}
