package com.pack.api.repository;

import com.pack.api.model.AssessmentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssessmentTypeRepository extends JpaRepository<AssessmentType, Long> {
}