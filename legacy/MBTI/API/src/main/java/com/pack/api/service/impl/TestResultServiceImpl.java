package com.pack.api.service.impl;

import com.pack.api.dto.TestResultDTO;
import com.pack.api.model.TestResult;
import com.pack.api.repository.TestResultRepository;
import com.pack.api.repository.TestTakerRepository;
import com.pack.api.repository.TestScheduleRepository;
import com.pack.api.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TestResultServiceImpl implements TestResultService {

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private TestTakerRepository testTakerRepository;

    @Autowired
    private TestScheduleRepository testScheduleRepository;

    @Override
    public TestResult createTestResult(TestResultDTO testResultDTO) {
        TestResult testResult = new TestResult();
        testResult.setTestTaker(testTakerRepository.findById(testResultDTO.getTestTakerId()).orElse(null));
        testResult.setTestSchedule(testScheduleRepository.findById(testResultDTO.getTestScheduleId()).orElse(null));
        testResult.setPersonalityType(testResultDTO.getPersonalityType());
        testResult.setAnalysis(testResultDTO.getAnalysis());
        testResult.setCareerRecommendation(testResultDTO.getCareerRecommendation());
        testResult.setScore(testResultDTO.getScore());
        testResult.setCompleted(testResultDTO.isCompleted());
        if (testResultDTO.isCompleted()) {
            testResult.setCompletedAt(new Date());
        }
        return testResultRepository.save(testResult);
    }

    @Override
    public TestResult updateTestResult(Long id, TestResultDTO testResultDTO) {
        Optional<TestResult> optionalTestResult = testResultRepository.findById(id);
        if (optionalTestResult.isPresent()) {
            TestResult testResult = optionalTestResult.get();
            testResult.setTestTaker(testTakerRepository.findById(testResultDTO.getTestTakerId()).orElse(null));
            testResult.setTestSchedule(testScheduleRepository.findById(testResultDTO.getTestScheduleId()).orElse(null));
            testResult.setPersonalityType(testResultDTO.getPersonalityType());
            testResult.setAnalysis(testResultDTO.getAnalysis());
            testResult.setCareerRecommendation(testResultDTO.getCareerRecommendation());
            testResult.setScore(testResultDTO.getScore());
            testResult.setCompleted(testResultDTO.isCompleted());
            if (testResultDTO.isCompleted() && testResult.getCompletedAt() == null) {
                testResult.setCompletedAt(new Date());
            }
            return testResultRepository.save(testResult);
        }
        return null;
    }

    @Override
    public TestResult getTestResultById(Long id) {
        return testResultRepository.findById(id).orElse(null);
    }

    @Override
    public List<TestResult> getAllTestResults() {
        return testResultRepository.findAll();
    }

    @Override
    public List<TestResult> getTestResultsByTestTaker(Long testTakerId) {
        return testResultRepository.findByTestTakerId(testTakerId);
    }

    @Override
    public List<TestResult> getTestResultsByTestSchedule(Long testScheduleId) {
        return testResultRepository.findByTestScheduleId(testScheduleId);
    }

    @Override
    public void deleteTestResult(Long id) {
        testResultRepository.deleteById(id);
    }
}