import type { Theme } from '~/types/lessons/catalog';

const chapter2: Theme = {
  id: 'grammaire-base',
  name: 'Grammaire de base',
  order: 2,
  lessons: [
    {
      id: 11,
      name: 'Les articles définis et indéfinis.',
      description:
        "Apprends à utiliser il, la, i, gli, le (articles définis) et un, una, degli, delle (articles indéfinis). Règles d'utilisation et exceptions courantes.",
      sub_lessons: [
        {
          id: '11_1',
          name: 'Les articles définis',
          description:
            'Découvre il, lo, la, i, gli, le et leurs règles de choix selon le nom.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '11_2',
          name: 'Les articles indéfinis et partitifs',
          description:
            "Apprends un, uno, una, dei, delle et les cas particuliers d'élision.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '11_3',
          name: 'Révision des articles',
          description:
            'Exercices de consolidation pour choisir et utiliser les articles naturellement.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 12,
      name: 'Les noms : genre et nombre.',
      description:
        'Maîtrise le genre (masculin/féminin) et le nombre (singulier/pluriel) des noms italiens. Règles de formation du pluriel et exceptions importantes.',
      sub_lessons: [
        {
          id: '12_1',
          name: 'Le genre des noms',
          description:
            'Apprends les règles pour reconnaître et former le masculin et le féminin des noms italiens.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '12_2',
          name: 'Le pluriel des noms',
          description:
            'Découvre les règles de formation du pluriel (-i, -e) et les noms irréguliers.',
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '12_3',
          name: 'Révision genre et nombre',
          description:
            'Exercices de consolidation pour maîtriser le genre et le nombre des noms.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 13,
      name: 'Les adjectifs qualificatifs.',
      description:
        "Découvre les règles d'accord des adjectifs avec les noms, la position des adjectifs dans la phrase et les adjectifs invariables courants.",
      sub_lessons: [
        {
          id: '13_1',
          name: "L'accord des adjectifs",
          description:
            "Apprends à accorder les adjectifs en genre et en nombre avec le nom qu'ils qualifient.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '13_2',
          name: 'La place des adjectifs',
          description:
            'Découvre les règles de position (avant ou après le nom) et leurs effets sur le sens.',
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '13_3',
          name: 'Révision des adjectifs',
          description:
            'Exercices de consolidation pour utiliser les adjectifs correctement et naturellement.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 14,
      name: 'Les pronoms personnels sujets.',
      description:
        'Étudie les pronoms personnels sujets (io, tu, lui, lei, noi, voi, loro) et comprends quand les utiliser ou les omettre en italien.',
      sub_lessons: [
        {
          id: '14_1',
          name: 'Les pronoms sujets de base',
          description:
            'Découvre io, tu, lui/lei, noi, voi, loro et leur utilisation dans la phrase.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '14_2',
          name: 'Omission et politesse',
          description:
            "Apprends quand omettre le pronom sujet en italien et le vouvoiement formel avec 'Lei'.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '14_3',
          name: 'Révision des pronoms sujets',
          description:
            'Exercices de consolidation pour utiliser les pronoms sujets avec aisance.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 15,
      name: 'Les verbes réguliers au présent.',
      description:
        "Apprends les trois groupes de conjugaison (-are, -ere, -ire) au présent de l'indicatif. Exercices avec les verbes les plus courants de chaque groupe.",
      sub_lessons: [
        {
          id: '15_1',
          name: 'Les verbes en -are',
          description:
            'Maîtrise la conjugaison du premier groupe avec parlare, mangiare, lavorare et les plus courants.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '15_2',
          name: 'Les verbes en -ere et -ire',
          description:
            "Apprends les terminaisons des deuxième et troisième groupes et les verbes en -ire avec l'insertion de -isc-.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '15_3',
          name: 'Révision des verbes réguliers',
          description:
            'Exercices de consolidation pour conjuguer les verbes réguliers sans hésitation.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 16,
      name: 'Essere et avere : être et avoir.',
      description:
        "Maîtrise essere (être) et avere (avoir), les deux verbes les plus importants de l'italien. Conjugaison, emplois et expressions idiomatiques indispensables.",
      sub_lessons: [
        {
          id: '16_1',
          name: 'Essere : conjugaison et emplois',
          description:
            "Apprends la conjugaison complète d'essere et ses emplois (état, origine, profession).",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '16_2',
          name: 'Avere : conjugaison et expressions',
          description:
            "Maîtrise avere et ses expressions idiomatiques incontournables (avere fame, sete, paura...).",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '16_3',
          name: 'Révision essere et avere',
          description:
            'Exercices de consolidation pour utiliser être et avoir sans hésitation.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 17,
      name: 'La négation et les questions.',
      description:
        "Apprends à former des phrases négatives avec 'non' et à poser des questions en italien. Les mots interrogatifs et la structure des phrases interrogatives.",
      sub_lessons: [
        {
          id: '17_1',
          name: 'La négation',
          description:
            "Découvre comment utiliser 'non' et les doubles négations (non... mai, non... niente...).",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '17_2',
          name: 'Les questions',
          description:
            "Apprends à former des questions par intonation ou inversion et à utiliser les mots interrogatifs.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '17_3',
          name: 'Révision négation et questions',
          description:
            'Exercices de consolidation pour formuler négations et questions naturellement.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 18,
      name: 'Les prépositions simples.',
      description:
        "Maîtrise les prépositions di, a, da, in, con, su, per, tra/fra et leurs principales utilisations. Prépositions articulées (del, al, dal, nel...) incluses.",
      sub_lessons: [
        {
          id: '18_1',
          name: 'Les prépositions de lieu et de temps',
          description:
            "Apprends a, in, da, su pour exprimer le lieu, la direction et le temps.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '18_2',
          name: 'Les prépositions articulées',
          description:
            "Découvre les contractions di+il=del, a+il=al, da+il=dal, etc. et leurs règles d'usage.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '18_3',
          name: 'Révision des prépositions',
          description:
            'Exercices de consolidation pour choisir et utiliser les prépositions correctement.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
  ],
};

export default chapter2;
