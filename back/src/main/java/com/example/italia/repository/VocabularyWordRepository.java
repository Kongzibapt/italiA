package com.example.italia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.italia.model.VocabularyWord;


@Repository
public interface VocabularyWordRepository extends JpaRepository<VocabularyWord, Long> {
    List<VocabularyWord> findByUserId(Long userId);

    List<VocabularyWord> findByUserIdAndStatusIn(Long userId, List<VocabularyWord.Status> statusList);
}

