package com.example.socialapp.model;

import lombok.Data;
import java.time.Instant;
import java.util.List;

@Data
public class Post {
    private Long id;
    private Long userId;
    private String content;
    private List<Media> media;
    private Instant createdAt;
}
