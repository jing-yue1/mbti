package com.pack.api.repository;

import com.pack.api.model.TestSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestScheduleRepository extends JpaRepository<TestSchedule, Long> {
    List<TestSchedule> findByBatchIdAndActiveTrue(Long batchId);
    List<TestSchedule> findByAssessmentTypeIdAndActiveTrue(Long assessmentTypeId);
}