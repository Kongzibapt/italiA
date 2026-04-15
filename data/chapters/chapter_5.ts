import type { Chapter } from '~/types/lessons/catalog';

const chapter5: Chapter = {
  id: 'grammaire-intermediaire',
  name: 'Grammaire intermédiaire',
  order: 5,
  lessons: [
    {
      id: 36,
      name: 'Les pronoms compléments directs.',
      description:
        "Apprends les pronoms COD (lo, la, li, le, mi, ti, ci, vi) pour éviter les répétitions et parler de façon naturelle. Leur place dans la phrase et avec les temps composés.",
      sub_lessons: [
        {
          id: '36_1',
          name: 'Les pronoms directs de base',
          description:
            "Découvre mi, ti, lo, la, ci, vi, li, le et comment les placer dans la phrase.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '36_2',
          name: 'Accord avec les temps composés',
          description:
            "Apprends l'accord du participe passé avec les pronoms COD aux temps composés.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '36_3',
          name: 'Révision pronoms directs',
          description:
            'Exercices de consolidation pour utiliser les pronoms COD avec aisance.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 37,
      name: 'Les pronoms compléments indirects.',
      description:
        "Maîtrise les pronoms COI (mi, ti, gli, le, ci, vi, loro) pour indiquer à qui ou pour qui se fait l'action. Distinction COD/COI et verbes qui gouvernent un COI.",
      sub_lessons: [
        {
          id: '37_1',
          name: 'Les pronoms indirects',
          description:
            "Découvre mi, ti, gli, le, ci, vi, loro et les verbes qui les régissent (parlare a, scrivere a, dare a...).",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '37_2',
          name: 'COD et COI combinés',
          description:
            "Apprends à combiner pronoms directs et indirects dans la même phrase (me lo, te lo, glielo...).",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '37_3',
          name: 'Révision pronoms indirects',
          description:
            'Exercices de consolidation pour maîtriser les pronoms COI et les combinaisons.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 38,
      name: 'Les verbes réfléchis.',
      description:
        "Apprends les verbes pronominaux italiens (alzarsi, lavarsi, vestirsi...) : conjugaison avec les pronoms réfléchis et emplois dans des contextes réels.",
      sub_lessons: [
        {
          id: '38_1',
          name: 'Les verbes réfléchis courants',
          description:
            "Découvre les verbes réfléchis du quotidien et leur conjugaison avec mi, ti, si, ci, vi, si.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '38_2',
          name: 'Verbes réfléchis aux temps composés',
          description:
            "Apprends que les verbes réfléchis se conjuguent toujours avec essere aux temps composés.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '38_3',
          name: 'Révision verbes réfléchis',
          description:
            'Exercices de consolidation pour utiliser les verbes réfléchis avec fluidité.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 39,
      name: "L'impératif.",
      description:
        "Maîtrise l'impératif pour donner des ordres, des conseils et des instructions. Formation au singulier et au pluriel, forme négative et pronoms avec l'impératif.",
      sub_lessons: [
        {
          id: '39_1',
          name: "Formation de l'impératif",
          description:
            "Apprends les terminaisons de l'impératif pour les trois groupes et les formes irrégulières (va', fa', sta'...).",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '39_2',
          name: "Impératif négatif et pronoms",
          description:
            "Découvre la forme négative (non + infinitif au singulier) et la position des pronoms avec l'impératif.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '39_3',
          name: "Révision de l'impératif",
          description:
            "Exercices de consolidation pour donner des ordres et des conseils naturellement.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 40,
      name: 'Le conditionnel présent.',
      description:
        "Étudie le conditionnel présent pour exprimer des souhaits, des hypothèses et faire des demandes polies. Formation, emplois et verbes irréguliers.",
      sub_lessons: [
        {
          id: '40_1',
          name: 'Formation du conditionnel',
          description:
            "Apprends les terminaisons du conditionnel et les principaux verbes irréguliers (vorrei, sarei, avrei...).",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '40_2',
          name: 'Emplois du conditionnel',
          description:
            "Découvre comment utiliser le conditionnel pour les souhaits, les hypothèses et les formules de politesse.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '40_3',
          name: 'Révision du conditionnel',
          description:
            'Exercices de consolidation pour utiliser le conditionnel présent avec aisance.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 41,
      name: 'Les adverbes.',
      description:
        "Apprends à former et utiliser les adverbes italiens : adverbes de manière (-mente), de temps, de lieu et de quantité. Leur place dans la phrase.",
      sub_lessons: [
        {
          id: '41_1',
          name: 'Les adverbes de manière',
          description:
            "Apprends à former les adverbes en -mente (lentamente, velocemente) et les adverbes irréguliers courants.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '41_2',
          name: 'Adverbes de temps, lieu et quantité',
          description:
            "Découvre sempre, mai, spesso, qui, là, molto, poco, abbastanza et leur place dans la phrase.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '41_3',
          name: 'Révision des adverbes',
          description:
            'Exercices de consolidation pour enrichir tes phrases avec des adverbes bien placés.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 42,
      name: 'Les comparatifs et superlatifs.',
      description:
        "Compare des personnes, des objets et des situations en italien : più...di, meno...di, così...come. Les superlatifs relatifs et absolus.",
      sub_lessons: [
        {
          id: '42_1',
          name: 'Le comparatif',
          description:
            "Apprends à comparer avec più di, meno di, (così) come et les formes irrégulières (migliore, peggiore).",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '42_2',
          name: 'Le superlatif',
          description:
            "Maîtrise le superlatif relatif (il più bello) et absolu (-issimo / molto) en contexte.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '42_3',
          name: 'Révision comparatifs et superlatifs',
          description:
            'Exercices de consolidation pour comparer et nuancer tes descriptions.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 43,
      name: 'Les pronoms relatifs.',
      description:
        "Apprends à utiliser che, cui, il quale pour relier des propositions et construire des phrases plus complexes et fluides.",
      sub_lessons: [
        {
          id: '43_1',
          name: 'Le pronom che',
          description:
            "Comprends l'emploi de 'che' comme sujet ou objet de la relative et ses différences avec le français.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '43_2',
          name: 'Cui et il quale',
          description:
            "Découvre 'cui' (avec préposition) et 'il quale / la quale' comme alternatives plus formelles.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '43_3',
          name: 'Révision pronoms relatifs',
          description:
            'Exercices de consolidation pour construire des phrases relatives avec aisance.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 44,
      name: 'Les indéfinis.',
      description:
        "Étudie les pronoms et adjectifs indéfinis : qualcuno, qualcosa, nessuno, tutto, ogni, alcuni, qualche. Emplois et nuances selon le contexte.",
      sub_lessons: [
        {
          id: '44_1',
          name: 'Indéfinis positifs',
          description:
            "Apprends qualcuno, qualcosa, alcuni, qualche, tutto, ogni et leurs constructions.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '44_2',
          name: 'Indéfinis négatifs et doubles négations',
          description:
            "Maîtrise nessuno, niente, nulla et les constructions à double négation (non vedo nessuno).",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '44_3',
          name: 'Révision des indéfinis',
          description:
            'Exercices de consolidation pour utiliser les indéfinis avec précision.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
  ],
};

export default chapter5;
