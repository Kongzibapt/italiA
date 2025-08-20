package com.example.italia.dto;

import com.example.italia.model.LessonProgress;
import java.time.LocalDateTime;

public class LessonProgressDTO {

    private Long id;
    private Long userId;
    private String subLessonId;
    private LessonProgress.MasteryLevel masteryLevel;
    private LocalDateTime lastUpdated;

    public static LessonProgressDTO fromEntity(LessonProgress entity) {
        LessonProgressDTO dto = new LessonProgressDTO();
        dto.id = entity.getId();
        dto.userId = entity.getUserId();
        dto.subLessonId = entity.getSubLessonId();
        dto.masteryLevel = entity.getMasteryLevel();
        dto.lastUpdated = entity.getLastUpdated();
        return dto;
    }
}
