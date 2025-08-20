import type { Status } from './status';

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
}
