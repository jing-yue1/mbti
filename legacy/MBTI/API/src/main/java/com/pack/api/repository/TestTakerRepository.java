package com.pack.api.repository;

import com.pack.api.model.TestTaker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestTakerRepository extends JpaRepository<TestTaker, Long> {
    List<TestTaker> findByBatchId(Long batchId);
    TestTaker findByEmail(String email);
}