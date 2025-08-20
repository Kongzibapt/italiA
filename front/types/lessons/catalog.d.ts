/** Sous-leçon (entrée liste) */
export interface SubLessonListItem {
  id: string; // ex: "1_1"
  name: string;
  description: string;
  level: LessonLevel;
}

/** Leçon (entrée liste) */
export interface LessonListItem {
  id: number;
  order: number;
  name: string;
  description: string;
  sub_lessons: SubLessonListItem[];
}

/** Thème contenant plusieurs leçons */
export interface Theme {
  id: string; // ex: "alphabet-prononciation"
  name: string;
  order: number;
  lessons: LessonListItem[];
}

/** Racine du catalogue */
export interface Catalog {
  themes: Theme[];
}
