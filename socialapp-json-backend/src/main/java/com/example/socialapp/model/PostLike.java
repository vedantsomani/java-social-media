package com.example.socialapp.model;

import lombok.Data;
import java.time.Instant;

@Data
public class PostLike {
    private Long userId;
    private Long postId;
    private Instant createdAt;
}
