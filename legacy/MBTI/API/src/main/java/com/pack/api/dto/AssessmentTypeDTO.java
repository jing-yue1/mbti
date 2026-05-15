package com.pack.api.dto;

import lombok.Data;

@Data
public class AssessmentTypeDTO {
    private Long id;
    private String name;
    private String description;
    private boolean active;
}