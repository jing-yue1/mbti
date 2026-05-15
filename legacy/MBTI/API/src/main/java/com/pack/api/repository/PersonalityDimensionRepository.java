package com.pack.api.repository;

import com.pack.api.model.PersonalityDimension;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalityDimensionRepository extends JpaRepository<PersonalityDimension, Long> {
}