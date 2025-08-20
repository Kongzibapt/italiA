// ~/data/lessons/lesson_1.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 1,
  order: 1,
  name: "🎯 L'alphabet italien : les bases essentielles",
  description:
    "Maîtrise les 21 lettres de l'alphabet italien et leur prononciation unique",
  theme_id: 'alphabet-prononciation',
  theme_name: 'Alphabet et Prononciation',
  sub_lessons: [
    {
      id: '1_1',
      name: "Les fondamentaux de l'alphabet italien 📚",
      description:
        "Une introduction claire et progressive à l'alphabet italien",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "L'alphabet italien compte 21 lettres (sans J, K, W, X, Y). Les voyelles ont une prononciation stable (A, E, I, O, U). Les consonnes obéissent à des règles claires : C et G changent de son selon la voyelle suivante, et H est toujours muette. Une base essentielle pour bien débuter l'italien.",
      content: {
        introduction:
          "Benvenuti! 👋 L'alphabet italien est la clé pour débuter ton apprentissage. Avec ses 21 lettres, il est plus simple que l'alphabet français, mais possède ses propres particularités qui lui donnent toute sa musicalité. Prêts à découvrir les secrets de la prononciation italienne ? 😊",
        sections: [
          {
            title: "L'alphabet italien simplifié 🔤",
            text: "L'alphabet italien contient 21 lettres :\nA B C D E F G H I L M N O P Q R S T U V Z\n\nLes lettres J, K, W, X et Y sont absentes car elles ne font pas partie de l'alphabet traditionnel. On les trouve uniquement dans les mots d'origine étrangère comme 'jazz' ou 'web'.",
            examples: [
              '🔸 Amore [a-MO-re] = amour',
              '🔸 Bologna [bo-LO-nia] = Bologne',
              '🔸 Cucina [ku-CHI-na] = cuisine',
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question:
                  "Laquelle de ces lettres n'est pas utilisée dans l'orthographe standard des mots italiens ?",
                options: ['Z', 'K', 'V', 'R'],
                correctAnswer: 'K',
                explanation:
                  "La lettre K ne fait pas partie de l'alphabet italien traditionnel.",
              },
              {
                type: 'true_false',
                question:
                  "Les lettres W, X et Y apparaissent souvent dans les mots d'origine latine en italien.",
                correctAnswer: false,
                explanation:
                  'Ces lettres apparaissent uniquement dans les mots empruntés à des langues étrangères.',
              },
              {
                type: 'fill_in_blank',
                question: "L'alphabet italien contient ___ lettres.",
                correctAnswer: ['21'],
                explanation: "L'alphabet italien compte exactement 21 lettres.",
              },
            ],
          },
          {
            title: "Les voyelles : le cœur de l'italien 🎵",
            text: "Les 5 voyelles italiennes (A, E, I, O, U) sont la base de la prononciation. Contrairement au français, leur son reste TOUJOURS le même, ce qui facilite grandement l'apprentissage.",
            examples: [
              "🎯 A = [a] comme dans 'pApa' - esempio: mAre (mer)",
              "🎯 E = [é] comme dans 'café' - esempio: bEne (bien)",
              "🎯 I = [i] comme dans 'mIdi' - esempio: vIta (vie)",
              "🎯 O = [o] comme dans 'rOse' - esempio: sOle (soleil)",
              "🎯 U = [ou] comme dans 'tOUt' - esempio: lUna (lune)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question:
                  "Quelle voyelle italienne se prononce toujours comme le ‘é' dans ‘café' ?",
                options: ['A', 'E', 'I', 'U'],
                correctAnswer: 'E',
                explanation:
                  'La voyelle E se prononce comme un é fermé en italien, contrairement au français qui varie souvent.',
              },
              {
                type: 'true_false',
                question:
                  'En italien, la prononciation des voyelles peut varier en fonction de leur position dans le mot.',
                correctAnswer: false,
                explanation:
                  'Les voyelles italiennes ont une prononciation fixe, quel que soit leur contexte.',
              },
              {
                type: 'fill_in_blank',
                question: "Le mot 'vita' contient deux voyelles : ___ et ___.",
                correctAnswer: ['i', 'a'],
                explanation: "'Vita' se compose des voyelles I et A.",
              },
            ],
          },
          {
            title: "Les règles d'or des consonnes 🌟",
            text: 'Les consonnes italiennes suivent des règles précises qui, une fois comprises, rendent la prononciation logique et prévisible.',
            examples: [
              '✨ C + a/o/u = [k] → Casa [KA-za] (maison)',
              '✨ C + i/e = [tch] → Ciao [TCHA-o] (salut)',
              '✨ G + a/o/u = [g] → Gatto [GAT-to] (chat)',
              '✨ G + i/e = [dj] → Gelato [DJE-la-to] (glace)',
              "✨ H est toujours muet → Ho [o] (j'ai)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question:
                  'Quel mot présente une erreur de prononciation selon les règles italiennes ?',
                options: [
                  'Casa [ka-za]',
                  'Ciao [ka-o]',
                  'Gatto [gat-to]',
                  'Gelato [dje-la-to]',
                ],
                correctAnswer: 'Ciao [ka-o]',
                explanation:
                  'Ciao se prononce [tcha-o], pas [ka-o] : C + i = [tch].',
              },
              {
                type: 'true_false',
                question:
                  'En italien, H modifie la prononciation de la lettre qui la précède.',
                correctAnswer: false,
                explanation:
                  "La lettre H est muette et n'affecte pas la prononciation.",
              },
              {
                type: 'fill_in_blank',
                question: "Le mot 'Gelato' suit la règle : G + ___ = [dj]",
                correctAnswer: ['e'],
                explanation: 'G + e se prononce [dj] en italien.',
              },
            ],
          },
        ],
        conclusion:
          "Eccellente! 🎉 Tu viens d'acquérir les bases fondamentales de l'alphabet italien. Ces connaissances sont essentielles pour la suite de ton apprentissage. Rappelle-toi : la régularité de la prononciation italienne est ta meilleure alliée. Continuate così! (Continue comme ça!) 👏",
      },
    },
    {
      id: '1_2',
      name: "Les subtilités de l'alphabet italien",
      description:
        "Explore les nuances et les combinaisons spéciales de l'alphabet italien",
      level: 'PARTIAL_TO_WELL',
      summary:
        "Sons clés de l'italien : GN [ñ], GLI [ʎ], doubles consonnes, SCI/CH + voyelle → précision et authenticité",
      content: {
        introduction:
          "Après avoir maîtrisé les bases, plongeons dans les subtilités qui font la richesse de la prononciation italienne. Cette leçon te permettra de comprendre les sons caractéristiques qui donnent à l'italien sa mélodie unique.",
        sections: [
          {
            title: "Les sons signature de l'italien",
            text: "L'italien possède des combinaisons de lettres uniques qui créent des sons distinctifs :\n\n- GN = [ñ] comme en espagnol\n- GLI = [ʎ] un son unique à l'italien\n- SC + i/e = [ch] comme en français\n- CH + i/e = [k] garde le son dur",
            examples: [
              "Gnocchi [NIOK-ki] → Prononce comme 'nio + ki'",
              "Famiglia [fa-MI-lia] → 'fa-mi-ʎa' (son mouillé)",
              "Scienza [CHEN-tsa] → 'science' en français",
              "Chiesa [KIE-za] → 'église'",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: 'Quel mot contient le son [ʎ] en italien ?',
                options: ['Gnocchi', 'Famiglia', 'Scienza', 'Chiesa'],
                correctAnswer: 'Famiglia',
              },
              {
                type: 'fill_in_blank',
                question:
                  "Complète : Le son [ñ] s'écrit généralement avec les lettres __.",
                correctAnswer: 'GN',
              },
              {
                type: 'true_false',
                question:
                  "Le groupe de lettres ‘CH' se prononce [ch] comme dans 'chocolat'.",
                correctAnswer: false,
              },
            ],
          },
          {
            title: "L'art des consonnes doubles",
            text: 'Les consonnes doubles sont fondamentales en italien. Elles doivent être prononcées plus longtemps, avec une légère pause, ce qui change souvent le sens du mot.',
            examples: [
              'Pala (pelle) vs. Palla (balle) → PA-la vs. PAL-la',
              'Nono (neuvième) vs. Nonno (grand-père) → NO-no vs. NON-no',
              'Copia (copie) vs. Coppia (couple) → CO-pia vs. COP-pia',
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question:
                  "Quelle différence majeure distingue 'pala' et 'palla' ?",
                options: [
                  'Le genre',
                  "L'accent tonique",
                  'Une consonne doublée',
                  'La voyelle finale',
                ],
                correctAnswer: 'Une consonne doublée',
              },
              {
                type: 'true_false',
                question:
                  "En italien, la longueur de la consonne peut modifier le sens d'un mot.",
                correctAnswer: true,
              },
              {
                type: 'fill_in_blank',
                question:
                  "Écris le mot italien pour 'balle' avec la bonne prononciation longue.",
                correctAnswer: 'palla',
              },
            ],
          },
          {
            title: 'Les combinaisons avancées',
            text: 'Certaines combinaisons de lettres créent des sons sophistiqués qui enrichissent la prononciation italienne.',
            examples: [
              'SCI + voyelle → [chi] : Sciare [chi-A-re] (skier)',
              'GN + voyelle → [ñ] : Sogno [SO-ño] (rêve)',
              'GLI + voyelle → [ʎ] : Foglio [FO-ʎo] (feuille)',
            ],
            exercises: [
              {
                type: 'fill_in_blank',
                question:
                  "Complète : Le mot ‘Foglio' contient la combinaison __ produisant le son [ʎ].",
                correctAnswer: 'GLI',
              },
              {
                type: 'multiple_choice',
                question: 'Quel mot contient le son [chi] ?',
                options: ['Sciare', 'Gnocchi', 'Bagno', 'Foglio'],
                correctAnswer: 'Sciare',
              },
              {
                type: 'true_false',
                question:
                  "Le son [ñ] en italien est représenté par la combinaison 'GN'.",
                correctAnswer: true,
              },
            ],
          },
        ],
        conclusion:
          "Magnifico! Tu maîtrises maintenant les subtilités de la prononciation italienne. Ces nouveaux sons te permettront de parler avec plus d'authenticité et de naturel.",
      },
    },
    {
      id: '1_3',
      name: 'Perfectionnement et pratique intensive',
      description:
        "Maîtrise parfaitement l'alphabet italien à travers des exercices pratiques",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        'Pratique intensive : phrases courantes, pièges fréquents (Gli, GN, doubles), virelangues → confiance et précision en prononciation.',
      content: {
        introduction:
          'Cette dernière leçon consolide vos acquis à travers des exercices pratiques et des situations réelles. Tu va perfectionner ta prononciation et gagner en confiance.',
        sections: [
          {
            title: 'Phrases courantes et prononciation',
            text: 'Pratiquons avec des phrases complètes qui intègrent tous les aspects de la prononciation italienne.',
            examples: [
              'Che bella giornata! [ke BEL-la djor-NA-ta] (Quelle belle journée!)',
              "Mi chiamo Francesco [mi KIA-mo fran-CHES-ko] (Je m'appelle Francesco)",
              "Scusi, dov'è la stazione? [SKU-zi do-VE la sta-TSIO-ne] (Excusez-moi, où est la gare?)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question:
                  "Dans quelle phrase l'accent tonique est-il mal placé ?",
                options: [
                  'Che bella giornata!',
                  'Mi chiamo Francesco',
                  "Scusi, dov'è la stazione?",
                ],
                correctAnswer: "Scusi, dov'è la stazione?",
              },
              {
                type: 'fill_in_blank',
                question:
                  "Complète avec la bonne prononciation : 'Mi chiamo Luca' → [__ KIA-mo __]",
                correctAnswer: 'mi, lu-KA',
              },
              {
                type: 'true_false',
                question: "Le mot 'giornata' se prononce avec un double 't'.",
                correctAnswer: false,
              },
            ],
          },
          {
            title: 'Les pièges à éviter',
            text: 'Voici les erreurs les plus courantes et comment les éviter.',
            examples: [
              'Gli vs Li : Gli amici [ʎi a-MI-tchi] ≠ Li vedo [li VE-do]',
              'Gn vs N : Bagno [BA-ño] ≠ Bano [BA-no]',
              'Double consonnes : Fatto [FAT-to] ≠ Fato [FA-to]',
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question:
                  "Quelle phrase contient une mauvaise interprétation de 'Gli' ?",
                options: [
                  'Gli amici sono simpatici',
                  'Li amici sono simpatici',
                  'Ho visto gli amici',
                ],
                correctAnswer: 'Li amici sono simpatici',
              },
              {
                type: 'true_false',
                question: "'Bagno' et 'Bano' se prononcent de la même façon.",
                correctAnswer: false,
              },
              {
                type: 'fill_in_blank',
                question: "Corrige : 'Fato' au lieu de 'Fatto' signifie ___.",
                correctAnswer: 'destin',
              },
            ],
          },
          {
            title: 'Exercices de prononciation avancée',
            text: 'Des virelangues et phrases complexes pour parfaire ta prononciation.',
            examples: [
              'Trentatré trentini entrarono a Trento tutti e trentatré trotterellando',
              'Chi ama il cioccolato non può non amare la cioccolata calda',
              "Se l'arcivescovo di Costantinopoli si disarcivescoviscostantinopolizzasse",
            ],
            exercises: [
              {
                type: 'true_false',
                question:
                  'Les virelangues servent à renforcer la précision de la prononciation.',
                correctAnswer: true,
              },
              {
                type: 'fill_in_blank',
                question:
                  "Complète le mot manquant : 'Chi ama il ___ non può non amare la cioccolata calda'.",
                correctAnswer: 'cioccolato',
              },
              {
                type: 'multiple_choice',
                question: 'Quel mot est un virelangue typique italien ?',
                options: ['Trentatré trentini', 'Cucina', 'Bella giornata'],
                correctAnswer: 'Trentatré trentini',
              },
            ],
          },
        ],
        conclusion:
          "Complimenti! 🎉 Tu possèdes maintenant une excellente maîtrise de l'alphabet et de la prononciation italienne. Continue à pratiquer régulièrement et n'hésite pas à parler à voix haute, même seul. La pratique est la clé du succès! Buon proseguimento! 🌟",
      },
    },
  ],
});
