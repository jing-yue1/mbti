package com.pack.api.service.impl;

import com.pack.api.dto.TestTakerDTO;
import com.pack.api.model.TestTaker;
import com.pack.api.repository.TestTakerRepository;
import com.pack.api.repository.BatchRepository;
import com.pack.api.service.TestTakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestTakerServiceImpl implements TestTakerService {

    @Autowired
    private TestTakerRepository testTakerRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Override
    public TestTaker createTestTaker(TestTakerDTO testTakerDTO) {
        TestTaker testTaker = new TestTaker();
        testTaker.setName(testTakerDTO.getName());
        testTaker.setEmail(testTakerDTO.getEmail());
        testTaker.setPhone(testTakerDTO.getPhone());
        testTaker.setDepartment(testTakerDTO.getDepartment());
        testTaker.setPosition(testTakerDTO.getPosition());
        testTaker.setBatch(batchRepository.findById(testTakerDTO.getBatchId()).orElse(null));
        return testTakerRepository.save(testTaker);
    }

    @Override
    public TestTaker updateTestTaker(Long id, TestTakerDTO testTakerDTO) {
        Optional<TestTaker> optionalTestTaker = testTakerRepository.findById(id);
        if (optionalTestTaker.isPresent()) {
            TestTaker testTaker = optionalTestTaker.get();
            testTaker.setName(testTakerDTO.getName());
            testTaker.setEmail(testTakerDTO.getEmail());
            testTaker.setPhone(testTakerDTO.getPhone());
            testTaker.setDepartment(testTakerDTO.getDepartment());
            testTaker.setPosition(testTakerDTO.getPosition());
            testTaker.setBatch(batchRepository.findById(testTakerDTO.getBatchId()).orElse(null));
            return testTakerRepository.save(testTaker);
        }
        return null;
    }

    @Override
    public TestTaker getTestTakerById(Long id) {
        return testTakerRepository.findById(id).orElse(null);
    }

    @Override
    public List<TestTaker> getAllTestTakers() {
        return testTakerRepository.findAll();
    }

    @Override
    public List<TestTaker> getTestTakersByBatch(Long batchId) {
        return testTakerRepository.findByBatchId(batchId);
    }

    @Override
    public void deleteTestTaker(Long id) {
        testTakerRepository.deleteById(id);
    }
}