package com.pack.api.repository;

import com.pack.api.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByAssessmentTypeIdAndActiveTrue(Long assessmentTypeId);
    List<Question> findByDimensionIdAndActiveTrue(Long dimensionId);
}