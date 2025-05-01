package com.example.socialapp.model;

import lombok.Data;
import java.time.Instant;
import java.util.List;

@Data
public class Story {
    private Long id;
    private Long userId;
    private List<Media> media;
    private Instant createdAt;
    private Instant expiresAt;
}
