import type { Chapter } from '~/types/lessons/catalog';

const chapter4: Chapter = {
  id: 'parler-de-soi',
  name: 'Parler de soi',
  order: 4,
  lessons: [
    {
      id: 28,
      name: 'Ma routine quotidienne.',
      description:
        "Décris ta journée type en italien : se lever, se préparer, travailler, manger, se coucher. Les verbes réfléchis du quotidien et les marqueurs de temps.",
      sub_lessons: [
        {
          id: '28_1',
          name: 'Les activités de la journée',
          description:
            "Apprends les verbes du quotidien : svegliarsi, lavarsi, mangiare, lavorare, dormire...",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '28_2',
          name: 'Raconter sa journée',
          description:
            "Structure une description de ta routine avec les marqueurs de temps (prima, poi, dopo, infine).",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '28_3',
          name: 'Révision routine quotidienne',
          description:
            'Exercices de consolidation pour décrire ta routine de façon fluide et naturelle.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 29,
      name: 'Mon logement.',
      description:
        "Décris ton appartement ou ta maison : localisation, taille, aménagement. Parle de ton quartier et exprime ce que tu aimes ou n'aimes pas chez toi.",
      sub_lessons: [
        {
          id: '29_1',
          name: 'Décrire son logement',
          description:
            "Apprends à décrire ton type de logement, le nombre de pièces et l'environnement.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '29_2',
          name: 'Le quartier et la localisation',
          description:
            "Exprime où tu habites, décris ton quartier et parle des avantages et inconvénients.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '29_3',
          name: 'Révision mon logement',
          description:
            "Exercices de consolidation pour parler de ton chez-toi avec aisance.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 30,
      name: 'Mes goûts et préférences.',
      description:
        "Exprime ce que tu aimes et n'aimes pas : musique, cinéma, cuisine, sport, lectures. Les verbes d'opinion (piacere, amare, preferire, detestare) et les nuances.",
      sub_lessons: [
        {
          id: '30_1',
          name: 'Le verbe piacere',
          description:
            "Maîtrise la construction particulière de 'piacere' (mi piace / mi piacciono) et ses variantes.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '30_2',
          name: 'Exprimer ses préférences',
          description:
            "Apprends à comparer des goûts, exprimer une préférence ou une aversion et demander l'avis de quelqu'un.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '30_3',
          name: "Révision goûts et préférences",
          description:
            "Exercices de consolidation pour parler de tes centres d'intérêt naturellement.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 31,
      name: 'Le passé composé.',
      description:
        "Apprends le passato prossimo pour raconter ce qui s'est passé : formation avec essere et avere, accord du participe passé, verbes courants.",
      sub_lessons: [
        {
          id: '31_1',
          name: 'Formation du passé composé',
          description:
            "Découvre la structure auxiliaire + participe passé et les règles de choix entre essere et avere.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '31_2',
          name: 'Emplois et participes irréguliers',
          description:
            "Apprends les participes passés irréguliers courants (fatto, detto, visto...) et les contextes d'emploi.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '31_3',
          name: 'Révision passé composé',
          description:
            'Exercices de consolidation pour raconter des événements passés avec aisance.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 32,
      name: "L'imparfait.",
      description:
        "Maîtrise l'imperfetto pour décrire des habitudes passées, des états et des actions en cours. Formation et distinction avec le passato prossimo.",
      sub_lessons: [
        {
          id: '32_1',
          name: "Formation de l'imparfait",
          description:
            "Apprends les terminaisons de l'imparfait pour les trois groupes et les verbes irréguliers courants.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '32_2',
          name: 'Imparfait vs passé composé',
          description:
            "Comprends la différence d'emploi entre l'imperfetto et le passato prossimo dans un récit.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '32_3',
          name: "Révision de l'imparfait",
          description:
            'Exercices de consolidation pour utiliser les deux temps du passé avec précision.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 33,
      name: 'Le futur simple.',
      description:
        "Apprends le futuro semplice pour parler de projets, faire des prédictions et exprimer une probabilité. Formation et verbes irréguliers inclus.",
      sub_lessons: [
        {
          id: '33_1',
          name: 'Formation du futur simple',
          description:
            "Découvre les terminaisons du futur simple et les principaux verbes irréguliers (sarò, avrò, farò...).",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '33_2',
          name: 'Emplois du futur',
          description:
            "Apprends à exprimer des projets, des prévisions et des hypothèses avec le futur.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '33_3',
          name: 'Révision du futur simple',
          description:
            "Exercices de consolidation pour parler de l'avenir avec aisance.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 34,
      name: 'Exprimer son opinion.',
      description:
        "Apprends à donner ton avis, à être d'accord ou en désaccord et à nuancer ton propos. Les verbes d'opinion (pensare, credere, ritenere) et les connecteurs logiques.",
      sub_lessons: [
        {
          id: '34_1',
          name: 'Donner son avis',
          description:
            "Découvre les formules pour introduire une opinion : secondo me, penso che, credo che...",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '34_2',
          name: 'Accord, désaccord et nuances',
          description:
            "Apprends à marquer l'accord (hai ragione), le désaccord (non sono d'accordo) et à nuancer.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '34_3',
          name: "Révision exprimer son opinion",
          description:
            'Exercices de consolidation pour donner ton avis avec conviction et nuance.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 35,
      name: 'Raconter une expérience.',
      description:
        "Combine le passé composé et l'imparfait pour raconter une anecdote, un voyage ou un souvenir. Connecteurs de narration et expressions pour rendre le récit vivant.",
      sub_lessons: [
        {
          id: '35_1',
          name: 'Structurer un récit',
          description:
            "Apprends à organiser une histoire avec les connecteurs narratifs (prima, poi, dopo, alla fine, improvvisamente).",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '35_2',
          name: 'Rendre le récit vivant',
          description:
            "Utilise les deux temps du passé ensemble pour alterner actions (passé composé) et descriptions (imparfait).",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '35_3',
          name: 'Révision raconter une expérience',
          description:
            'Exercices de consolidation pour raconter des histoires et des anecdotes avec fluidité.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
  ],
};

export default chapter4;
