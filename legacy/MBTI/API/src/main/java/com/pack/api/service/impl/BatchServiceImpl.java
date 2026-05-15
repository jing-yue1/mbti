package com.pack.api.service.impl;

import com.pack.api.dto.BatchDTO;
import com.pack.api.model.Batch;
import com.pack.api.repository.BatchRepository;
import com.pack.api.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatchServiceImpl implements BatchService {

    @Autowired
    private BatchRepository batchRepository;

    @Override
    public Batch createBatch(BatchDTO batchDTO) {
        Batch batch = new Batch();
        batch.setName(batchDTO.getName());
        batch.setDescription(batchDTO.getDescription());
        batch.setStartDate(batchDTO.getStartDate());
        batch.setEndDate(batchDTO.getEndDate());
        batch.setActive(batchDTO.isActive());
        return batchRepository.save(batch);
    }

    @Override
    public Batch updateBatch(Long id, BatchDTO batchDTO) {
        Optional<Batch> optionalBatch = batchRepository.findById(id);
        if (optionalBatch.isPresent()) {
            Batch batch = optionalBatch.get();
            batch.setName(batchDTO.getName());
            batch.setDescription(batchDTO.getDescription());
            batch.setStartDate(batchDTO.getStartDate());
            batch.setEndDate(batchDTO.getEndDate());
            batch.setActive(batchDTO.isActive());
            return batchRepository.save(batch);
        }
        return null;
    }

    @Override
    public Batch getBatchById(Long id) {
        return batchRepository.findById(id).orElse(null);
    }

    @Override
    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    @Override
    public void deleteBatch(Long id) {
        batchRepository.deleteById(id);
    }
}