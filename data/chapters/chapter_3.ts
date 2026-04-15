import type { Chapter } from '~/types/lessons/catalog';

const chapter3: Chapter = {
  id: 'vie-quotidienne',
  name: 'Vie quotidienne',
  order: 3,
  lessons: [
    {
      id: 19,
      name: 'La nourriture et les repas.',
      description:
        "Apprends le vocabulaire des aliments, des boissons et des repas de la journée. Commander un café, acheter au marché, parler de ce qu'on mange.",
      sub_lessons: [
        {
          id: '19_1',
          name: 'Les aliments et boissons',
          description:
            'Découvre le vocabulaire des fruits, légumes, viandes et boissons courants.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '19_2',
          name: 'Les repas et les habitudes alimentaires',
          description:
            "Apprends à parler du petit déjeuner, déjeuner et dîner, et des expressions liées aux repas.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '19_3',
          name: 'Révision nourriture et repas',
          description:
            'Exercices de consolidation pour parler de la nourriture naturellement.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 20,
      name: 'Au restaurant.',
      description:
        "Maîtrise les situations au restaurant : lire un menu, commander, demander l'addition, exprimer ses préférences et ses intolérances alimentaires.",
      sub_lessons: [
        {
          id: '20_1',
          name: 'Commander au restaurant',
          description:
            "Apprends à lire un menu, à commander et à interagir avec le serveur.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '20_2',
          name: "Préférences et l'addition",
          description:
            "Exprime tes préférences alimentaires, demande l'addition et parle des portions.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '20_3',
          name: 'Révision au restaurant',
          description:
            'Exercices de consolidation pour te débrouiller dans tout restaurant italien.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 21,
      name: 'Les achats et les vêtements.',
      description:
        "Vocabulaire du shopping : vêtements, tailles, couleurs, prix. Dialogues pour acheter dans une boutique, demander une taille, négocier et payer.",
      sub_lessons: [
        {
          id: '21_1',
          name: 'Les vêtements et les accessoires',
          description:
            'Apprends les noms des vêtements courants et des accessoires de mode.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '21_2',
          name: 'Faire du shopping',
          description:
            "Découvre comment demander une taille, essayer un vêtement et payer en boutique.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '21_3',
          name: 'Révision shopping et vêtements',
          description:
            'Exercices de consolidation pour faire tes courses en italien avec aisance.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 22,
      name: 'Les transports.',
      description:
        "Apprends à te déplacer en Italie : train, bus, métro, taxi, voiture. Acheter un billet, demander son chemin, comprendre les horaires.",
      sub_lessons: [
        {
          id: '22_1',
          name: 'Les moyens de transport',
          description:
            'Découvre le vocabulaire des transports et les expressions pour se déplacer.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '22_2',
          name: 'Acheter un billet et demander son chemin',
          description:
            "Apprends à acheter des billets, lire des horaires et demander des directions.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '22_3',
          name: 'Révision des transports',
          description:
            'Exercices de consolidation pour voyager en Italie en toute autonomie.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 23,
      name: 'La ville et les lieux.',
      description:
        "Apprends à nommer les lieux d'une ville italienne (piazza, chiesa, mercato, farmacia...) et à indiquer ou demander où se trouve un endroit.",
      sub_lessons: [
        {
          id: '23_1',
          name: 'Les lieux de la ville',
          description:
            'Découvre le vocabulaire des lieux publics, commerces et monuments dans une ville italienne.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '23_2',
          name: "S'orienter et donner des directions",
          description:
            "Apprends à demander et donner des directions : gira a destra, vai dritto, è vicino a...",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '23_3',
          name: 'Révision la ville',
          description:
            'Exercices de consolidation pour te repérer et interagir dans une ville italienne.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 24,
      name: 'Les loisirs et les activités.',
      description:
        "Parle de tes loisirs, sports et activités préférées. Proposer une sortie, accepter ou refuser une invitation, parler de ce qu'on aime faire.",
      sub_lessons: [
        {
          id: '24_1',
          name: 'Les sports et les hobbies',
          description:
            'Apprends le vocabulaire des sports, de la musique, de la lecture et des loisirs courants.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '24_2',
          name: 'Proposer et accepter une sortie',
          description:
            "Découvre comment proposer une activité, accepter ou refuser poliment et fixer un rendez-vous.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '24_3',
          name: 'Révision loisirs et activités',
          description:
            'Exercices de consolidation pour parler de tes loisirs et organiser des sorties.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 25,
      name: 'La météo.',
      description:
        "Décris le temps qu'il fait, parle du climat en Italie et utilise les expressions météo dans des conversations quotidiennes.",
      sub_lessons: [
        {
          id: '25_1',
          name: 'Le vocabulaire de la météo',
          description:
            "Apprends les expressions pour décrire la pluie, le soleil, la neige, le vent et les températures.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '25_2',
          name: 'Parler du temps et du climat',
          description:
            "Exprime des prévisions, compare les saisons et commente le temps en conversation.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '25_3',
          name: 'Révision la météo',
          description:
            "Exercices de consolidation pour parler du temps avec naturel.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 26,
      name: 'La santé et le corps humain.',
      description:
        "Apprends le vocabulaire du corps humain et les expressions pour parler de ta santé : symptômes courants, chez le médecin, à la pharmacie.",
      sub_lessons: [
        {
          id: '26_1',
          name: 'Le corps humain',
          description:
            'Découvre les parties du corps et les expressions pour localiser une douleur.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '26_2',
          name: 'La santé au quotidien',
          description:
            "Apprends à décrire des symptômes, acheter des médicaments et parler de sa santé.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '26_3',
          name: 'Révision santé et corps',
          description:
            'Exercices de consolidation pour gérer les situations liées à la santé en italien.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 27,
      name: 'Le travail et les études.',
      description:
        "Parle de ton travail, de ton métier et de tes études. Vocabulaire des professions, du bureau et de la vie scolaire ou universitaire.",
      sub_lessons: [
        {
          id: '27_1',
          name: 'Les professions et le bureau',
          description:
            'Apprends les noms des métiers courants et le vocabulaire du lieu de travail.',
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '27_2',
          name: 'Les études et le milieu scolaire',
          description:
            "Découvre le vocabulaire de l'école, de l'université et des matières enseignées.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '27_3',
          name: 'Révision travail et études',
          description:
            'Exercices de consolidation pour parler de ta vie professionnelle et scolaire.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
  ],
};

export default chapter3;
