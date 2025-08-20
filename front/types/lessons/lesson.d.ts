// Niveau de progression possible
export type LessonLevel =
  | 'NOT_LEARNED_TO_PARTIAL'
  | 'PARTIAL_TO_WELL'
  | 'WELL_LEARNED_REVIEW';

// Types des exercices
export type ExerciseType = 'multiple_choice' | 'true_false' | 'fill_in_blank';

// Définition d’un exercice
export interface Exercise {
  type: ExerciseType;
  question: string;
  options?: string[]; // seulement pour multiple_choice
  correctAnswer: string | boolean | string[];
  explanation?: string;
}

// Section d’une sous-leçon
export interface LessonSection {
  title: string;
  text: string;
  examples: string[];
  exercises: Exercise[];
}

// Contenu d’une sous-leçon
export interface LessonContent {
  introduction: string;
  sections: LessonSection[];
  conclusion: string;
}

// Sous-leçon
export interface SubLesson {
  id: string;
  name: string;
  description: string;
  level: LessonLevel;
  summary?: string; // optionnel
  content: LessonContent;
}

// Leçon principale
export interface Lesson {
  id: number;
  order: number;
  name: string;
  description: string;
  theme_id: string;
  theme_name: string;
  sub_lessons: SubLesson[];
}
