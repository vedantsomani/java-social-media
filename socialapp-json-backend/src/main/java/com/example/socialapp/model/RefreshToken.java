package com.example.socialapp.model;

import lombok.Data;
import java.time.Instant;

@Data
public class RefreshToken {
    private Long id;
    private Long userId;
    private String token;
    private Instant issuedAt;
    private Instant expiresAt;
}
