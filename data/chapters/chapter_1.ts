import type { Theme } from '~/types/lessons/catalog';

const chapter1: Theme = {
  id: 'premiers-pas',
  name: 'Premiers pas',
  order: 1,
  lessons: [
    {
      id: 1,
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
    {
      id: 3,
      name: 'Saluer, se présenter et engager la conversation',
      description:
        "Apprends les salutations formelles et informelles, à te présenter et à parler de tes goûts pour démarrer une vraie conversation avec Marco.",
      sub_lessons: [
        {
          id: '3_1',
          name: 'Saluer et prendre congé',
          description:
            "Maîtrise les salutations formelles et informelles et les formules de politesse essentielles.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '3_2',
          name: 'Se présenter et parler de soi',
          description:
            "Apprends à te présenter, parler de ta famille, ton métier et ta ville.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '3_3',
          name: 'Goûts, loisirs et navigation en conversation',
          description:
            "Exprime tes préférences, parle de tes loisirs et apprends à gérer une conversation quand tu bloques.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 4,
      name: 'Les chiffres et les nombres.',
      description:
        "Apprends à compter de 0 à 1000, à dire l'heure et à utiliser les nombres dans la vie de tous les jours (prix, âge, numéro de téléphone).",
      sub_lessons: [
        {
          id: '4_1',
          name: 'Les nombres de 0 à 100',
          description:
            "Découvre les chiffres de 0 à 100 et leur prononciation, avec des exercices sur les prix et les âges.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '4_2',
          name: "L'heure et les grands nombres",
          description:
            "Apprends à dire l'heure, les centaines et les milliers, et à lire les dates.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '4_3',
          name: 'Révision des nombres',
          description:
            'Exercices de consolidation sur tous les nombres dans des contextes réels.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 5,
      name: 'Les jours, les mois et les saisons.',
      description:
        "Maîtrise le calendrier en italien : jours de la semaine, mois de l'année, saisons. Apprends à exprimer une date et à parler du moment de la journée.",
      sub_lessons: [
        {
          id: '5_1',
          name: 'Les jours de la semaine',
          description:
            "Découvre les sept jours, les expressions comme 'lundi prochain' ou 'le week-end'.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '5_2',
          name: 'Les mois et les saisons',
          description:
            "Apprends les douze mois, les quatre saisons et comment formuler une date complète.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '5_3',
          name: 'Révision du calendrier',
          description:
            'Exercices de consolidation pour parler du temps et des dates naturellement.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 6,
      name: 'Les questions essentielles.',
      description:
        "Apprends à poser les questions de base : Chi ? (Qui ?), Cosa ? (Quoi ?), Dove ? (Où ?), Quando ? (Quand ?), Come ? (Comment ?) et Perché ? (Pourquoi ?). Indispensable pour toute conversation.",
      sub_lessons: [
        {
          id: '6_1',
          name: 'Chi, Cosa, Dove',
          description:
            "Maîtrise les questions sur les personnes, les objets et les lieux.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '6_2',
          name: 'Quando, Come, Perché',
          description:
            "Apprends à poser des questions sur le temps, la manière et la cause.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '6_3',
          name: 'Révision des questions',
          description:
            'Exercices de consolidation pour formuler et répondre aux questions courantes.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 7,
      name: 'La famille.',
      description:
        "Découvre le vocabulaire de la famille en italien : parents, frères et sœurs, grands-parents, cousins. Apprends à parler de ta famille et à décrire les liens de parenté.",
      sub_lessons: [
        {
          id: '7_1',
          name: 'La famille proche',
          description:
            "Apprends les membres de la famille immédiate et comment les présenter.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '7_2',
          name: 'La famille élargie',
          description:
            "Découvre le vocabulaire des cousins, oncles, tantes et beaux-parents.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '7_3',
          name: 'Révision de la famille',
          description:
            'Exercices de consolidation pour parler de ta famille naturellement.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 8,
      name: 'Décrire les personnes.',
      description:
        "Apprends à décrire l'apparence physique et la personnalité d'une personne. Vocabulaire des couleurs de cheveux et yeux, taille, caractère et expressions pour faire des compliments.",
      sub_lessons: [
        {
          id: '8_1',
          name: 'La description physique',
          description:
            "Découvre le vocabulaire pour décrire l'apparence : taille, couleur des cheveux et des yeux, silhouette.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '8_2',
          name: 'Le caractère et la personnalité',
          description:
            "Apprends les adjectifs de personnalité et les expressions pour parler du caractère de quelqu'un.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '8_3',
          name: 'Révision des descriptions',
          description:
            'Exercices de consolidation pour décrire des personnes de façon naturelle et variée.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 9,
      name: 'Les émotions et les sentiments.',
      description:
        "Exprime ce que tu ressens en italien : joie, tristesse, colère, surprise, peur, ennui... Apprends à demander à quelqu'un comment il va et à répondre avec nuance.",
      sub_lessons: [
        {
          id: '9_1',
          name: 'Les émotions de base',
          description:
            "Découvre le vocabulaire des émotions positives et négatives et les expressions idiomatiques.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '9_2',
          name: 'Exprimer ses sentiments',
          description:
            "Apprends à dire comment tu te sens, à exprimer des nuances et à réagir aux émotions des autres.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '9_3',
          name: 'Révision des émotions',
          description:
            'Exercices de consolidation pour parler de tes émotions spontanément.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 10,
      name: 'La maison et les pièces.',
      description:
        "Apprends le vocabulaire de la maison : pièces, meubles, objets du quotidien. Savoir décrire où tu habites et ce qu'il y a chez toi.",
      sub_lessons: [
        {
          id: '10_1',
          name: 'Les pièces de la maison',
          description:
            "Découvre les noms des pièces (cucina, salotto, bagno...) et les expressions pour indiquer où se trouve quelque chose.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '10_2',
          name: 'Les meubles et les objets',
          description:
            "Apprends le vocabulaire du mobilier et des objets du quotidien dans chaque pièce.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '10_3',
          name: 'Révision de la maison',
          description:
            "Exercices de consolidation pour décrire ton logement et t'y repérer.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
  ],
};

export default chapter1;
