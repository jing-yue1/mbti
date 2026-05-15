package com.pack.api.dto;

import lombok.Data;
import java.util.Date;

@Data
public class BatchDTO {
    private Long id;
    private String name;
    private String description;
    private Date startDate;
    private Date endDate;
    private boolean active;
}