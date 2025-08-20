package com.example.italia.controller;

import com.example.italia.dto.QuestionDTO;
import com.example.italia.dto.UserDTO;
import com.example.italia.dto.VocabularyWordDTO;
import com.example.italia.model.User;
import com.example.italia.model.VocabularyWord;
import com.example.italia.model.VocabularyWord.Status;
import com.example.italia.repository.VocabularyWordRepository;
import com.example.italia.service.VocabularyService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vocabulary")
@CrossOrigin(origins = "http://localhost:3000")
public class VocabularyWordController {

    @Autowired
    private VocabularyService vocabularyService;

    @Autowired
    private VocabularyWordRepository vocabularyWordRepository;

    @GetMapping("/generate")
    public List<QuestionDTO> generateQuestions() {
        Authentication authentication = SecurityContextHolder.getContext()
            .getAuthentication();
        UserDTO userDTO = (UserDTO) authentication.getPrincipal();
        User user = userDTO.toUser();

        List<VocabularyWord> allWords =
            vocabularyWordRepository.findByUserIdAndStatusIn(
                user.getId(),
                List.of(Status.NOT_LEARNED, Status.PARTIALLY_LEARNED)
            );
        List<VocabularyWord> shuffledWords = new ArrayList<>(allWords);
        Collections.shuffle(shuffledWords);

        List<QuestionDTO> questions = new ArrayList<>();
        for (int i = 0; i < 10 && i < shuffledWords.size(); i++) {
            VocabularyWord word = shuffledWords.get(i);
            List<String> options = getSimilarOptions(
                word.getItalian(),
                allWords,
                3
            );
            QuestionDTO questionDTO = new QuestionDTO();

            questionDTO.setWordId(word.getId());
            questionDTO.setItalian(word.getItalian());
            questionDTO.setFrench(word.getFrench());
            questionDTO.setOptions(options);
            questions.add(questionDTO);
        }

        return questions;
    }

    @GetMapping
    public ResponseEntity<List<VocabularyWordDTO>> getUserVocabulary() {
        Authentication authentication = SecurityContextHolder.getContext()
            .getAuthentication();
        UserDTO userDTO = (UserDTO) authentication.getPrincipal();
        User user = userDTO.toUser();

        List<VocabularyWord> words = vocabularyService.getVocabularyForUser(
            user.getId()
        );
        for (VocabularyWord word : words) {
            // If the word has been not revised in the last (masteredTimes * 5) days,
            // retrograde the status
            if (
                !word.isRetrograded() &&
                word.getLastRevised() != null &&
                word
                    .getLastRevised()
                    .isBefore(
                        LocalDateTime.now()
                            .minusDays(5 + word.getMasteredTimes() * 5)
                    )
            ) {
                if (word.getStatus() == Status.WELL_LEARNED) {
                    word.setRetrograded(true);
                    word.setStatus(Status.PARTIALLY_LEARNED);
                } else if (word.getStatus() == Status.PARTIALLY_LEARNED) {
                    word.setStatus(Status.NOT_LEARNED);
                }
                vocabularyService.updateWord(word.getId(), word);
            }
        }

        List<VocabularyWordDTO> dtos = words
            .stream()
            .map(VocabularyWordDTO::new)
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<VocabularyWordDTO> addWord(
        @RequestBody VocabularyWordDTO wordDTO
    ) {
        Authentication authentication = SecurityContextHolder.getContext()
            .getAuthentication();
        UserDTO userDTO = (UserDTO) authentication.getPrincipal();
        User user = userDTO.toUser();

        VocabularyWord word = new VocabularyWord();
        word.setFrench(wordDTO.getFrench());
        word.setItalian(wordDTO.getItalian());
        word.setUser(user);

        VocabularyWord savedWord = vocabularyService.addWord(word);

        return ResponseEntity.ok(new VocabularyWordDTO(savedWord));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VocabularyWordDTO> updateWord(
        @PathVariable Long id,
        @RequestBody VocabularyWordDTO wordDTO
    ) {
        VocabularyWord word = new VocabularyWord();
        word.setFrench(wordDTO.getFrench());
        word.setItalian(wordDTO.getItalian());
        word.setStatus(wordDTO.getStatus());
        word.setLastRevised(wordDTO.getLastRevised());
        word.setMasteredTimes(wordDTO.getMasteredTimes());
        word.setRetrograded(false);

        VocabularyWord savedWord = vocabularyService.updateWord(id, word);

        return ResponseEntity.ok(new VocabularyWordDTO(savedWord));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWord(@PathVariable Long id) {
        vocabularyService.deleteWord(id);
        return ResponseEntity.ok().build();
    }

    private List<String> getSimilarOptions(
        String correctAnswer,
        List<VocabularyWord> allWords,
        int numberOfOptions
    ) {
        List<String> options = new ArrayList<>();
        List<VocabularyWord> filteredWords = allWords
            .stream()
            .filter(word -> !word.getItalian().equalsIgnoreCase(correctAnswer))
            .collect(Collectors.toList());

        Collections.shuffle(filteredWords);

        for (int i = 0; i < numberOfOptions && i < filteredWords.size(); i++) {
            options.add(filteredWords.get(i).getItalian());
        }

        options.add(correctAnswer);
        Collections.shuffle(options);

        return options;
    }
}
