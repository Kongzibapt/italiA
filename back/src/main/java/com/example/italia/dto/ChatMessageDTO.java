package com.example.italia.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ChatMessageDTO {

    private Long id;
    private String sender;
    private String content;
    private LocalDateTime timestamp;
}
