import type { Theme } from '~/types/lessons/catalog';

const chapter7: Theme = {
  id: 'grammaire-avancee',
  name: 'Grammaire avancée',
  order: 7,
  lessons: [
    {
      id: 54,
      name: 'Le subjonctif présent.',
      description:
        "Apprends le subjonctif présent (congiuntivo presente) : formation, emplois après les verbes d'opinion, de volonté, d'émotion et les conjonctions.",
      sub_lessons: [
        {
          id: '54_1',
          name: 'Formation du subjonctif présent',
          description:
            "Découvre les terminaisons du congiuntivo presente pour les trois groupes et les verbes irréguliers.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '54_2',
          name: 'Emplois du subjonctif présent',
          description:
            "Apprends à utiliser le subjonctif après penso che, voglio che, benché, sebbene, perché...",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '54_3',
          name: 'Révision du subjonctif présent',
          description:
            'Exercices de consolidation pour employer le subjonctif présent avec précision.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 55,
      name: 'Le subjonctif passé et imparfait.',
      description:
        "Maîtrise le subjonctif passé (congiuntivo passato) et imparfait (congiuntivo imperfetto) pour les récits au passé et les hypothèses.",
      sub_lessons: [
        {
          id: '55_1',
          name: 'Le subjonctif passé',
          description:
            "Apprends la formation du congiuntivo passato (auxiliaire au subjonctif + participe passé) et ses emplois.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '55_2',
          name: 'Le subjonctif imparfait',
          description:
            "Découvre le congiuntivo imperfetto, sa formation et son emploi dans les hypothèses (se fossi...).",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '55_3',
          name: 'Révision des subjonctifs du passé',
          description:
            'Exercices de consolidation pour maîtriser tous les temps du subjonctif.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 56,
      name: 'Le conditionnel passé.',
      description:
        "Apprends le conditionnel passé pour exprimer des regrets, des reproches et des hypothèses non réalisées. Formation et emplois dans les périodes conditionnelles.",
      sub_lessons: [
        {
          id: '56_1',
          name: 'Formation du conditionnel passé',
          description:
            "Découvre la structure auxiliaire au conditionnel + participe passé et les principaux verbes.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '56_2',
          name: 'Regrets et hypothèses non réalisées',
          description:
            "Apprends à exprimer des regrets (avrei dovuto) et des hypothèses irréelles (se avessi saputo, avrei...).",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '56_3',
          name: 'Révision du conditionnel passé',
          description:
            'Exercices de consolidation pour utiliser le conditionnel passé avec précision.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 57,
      name: 'Le passé simple.',
      description:
        "Découvre le passato remoto : formation régulière et irrégulière, emplois dans la littérature, l'histoire et certaines régions d'Italie.",
      sub_lessons: [
        {
          id: '57_1',
          name: 'Formation du passato remoto',
          description:
            "Apprends les terminaisons régulières et les nombreux participes irréguliers courants.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '57_2',
          name: 'Emplois et variations régionales',
          description:
            "Comprends quand utiliser le passé simple vs le passé composé selon les régions d'Italie.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '57_3',
          name: 'Révision du passato remoto',
          description:
            'Exercices de consolidation pour lire et écrire au passé simple.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 58,
      name: 'Les phrases conditionnelles.',
      description:
        "Maîtrise les trois types de phrases conditionnelles en italien : réelles (se + présent), potentielles (se + subj. imparfait) et irréelles (se + subj. plus-que-parfait).",
      sub_lessons: [
        {
          id: '58_1',
          name: 'La conditionnelle réelle',
          description:
            "Apprends le premier type : se + indicatif présent ou futur → futur ou présent.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '58_2',
          name: 'Les conditionnelles potentielle et irréelle',
          description:
            "Découvre les types 2 et 3 avec le subjonctif imparfait ou plus-que-parfait.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '58_3',
          name: 'Révision conditionnelles',
          description:
            'Exercices de consolidation pour construire les trois types de conditionnelles.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 59,
      name: 'La concordance des temps.',
      description:
        "Comprends comment choisir le bon temps verbal dans les phrases complexes selon la relation temporelle entre la principale et la subordonnée.",
      sub_lessons: [
        {
          id: '59_1',
          name: 'Simultanéité et antériorité',
          description:
            "Apprends à exprimer des actions simultanées, antérieures ou postérieures dans les subordonnées.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '59_2',
          name: 'Concordance avec le subjonctif',
          description:
            "Maîtrise la concordance quand la principale est au présent, passé ou conditionnel.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '59_3',
          name: 'Révision concordance des temps',
          description:
            'Exercices de consolidation pour maîtriser la concordance dans des textes complexes.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 60,
      name: 'Le discours indirect.',
      description:
        "Rapporte les paroles et pensées de quelqu'un en italien : transformations des temps, des pronoms et des adverbes dans le discours indirect.",
      sub_lessons: [
        {
          id: '60_1',
          name: 'Le discours indirect au présent',
          description:
            "Apprends à transformer une citation directe en discours indirect quand la principale est au présent.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '60_2',
          name: 'Le discours indirect au passé',
          description:
            "Découvre les transformations des temps verbaux quand la principale est au passé.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '60_3',
          name: 'Révision discours indirect',
          description:
            'Exercices de consolidation pour rapporter des paroles avec précision.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 61,
      name: 'La voix passive.',
      description:
        "Forme et utilise la voix passive en italien avec essere et venire. Comprends quand la préférer et comment l'éviter avec le 'si passivante'.",
      sub_lessons: [
        {
          id: '61_1',
          name: 'Formation du passif',
          description:
            "Apprends à former le passif avec essere + participe passé à tous les temps principaux.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '61_2',
          name: 'Venire et le si passivante',
          description:
            "Découvre l'emploi de 'venire' au présent et à l'imparfait, et le 'si' passivant comme alternative.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '61_3',
          name: 'Révision de la voix passive',
          description:
            'Exercices de consolidation pour utiliser et comprendre la voix passive en contexte.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
  ],
};

export default chapter7;
