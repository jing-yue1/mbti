package com.pack.api.dto;

import lombok.Data;
import java.util.Date;

@Data
public class TestScheduleDTO {
    private Long id;
    private Long batchId;
    private Long assessmentTypeId;
    private Date startTime;
    private Date endTime;
    private String location;
    private boolean active;
}