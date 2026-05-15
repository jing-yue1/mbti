package com.pack.api.controller;

import com.pack.api.dto.AssessmentTypeDTO;
import com.pack.api.model.AssessmentType;
import com.pack.api.service.AssessmentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessment-types")
public class AssessmentTypeController {

    @Autowired
    private AssessmentTypeService assessmentTypeService;

    @PostMapping
    public ResponseEntity<AssessmentType> createAssessmentType(@RequestBody AssessmentTypeDTO assessmentTypeDTO) {
        AssessmentType assessmentType = assessmentTypeService.createAssessmentType(assessmentTypeDTO);
        return new ResponseEntity<>(assessmentType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssessmentType> updateAssessmentType(@PathVariable Long id, @RequestBody AssessmentTypeDTO assessmentTypeDTO) {
        AssessmentType assessmentType = assessmentTypeService.updateAssessmentType(id, assessmentTypeDTO);
        return assessmentType != null ? ResponseEntity.ok(assessmentType) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentType> getAssessmentTypeById(@PathVariable Long id) {
        AssessmentType assessmentType = assessmentTypeService.getAssessmentTypeById(id);
        return assessmentType != null ? ResponseEntity.ok(assessmentType) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<AssessmentType>> getAllAssessmentTypes() {
        List<AssessmentType> assessmentTypes = assessmentTypeService.getAllAssessmentTypes();
        return ResponseEntity.ok(assessmentTypes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssessmentType(@PathVariable Long id) {
        assessmentTypeService.deleteAssessmentType(id);
        return ResponseEntity.noContent().build();
    }
}