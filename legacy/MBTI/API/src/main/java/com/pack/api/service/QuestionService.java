package com.pack.api.service;

import com.pack.api.dto.QuestionDTO;
import com.pack.api.model.Question;
import java.util.List;

public interface QuestionService {
    Question createQuestion(QuestionDTO questionDTO);
    Question updateQuestion(Long id, QuestionDTO questionDTO);
    Question getQuestionById(Long id);
    List<Question> getAllQuestions();
    List<Question> getQuestionsByAssessmentType(Long assessmentTypeId);
    void deleteQuestion(Long id);
}