// ~/data/lessons/lesson_1.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 1,
  order: 1,
  name: "🎯 L'alphabet italien : les bases essentielles",
  description:
    "Maîtrise les 21 lettres de l'alphabet italien et leur prononciation unique",
  chapter_id: 'alphabet-prononciation',
  chapter_name: 'Alphabet et Prononciation',
  sub_lessons: [
    {
      id: '1_1',
      name: "Les fondamentaux de l'alphabet italien 📚",
      description:
        "Une introduction claire et progressive à l'alphabet italien",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "L'alphabet italien compte 21 lettres (sans J, K, W, X, Y). Les voyelles ont une prononciation stable (A, E, I, O, U). Les consonnes obéissent à des règles claires : C et G changent de son selon la voyelle suivante, et H est toujours muette. Une base essentielle pour bien débuter l'italien.",
      chat_questions: [
        {
          question: "Présente-toi en une phrase en italien.",
          hint: "Mi chiamo [prénom] · Ho [âge] anni",
        },
        {
          question: "Écris en italien que tu voudrais un cappuccino.",
          hint: "Vorrei un cappuccino · per favore = s'il te plaît",
        },
        {
          question: "Écris en italien que tu aimes le cinéma ou la musique.",
          hint: "Mi piace il cinema · Mi piace la musica",
        },
        {
          question: "Écris en italien ce qu'il y a dans ta chambre.",
          hint: "Ho = j'ai (H muet) · un letto = un lit · una finestra = une fenêtre · una sedia = une chaise",
        },
        {
          question: "Écris en italien que tu as soif ou faim.",
          hint: "Ho fame = j'ai faim · Ho sete = j'ai soif · Ho = j'ai (le H est toujours muet)",
        },
      ],
      content: {
        introduction:
          "Benvenuti! 👋 L'alphabet italien est la clé pour débuter ton apprentissage. Avec ses 21 lettres, il est plus simple que l'alphabet français, mais possède ses propres particularités qui lui donnent toute sa musicalité. Prêts à découvrir les secrets de la prononciation italienne ? 😊",
        sections: [
          {
            title: "L'alphabet italien simplifié 🔤",
            text: "L'alphabet italien contient 21 lettres :\nA B C D E F G H I L M N O P Q R S T U V Z\n\nCinq lettres sont absentes : J, K, W, X et Y. On ne les trouve que dans des mots empruntés à d'autres langues.",
            examples: [
              '🔸 Absent : J · K · W · X · Y',
              '🔸 Présents dans des emprunts : jazz, kiwi, web, taxi, yogurt',
              '🔸 Retiens : pas de K en italien → on écrit CHE [ke], CHI [ki]',
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question:
                  "Laquelle de ces lettres n'existe pas dans l'alphabet italien traditionnel ?",
                options: ['Z', 'K', 'V', 'L'],
                correctAnswer: 'K',
                explanation:
                  "K est absent de l'alphabet italien. Le son [k] devant e/i s'écrit CH : perché, amici.",
              },
              {
                type: 'true_false',
                question:
                  "En italien, la lettre K s'utilise couramment dans les mots du quotidien.",
                correctAnswer: false,
                explanation:
                  "K n'appartient pas à l'alphabet traditionnel. On ne la rencontre que dans quelques emprunts étrangers (kiwi, karaoke).",
              },
              {
                type: 'fill_in_blank',
                question: "Le mot 'jazz' s'écrit avec un ___, une lettre absente de l'alphabet italien.",
                correctAnswer: ['J', 'j'],
                explanation: "J fait partie des 5 lettres absentes de l'alphabet italien traditionnel.",
              },
            ],
          },
          {
            title: "Les voyelles : le cœur de l’italien 🎵",
            text: "Les 5 voyelles italiennes (A, E, I, O, U) sont stables : chacune a un son unique, sans les variations du français. C’est une des grandes facilités de l’italien !",
            examples: [
              "🎯 A = [a] comme dans ‘pâtes’ → mAre (mer)",
              "🎯 E = [é/è] comme dans ‘été’ ou ‘fête’ → bEne (bien), caffè (café)",
              "🎯 I = [i] comme dans ‘vie’ → vIta (vie)",
              "🎯 O = [o] comme dans ‘mot’ → sOle (soleil)",
              "🎯 U = [ou] comme dans ‘doux’ → lUna (lune)",
            ],
            exercises: [
              {
                type: `multiple_choice`,
                question: `Comment se prononce le U dans luna (lune) ?`,
                options: [`[u] comme dans vu`, `[ou] comme dans doux`, `[eu] comme dans feu`, `[in] comme dans fin`],
                correctAnswer: `[ou] comme dans doux`,
                explanation: `Le U italien se prononce toujours [ou], comme dans doux ou roue.`,
              },
              {
                type: `true_false`,
                question: `En italien, les voyelles sont plus stables qu’en francais : chacune a un son fixe.`,
                correctAnswer: true,
                explanation: `C’est l’une des grandes facilites de l’italien. Pas de voyelles nasales ni de sons variables.`,
              },
              {
                type: `fill_in_blank`,
                question: `Dans sole (soleil), la voyelle O se prononce comme dans le mot francais ___.`,
                correctAnswer: [`mot`, `pot`, `sol`],
                explanation: `Le O italien se prononce [o], comme dans mot ou pot.`,
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
      chat_questions: [
        {
          question: "Tu es au restaurant en Italie et tu commandes des gnocchi. Écris la phrase — et explique comment prononcer 'gnocchi' à un ami français qui hésite.",
          hint: "Vorrei gli gnocchi, per favore · GN = [ñ] comme dans 'oignon' · gli = article pluriel [ʎ]",
        },
        {
          question: "Décris ta famille en une ou deux phrases. Utilise le mot 'famiglia' et dis combien vous êtes.",
          hint: "La mia famiglia è... · grande = grande · piccola = petite · Siamo in... = nous sommes... · famiglia contient GLI = [ʎ]",
        },
        {
          question: "Tu invites un ami à faire du ski. Écris l'invitation — et fais attention à la prononciation de 'sciare'.",
          hint: "Vuoi venire a sciare con me ? · SCI = [chi] comme dans 'chemin' · il fine settimana = le week-end",
        },
        {
          question: "Raconte en une phrase ce que tu as mangé hier. Essaie d'inclure un mot avec une consonne double.",
          hint: "Ho mangiato... · pizza (zz) · cappuccino (pp, cc) · spaghetti (gh, tt) · la double consonne s'allonge à l'oral",
        },
        {
          question: "Tu explores une ville italienne et tu entres dans une église. Décris ce que tu vois en une phrase — et explique pourquoi 'chiesa' se prononce [KIEZA] et pas [CHIEZA].",
          hint: "Nella chiesa c'è... · bella = belle · antica = ancienne · CH + i/e = [k] dur, jamais [ch]",
        },
      ],
      content: {
        introduction:
          "Après avoir maîtrisé les bases, plongeons dans les subtilités qui font la richesse de la prononciation italienne. Cette leçon te permettra de comprendre les sons caractéristiques qui donnent à l'italien sa mélodie unique.",
        sections: [
          {
            title: "Les sons signature de l'italien",
            text: "L'italien possède des combinaisons de lettres uniques qui créent des sons distinctifs :\n\n- GN = [ñ] comme dans 'oignon' ou 'agneau' en français\n- GLI = [ʎ] un son unique à l'italien\n- SC + i/e = [ch] comme en français\n- CH + i/e = [k] garde le son dur",
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
                  "Complète : Le son [ñ] s'écrit généralement avec les lettres ___.",
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
                  "Le mot italien pour 'balle' avec la consonne double : ___",
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
                  "Complète : Le mot ‘Foglio’ contient la combinaison ___ produisant le son [ʎ].",
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
      chat_questions: [
        {
          question: "Écris en une phrase ce que tu as fait aujourd'hui.",
          hint: "Oggi ho... = aujourd'hui j'ai... · lavorato = travaillé · mangiato = mangé · studiato = étudié",
        },
        {
          question: "Écris en italien comment inviter un ami à prendre un café.",
          hint: "Vieni a prendere un caffè con me ? · Certo ! = Bien sûr ! · caffè → accent sur le È final",
        },
        {
          question: "Décris la météo aujourd'hui en une phrase italienne.",
          hint: "Che bella giornata ! · Fa freddo/caldo = il fait froid/chaud · Piove = il pleut",
        },
        {
          question: "Cite un endroit que tu aimes avec 'Mi piace...'",
          hint: "Mi piace [endroit] = j'aime... · È molto bello/bella · a Roma, a Parigi, in montagna...",
        },
        {
          question: "Écris en italien une chose que tu as retenue aujourd'hui.",
          hint: "Ho imparato che... = j'ai appris que... · È interessante · Mi piace l'italiano !",
        },
      ],
      content: {
        introduction:
          'Cette dernière leçon consolide vos acquis à travers des exercices pratiques et des situations réelles. Tu vas perfectionner ta prononciation et gagner en confiance.',
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
                  "Complète avec la bonne prononciation : 'Mi chiamo Luca' → [___ KIA-mo ___]",
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
