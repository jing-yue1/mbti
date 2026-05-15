package com.pack.api.service.impl;

import com.pack.api.dto.AssessmentTypeDTO;
import com.pack.api.model.AssessmentType;
import com.pack.api.repository.AssessmentTypeRepository;
import com.pack.api.service.AssessmentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssessmentTypeServiceImpl implements AssessmentTypeService {

    @Autowired
    private AssessmentTypeRepository assessmentTypeRepository;

    @Override
    public AssessmentType createAssessmentType(AssessmentTypeDTO assessmentTypeDTO) {
        AssessmentType assessmentType = new AssessmentType();
        assessmentType.setName(assessmentTypeDTO.getName());
        assessmentType.setDescription(assessmentTypeDTO.getDescription());
        assessmentType.setActive(assessmentTypeDTO.isActive());
        return assessmentTypeRepository.save(assessmentType);
    }

    @Override
    public AssessmentType updateAssessmentType(Long id, AssessmentTypeDTO assessmentTypeDTO) {
        Optional<AssessmentType> optionalAssessmentType = assessmentTypeRepository.findById(id);
        if (optionalAssessmentType.isPresent()) {
            AssessmentType assessmentType = optionalAssessmentType.get();
            assessmentType.setName(assessmentTypeDTO.getName());
            assessmentType.setDescription(assessmentTypeDTO.getDescription());
            assessmentType.setActive(assessmentTypeDTO.isActive());
            return assessmentTypeRepository.save(assessmentType);
        }
        return null;
    }

    @Override
    public AssessmentType getAssessmentTypeById(Long id) {
        return assessmentTypeRepository.findById(id).orElse(null);
    }

    @Override
    public List<AssessmentType> getAllAssessmentTypes() {
        return assessmentTypeRepository.findAll();
    }

    @Override
    public void deleteAssessmentType(Long id) {
        assessmentTypeRepository.deleteById(id);
    }
}