import type { Chapter } from '~/types/lessons/catalog';

const chapter8: Chapter = {
  id: 'culture-langue-vivante',
  name: 'Culture et langue vivante',
  order: 8,
  lessons: [
    {
      id: 62,
      name: "L'histoire et la géographie de l'Italie.",
      description:
        "Découvre les grandes étapes de l'histoire italienne et la géographie du pays : régions, villes emblématiques, caractéristiques naturelles.",
      sub_lessons: [
        {
          id: '62_1',
          name: "Les régions et les villes",
          description:
            "Apprends les 20 régions italiennes, les principales villes et leurs caractéristiques distinctives.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '62_2',
          name: "Moments clés de l'histoire italienne",
          description:
            "Découvre l'Empire romain, la Renaissance, le Risorgimento et l'Italie moderne avec le vocabulaire historique associé.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '62_3',
          name: 'Révision histoire et géographie',
          description:
            "Exercices de consolidation pour parler de l'Italie, de son histoire et de sa géographie.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 63,
      name: 'La cuisine italienne.',
      description:
        "Explore la richesse de la gastronomie italienne : plats régionaux, produits emblématiques, traditions culinaires et vocabulaire pour en parler.",
      sub_lessons: [
        {
          id: '63_1',
          name: 'Les plats emblématiques',
          description:
            "Apprends le vocabulaire des pâtes, pizzas, risottos et antipasti avec leurs origines régionales.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '63_2',
          name: 'Produits et traditions culinaires',
          description:
            "Découvre les DOP, IGP, les traditions culinaires régionales et le vocabulaire de la gastronomie.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '63_3',
          name: 'Révision cuisine italienne',
          description:
            "Exercices de consolidation pour parler de gastronomie italienne avec passion.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 64,
      name: "L'art et l'architecture italiens.",
      description:
        "Parle des grands chefs-d'œuvre de l'art et de l'architecture italiens : de l'Antiquité à la Renaissance et au-delà. Vocabulaire artistique et culturel.",
      sub_lessons: [
        {
          id: '64_1',
          name: "Les grands artistes et leurs œuvres",
          description:
            "Découvre Léonard de Vinci, Michel-Ange, Botticelli, Caravage et le vocabulaire de la peinture et de la sculpture.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '64_2',
          name: "Architecture et patrimoine",
          description:
            "Apprends le vocabulaire de l'architecture (colosseo, duomo, basilica) et les styles des différentes époques.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '64_3',
          name: "Révision art et architecture",
          description:
            "Exercices de consolidation pour parler d'art et de culture italienne avec aisance.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 65,
      name: 'La musique et le cinéma italiens.',
      description:
        "De l'opéra au cinéma néoréaliste, en passant par la chanson populaire : découvre la culture musicale et cinématographique italienne et son vocabulaire.",
      sub_lessons: [
        {
          id: '65_1',
          name: "La musique italienne",
          description:
            "Explore l'opéra (Verdi, Puccini), la canzone italiana et la musique contemporaine avec le vocabulaire musical.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '65_2',
          name: "Le cinéma et la télévision italiens",
          description:
            "Découvre Fellini, De Sica, Sorrentino et le cinéma italien contemporain, avec le vocabulaire cinématographique.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '65_3',
          name: "Révision musique et cinéma",
          description:
            "Exercices de consolidation pour parler de culture musicale et cinématographique italienne.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 66,
      name: 'Les fêtes et les traditions.',
      description:
        "Découvre les fêtes nationales, religieuses et régionales italiennes, leurs rituels et leur importance dans la vie sociale et culturelle.",
      sub_lessons: [
        {
          id: '66_1',
          name: 'Les fêtes nationales et religieuses',
          description:
            "Apprends le vocabulaire de Noël, Pâques, le Carnaval, la Fête de la République et des autres fêtes.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '66_2',
          name: 'Les traditions régionales',
          description:
            "Découvre les fêtes locales (Palio di Siena, Regata Storica, Infiorata...) et leur vocabulaire spécifique.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '66_3',
          name: 'Révision fêtes et traditions',
          description:
            "Exercices de consolidation pour parler des traditions italiennes avec précision.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 67,
      name: 'Les expressions idiomatiques.',
      description:
        "Enrichis ton italien avec les expressions idiomatiques les plus courantes et les plus colorées. Leur sens littéral vs leur sens réel, et comment les utiliser naturellement.",
      sub_lessons: [
        {
          id: '67_1',
          name: 'Expressions du corps et des émotions',
          description:
            "Apprends les expressions idiomatiques avec des parties du corps (avere le mani in pasta, costare un occhio della testa...).",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '67_2',
          name: 'Expressions de la vie quotidienne',
          description:
            "Découvre les expressions idiomatiques du quotidien (in bocca al lupo, fare bella figura, non avere peli sulla lingua...).",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '67_3',
          name: 'Révision expressions idiomatiques',
          description:
            'Exercices de consolidation pour reconnaître et employer les expressions idiomatiques.',
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 68,
      name: 'Les dialectes et les variations régionales.',
      description:
        "Découvre la richesse dialectale de l'Italie : différences entre le nord et le sud, mots régionaux, accents. Comprendre pourquoi l'italien varie selon les régions.",
      sub_lessons: [
        {
          id: '68_1',
          name: "Le paysage linguistique de l'Italie",
          description:
            "Apprends les grandes familles dialectales (vénitien, napolitain, sicilien) et leurs caractéristiques.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '68_2',
          name: "Mots régionaux dans l'italien standard",
          description:
            "Découvre les mots d'origine dialectale intégrés à l'italien et les variations lexicales nord/sud.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '68_3',
          name: 'Révision dialectes et variations',
          description:
            "Exercices de consolidation pour comprendre et apprécier la diversité linguistique italienne.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 69,
      name: "L'italien des médias et de la presse.",
      description:
        "Apprends à lire des articles de presse, comprendre les informations télévisées et déchiffrer le langage journalistique italien.",
      sub_lessons: [
        {
          id: '69_1',
          name: 'La presse écrite',
          description:
            "Apprends la structure d'un article, le vocabulaire journalistique et les principaux types de textes médiatiques.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '69_2',
          name: 'Les médias audiovisuels et en ligne',
          description:
            "Découvre le vocabulaire des informations télévisées, des podcasts et de la presse en ligne.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '69_3',
          name: 'Révision médias et presse',
          description:
            "Exercices de consolidation pour comprendre et commenter l'actualité italienne.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
    {
      id: 70,
      name: 'Vers la maîtrise : nuances et registres.',
      description:
        "Affine ton italien en maîtrisant les registres de langue (formel, informel, soutenu, familier), les nuances stylistiques et les dernières subtilités pour sonner vraiment italien.",
      sub_lessons: [
        {
          id: '70_1',
          name: 'Les registres de langue',
          description:
            "Apprends à adapter ton niveau de langue selon le contexte : formel, courant, familier, argotique.",
          level: 'NOT_LEARNED_TO_PARTIAL',
        },
        {
          id: '70_2',
          name: 'Nuances stylistiques et prononciation avancée',
          description:
            "Perfectionne l'intonation, le rythme et les subtilités stylistiques pour un italien naturel et expressif.",
          level: 'PARTIAL_TO_WELL',
        },
        {
          id: '70_3',
          name: 'Consolidation finale',
          description:
            "Exercices de révision globale couvrant l'ensemble du parcours pour atteindre la fluidité.",
          level: 'WELL_LEARNED_REVIEW',
        },
      ],
    },
  ],
};

export default chapter8;
