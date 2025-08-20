export interface LessonContext {
  name: string;
  level: string;
  summary: string;
}

export interface UserContext {
  level: number; // 1-5
  // vocab: string[]; // 20 mots max
}

export function getFirstPromptContext(
  lesson: LessonContext,
  user: UserContext
): string {
  const levelMap: Record<number, string> = {
    1: 'débutant',
    2: 'débutant avancé',
    3: 'intermédiaire',
    4: 'avancé',
    5: 'expert',
  };

  return `CONTEXTE:
Leçon: ${lesson.name}
Niveau étudiant: ${levelMap[user.level]}
Points clés: ${lesson.summary}

RÔLE: Tu es un professeur d'italien patient et encourageant. Adapte ton langage au niveau ${
    levelMap[user.level]
  }.

TÂCHE: Accueille l'étudiant et introduis brièvement la leçon en 1 phrase.`;
}
