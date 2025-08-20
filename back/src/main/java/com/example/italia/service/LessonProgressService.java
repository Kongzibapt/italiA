package com.example.italia.service;

import com.example.italia.dto.LessonProgressDTO;
import com.example.italia.model.LessonProgress;
import com.example.italia.repository.LessonProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LessonProgressService {

    @Autowired
    private LessonProgressRepository lessonProgressRepository;

    @Transactional
    public LessonProgressDTO updateProgress(Long userId, String subLessonId, LessonProgress.MasteryLevel level) {
        LessonProgress progress = lessonProgressRepository
            .findByUserIdAndSubLessonId(userId, subLessonId)
            .orElse(new LessonProgress());

        progress.setUserId(userId);
        progress.setSubLessonId(subLessonId);
        progress.setMasteryLevel(level);

        return LessonProgressDTO.fromEntity(lessonProgressRepository.save(progress));
    }

    public Map<String, LessonProgressDTO> getUserProgress(Long userId) {
        List<LessonProgress> progressList = lessonProgressRepository.findByUserId(userId);
        return progressList.stream()
            .collect(Collectors.toMap(
                LessonProgress::getSubLessonId,
                LessonProgressDTO::fromEntity
            ));
    }
} 