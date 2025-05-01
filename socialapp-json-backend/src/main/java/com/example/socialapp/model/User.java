package com.example.socialapp.model;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class User {
    private Long id;
    @NotBlank
    private String username;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String passwordHash;
    private String displayName;
    private String bio;
}
