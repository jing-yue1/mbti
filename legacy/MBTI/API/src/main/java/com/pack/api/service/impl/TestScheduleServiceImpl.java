package com.pack.api.service.impl;

import com.pack.api.dto.TestScheduleDTO;
import com.pack.api.model.TestSchedule;
import com.pack.api.repository.TestScheduleRepository;
import com.pack.api.repository.BatchRepository;
import com.pack.api.repository.AssessmentTypeRepository;
import com.pack.api.service.TestScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestScheduleServiceImpl implements TestScheduleService {

    @Autowired
    private TestScheduleRepository testScheduleRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private AssessmentTypeRepository assessmentTypeRepository;

    @Override
    public TestSchedule createTestSchedule(TestScheduleDTO testScheduleDTO) {
        TestSchedule testSchedule = new TestSchedule();
        testSchedule.setBatch(batchRepository.findById(testScheduleDTO.getBatchId()).orElse(null));
        testSchedule.setAssessmentType(assessmentTypeRepository.findById(testScheduleDTO.getAssessmentTypeId()).orElse(null));
        testSchedule.setStartTime(testScheduleDTO.getStartTime());
        testSchedule.setEndTime(testScheduleDTO.getEndTime());
        testSchedule.setLocation(testScheduleDTO.getLocation());
        testSchedule.setActive(testScheduleDTO.isActive());
        return testScheduleRepository.save(testSchedule);
    }

    @Override
    public TestSchedule updateTestSchedule(Long id, TestScheduleDTO testScheduleDTO) {
        Optional<TestSchedule> optionalTestSchedule = testScheduleRepository.findById(id);
        if (optionalTestSchedule.isPresent()) {
            TestSchedule testSchedule = optionalTestSchedule.get();
            testSchedule.setBatch(batchRepository.findById(testScheduleDTO.getBatchId()).orElse(null));
            testSchedule.setAssessmentType(assessmentTypeRepository.findById(testScheduleDTO.getAssessmentTypeId()).orElse(null));
            testSchedule.setStartTime(testScheduleDTO.getStartTime());
            testSchedule.setEndTime(testScheduleDTO.getEndTime());
            testSchedule.setLocation(testScheduleDTO.getLocation());
            testSchedule.setActive(testScheduleDTO.isActive());
            return testScheduleRepository.save(testSchedule);
        }
        return null;
    }

    @Override
    public TestSchedule getTestScheduleById(Long id) {
        return testScheduleRepository.findById(id).orElse(null);
    }

    @Override
    public List<TestSchedule> getAllTestSchedules() {
        return testScheduleRepository.findAll();
    }

    @Override
    public List<TestSchedule> getTestSchedulesByBatch(Long batchId) {
        return testScheduleRepository.findByBatchIdAndActiveTrue(batchId);
    }

    @Override
    public void deleteTestSchedule(Long id) {
        testScheduleRepository.deleteById(id);
    }
}