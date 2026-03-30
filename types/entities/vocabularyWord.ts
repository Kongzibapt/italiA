import type { Status } from './status';
import type { QuestionDirection } from './question';

export interface VocabularyWord {
  id: string;
  italian: string;
  french: string;
  status: Status;
  last_revised: Date;
  createdAt: Date;
  updatedAt: Date;
  mastered_times: number;
  is_retrograded: boolean;
  second_pass_direction: QuestionDirection | null;
  translation_verified: boolean;
  srs_interval: number;
  next_review_at: string | null;
}
