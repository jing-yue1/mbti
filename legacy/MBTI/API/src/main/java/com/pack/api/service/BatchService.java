package com.pack.api.service;

import com.pack.api.dto.BatchDTO;
import com.pack.api.model.Batch;
import java.util.List;

public interface BatchService {
    Batch createBatch(BatchDTO batchDTO);
    Batch updateBatch(Long id, BatchDTO batchDTO);
    Batch getBatchById(Long id);
    List<Batch> getAllBatches();
    void deleteBatch(Long id);
}