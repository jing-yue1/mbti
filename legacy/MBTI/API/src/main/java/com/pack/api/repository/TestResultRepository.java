package com.pack.api.repository;

import com.pack.api.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    List<TestResult> findByTestTakerId(Long testTakerId);
    List<TestResult> findByTestScheduleId(Long testScheduleId);
    TestResult findByTestTakerIdAndTestScheduleId(Long testTakerId, Long testScheduleId);
}