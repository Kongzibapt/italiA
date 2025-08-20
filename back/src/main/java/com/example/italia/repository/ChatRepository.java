package com.example.italia.repository;

import com.example.italia.model.Chat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByUserId(Long userId);
    List<Chat> findByUserIdAndLessonId(Long userId, String lessonId);
}
