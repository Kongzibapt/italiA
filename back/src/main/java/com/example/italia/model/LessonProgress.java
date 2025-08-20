package com.example.italia.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lesson_progress")
public class LessonProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "sub_lesson_id", nullable = false)
    private String subLessonId;

    @Enumerated(EnumType.STRING)
    @Column(name = "mastery_level", nullable = false)
    private MasteryLevel masteryLevel;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    public enum MasteryLevel {
        NOT_LEARNED,
        PARTIALLY_LEARNED,
        WELL_LEARNED,
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getSubLessonId() {
        return subLessonId;
    }

    public MasteryLevel getMasteryLevel() {
        return masteryLevel;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setSubLessonId(String subLessonId) {
        this.subLessonId = subLessonId;
    }

    public void setMasteryLevel(MasteryLevel masteryLevel) {
        this.masteryLevel = masteryLevel;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public void setMasteryLevel(String masteryLevel) {
        this.masteryLevel = MasteryLevel.valueOf(masteryLevel);
    }
}
