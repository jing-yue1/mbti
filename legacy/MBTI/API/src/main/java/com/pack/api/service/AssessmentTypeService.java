package com.pack.api.service;

import com.pack.api.dto.AssessmentTypeDTO;
import com.pack.api.model.AssessmentType;
import java.util.List;

public interface AssessmentTypeService {
    AssessmentType createAssessmentType(AssessmentTypeDTO assessmentTypeDTO);
    AssessmentType updateAssessmentType(Long id, AssessmentTypeDTO assessmentTypeDTO);
    AssessmentType getAssessmentTypeById(Long id);
    List<AssessmentType> getAllAssessmentTypes();
    void deleteAssessmentType(Long id);
}