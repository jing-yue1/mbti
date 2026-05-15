package com.pack.api.dto;

import lombok.Data;
import java.util.Date;

@Data
public class TestResultDTO {
    private Long id;
    private Long testTakerId;
    private Long testScheduleId;
    private String personalityType;
    private String analysis;
    private String careerRecommendation;
    private int score;
    private boolean completed;
    private Date completedAt;
}