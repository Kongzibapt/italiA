import { defineCatalog } from '~/types/lessons/defineCatalog';

export default defineCatalog({
  themes: [
    {
      id: 'alphabet-prononciation',
      name: 'Alphabet et Prononciation',
      order: 1,
      lessons: [
        {
          id: 1,
          order: 1,
          name: "Apprendre l'alphabet italien.",
          description:
            "Découvre les 21 lettres de l'alphabet italien, leurs noms et leur prononciation. Apprends à distinguer les sons spécifiques à l'italien et les différences avec l'alphabet français.",
          sub_lessons: [
            {
              id: '1_1',
              name: "Introduction à l'alphabet italien",
              description:
                "Découvre les lettres de l'alphabet italien et leurs noms. Exercices d'identification et de prononciation de base.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '1_2',
              name: "Maîtrise de l'alphabet italien",
              description:
                "Approfondis ta connaissance de l'alphabet avec des exercices de dictée et de reconnaissance des sons.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '1_3',
              name: "Rappel et consolidation de l'alphabet",
              description:
                "Exercices de révision et de consolidation pour maintenir ta maîtrise de l'alphabet italien.",
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 2,
          order: 2,
          name: 'Maîtriser la prononciation des lettres et des sons.',
          description:
            "Approfondis la prononciation italienne : les consonnes doubles, les combinaisons de lettres (gn, gl, sc), les accents et l'intonation. Exercices pratiques de prononciation inclus.",
          sub_lessons: [
            {
              id: '2_1',
              name: 'Introduction aux sons italiens',
              description:
                "Découvre les sons spécifiques à l'italien et les règles de base de la prononciation.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '2_2',
              name: 'Perfectionnement de la prononciation',
              description:
                "Exercices avancés sur les consonnes doubles, les combinaisons de lettres et l'intonation.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '2_3',
              name: 'Rappel et perfectionnement de la prononciation',
              description:
                'Exercices de révision et de perfectionnement pour maintenir une prononciation naturelle.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'vocabulaire-base',
      name: 'Vocabulaire de Base',
      order: 2,
      lessons: [
        {
          id: 9,
          order: 3,
          name: 'Les salutations et les présentations.',
          description:
            'Apprends les formules de politesse essentielles, les salutations selon le moment de la journée et les présentations formelles et informelles.',
          sub_lessons: [
            {
              id: '9_1',
              name: 'Introduction aux salutations',
              description:
                'Découvre les formules de politesse de base et les salutations courantes.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '9_2',
              name: 'Maîtrise des salutations',
              description:
                'Approfondis les présentations formelles et informelles selon le contexte.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '9_3',
              name: 'Rappel et consolidation des salutations',
              description:
                'Exercices de révision et de consolidation pour une communication naturelle.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 10,
          order: 4,
          name: 'Les nombres.',
          description:
            'Maîtrise les nombres de 0 à 100, les nombres ordinaux et leur utilisation dans les dates et les heures.',
          sub_lessons: [
            {
              id: '10_1',
              name: 'Introduction aux nombres',
              description:
                'Découvre les nombres de 0 à 100 et leur prononciation.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '10_2',
              name: 'Maîtrise des nombres',
              description:
                'Approfondis les nombres ordinaux et leur utilisation dans les dates et les heures.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '10_3',
              name: 'Rappel et consolidation des nombres',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle des nombres.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 11,
          order: 5,
          name: 'Les jours de la semaine et les mois.',
          description:
            'Découvre le vocabulaire des jours de la semaine, des mois et des saisons. Apprends à parler de la date et du temps.',
          sub_lessons: [
            {
              id: '11_1',
              name: 'Introduction aux jours et mois',
              description:
                "Découvre les jours de la semaine et les mois de l'année.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '11_2',
              name: 'Maîtrise des jours et mois',
              description:
                "Approfondis les saisons et l'expression de la date.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '11_3',
              name: 'Rappel et consolidation des jours et mois',
              description:
                'Exercices de révision et de consolidation pour parler naturellement du temps.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 12,
          order: 6,
          name: 'Les couleurs.',
          description:
            'Apprends les noms des couleurs principales et leur accord en genre et nombre avec les noms.',
          sub_lessons: [
            {
              id: '12_1',
              name: 'Introduction aux couleurs',
              description:
                'Découvre les couleurs principales et leur accord de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '12_2',
              name: 'Maîtrise des couleurs',
              description:
                'Approfondis les expressions idiomatiques avec les couleurs.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '12_3',
              name: 'Rappel et consolidation des couleurs',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle des couleurs.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 13,
          order: 7,
          name: 'Les membres de la famille.',
          description:
            'Étudie le vocabulaire de la famille élargie et les expressions courantes liées aux relations familiales.',
          sub_lessons: [
            {
              id: '13_1',
              name: 'Introduction à la famille',
              description:
                'Découvre les membres de la famille proche et leurs relations.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '13_2',
              name: 'Maîtrise de la famille',
              description:
                'Approfondis la famille élargie et les expressions courantes.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '13_3',
              name: 'Rappel et consolidation de la famille',
              description:
                'Exercices de révision et de consolidation pour parler naturellement de la famille.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 14,
          order: 8,
          name: 'Les animaux.',
          description:
            'Découvre les noms des animaux domestiques et sauvages courants, avec leurs caractéristiques principales.',
          sub_lessons: [
            {
              id: '14_1',
              name: 'Introduction aux animaux',
              description:
                'Découvre les animaux domestiques et leurs caractéristiques de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '14_2',
              name: 'Maîtrise des animaux',
              description:
                'Approfondis les animaux sauvages et leurs habitats.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '14_3',
              name: 'Rappel et consolidation des animaux',
              description:
                'Exercices de révision et de consolidation pour parler naturellement des animaux.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 15,
          order: 9,
          name: 'Les aliments et les boissons.',
          description:
            'Apprends le vocabulaire des aliments de base, des boissons et des expressions liées à la nourriture.',
          sub_lessons: [
            {
              id: '15_1',
              name: 'Introduction aux aliments',
              description:
                'Découvre les aliments de base et les boissons courantes.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '15_2',
              name: 'Maîtrise des aliments',
              description:
                'Approfondis les expressions liées à la nourriture et aux repas.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '15_3',
              name: 'Rappel et consolidation des aliments',
              description:
                'Exercices de révision et de consolidation pour parler naturellement de la nourriture.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 16,
          order: 10,
          name: 'Les vêtements.',
          description:
            "Maîtrise le vocabulaire des vêtements et des accessoires, avec les expressions liées à l'habillement.",
          sub_lessons: [
            {
              id: '16_1',
              name: 'Introduction aux vêtements',
              description:
                'Découvre les vêtements de base et les accessoires courants.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '16_2',
              name: 'Maîtrise des vêtements',
              description:
                "Approfondis les expressions liées à l'habillement et aux achats.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '16_3',
              name: 'Rappel et consolidation des vêtements',
              description:
                'Exercices de révision et de consolidation pour parler naturellement des vêtements.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 17,
          order: 11,
          name: 'Les transports.',
          description:
            'Étudie les moyens de transport et les expressions utiles pour voyager en Italie.',
          sub_lessons: [
            {
              id: '17_1',
              name: 'Introduction aux transports',
              description:
                'Découvre les moyens de transport principaux et leur vocabulaire de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '17_2',
              name: 'Maîtrise des transports',
              description:
                'Approfondis les expressions utiles pour voyager et se déplacer.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '17_3',
              name: 'Rappel et consolidation des transports',
              description:
                'Exercices de révision et de consolidation pour parler naturellement des transports.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 18,
          order: 12,
          name: 'Les professions.',
          description:
            'Apprends les noms des métiers courants et les expressions liées au monde du travail.',
          sub_lessons: [
            {
              id: '18_1',
              name: 'Introduction aux professions',
              description:
                'Découvre les métiers courants et leur vocabulaire de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '18_2',
              name: 'Maîtrise des professions',
              description:
                'Approfondis les expressions liées au monde du travail.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '18_3',
              name: 'Rappel et consolidation des professions',
              description:
                'Exercices de révision et de consolidation pour parler naturellement des professions.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'grammaire-base',
      name: 'Grammaire de Base',
      order: 3,
      lessons: [
        {
          id: 3,
          order: 13,
          name: 'Les articles définis et indéfinis.',
          description:
            "Apprends à utiliser il, la, i, gli, le (articles définis) et un, una, degli, delle (articles indéfinis). Règles d'utilisation et exceptions courantes.",
          sub_lessons: [
            {
              id: '3_1',
              name: 'Introduction aux articles',
              description:
                'Découvre les articles définis et indéfinis de base et leurs emplois simples.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '3_2',
              name: 'Maîtrise des articles',
              description:
                "Approfondis l'utilisation des articles avec les exceptions et les cas particuliers.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '3_3',
              name: 'Rappel et consolidation des articles',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle des articles.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 4,
          order: 14,
          name: 'Les noms (genre et nombre).',
          description:
            'Maîtrise le genre (masculin/féminin) et le nombre (singulier/pluriel) des noms italiens. Règles de formation du pluriel et exceptions importantes.',
          sub_lessons: [
            {
              id: '4_1',
              name: 'Introduction aux noms',
              description:
                'Découvre les règles de base du genre et du nombre des noms italiens.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '4_2',
              name: 'Maîtrise des noms',
              description:
                'Approfondis les règles de formation du pluriel et les exceptions courantes.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '4_3',
              name: 'Rappel et consolidation des noms',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle des noms.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 5,
          order: 15,
          name: 'Les adjectifs (accord en genre et nombre).',
          description:
            "Découvre les règles d'accord des adjectifs avec les noms, la position des adjectifs et les adjectifs invariables. Exercices d'application inclus.",
          sub_lessons: [
            {
              id: '5_1',
              name: 'Introduction aux adjectifs',
              description:
                "Découvre les règles de base de l'accord des adjectifs avec les noms.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '5_2',
              name: 'Maîtrise des adjectifs',
              description:
                'Approfondis la position des adjectifs et les adjectifs invariables.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '5_3',
              name: 'Rappel et consolidation des adjectifs',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle des adjectifs.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 6,
          order: 16,
          name: 'Les pronoms personnels.',
          description:
            'Étudie les pronoms personnels sujets et compléments (directs et indirects). Apprends à les utiliser dans des phrases simples et complexes.',
          sub_lessons: [
            {
              id: '6_1',
              name: 'Introduction aux pronoms personnels',
              description:
                'Découvre les pronoms personnels sujets et leurs emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '6_2',
              name: 'Maîtrise des pronoms personnels',
              description:
                "Approfondis l'utilisation des pronoms compléments directs et indirects.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '6_3',
              name: 'Rappel et consolidation des pronoms',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle des pronoms.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 7,
          order: 17,
          name: 'Les verbes réguliers et irréguliers au présent.',
          description:
            "Apprends les trois groupes de verbes réguliers (-are, -ere, -ire) et les principaux verbes irréguliers au présent. Exercices de conjugaison et d'utilisation.",
          sub_lessons: [
            {
              id: '7_1',
              name: 'Introduction aux verbes',
              description:
                'Découvre les trois groupes de verbes réguliers et leur conjugaison au présent.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '7_2',
              name: 'Maîtrise des verbes',
              description:
                'Approfondis les verbes irréguliers courants et leurs emplois.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '7_3',
              name: 'Rappel et consolidation des verbes',
              description:
                'Exercices de révision et de consolidation pour une conjugaison naturelle.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'conjugaison-verbes',
      name: 'Conjugaison des Verbes',
      order: 4,
      lessons: [
        {
          id: 8,
          order: 18,
          name: "Le présent de l'indicatif.",
          description:
            "Approfondis l'utilisation du présent de l'indicatif : formation, emplois temporels et expressions idiomatiques courantes.",
          sub_lessons: [
            {
              id: '8_1',
              name: 'Introduction au présent',
              description:
                "Découvre les emplois de base du présent de l'indicatif et sa formation.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '8_2',
              name: 'Maîtrise du présent',
              description:
                'Approfondis les emplois temporels et les expressions idiomatiques avec le présent.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '8_3',
              name: 'Rappel et consolidation du présent',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle du présent.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 33,
          order: 19,
          name: 'Le passé composé.',
          description:
            'Maîtrise le passato prossimo : formation avec essere et avere, accord du participe passé et emplois courants.',
          sub_lessons: [
            {
              id: '33_1',
              name: 'Introduction au passé composé',
              description:
                'Découvre la formation du passato prossimo avec essere et avere.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '33_2',
              name: 'Maîtrise du passé composé',
              description:
                "Approfondis l'accord du participe passé et les emplois courants.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '33_3',
              name: 'Rappel et consolidation du passé composé',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle du passé composé.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 34,
          order: 20,
          name: "L'imparfait.",
          description:
            "Apprends l'imperfetto : formation, emplois pour décrire des habitudes passées et des actions en cours dans le passé.",
          sub_lessons: [
            {
              id: '34_1',
              name: "Introduction à l'imparfait",
              description:
                "Découvre la formation de l'imperfetto et ses emplois de base.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '34_2',
              name: "Maîtrise de l'imparfait",
              description:
                'Approfondis les emplois pour décrire des habitudes et des actions en cours.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '34_3',
              name: "Rappel et consolidation de l'imparfait",
              description:
                "Exercices de révision et de consolidation pour une utilisation naturelle de l'imparfait.",
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 35,
          order: 21,
          name: 'Le futur simple.',
          description:
            'Découvre le futur simple : formation, emplois pour exprimer des projets et des prévisions.',
          sub_lessons: [
            {
              id: '35_1',
              name: 'Introduction au futur simple',
              description:
                'Découvre la formation du futur simple et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '35_2',
              name: 'Maîtrise du futur simple',
              description:
                'Approfondis les emplois pour exprimer des projets et des prévisions.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '35_3',
              name: 'Rappel et consolidation du futur simple',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle du futur simple.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 36,
          order: 22,
          name: 'Le conditionnel présent.',
          description:
            'Étudie le conditionnel présent : formation, emplois pour exprimer des souhaits et des hypothèses.',
          sub_lessons: [
            {
              id: '36_1',
              name: 'Introduction au conditionnel présent',
              description:
                'Découvre la formation du conditionnel présent et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '36_2',
              name: 'Maîtrise du conditionnel présent',
              description:
                'Approfondis les emplois pour exprimer des souhaits et des hypothèses.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '36_3',
              name: 'Rappel et consolidation du conditionnel présent',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle du conditionnel présent.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 37,
          order: 23,
          name: 'Le subjonctif présent.',
          description:
            'Apprends le subjonctif présent : formation, emplois après certaines conjonctions et expressions.',
          sub_lessons: [
            {
              id: '37_1',
              name: 'Introduction au subjonctif présent',
              description:
                'Découvre la formation du subjonctif présent et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '37_2',
              name: 'Maîtrise du subjonctif présent',
              description:
                'Approfondis les emplois après les conjonctions et expressions courantes.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '37_3',
              name: 'Rappel et consolidation du subjonctif présent',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle du subjonctif présent.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 38,
          order: 24,
          name: "L'impératif.",
          description:
            "Maîtrise l'impératif : formation au singulier et au pluriel, emplois pour donner des ordres et des conseils.",
          sub_lessons: [
            {
              id: '38_1',
              name: "Introduction à l'impératif",
              description:
                "Découvre la formation de l'impératif et ses emplois de base.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '38_2',
              name: "Maîtrise de l'impératif",
              description:
                'Approfondis les emplois pour donner des ordres et des conseils.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '38_3',
              name: "Rappel et consolidation de l'impératif",
              description:
                "Exercices de révision et de consolidation pour une utilisation naturelle de l'impératif.",
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'syntaxe-structure',
      name: 'Syntaxe et Structure des Phrases',
      order: 6,
      lessons: [
        {
          id: 46,
          order: 30,
          name: "L'ordre des mots dans la phrase.",
          description:
            'Comprends la structure de base de la phrase italienne et les variations possibles selon le contexte.',
          sub_lessons: [
            {
              id: '46_1',
              name: "Introduction à l'ordre des mots",
              description:
                'Découvre la structure de base de la phrase italienne et ses composants essentiels.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '46_2',
              name: "Maîtrise de l'ordre des mots",
              description:
                "Approfondis les variations possibles de l'ordre des mots selon le contexte.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '46_3',
              name: "Rappel et consolidation de l'ordre des mots",
              description:
                'Exercices de révision et de consolidation pour maîtriser la structure des phrases.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 47,
          order: 31,
          name: 'Les phrases affirmatives, négatives et interrogatives.',
          description:
            'Apprends à former et à utiliser les différents types de phrases avec les structures appropriées.',
          sub_lessons: [
            {
              id: '47_1',
              name: 'Introduction aux types de phrases',
              description:
                'Découvre les structures de base des phrases affirmatives, négatives et interrogatives.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '47_2',
              name: 'Maîtrise des types de phrases',
              description:
                'Approfondis les variations et les nuances de chaque type de phrase.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '47_3',
              name: 'Rappel et consolidation des types de phrases',
              description:
                'Exercices de révision et de consolidation pour utiliser les différents types de phrases.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 48,
          order: 32,
          name: 'Les phrases exclamatives.',
          description:
            "Découvre les expressions d'émotion et d'exclamation en italien.",
          sub_lessons: [
            {
              id: '48_1',
              name: 'Introduction aux phrases exclamatives',
              description:
                'Découvre les structures de base des phrases exclamatives et leur utilisation.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '48_2',
              name: 'Maîtrise des phrases exclamatives',
              description:
                "Approfondis les différentes expressions d'émotion et d'exclamation.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '48_3',
              name: 'Rappel et consolidation des phrases exclamatives',
              description:
                'Exercices de révision et de consolidation pour exprimer les émotions.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 49,
          order: 33,
          name: 'Les phrases complexes (subordonnées).',
          description:
            'Étudie la formation des phrases complexes avec les principales conjonctions et leurs emplois.',
          sub_lessons: [
            {
              id: '49_1',
              name: 'Introduction aux phrases complexes',
              description:
                'Découvre les structures de base des phrases complexes et les conjonctions principales.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '49_2',
              name: 'Maîtrise des phrases complexes',
              description:
                'Approfondis les différents types de subordonnées et leurs emplois.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '49_3',
              name: 'Rappel et consolidation des phrases complexes',
              description:
                'Exercices de révision et de consolidation pour construire des phrases complexes.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'temps-modes-verbaux',
      name: 'Temps et Modes Verbaux',
      order: 7,
      lessons: [
        {
          id: 39,
          order: 34,
          name: 'Le passé simple.',
          description:
            'Apprends le passato remoto : formation et emplois littéraires et historiques.',
          sub_lessons: [
            {
              id: '39_1',
              name: 'Introduction au passé simple',
              description:
                'Découvre la formation du passato remoto et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '39_2',
              name: 'Maîtrise du passé simple',
              description:
                'Approfondis les emplois littéraires et historiques du passato remoto.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '39_3',
              name: 'Rappel et consolidation du passé simple',
              description:
                'Exercices de révision et de consolidation pour maîtriser le passato remoto.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 40,
          order: 35,
          name: 'Le plus-que-parfait.',
          description:
            "Maîtrise le trapassato prossimo : formation et emplois pour exprimer l'antériorité dans le passé.",
          sub_lessons: [
            {
              id: '40_1',
              name: 'Introduction au plus-que-parfait',
              description:
                'Découvre la formation du trapassato prossimo et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '40_2',
              name: 'Maîtrise du plus-que-parfait',
              description:
                "Approfondis l'expression de l'antériorité dans le passé.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '40_3',
              name: 'Rappel et consolidation du plus-que-parfait',
              description:
                'Exercices de révision et de consolidation pour maîtriser le trapassato prossimo.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 41,
          order: 36,
          name: 'Le futur antérieur.',
          description:
            "Étudie le futuro anteriore : formation et emplois pour exprimer l'antériorité dans le futur.",
          sub_lessons: [
            {
              id: '41_1',
              name: 'Introduction au futur antérieur',
              description:
                'Découvre la formation du futuro anteriore et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '41_2',
              name: 'Maîtrise du futur antérieur',
              description:
                "Approfondis l'expression de l'antériorité dans le futur.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '41_3',
              name: 'Rappel et consolidation du futur antérieur',
              description:
                'Exercices de révision et de consolidation pour maîtriser le futuro anteriore.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 42,
          order: 37,
          name: 'Le conditionnel passé.',
          description:
            'Apprends le conditionnel passé : formation et emplois pour exprimer des regrets et des hypothèses non réalisées.',
          sub_lessons: [
            {
              id: '42_1',
              name: 'Introduction au conditionnel passé',
              description:
                'Découvre la formation du conditionnel passé et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '42_2',
              name: 'Maîtrise du conditionnel passé',
              description:
                "Approfondis l'expression des regrets et des hypothèses non réalisées.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '42_3',
              name: 'Rappel et consolidation du conditionnel passé',
              description:
                'Exercices de révision et de consolidation pour maîtriser le conditionnel passé.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 43,
          order: 38,
          name: 'Le subjonctif imparfait.',
          description:
            'Découvre le subjonctif imparfait : formation et emplois dans les phrases complexes.',
          sub_lessons: [
            {
              id: '43_1',
              name: 'Introduction au subjonctif imparfait',
              description:
                'Découvre la formation du subjonctif imparfait et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '43_2',
              name: 'Maîtrise du subjonctif imparfait',
              description:
                'Approfondis les emplois dans les phrases complexes.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '43_3',
              name: 'Rappel et consolidation du subjonctif imparfait',
              description:
                'Exercices de révision et de consolidation pour maîtriser le subjonctif imparfait.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 44,
          order: 39,
          name: 'Le subjonctif passé.',
          description:
            'Maîtrise le subjonctif passé : formation et emplois pour exprimer des actions passées dans le subjonctif.',
          sub_lessons: [
            {
              id: '44_1',
              name: 'Introduction au subjonctif passé',
              description:
                'Découvre la formation du subjonctif passé et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '44_2',
              name: 'Maîtrise du subjonctif passé',
              description:
                "Approfondis l'expression des actions passées dans le subjonctif.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '44_3',
              name: 'Rappel et consolidation du subjonctif passé',
              description:
                'Exercices de révision et de consolidation pour maîtriser le subjonctif passé.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 45,
          order: 40,
          name: 'Le subjonctif plus-que-parfait.',
          description:
            'Étudie le subjonctif plus-que-parfait : formation et emplois dans les phrases complexes du passé.',
          sub_lessons: [
            {
              id: '45_1',
              name: 'Introduction au subjonctif plus-que-parfait',
              description:
                'Découvre la formation du subjonctif plus-que-parfait et ses emplois de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '45_2',
              name: 'Maîtrise du subjonctif plus-que-parfait',
              description:
                'Approfondis les emplois dans les phrases complexes du passé.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '45_3',
              name: 'Rappel et consolidation du subjonctif plus-que-parfait',
              description:
                'Exercices de révision et de consolidation pour maîtriser le subjonctif plus-que-parfait.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'lecture-comprehension',
      name: 'Lecture et Compréhension Écrite',
      order: 8,
      lessons: [
        {
          id: 27,
          order: 44,
          name: 'Les textes simples et les histoires courtes.',
          description:
            'Lis et comprends des textes simples adaptés à ta niveau, avec exercices de compréhension.',
          sub_lessons: [
            {
              id: '27_1',
              name: 'Introduction aux textes simples',
              description:
                'Découvre les techniques de base pour comprendre des textes courts et simples.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '27_2',
              name: 'Maîtrise des textes simples',
              description:
                'Approfondis ta compréhension avec des textes plus élaborés et des exercices variés.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '27_3',
              name: 'Rappel et consolidation des textes simples',
              description:
                'Exercices de révision et de consolidation pour une compréhension approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 28,
          order: 45,
          name: 'Les articles de presse.',
          description:
            'Apprends à lire et à comprendre des articles de presse italiens, avec focus sur le vocabulaire journalistique.',
          sub_lessons: [
            {
              id: '28_1',
              name: 'Introduction aux articles de presse',
              description:
                'Découvre la structure des articles de presse et le vocabulaire journalistique de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '28_2',
              name: 'Maîtrise des articles de presse',
              description:
                "Approfondis ta compréhension des différents types d'articles et leur analyse.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '28_3',
              name: 'Rappel et consolidation des articles de presse',
              description:
                'Exercices de révision et de consolidation pour une lecture critique des médias.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 53,
          order: 46,
          name: 'Les romans et les nouvelles.',
          description:
            'Découvre la littérature italienne à travers des extraits de romans et de nouvelles adaptés.',
          sub_lessons: [
            {
              id: '53_1',
              name: 'Introduction aux romans et nouvelles',
              description:
                'Découvre les techniques de base pour aborder la littérature italienne.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '53_2',
              name: 'Maîtrise des romans et nouvelles',
              description:
                'Approfondis ta compréhension des œuvres littéraires et leur analyse.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '53_3',
              name: 'Rappel et consolidation des romans et nouvelles',
              description:
                'Exercices de révision et de consolidation pour une lecture littéraire approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 54,
          order: 47,
          name: 'Les poèmes et les chansons.',
          description:
            'Étudie la poésie et les chansons italiennes pour enrichir ta compréhension culturelle et linguistique.',
          sub_lessons: [
            {
              id: '54_1',
              name: 'Introduction aux poèmes et chansons',
              description:
                'Découvre les techniques de base pour comprendre la poésie et les chansons italiennes.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '54_2',
              name: 'Maîtrise des poèmes et chansons',
              description:
                'Approfondis ta compréhension des figures de style et des expressions poétiques.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '54_3',
              name: 'Rappel et consolidation des poèmes et chansons',
              description:
                'Exercices de révision et de consolidation pour une analyse poétique approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'ecriture',
      name: 'Écriture',
      order: 9,
      lessons: [
        {
          id: 29,
          order: 48,
          name: 'Les lettres et les emails.',
          description:
            'Apprends à rédiger des lettres et des emails en italien, formels et informels.',
          sub_lessons: [
            {
              id: '29_1',
              name: 'Introduction aux lettres et emails',
              description:
                'Découvre les structures de base pour rédiger des lettres et emails simples.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '29_2',
              name: 'Maîtrise des lettres et emails',
              description:
                'Approfondis les formules de politesse et les styles formels et informels.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '29_3',
              name: 'Rappel et consolidation des lettres et emails',
              description:
                'Exercices de révision et de consolidation pour une rédaction naturelle.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 30,
          order: 49,
          name: 'Les rédactions et les essais.',
          description:
            'Maîtrise la structure des rédactions et des essais en italien, avec exercices pratiques.',
          sub_lessons: [
            {
              id: '30_1',
              name: 'Introduction aux rédactions',
              description:
                'Découvre les structures de base pour rédiger des textes courts.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '30_2',
              name: 'Maîtrise des rédactions',
              description:
                'Approfondis la structure des essais et le développement des idées.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '30_3',
              name: 'Rappel et consolidation des rédactions',
              description:
                'Exercices de révision et de consolidation pour une rédaction structurée.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 31,
          order: 50,
          name: 'Les résumés et les synthèses.',
          description:
            'Apprends à résumer des textes en italien, en respectant les règles de la synthèse.',
          sub_lessons: [
            {
              id: '31_1',
              name: 'Introduction aux résumés',
              description:
                'Découvre les techniques de base pour résumer des textes courts.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '31_2',
              name: 'Maîtrise des résumés',
              description:
                "Approfondis les techniques de synthèse et d'analyse de textes.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '31_3',
              name: 'Rappel et consolidation des résumés',
              description:
                'Exercices de révision et de consolidation pour une synthèse efficace.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 32,
          order: 51,
          name: 'Les exercices de grammaire et de vocabulaire.',
          description:
            "Pratique l'écriture à travers des exercices structurés de grammaire et de vocabulaire.",
          sub_lessons: [
            {
              id: '32_1',
              name: "Introduction aux exercices d'écriture",
              description:
                "Découvre les exercices de base pour pratiquer l'écriture.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '32_2',
              name: "Maîtrise des exercices d'écriture",
              description:
                'Approfondis les exercices complexes de grammaire et de vocabulaire.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '32_3',
              name: "Rappel et consolidation des exercices d'écriture",
              description:
                'Exercices de révision et de consolidation pour une maîtrise complète.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'pratique-ecoute',
      name: "Pratique de l'Écoute",
      order: 10,
      lessons: [
        {
          id: 55,
          order: 52,
          name: 'Les podcasts et les émissions de radio.',
          description:
            'Écoute et comprends des podcasts et des émissions de radio italiens adaptés à ton niveau.',
          sub_lessons: [
            {
              id: '55_1',
              name: 'Introduction aux podcasts',
              description:
                "Découvre les podcasts adaptés aux débutants et les techniques d'écoute active.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '55_2',
              name: 'Maîtrise des podcasts',
              description:
                'Approfondis ta compréhension avec des podcasts plus complexes et des émissions de radio.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '55_3',
              name: 'Rappel et consolidation des podcasts',
              description:
                'Exercices de révision et de consolidation pour une compréhension approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 56,
          order: 53,
          name: 'Les films et les séries télévisées.',
          description:
            'Regarde des films et séries italiens avec sous-titres pour améliorer ta compréhension orale.',
          sub_lessons: [
            {
              id: '56_1',
              name: 'Introduction aux films',
              description:
                'Découvre les films adaptés aux débutants et les techniques de compréhension avec sous-titres.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '56_2',
              name: 'Maîtrise des films',
              description:
                'Approfondisse ta compréhension avec des films plus complexes et des séries télévisées.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '56_3',
              name: 'Rappel et consolidation des films',
              description:
                'Exercices de révision et de consolidation pour une compréhension approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 57,
          order: 54,
          name: 'Les chansons et les musiques italiennes.',
          description:
            'Découvre la musique italienne tout en améliorant ta compréhension orale.',
          sub_lessons: [
            {
              id: '57_1',
              name: 'Introduction à la musique',
              description:
                'Découvre les chansons populaires et les techniques de compréhension des paroles.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '57_2',
              name: 'Maîtrise de la musique',
              description:
                'Approfondis ta compréhension avec des chansons plus complexes et différents genres musicaux.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '57_3',
              name: 'Rappel et consolidation de la musique',
              description:
                'Exercices de révision et de consolidation pour une compréhension approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 58,
          order: 55,
          name: 'Exercices de Dictée en Italien : Améliorer la Compréhension et la Production Orale',
          description:
            'Pratique la dictée pour améliorer ta compréhension et ta orthographe en italien.',
          sub_lessons: [
            {
              id: '58_1',
              name: 'Introduction à la dictée',
              description:
                'Découvre les exercices de dictée simples et les techniques de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '58_2',
              name: 'Maîtrise de la dictée',
              description:
                'Approfondis vos compétences avec des dictées plus complexes et des exercices variés.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '58_3',
              name: 'Rappel et consolidation de la dictée',
              description:
                'Exercices de révision et de consolidation pour une maîtrise complète.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'vocabulaire-avance',
      name: 'Vocabulaire Avancé',
      order: 11,
      lessons: [
        {
          id: 19,
          order: 1,
          name: 'Les expressions idiomatiques.',
          description:
            'Découvre les expressions idiomatiques courantes en italien et leur signification culturelle.',
          sub_lessons: [
            {
              id: '19_1',
              name: 'Introduction aux expressions idiomatiques',
              description:
                'Découvre les expressions idiomatiques de base et leur utilisation courante.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '19_2',
              name: 'Maîtrise des expressions idiomatiques',
              description:
                'Approfondis les expressions plus complexes et leur contexte culturel.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '19_3',
              name: 'Rappel et consolidation des expressions idiomatiques',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle des expressions.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 20,
          order: 2,
          name: 'Les proverbes italiens.',
          description:
            'Étudie les proverbes populaires italiens et leur signification dans la culture italienne.',
          sub_lessons: [
            {
              id: '20_1',
              name: 'Introduction aux proverbes',
              description:
                'Découvre les proverbes courants et leur signification de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '20_2',
              name: 'Maîtrise des proverbes',
              description:
                'Approfondis les proverbes plus complexes et leur contexte culturel.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '20_3',
              name: 'Rappel et consolidation des proverbes',
              description:
                'Exercices de révision et de consolidation pour une utilisation naturelle des proverbes.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 21,
          order: 3,
          name: 'Le vocabulaire de la cuisine.',
          description:
            'Apprends le vocabulaire spécifique à la cuisine italienne, les ingrédients et les techniques culinaires.',
          sub_lessons: [
            {
              id: '21_1',
              name: 'Introduction à la cuisine',
              description:
                'Découvre les ingrédients de base et les techniques culinaires simples.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '21_2',
              name: 'Maîtrise de la cuisine',
              description:
                'Approfondis les recettes traditionnelles et le vocabulaire spécialisé.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '21_3',
              name: 'Rappel et consolidation de la cuisine',
              description:
                'Exercices de révision et de consolidation pour parler naturellement de la cuisine.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 22,
          order: 4,
          name: "Le vocabulaire de l'art.",
          description:
            "Explore le vocabulaire lié aux différents domaines artistiques et à l'histoire de l'art italienne.",
          sub_lessons: [
            {
              id: '22_1',
              name: "Introduction à l'art",
              description:
                'Découvre les termes de base liés aux différents domaines artistiques.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '22_2',
              name: "Maîtrise de l'art",
              description:
                "Approfondis le vocabulaire spécialisé de l'histoire de l'art.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '22_3',
              name: "Rappel et consolidation de l'art",
              description:
                "Exercices de révision et de consolidation pour parler naturellement de l'art.",
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 23,
          order: 5,
          name: 'Le vocabulaire de la mode.',
          description:
            'Maîtrise le vocabulaire de la mode italienne, des tendances et des styles vestimentaires.',
          sub_lessons: [
            {
              id: '23_1',
              name: 'Introduction à la mode',
              description:
                'Découvre les termes de base liés à la mode et aux tendances.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '23_2',
              name: 'Maîtrise de la mode',
              description:
                'Approfondis le vocabulaire spécialisé de la haute couture.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '23_3',
              name: 'Rappel et consolidation de la mode',
              description:
                'Exercices de révision et de consolidation pour parler naturellement de la mode.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 24,
          order: 6,
          name: 'Le vocabulaire du cinéma.',
          description:
            'Découvre le vocabulaire du cinéma italien, des genres cinématographiques et des techniques.',
          sub_lessons: [
            {
              id: '24_1',
              name: 'Introduction au cinéma',
              description:
                'Découvre les termes de base liés au cinéma et aux genres.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '24_2',
              name: 'Maîtrise du cinéma',
              description:
                "Approfondis le vocabulaire technique et l'histoire du cinéma italien.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '24_3',
              name: 'Rappel et consolidation du cinéma',
              description:
                'Exercices de révision et de consolidation pour parler naturellement du cinéma.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 25,
          order: 7,
          name: 'Le vocabulaire de la musique.',
          description:
            'Apprends le vocabulaire musical, les instruments et les genres musicaux italiens.',
          sub_lessons: [
            {
              id: '25_1',
              name: 'Introduction à la musique',
              description:
                'Découvre les termes de base liés à la musique et aux instruments.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '25_2',
              name: 'Maîtrise de la musique',
              description:
                'Approfondis le vocabulaire spécialisé et les genres musicaux.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '25_3',
              name: 'Rappel et consolidation de la musique',
              description:
                'Exercices de révision et de consolidation pour parler naturellement de la musique.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 26,
          order: 8,
          name: 'Le vocabulaire de la littérature.',
          description:
            'Explore le vocabulaire littéraire, les genres et les auteurs italiens célèbres.',
          sub_lessons: [
            {
              id: '26_1',
              name: 'Introduction à la littérature',
              description:
                'Découvre les termes de base liés à la littérature et aux genres.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '26_2',
              name: 'Maîtrise de la littérature',
              description:
                'Approfondis le vocabulaire spécialisé et les auteurs majeurs.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '26_3',
              name: 'Rappel et consolidation de la littérature',
              description:
                'Exercices de révision et de consolidation pour parler naturellement de la littérature.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 27,
          order: 9,
          name: "Le vocabulaire de l'architecture.",
          description:
            'Maîtrise le vocabulaire architectural, les styles et les monuments italiens.',
          sub_lessons: [
            {
              id: '27_1',
              name: "Introduction à l'architecture",
              description:
                "Découvre les termes de base liés à l'architecture et aux styles.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '27_2',
              name: "Maîtrise de l'architecture",
              description:
                'Approfondis le vocabulaire spécialisé et les monuments historiques.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '27_3',
              name: "Rappel et consolidation de l'architecture",
              description:
                "Exercices de révision et de consolidation pour parler naturellement de l'architecture.",
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 28,
          order: 10,
          name: 'Le vocabulaire de la politique.',
          description:
            'Étudie le vocabulaire politique, les institutions et les concepts démocratiques.',
          sub_lessons: [
            {
              id: '28_1',
              name: 'Introduction à la politique',
              description:
                'Découvre les termes de base liés à la politique et aux institutions.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '28_2',
              name: 'Maîtrise de la politique',
              description:
                'Approfondis le vocabulaire spécialisé et les concepts démocratiques.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '28_3',
              name: 'Rappel et consolidation de la politique',
              description:
                'Exercices de révision et de consolidation pour parler naturellement de la politique.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 29,
          order: 11,
          name: "Le vocabulaire de l'économie.",
          description:
            'Apprends le vocabulaire économique, les concepts financiers et le commerce.',
          sub_lessons: [
            {
              id: '29_1',
              name: "Introduction à l'économie",
              description:
                "Découvre les termes de base liés à l'économie et au commerce.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '29_2',
              name: "Maîtrise de l'économie",
              description:
                'Approfondis le vocabulaire spécialisé et les concepts financiers.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '29_3',
              name: "Rappel et consolidation de l'économie",
              description:
                "Exercices de révision et de consolidation pour parler naturellement de l'économie.",
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'culture-civilisation',
      name: 'Culture et Civilisation Italienne',
      order: 12,
      lessons: [
        {
          id: 63,
          order: 59,
          name: "L'histoire de l'Italie.",
          description:
            "Découvre les moments clés de l'histoire italienne et leur influence sur la langue et la culture.",
          sub_lessons: [
            {
              id: '63_1',
              name: "Introduction à l'histoire italienne",
              description:
                "Découvre les périodes principales de l'histoire italienne et leurs caractéristiques de base.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '63_2',
              name: "Maîtrise de l'histoire italienne",
              description:
                'Approfondis les événements historiques majeurs et leur impact sur la culture.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '63_3',
              name: "Rappel et consolidation de l'histoire",
              description:
                'Exercices de révision et de consolidation pour une compréhension approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 64,
          order: 60,
          name: "La géographie de l'Italie.",
          description:
            "Apprends à connaître les régions, les villes principales et les caractéristiques géographiques de l'Italie.",
          sub_lessons: [
            {
              id: '64_1',
              name: 'Introduction à la géographie italienne',
              description:
                "Découvre les régions principales et les villes importantes d'Italie.",
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '64_2',
              name: 'Maîtrise de la géographie italienne',
              description:
                'Approfondis les caractéristiques géographiques et les particularités régionales.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '64_3',
              name: 'Rappel et consolidation de la géographie',
              description:
                'Exercices de révision et de consolidation pour une connaissance approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 65,
          order: 61,
          name: 'La cuisine italienne.',
          description:
            'Explore la richesse de la cuisine italienne, ses traditions et son vocabulaire spécifique.',
          sub_lessons: [
            {
              id: '65_1',
              name: 'Introduction à la cuisine italienne',
              description:
                'Découvre les plats traditionnels et les ingrédients de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '65_2',
              name: 'Maîtrise de la cuisine italienne',
              description:
                'Approfondis les recettes régionales et les traditions culinaires.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '65_3',
              name: 'Rappel et consolidation de la cuisine',
              description:
                'Exercices de révision et de consolidation pour une connaissance approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 66,
          order: 62,
          name: 'Les fêtes et les traditions italiennes.',
          description:
            'Découvre les principales fêtes et traditions italiennes et leur importance culturelle.',
          sub_lessons: [
            {
              id: '66_1',
              name: 'Introduction aux fêtes italiennes',
              description:
                'Découvre les principales fêtes nationales et leurs traditions de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '66_2',
              name: 'Maîtrise des fêtes italiennes',
              description:
                'Approfondis les fêtes régionales et les traditions locales.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '66_3',
              name: 'Rappel et consolidation des fêtes',
              description:
                'Exercices de révision et de consolidation pour une compréhension approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 67,
          order: 63,
          name: 'Les arts et la littérature italienne.',
          description:
            'Étudie les grands artistes et écrivains italiens et leur contribution à la culture mondiale.',
          sub_lessons: [
            {
              id: '67_1',
              name: 'Introduction aux arts italiens',
              description:
                'Découvre les artistes et écrivains majeurs et leurs œuvres principales.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '67_2',
              name: 'Maîtrise des arts italiens',
              description:
                'Approfondis les mouvements artistiques et les courants littéraires.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '67_3',
              name: 'Rappel et consolidation des arts',
              description:
                'Exercices de révision et de consolidation pour une connaissance approfondie.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'revision-consolidation',
      name: 'Révision et Consolidation',
      order: 13,
      lessons: [
        {
          id: 59,
          order: 64,
          name: 'Les exercices de révision régulière.',
          description:
            'Consolide vos connaissances à travers des exercices de révision structurés.',
          sub_lessons: [
            {
              id: '59_1',
              name: 'Introduction aux exercices de révision',
              description:
                'Découvre les exercices de base pour réviser les notions essentielles.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '59_2',
              name: 'Maîtrise des exercices de révision',
              description:
                'Approfondis les exercices complexes et les révisions thématiques.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '59_3',
              name: 'Rappel et consolidation des exercices',
              description:
                'Exercices de révision et de consolidation pour une maîtrise complète.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 60,
          order: 65,
          name: 'Les tests et les évaluations.',
          description:
            'Évalue ta progression avec des tests adaptés à ta niveau.',
          sub_lessons: [
            {
              id: '60_1',
              name: 'Introduction aux tests',
              description:
                'Découvre les tests de base pour évaluer vos connaissances.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '60_2',
              name: 'Maîtrise des tests',
              description:
                'Approfondis les tests complexes et les évaluations thématiques.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '60_3',
              name: 'Rappel et consolidation des tests',
              description:
                'Exercices de révision et de consolidation pour une évaluation complète.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 61,
          order: 66,
          name: 'Les jeux et les activités ludiques.',
          description:
            "Apprends en t'amusant avec des jeux et activités interactifs en italien.",
          sub_lessons: [
            {
              id: '61_1',
              name: 'Introduction aux jeux',
              description:
                'Découvre les jeux simples et les activités ludiques de base.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '61_2',
              name: 'Maîtrise des jeux',
              description:
                'Approfondis les jeux complexes et les activités interactives.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '61_3',
              name: 'Rappel et consolidation des jeux',
              description:
                'Exercices de révision et de consolidation à travers des activités ludiques.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 62,
          order: 67,
          name: 'Les groupes de discussion et les échanges linguistiques.',
          description:
            'Pratique ta italien dans un contexte social et interactif.',
          sub_lessons: [
            {
              id: '62_1',
              name: 'Introduction aux discussions',
              description:
                'Découvre les bases de la participation aux discussions de groupe.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '62_2',
              name: 'Maîtrise des discussions',
              description:
                'Approfondis les échanges linguistiques et les débats.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '62_3',
              name: 'Rappel et consolidation des discussions',
              description:
                'Exercices de révision et de consolidation pour des échanges naturels.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
    {
      id: 'pratique-avancee',
      name: 'Pratique Avancée',
      order: 14,
      lessons: [
        {
          id: 68,
          order: 68,
          name: 'Techniques de Débat et de Discussion Approfondie en Italien',
          description:
            'Apprends à participer à des débats et des discussions complexes en italien.',
          sub_lessons: [
            {
              id: '68_1',
              name: 'Introduction aux débats',
              description:
                'Découvre les techniques de base pour participer à des débats structurés.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '68_2',
              name: 'Maîtrise des débats',
              description:
                'Approfondis les techniques de débat et les discussions complexes.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '68_3',
              name: 'Rappel et consolidation des débats',
              description:
                'Exercices de révision et de consolidation pour des débats naturels.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 69,
          order: 69,
          name: 'Préparer et Donner des Présentations et des Discours en Italien',
          description:
            "Maîtrise l'art de la présentation et du discours public en italien.",
          sub_lessons: [
            {
              id: '69_1',
              name: 'Introduction aux présentations',
              description:
                'Découvre les techniques de base pour préparer et structurer une présentation.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '69_2',
              name: 'Maîtrise des présentations',
              description:
                'Approfondis les techniques de présentation et les discours publics.',
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '69_3',
              name: 'Rappel et consolidation des présentations',
              description:
                'Exercices de révision et de consolidation pour des présentations professionnelles.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
        {
          id: 70,
          order: 70,
          name: 'Techniques de Prononciation Avancée en Italien',
          description:
            "Perfectionne ta prononciation italienne pour atteindre un niveau proche de celui d'un natif.",
          sub_lessons: [
            {
              id: '70_1',
              name: 'Introduction à la prononciation avancée',
              description:
                'Découvre les techniques de base pour améliorer ta prononciation.',
              level: 'NOT_LEARNED_TO_PARTIAL',
            },
            {
              id: '70_2',
              name: 'Maîtrise de la prononciation',
              description:
                "Approfondis les techniques avancées de prononciation et d'intonation.",
              level: 'PARTIAL_TO_WELL',
            },
            {
              id: '70_3',
              name: 'Rappel et consolidation de la prononciation',
              description:
                'Exercices de révision et de consolidation pour une prononciation naturelle.',
              level: 'WELL_LEARNED_REVIEW',
            },
          ],
        },
      ],
    },
  ],
});
