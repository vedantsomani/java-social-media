package com.example.socialapp.model;

import lombok.Data;
import java.time.Instant;

@Data
public class Follow {
    private Long followerId;
    private Long followeeId;
    private Instant createdAt;
}
