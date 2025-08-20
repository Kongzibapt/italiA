import type { Lesson } from './lesson';

export const defineLesson = <T extends Lesson>(l: T) => l;
