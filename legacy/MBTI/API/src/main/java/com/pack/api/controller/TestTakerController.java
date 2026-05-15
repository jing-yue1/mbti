package com.pack.api.controller;

import com.pack.api.dto.TestTakerDTO;
import com.pack.api.model.TestTaker;
import com.pack.api.service.TestTakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-takers")
public class TestTakerController {

    @Autowired
    private TestTakerService testTakerService;

    @PostMapping
    public ResponseEntity<TestTaker> createTestTaker(@RequestBody TestTakerDTO testTakerDTO) {
        TestTaker testTaker = testTakerService.createTestTaker(testTakerDTO);
        return new ResponseEntity<>(testTaker, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestTaker> updateTestTaker(@PathVariable Long id, @RequestBody TestTakerDTO testTakerDTO) {
        TestTaker testTaker = testTakerService.updateTestTaker(id, testTakerDTO);
        return testTaker != null ? ResponseEntity.ok(testTaker) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestTaker> getTestTakerById(@PathVariable Long id) {
        TestTaker testTaker = testTakerService.getTestTakerById(id);
        return testTaker != null ? ResponseEntity.ok(testTaker) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<TestTaker>> getAllTestTakers() {
        List<TestTaker> testTakers = testTakerService.getAllTestTakers();
        return ResponseEntity.ok(testTakers);
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<TestTaker>> getTestTakersByBatch(@PathVariable Long batchId) {
        List<TestTaker> testTakers = testTakerService.getTestTakersByBatch(batchId);
        return ResponseEntity.ok(testTakers);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestTaker(@PathVariable Long id) {
        testTakerService.deleteTestTaker(id);
        return ResponseEntity.noContent().build();
    }
}