package com.example.socialapp.model;

import lombok.Data;
import java.time.Instant;

@Data
public class Comment {
    private Long id;
    private Long userId;
    private Long postId;
    private String content;
    private Instant createdAt;
}
