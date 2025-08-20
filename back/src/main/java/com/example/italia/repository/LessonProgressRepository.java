package com.example.italia.repository;

import com.example.italia.model.LessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {
    List<LessonProgress> findByUserId(Long userId);

    Optional<LessonProgress> findByUserIdAndSubLessonId(Long userId, String subLessonId);

    boolean existsByUserIdAndSubLessonId(Long userId, String subLessonId);
}