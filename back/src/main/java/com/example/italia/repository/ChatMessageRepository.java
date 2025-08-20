package com.example.italia.repository;

import com.example.italia.model.ChatMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository
    extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatIdOrderByTimestampAsc(Long chatId);
}
