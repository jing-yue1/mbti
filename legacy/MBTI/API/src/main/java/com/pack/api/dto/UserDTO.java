package com.pack.api.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String name;
    private String email;
    private String role;
    private boolean active;
}