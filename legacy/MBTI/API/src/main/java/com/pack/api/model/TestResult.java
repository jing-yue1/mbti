package com.pack.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Data
@Entity
@Table(name = "test_results")
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "test_taker_id", nullable = false)
    private TestTaker testTaker;
    
    @ManyToOne
    @JoinColumn(name = "test_schedule_id", nullable = false)
    private TestSchedule testSchedule;
    
    @Column(nullable = false)
    private String personalityType; // MBTI类型，如ISTJ
    
    @Column(columnDefinition = "text")
    private String analysis;
    
    @Column(columnDefinition = "text")
    private String careerRecommendation;
    
    @Column(nullable = false)
    private int score;
    
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean completed;
    
    @Column(name = "completed_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date completedAt;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}