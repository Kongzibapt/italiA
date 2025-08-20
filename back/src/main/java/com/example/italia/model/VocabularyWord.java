package com.example.italia.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "vocabulary_words")
public class VocabularyWord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String italian;

    @Column(nullable = false)
    private String french;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime lastRevised;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer masteredTimes;

    private boolean isRetrograded;

    public VocabularyWord() {
        this.status = Status.NOT_LEARNED;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.masteredTimes = 0;
        this.isRetrograded = false;
    }

    public enum Status {
        NOT_LEARNED,
        PARTIALLY_LEARNED,
        WELL_LEARNED,
    }

    public Long getId() {
        return id;
    }

    public String getItalian() {
        return italian;
    }

    public String getFrench() {
        return french;
    }

    public User getUser() {
        return user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public Status getStatus() {
        return status;
    }

    public LocalDateTime getLastRevised() {
        return lastRevised;
    }

    public Integer getMasteredTimes() {
        return masteredTimes;
    }

    public boolean isRetrograded() {
        return isRetrograded;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setItalian(String italian) {
        this.italian = italian;
    }

    public void setFrench(String french) {
        this.french = french;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setLastRevised(LocalDateTime lastRevised) {
        this.lastRevised = lastRevised;
    }

    public void setMasteredTimes(Integer masteredTimes) {
        this.masteredTimes = masteredTimes;
    }

    public void setRetrograded(boolean retrograded) {
        isRetrograded = retrograded;
    }
}
