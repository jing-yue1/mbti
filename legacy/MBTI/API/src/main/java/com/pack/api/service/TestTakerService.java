package com.pack.api.service;

import com.pack.api.dto.TestTakerDTO;
import com.pack.api.model.TestTaker;
import java.util.List;

public interface TestTakerService {
    TestTaker createTestTaker(TestTakerDTO testTakerDTO);
    TestTaker updateTestTaker(Long id, TestTakerDTO testTakerDTO);
    TestTaker getTestTakerById(Long id);
    List<TestTaker> getAllTestTakers();
    List<TestTaker> getTestTakersByBatch(Long batchId);
    void deleteTestTaker(Long id);
}