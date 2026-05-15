package com.pack.api.dto;

import lombok.Data;

@Data
public class QuestionDTO {
    private Long id;
    private String content;
    private Long dimensionId;
    private Long assessmentTypeId;
    private int orderIndex;
    private boolean active;
}