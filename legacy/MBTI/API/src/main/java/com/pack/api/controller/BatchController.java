package com.pack.api.controller;

import com.pack.api.dto.BatchDTO;
import com.pack.api.model.Batch;
import com.pack.api.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
public class BatchController {

    @Autowired
    private BatchService batchService;

    @PostMapping
    public ResponseEntity<Batch> createBatch(@RequestBody BatchDTO batchDTO) {
        Batch batch = batchService.createBatch(batchDTO);
        return new ResponseEntity<>(batch, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Batch> updateBatch(@PathVariable Long id, @RequestBody BatchDTO batchDTO) {
        Batch batch = batchService.updateBatch(id, batchDTO);
        return batch != null ? ResponseEntity.ok(batch) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Batch> getBatchById(@PathVariable Long id) {
        Batch batch = batchService.getBatchById(id);
        return batch != null ? ResponseEntity.ok(batch) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Batch>> getAllBatches() {
        List<Batch> batches = batchService.getAllBatches();
        return ResponseEntity.ok(batches);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBatch(@PathVariable Long id) {
        batchService.deleteBatch(id);
        return ResponseEntity.noContent().build();
    }
}