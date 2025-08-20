package com.example.italia.controller;

import com.example.italia.dto.LessonProgressDTO;
import com.example.italia.model.LessonProgress;
import com.example.italia.service.LessonProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/lesson-progress")
public class LessonProgressController {

    @Autowired
    private LessonProgressService lessonProgressService;

    @PutMapping("/{userId}/{subLessonId}")
    public ResponseEntity<LessonProgressDTO> updateProgress(
            @PathVariable Long userId,
            @PathVariable String subLessonId,
            @RequestParam LessonProgress.MasteryLevel level) {
        return ResponseEntity.ok(lessonProgressService.updateProgress(userId, subLessonId, level));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, LessonProgressDTO>> getUserProgress(
            @PathVariable Long userId) {
        return ResponseEntity.ok(lessonProgressService.getUserProgress(userId));
    }
} 