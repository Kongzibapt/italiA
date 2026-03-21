export interface Question {
  wordId: string;
  italian: string;
  french: string;
  type: QuestionType;
  options?: string[];
}

export enum QuestionType {
  CHOOSE_ONE = 'CHOOSE_ONE',
  WRITTEN = 'WRITTEN',
}
