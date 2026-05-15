package com.pack.api.service;

import com.pack.api.dto.TestResultDTO;
import com.pack.api.model.TestResult;
import java.util.List;

public interface TestResultService {
    TestResult createTestResult(TestResultDTO testResultDTO);
    TestResult updateTestResult(Long id, TestResultDTO testResultDTO);
    TestResult getTestResultById(Long id);
    List<TestResult> getAllTestResults();
    List<TestResult> getTestResultsByTestTaker(Long testTakerId);
    List<TestResult> getTestResultsByTestSchedule(Long testScheduleId);
    void deleteTestResult(Long id);
}