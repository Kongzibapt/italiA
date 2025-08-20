package com.example.italia.dto;

import java.util.List;
import lombok.Data;

@Data
public class QuestionDTO {

    private Long wordId;
    private String italian;
    private String french;
    private List<String> options;

    public void setWordId(Long wordId) {
        this.wordId = wordId;
    }

    public void setItalian(String italian) {
        this.italian = italian;
    }

    public void setFrench(String french) {
        this.french = french;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }
}
