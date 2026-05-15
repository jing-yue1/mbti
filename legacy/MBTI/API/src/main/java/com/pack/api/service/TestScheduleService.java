package com.pack.api.service;

import com.pack.api.dto.TestScheduleDTO;
import com.pack.api.model.TestSchedule;
import java.util.List;

public interface TestScheduleService {
    TestSchedule createTestSchedule(TestScheduleDTO testScheduleDTO);
    TestSchedule updateTestSchedule(Long id, TestScheduleDTO testScheduleDTO);
    TestSchedule getTestScheduleById(Long id);
    List<TestSchedule> getAllTestSchedules();
    List<TestSchedule> getTestSchedulesByBatch(Long batchId);
    void deleteTestSchedule(Long id);
}