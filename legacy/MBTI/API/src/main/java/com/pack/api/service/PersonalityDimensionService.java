package com.pack.api.service;

import com.pack.api.dto.PersonalityDimensionDTO;
import com.pack.api.model.PersonalityDimension;
import java.util.List;

public interface PersonalityDimensionService {
    PersonalityDimension createPersonalityDimension(PersonalityDimensionDTO personalityDimensionDTO);
    PersonalityDimension updatePersonalityDimension(Long id, PersonalityDimensionDTO personalityDimensionDTO);
    PersonalityDimension getPersonalityDimensionById(Long id);
    List<PersonalityDimension> getAllPersonalityDimensions();
    void deletePersonalityDimension(Long id);
}