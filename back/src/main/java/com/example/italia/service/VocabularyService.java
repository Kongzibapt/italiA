package com.example.italia.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.italia.exceptions.InvalidDataException;
import com.example.italia.exceptions.ResourceNotFoundException;
import com.example.italia.model.VocabularyWord;
import com.example.italia.repository.VocabularyWordRepository;

import jakarta.transaction.Transactional;


@Service
public class VocabularyService {

    @Autowired
    private VocabularyWordRepository vocabularyRepository;

    @Autowired
    public VocabularyService(VocabularyWordRepository vocabularyRepository) {
        this.vocabularyRepository = vocabularyRepository;
    }

    /**
     * Récupère la liste de vocabulaire d'un utilisateur
     */
    public List<VocabularyWord> getVocabularyForUser(Long userId) {
        return vocabularyRepository.findByUserId(userId);
    }

    /**
     * Ajoute un nouveau mot au vocabulaire de l'utilisateur
     */
    public VocabularyWord addWord(VocabularyWord word) {
        word.setCreatedAt(LocalDateTime.now());
        word.setUpdatedAt(LocalDateTime.now());
        return vocabularyRepository.save(word);
    }

    /**
     * Met à jour un mot existant
     */
    @Transactional
    public VocabularyWord updateWord(Long id, VocabularyWord updatedWord) {
        VocabularyWord existingWord = vocabularyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Word not found with id: " + id));
        existingWord.setItalian(updatedWord.getItalian());
        existingWord.setFrench(updatedWord.getFrench());
        existingWord.setStatus(updatedWord.getStatus());
        existingWord.setLastRevised(updatedWord.getLastRevised());
        existingWord.setUpdatedAt(LocalDateTime.now());
        existingWord.setMasteredTimes(updatedWord.getMasteredTimes());
        validateWord(existingWord);
        return vocabularyRepository.save(existingWord);
    }

    /**
     * Supprime un mot du vocabulaire
     */
    public void deleteWord(Long id) {
        if (!vocabularyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Word not found with id: " + id);
        }
        vocabularyRepository.deleteById(id);
    }

    private void validateWord(VocabularyWord word) {
        if (word.getItalian() == null || word.getItalian().trim().isEmpty()) {
            throw new InvalidDataException("Italian word cannot be empty");
        }
        if (word.getFrench() == null || word.getFrench().trim().isEmpty()) {
            throw new InvalidDataException("French translation cannot be empty");
        }
    }
}
