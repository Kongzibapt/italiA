package com.example.italia.dto;

import com.example.italia.model.VocabularyWord;
import com.example.italia.model.VocabularyWord.Status;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class VocabularyWordDTO {

    private Long id;
    private String french;
    private String italian;
    private Status status;
    private LocalDateTime lastRevised;
    private Integer masteredTimes;

    // autres champs nécessaires sans la référence au user

    // Constructeur par défaut nécessaire pour Jackson
    public VocabularyWordDTO() {}

    public VocabularyWordDTO(VocabularyWord word) {
        this.id = word.getId();
        this.french = word.getFrench();
        this.italian = word.getItalian();
        this.status = word.getStatus();
        this.lastRevised = word.getLastRevised();
        this.masteredTimes = word.getMasteredTimes();
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

    public Status getStatus() {
        return status;
    }

    public LocalDateTime getLastRevised() {
        return lastRevised;
    }

    public Integer getMasteredTimes() {
        return masteredTimes;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFrench(String french) {
        this.french = french;
    }

    public void setItalian(String italian) {
        this.italian = italian;
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
}
