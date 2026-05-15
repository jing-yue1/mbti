package com.pack.api.controller;

import com.pack.api.dto.PersonalityDimensionDTO;
import com.pack.api.model.PersonalityDimension;
import com.pack.api.service.PersonalityDimensionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personality-dimensions")
public class PersonalityDimensionController {

    @Autowired
    private PersonalityDimensionService personalityDimensionService;

    @PostMapping
    public ResponseEntity<PersonalityDimension> createPersonalityDimension(@RequestBody PersonalityDimensionDTO personalityDimensionDTO) {
        PersonalityDimension personalityDimension = personalityDimensionService.createPersonalityDimension(personalityDimensionDTO);
        return new ResponseEntity<>(personalityDimension, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonalityDimension> updatePersonalityDimension(@PathVariable Long id, @RequestBody PersonalityDimensionDTO personalityDimensionDTO) {
        PersonalityDimension personalityDimension = personalityDimensionService.updatePersonalityDimension(id, personalityDimensionDTO);
        return personalityDimension != null ? ResponseEntity.ok(personalityDimension) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonalityDimension> getPersonalityDimensionById(@PathVariable Long id) {
        PersonalityDimension personalityDimension = personalityDimensionService.getPersonalityDimensionById(id);
        return personalityDimension != null ? ResponseEntity.ok(personalityDimension) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<PersonalityDimension>> getAllPersonalityDimensions() {
        List<PersonalityDimension> personalityDimensions = personalityDimensionService.getAllPersonalityDimensions();
        return ResponseEntity.ok(personalityDimensions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersonalityDimension(@PathVariable Long id) {
        personalityDimensionService.deletePersonalityDimension(id);
        return ResponseEntity.noContent().build();
    }
}