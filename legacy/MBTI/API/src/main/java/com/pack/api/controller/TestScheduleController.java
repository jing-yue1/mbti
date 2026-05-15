package com.pack.api.controller;

import com.pack.api.dto.TestScheduleDTO;
import com.pack.api.model.TestSchedule;
import com.pack.api.service.TestScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-schedules")
public class TestScheduleController {

    @Autowired
    private TestScheduleService testScheduleService;

    @PostMapping
    public ResponseEntity<TestSchedule> createTestSchedule(@RequestBody TestScheduleDTO testScheduleDTO) {
        TestSchedule testSchedule = testScheduleService.createTestSchedule(testScheduleDTO);
        return new ResponseEntity<>(testSchedule, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestSchedule> updateTestSchedule(@PathVariable Long id, @RequestBody TestScheduleDTO testScheduleDTO) {
        TestSchedule testSchedule = testScheduleService.updateTestSchedule(id, testScheduleDTO);
        return testSchedule != null ? ResponseEntity.ok(testSchedule) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestSchedule> getTestScheduleById(@PathVariable Long id) {
        TestSchedule testSchedule = testScheduleService.getTestScheduleById(id);
        return testSchedule != null ? ResponseEntity.ok(testSchedule) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<TestSchedule>> getAllTestSchedules() {
        List<TestSchedule> testSchedules = testScheduleService.getAllTestSchedules();
        return ResponseEntity.ok(testSchedules);
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<TestSchedule>> getTestSchedulesByBatch(@PathVariable Long batchId) {
        List<TestSchedule> testSchedules = testScheduleService.getTestSchedulesByBatch(batchId);
        return ResponseEntity.ok(testSchedules);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestSchedule(@PathVariable Long id) {
        testScheduleService.deleteTestSchedule(id);
        return ResponseEntity.noContent().build();
    }
}