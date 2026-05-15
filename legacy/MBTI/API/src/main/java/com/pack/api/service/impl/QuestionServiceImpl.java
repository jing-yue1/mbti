package com.pack.api.service.impl;

import com.pack.api.dto.QuestionDTO;
import com.pack.api.model.Question;
import com.pack.api.repository.QuestionRepository;
import com.pack.api.repository.AssessmentTypeRepository;
import com.pack.api.repository.PersonalityDimensionRepository;
import com.pack.api.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AssessmentTypeRepository assessmentTypeRepository;

    @Autowired
    private PersonalityDimensionRepository personalityDimensionRepository;

    @Override
    public Question createQuestion(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setContent(questionDTO.getContent());
        question.setDimension(personalityDimensionRepository.findById(questionDTO.getDimensionId()).orElse(null));
        question.setAssessmentType(assessmentTypeRepository.findById(questionDTO.getAssessmentTypeId()).orElse(null));
        question.setOrderIndex(questionDTO.getOrderIndex());
        question.setActive(questionDTO.isActive());
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Long id, QuestionDTO questionDTO) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            question.setContent(questionDTO.getContent());
            question.setDimension(personalityDimensionRepository.findById(questionDTO.getDimensionId()).orElse(null));
            question.setAssessmentType(assessmentTypeRepository.findById(questionDTO.getAssessmentTypeId()).orElse(null));
            question.setOrderIndex(questionDTO.getOrderIndex());
            question.setActive(questionDTO.isActive());
            return questionRepository.save(question);
        }
        return null;
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElse(null);
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public List<Question> getQuestionsByAssessmentType(Long assessmentTypeId) {
        return questionRepository.findByAssessmentTypeIdAndActiveTrue(assessmentTypeId);
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}