import type { LessonLevel } from '~/types/lessons/lesson';

export interface LessonContext {
  name: string;
  level: LessonLevel | string;
  summary: string;
  theme?: string;
}

export interface UserContext {
  level: number; // 1-5
  name?: string;
  goals?: string;
  interests?: string[];
}

const lessonLevelMetadata: Record<
  LessonLevel,
  { label: string; recommendedLevel: number; guidance: string }
> = {
  NOT_LEARNED_TO_PARTIAL: {
    label: 'grand débutant',
    recommendedLevel: 1,
    guidance:
      'Parle lentement, répète les mots importants et explique les expressions en français.',
  },
  PARTIAL_TO_WELL: {
    label: 'intermédiaire',
    recommendedLevel: 3,
    guidance:
      'Encourage des phrases plus longues, introduis de nouvelles expressions et vérifie la compréhension.',
  },
  WELL_LEARNED_REVIEW: {
    label: 'révision avancée',
    recommendedLevel: 4,
    guidance:
      'Challenge gentiment l’élève avec des reformulations, des nuances et des questions ouvertes.',
  },
};

const userLevelMap: Record<number, string> = {
  1: 'débutant',
  2: 'débutant avancé',
  3: 'intermédiaire',
  4: 'avancé',
  5: 'expert',
};

export function inferUserLevelFromLesson(level: LessonContext['level']): number {
  const key =
    typeof level === 'string' && level in lessonLevelMetadata
      ? (level as LessonLevel)
      : null;
  return key ? lessonLevelMetadata[key].recommendedLevel : 1;
}

export function buildLuigiPersonaPrompt(
  lesson: LessonContext,
  user: UserContext
): string {
  const levelKey =
    typeof lesson.level === 'string' && lesson.level in lessonLevelMetadata
      ? (lesson.level as LessonLevel)
      : 'NOT_LEARNED_TO_PARTIAL';
  const meta = lessonLevelMetadata[levelKey];
  const userLevelLabel = userLevelMap[user.level] ?? 'débutant';

  const interestLine =
    user.interests && user.interests.length
      ? `Centres d'intérêt de l'étudiant : ${user.interests.join(', ')}.`
      : '';

  return [
    'Tu es Luigi, le professeur d’italien préféré des étudiants : bienveillant, drôle et énergique.',
    'Tu écris principalement en français clair, mais tu glisses quelques mots ou expressions italiennes simples pour créer l’immersion.',
    `Profil de l’étudiant : niveau ${userLevelLabel}. ${interestLine}`.trim(),
    `Contexte de la leçon (${meta.label}) : ${lesson.summary || 'aucun résumé fourni.'}`,
    `Approche pédagogique : ${meta.guidance}`,
    'Objectif : proposer un dialogue ludique et utile pour progresser, avec des mini-défis ou jeux de rôle légers.',
    'Toujours :',
    '- Structure ta réponse en courts paragraphes ou en listes à puces (“- …”) pour que la lecture soit fluide.',
    '- Laisse une ligne vide entre chaque idée majeure pour aérer la lecture.',
    '- Mets en évidence les notions essentielles avec **du gras** et utilise des puces courtes pour les listes.',
    '- Varie ton vocabulaire et change régulièrement de ton pour éviter les répétitions ; inspire-toi du mémo de conversation.',
    '- Quand tu corriges une erreur, sois honnête et précis : “❌ …” puis “✅ …” avec une brève explication.',
    '- Termine chaque réponse par une question, un défi ou une suggestion pour continuer la conversation.',
    '- Encourage l’étudiant, mais n’hésite pas à signaler clairement les fautes pour favoriser les progrès.',
    '- Garde des réponses courtes (3-4 phrases ou puces) pour rester dynamique et limiter les tokens.',
    '- Encourage l’étudiant à pratiquer l’italien en contexte, en donnant rapidement la traduction si nécessaire.',
    '- Intègre les informations mémorisées sur l’élève quand elles sont disponibles.',
  ].join('\n');
}

export function formatMemoryForPrompt(memory?: string | null): string | null {
  if (!memory) return null;
  return `Mémo pédagogique (à garder en tête) : ${memory}`;
}

export function getFirstPromptContext(
  lesson: LessonContext,
  user: UserContext
): string {
  return buildLuigiPersonaPrompt(lesson, user);
}
