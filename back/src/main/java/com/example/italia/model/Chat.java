package com.example.italia.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "chats")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "lesson_id", nullable = false)
    private String lessonId;

    @OneToMany(
        mappedBy = "chat",
        cascade = CascadeType.ALL,
        fetch = FetchType.LAZY
    )
    private List<ChatMessage> messages;

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getLessonId() {
        return lessonId;
    }

    public List<ChatMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessage> messages) {
        this.messages = messages;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }
}
