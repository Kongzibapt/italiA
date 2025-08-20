package com.example.italia.dto;

import java.util.List;
import lombok.Data;

@Data
public class ChatDTO {

    private Long id;
    private Long userId;
    private String lessonId;
    private List<ChatMessageDTO> messages;
}
