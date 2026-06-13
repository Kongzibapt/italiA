// Niveau de progression possible
export type LessonLevel =
  | 'NOT_LEARNED_TO_PARTIAL'
  | 'PARTIAL_TO_WELL'
  | 'WELL_LEARNED_REVIEW';

// Types des exercices
export type ExerciseType = 'multiple_choice' | 'true_false' | 'fill_in_blank';

// CorrectAnswer peut prendre plusieurs types selon le type d’exercice
export type CorrectAnswer =
  | string
  | string[]
  | (string | string[])[]
  | boolean;

// Définition d’un exercice
export interface Exercise {
  type: ExerciseType;
  question: string;
  options?: string[]; // seulement pour multiple_choice
  correctAnswer: CorrectAnswer;
  explanation?: string;
}

// Tableau structuré optionnel dans une section
export interface LessonTable {
  headers: string[];
  rows: string[][];
}

// Section d’une sous-leçon
export interface LessonSection {
  title: string;
  text: string;
  table?: LessonTable;
  examples: string[];
  exercises: Exercise[];
}

// Contenu d’une sous-leçon
export interface LessonContent {
  introduction: string;
  sections: LessonSection[];
  conclusion: string;
}

// Point de révision pour les leçons WELL_LEARNED_REVIEW
export interface ConceptCheck {
  id: string;
  label: string;       // affiché dans la case à cocher
  question: string;    // question ouverte posée par Marco
  key_points: string[]; // points attendus dans la réponse (utilisés dans le prompt)
}

// Sous-leçon
export interface SubLesson {
  id: string;
  name: string;
  description: string;
  level: LessonLevel;
  summary?: string;
  chat_questions?: Array<{
    question: string;
    hint: string; // astuce affichée à l'apprenant pour l'aider à répondre
  }>;
  concept_checks?: ConceptCheck[]; // validation alternative pour les leçons de révision
  content: LessonContent;
}

// Leçon principale
export interface Lesson {
  id: number;
  order: number;
  name: string;
  description: string;
  chapter_id: string;
  chapter_name: string;
  sub_lessons: SubLesson[];
}
