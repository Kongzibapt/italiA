export type QuestionDirection = 'fr_to_it' | 'it_to_fr';

export interface Question {
  wordId: string;
  italian: string;
  french: string;
  type: QuestionType;
  direction: QuestionDirection;
  options?: string[];
  isSecondPass?: boolean;
}

export enum QuestionType {
  CHOOSE_ONE = 'CHOOSE_ONE',
  WRITTEN = 'WRITTEN',
}
