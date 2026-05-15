package com.pack.api.service.impl;

import com.pack.api.dto.PersonalityDimensionDTO;
import com.pack.api.model.PersonalityDimension;
import com.pack.api.repository.PersonalityDimensionRepository;
import com.pack.api.service.PersonalityDimensionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonalityDimensionServiceImpl implements PersonalityDimensionService {

    @Autowired
    private PersonalityDimensionRepository personalityDimensionRepository;

    @Override
    public PersonalityDimension createPersonalityDimension(PersonalityDimensionDTO personalityDimensionDTO) {
        PersonalityDimension personalityDimension = new PersonalityDimension();
        personalityDimension.setCode(personalityDimensionDTO.getCode());
        personalityDimension.setName(personalityDimensionDTO.getName());
        personalityDimension.setDescription(personalityDimensionDTO.getDescription());
        return personalityDimensionRepository.save(personalityDimension);
    }

    @Override
    public PersonalityDimension updatePersonalityDimension(Long id, PersonalityDimensionDTO personalityDimensionDTO) {
        Optional<PersonalityDimension> optionalPersonalityDimension = personalityDimensionRepository.findById(id);
        if (optionalPersonalityDimension.isPresent()) {
            PersonalityDimension personalityDimension = optionalPersonalityDimension.get();
            personalityDimension.setCode(personalityDimensionDTO.getCode());
            personalityDimension.setName(personalityDimensionDTO.getName());
            personalityDimension.setDescription(personalityDimensionDTO.getDescription());
            return personalityDimensionRepository.save(personalityDimension);
        }
        return null;
    }

    @Override
    public PersonalityDimension getPersonalityDimensionById(Long id) {
        return personalityDimensionRepository.findById(id).orElse(null);
    }

    @Override
    public List<PersonalityDimension> getAllPersonalityDimensions() {
        return personalityDimensionRepository.findAll();
    }

    @Override
    public void deletePersonalityDimension(Long id) {
        personalityDimensionRepository.deleteById(id);
    }
}