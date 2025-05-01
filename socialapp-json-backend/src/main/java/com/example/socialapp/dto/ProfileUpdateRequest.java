package com.example.socialapp.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String displayName;
    private String bio;
}
