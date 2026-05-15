package com.pack.api.dto;

import lombok.Data;

@Data
public class TestTakerDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String department;
    private String position;
    private Long batchId;
}