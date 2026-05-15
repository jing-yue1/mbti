package com.pack.api.controller;

import com.pack.api.dto.TestResultDTO;
import com.pack.api.model.TestResult;
import com.pack.api.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-results")
public class TestResultController {

    @Autowired
    private TestResultService testResultService;

    @PostMapping
    public ResponseEntity<TestResult> createTestResult(@RequestBody TestResultDTO testResultDTO) {
        TestResult testResult = testResultService.createTestResult(testResultDTO);
        return new ResponseEntity<>(testResult, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestResult> updateTestResult(@PathVariable Long id, @RequestBody TestResultDTO testResultDTO) {
        TestResult testResult = testResultService.updateTestResult(id, testResultDTO);
        return testResult != null ? ResponseEntity.ok(testResult) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestResult> getTestResultById(@PathVariable Long id) {
        TestResult testResult = testResultService.getTestResultById(id);
        return testResult != null ? ResponseEntity.ok(testResult) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<TestResult>> getAllTestResults() {
        List<TestResult> testResults = testResultService.getAllTestResults();
        return ResponseEntity.ok(testResults);
    }

    @GetMapping("/test-taker/{testTakerId}")
    public ResponseEntity<List<TestResult>> getTestResultsByTestTaker(@PathVariable Long testTakerId) {
        List<TestResult> testResults = testResultService.getTestResultsByTestTaker(testTakerId);
        return ResponseEntity.ok(testResults);
    }

    @GetMapping("/test-schedule/{testScheduleId}")
    public ResponseEntity<List<TestResult>> getTestResultsByTestSchedule(@PathVariable Long testScheduleId) {
        List<TestResult> testResults = testResultService.getTestResultsByTestSchedule(testScheduleId);
        return ResponseEntity.ok(testResults);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestResult(@PathVariable Long id) {
        testResultService.deleteTestResult(id);
        return ResponseEntity.noContent().build();
    }
}