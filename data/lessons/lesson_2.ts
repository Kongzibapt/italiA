// ~/data/lessons/lesson_2.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 2,
  order: 2,
  name: 'Maîtriser la prononciation des lettres et des sons',
  description:
    "Approfondis la prononciation italienne : accent tonique, voyelles pures, intonation et consonnes difficiles.",
  theme_id: 'alphabet-prononciation',
  theme_name: 'Alphabet et Prononciation',
  sub_lessons: [
    {
      id: '2_1',
      name: "L'accent tonique et les voyelles italiennes",
      description:
        "Découvre les voyelles pures de l'italien et la règle de l'accent tonique.",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "En italien, les voyelles (A, E, I, O, U) se prononcent toujours de façon pure et stable — jamais nasales comme en français. Le E et le O ont chacun deux sons : ouvert [ɛ]/[ɔ] et fermé [e]/[o]. L'accent tonique tombe généralement sur l'avant-dernière syllabe. Quand il tombe sur la dernière, un accent grave l'indique (città, caffè).",
      chat_questions: [
        {
          question: "Tu commandes un caffè et une brioche dans un bar. Écris la phrase — et explique pourquoi 'caffè' a un accent.",
          hint: "Vorrei un caffè e una brioche · accent grave sur È = accent tonique sur la dernière syllabe",
        },
        {
          question: "Prononce mentalement ces mots et dis sur quelle syllabe tombe l'accent : pizza, gelato, cappuccino, spaghetti.",
          hint: "PIZ-za · ge-LA-to · cap-puc-CI-no · spa-GHET-ti — avant-dernière syllabe en général",
        },
        {
          question: "Quelle est la différence entre 'è' (verbe être) et 'e' (et) en italien ? Écris une phrase avec chacun.",
          hint: "È = il/elle est (accent sur la dernière) · e = et (sans accent) · Marco è italiano e simpatico",
        },
        {
          question: "Écris une phrase sur ta ville ou ton quartier en utilisant le mot 'città'.",
          hint: "Abito a... = j'habite à... · La mia città è... · città a l'accent sur la dernière syllabe",
        },
        {
          question: "Dis en italien que tu aimes la mer et la montagne — et fais attention à la prononciation du 'o' dans 'montagna'.",
          hint: "Mi piace il mare e la montagna · O peut être ouvert [ɔ] ou fermé [o] selon le mot · montagna = [mon-TA-ña]",
        },
      ],
      content: {
        introduction:
          "Après l'alphabet, plongeons dans ce qui donne à l'italien sa musique si particulière : des voyelles cristallines et un accent tonique qui donne du rythme à chaque mot. C'est la base pour ne pas sonner comme un touriste !",
        sections: [
          {
            title: 'Les voyelles italiennes : pures et précises',
            text: "En italien, les 5 voyelles se prononcent toujours de façon nette et stable :\n- Pas de voyelles nasales (contrairement au français : 'an', 'on', 'in')\n- Chaque voyelle garde son son, même en fin de mot\n- Le E et le O ont deux variantes : ouvert et fermé\n\nLes exemples ci-dessous illustrent chaque son — écoute-les mentalement en les lisant.",
            examples: [
              'Bello [BEL-lo] → E ouvert comme dans fête',
              'Sera [SE-ra] → E fermé comme dans été',
              'Cosa [KO-za] → O ouvert comme dans or',
              'Sole [SO-le] → O fermé comme dans eau',
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Laquelle de ces affirmations est VRAIE concernant les voyelles italiennes ?",
                options: [
                  'Les voyelles italiennes sont souvent nasales',
                  'Les voyelles italiennes se prononcent toujours de façon pure et stable',
                  'Le E se prononce toujours comme dans "le" en français',
                  "Les voyelles finales ne se prononcent pas",
                ],
                correctAnswer: 'Les voyelles italiennes se prononcent toujours de façon pure et stable',
              },
              {
                type: 'true_false',
                question: "En italien, le mot 'bello' se prononce avec un E ouvert comme dans 'fête'.",
                correctAnswer: true,
              },
              {
                type: 'fill_in_blank',
                question: "Complète : En italien, le E et le O ont chacun deux sons : ___ et ___.",
                correctAnswer: ['ouvert', 'fermé'],
              },
            ],
          },
          {
            title: "L'accent tonique : le rythme de l'italien",
            text: "L'accent tonique détermine quelle syllabe est la plus forte dans un mot. En italien :\n\n- Règle générale : accent sur l'avant-dernière syllabe (parola piana)\n- Exception : accent sur la dernière syllabe → indiqué par un accent grave écrit\n- Certains mots ont l'accent sur l'antépénultième (parola sdrucciola)\n\nL'accent change parfois le sens du mot : ancora (encore) vs àncora (ancre).",
            examples: [
              "PIZ-za, ge-LA-to, ca-ra-VAG-gio → avant-dernière syllabe",
              "cit-TÀ, caf-FÈ, u-ni-VER-si-TÀ → dernière syllabe (accent écrit)",
              "SÙ-bi-to (tout de suite) → antépénultième",
              "an-CO-ra (encore) vs ÀN-co-ra (ancre) → l'accent change le sens",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Sur quelle syllabe tombe l'accent dans 'cappuccino' ?",
                options: ['cap-', '-puc-', '-ci-', '-no'],
                correctAnswer: '-ci-',
              },
              {
                type: 'fill_in_blank',
                question: "Quand l'accent tombe sur la dernière syllabe, il est indiqué par un accent ___ écrit.",
                correctAnswer: 'grave',
              },
              {
                type: 'true_false',
                question: "Le mot 'città' a l'accent sur la dernière syllabe, d'où l'accent grave.",
                correctAnswer: true,
              },
            ],
          },
          {
            title: 'Entraînement : lire et accentuer',
            text: "Quelques mots courants pour s'entraîner à placer l'accent correctement. Pour chaque mot, identifie la syllabe accentuée.",
            examples: [
              "GRA-zie (merci) → avant-dernière",
              "par-LA-re (parler) → avant-dernière",
              "BEL-lis-si-mo (très beau) → première",
              "PER-ché (pourquoi/parce que) → dernière avec accent",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quel mot a son accent sur la DERNIÈRE syllabe ?",
                options: ['pizza', 'gelato', 'perché', 'pasta'],
                correctAnswer: 'perché',
              },
              {
                type: 'true_false',
                question: "Dans 'grazie', l'accent tombe sur 'gra-'.",
                correctAnswer: true,
              },
              {
                type: 'multiple_choice',
                question: "Comment prononce-t-on 'università' ?",
                options: [
                  "u-NI-ver-si-ta",
                  "u-ni-VER-si-ta",
                  "u-ni-ver-si-TÀ",
                  "U-ni-ver-si-ta",
                ],
                correctAnswer: "u-ni-ver-si-TÀ",
              },
            ],
          },
        ],
        conclusion:
          "Bravissimo ! Tu maîtrises maintenant les voyelles pures de l'italien et la règle de l'accent tonique. Ces deux éléments sont la colonne vertébrale de la prononciation italienne — avec ça, ta musicalité va déjà changer radicalement !",
      },
    },
    {
      id: '2_2',
      name: "Intonation, R roulé et consonnes difficiles",
      description:
        "Maîtrise l'intonation des phrases, le R roulé et les consonnes Z et double C.",
      level: 'PARTIAL_TO_WELL',
      summary:
        "L'intonation italienne monte sur les questions (sans inversion sujet-verbe). Le R se roule légèrement en bout de langue. Le Z se prononce [ts] (pizza) ou [dz] (zero) selon le mot. Le double C devant E/I donne [tch] (cappuccino, piacere). Ces sons caractéristiques font toute la différence à l'oral.",
      chat_questions: [
        {
          question: "Tu appelles un serveur dans un restaurant. Demande-lui si la pizza est bonne — et explique comment l'intonation monte à la fin.",
          hint: "La pizza è buona ? · En italien, la question = même structure que l'affirmation, juste l'intonation monte",
        },
        {
          question: "Prononce et écris deux mots avec le son [ts] et deux avec le son [dz]. Aide-toi des exemples de la leçon.",
          hint: "pizza [ts] · stazione [ts] · zero [dz] · zona [dz]",
        },
        {
          question: "Le mot 'piacere' (plaisir/enchanté) contient un double C. Comment se prononce-t-il et quand l'utilise-t-on ?",
          hint: "pia-CE-re → CC + E/I = [tch] · On dit 'piacere' pour 'enchanté de vous rencontrer'",
        },
        {
          question: "Décris ce que tu fais le soir en une phrase. Essaie d'inclure un R bien prononcé.",
          hint: "La sera io... · guardo la televisione · leggo · parlo con gli amici · R = légèrement roulé en bout de langue",
        },
        {
          question: "Tu rencontres quelqu'un pour la première fois et tu veux savoir d'où il vient et ce qu'il fait dans la vie. Pose-lui deux questions en italien — et fais attention à l'intonation montante !",
          hint: "Di dove sei ? (Tu viens d'où ?) · Cosa fai nella vita ? (Tu fais quoi dans la vie ?) · Lavori qui ? (Tu travailles ici ?) · Intonation = ton monte à la fin",
        },
      ],
      content: {
        introduction:
          "Tu as les voyelles, tu as l'accent — maintenant passons à ce qui fait vraiment chanter l'italien : l'intonation des phrases, le fameux R roulé, et quelques consonnes qui ont leurs propres règles du jeu.",
        sections: [
          {
            title: "L'intonation : questions et affirmations",
            text: "En italien, on ne retourne pas les mots pour poser une question (contrairement au français). La différence entre une question et une affirmation, c'est uniquement l'intonation :\n\n- Affirmation : intonation descend en fin de phrase\n- Question : intonation monte sur le dernier mot\n\nPas besoin de 'est-ce que' ou d'inversion sujet-verbe !",
            examples: [
              "Parli italiano. (Tu parles italien.) → ton descend",
              "Parli italiano? (Tu parles italien ?) → ton monte",
              "Sei francese. (Tu es français.) → ton descend",
              "Sei francese? (Tu es français ?) → ton monte",
            ],
            exercises: [
              {
                type: 'true_false',
                question: "En italien, les questions se forment en inversant le sujet et le verbe.",
                correctAnswer: false,
              },
              {
                type: 'multiple_choice',
                question: "Comment distingue-t-on une question d'une affirmation en italien ?",
                options: [
                  "En ajoutant 'est-ce que' au début",
                  "En inversant le sujet et le verbe",
                  "Uniquement par l'intonation (ton montant)",
                  "En ajoutant un point d'interrogation au début",
                ],
                correctAnswer: "Uniquement par l'intonation (ton montant)",
              },
              {
                type: 'fill_in_blank',
                question: "Pour transformer 'Sei italiano.' en question, il faut faire ___ l'intonation à la fin.",
                correctAnswer: 'monter',
              },
            ],
          },
          {
            title: "Le R roulé et le Z ambigu",
            text: "Deux consonnes donnent du fil à retordre aux francophones :\n\n**Le R** : légèrement roulé avec la pointe de la langue contre les dents — pas le R français du fond de la gorge.\n\n**Le Z** : deux prononciations possibles :\n- [ts] comme dans 'tsé-tsé' : pizza, grazie, stazione\n- [dz] comme dans 'dzin' : zero, zona, zucchero",
            examples: [
              "Roma [RO-ma] → R en bout de langue, pas en gorge",
              "arriviamo [ar-ri-VIA-mo] → R double = son allongé",
              "pizza [PIT-tsa] → Z = [ts]",
              "zero [DZE-ro] → Z = [dz]",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment se prononce le Z dans 'pizza' ?",
                options: ['[z] comme en français', '[ts] comme tsé-tsé', '[dz] comme dzin', '[s] comme serpent'],
                correctAnswer: '[ts] comme tsé-tsé',
              },
              {
                type: 'true_false',
                question: "Le R italien se prononce comme le R français, du fond de la gorge.",
                correctAnswer: false,
              },
              {
                type: 'fill_in_blank',
                question: "Dans 'zero', le Z se prononce ___, comme dans 'dzin'.",
                correctAnswer: ['[dz]', 'dz'],
              },
            ],
          },
          {
            title: "Le double C et les pièges courants",
            text: "Le double C (CC) devant E ou I produit un son [tch] très caractéristique de l'italien.\n\nAutres pièges fréquents pour les francophones :\n- S entre deux voyelles → souvent [z] : casa [KA-za], rosa [RO-za]\n- GLI → [ʎ] (révision) : figlio, foglio\n- Le H est toujours muet : ho, hai, hanno",
            examples: [
              "cappuccino [cap-put-CHI-no] → CC + I = [tch]",
              "piacere [pia-CHE-re] → CC + E = [tch]",
              "casa [KA-za] → S entre voyelles = [z]",
              "ho [o] → H toujours muet",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment se prononce 'piacere' ?",
                options: ['[pia-SE-re]', '[pia-KE-re]', '[pia-CHE-re]', '[pia-GE-re]'],
                correctAnswer: '[pia-CHE-re]',
              },
              {
                type: 'true_false',
                question: "Dans 'casa', le S se prononce [z] car il est entre deux voyelles.",
                correctAnswer: true,
              },
              {
                type: 'fill_in_blank',
                question: "Le son [tch] dans 'cappuccino' est produit par la combinaison ___.",
                correctAnswer: 'CC',
              },
            ],
          },
        ],
        conclusion:
          "Perfetto! Ces sons sont les plus difficiles pour les francophones — et tu viens de les apprivoiser. Avec le R roulé, l'intonation montante et le CC bien prononcé, tu seras méconnaissable à l'oral !",
      },
    },
    {
      id: '2_3',
      name: 'Pratique intensive et virelangues italiens',
      description:
        "Consolide ta prononciation avec des exercices de lecture, des virelangues et des phrases du quotidien.",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Révision complète : virelangues italiens pour l'articulation, lecture de phrases courantes, et correction des erreurs typiques des francophones (H muet, voyelles nasales inexistantes, accent tonique). Objectif : une prononciation fluide et naturelle.",
      chat_questions: [
        {
          question: "Récite mentalement le virelangue 'Sopra la panca la capra campa' et explique quels sons sont difficiles pour toi.",
          hint: "Sopra la panca la capra campa, sotto la panca la capra crepa · P, C, R bien distincts",
        },
        {
          question: "Traduis et prononce : 'Je m'appelle [prénom], je suis français(e) et j'apprends l'italien depuis peu.'",
          hint: "Mi chiamo... · sono francese · imparo l'italiano da poco · attention : francese [fran-CHE-ze]",
        },
        {
          question: "Quelles sont les 3 erreurs de prononciation les plus fréquentes des francophones en italien ?",
          hint: "H prononcé (il est toujours muet) · voyelles nasales (elles n'existent pas) · R du fond de la gorge (doit être en bout de langue)",
        },
        {
          question: "Commande un repas complet en italien : entrée, plat, dessert et boisson.",
          hint: "Vorrei... come antipasto · come primo · come secondo · come dolce · da bere · per favore",
        },
        {
          question: "Décris une journée typique en 2-3 phrases. Essaie d'utiliser au moins un mot avec double consonne et un avec accent tonique sur la dernière syllabe.",
          hint: "La mattina... · il pomeriggio... · la sera... · caffè (accent final) · cappuccino (double PP, CC)",
        },
      ],
      content: {
        introduction:
          "C'est l'heure de tout consolider ! Les virelangues italiens sont redoutables — mais ce sont les meilleurs entraîneurs d'articulation qui soient. On va aussi chasser les dernières erreurs typiques des francophones.",
        sections: [
          {
            title: 'Les virelangues italiens (scioglilingua)',
            text: "Les virelangues, ou 'scioglilingua' (littéralement 'dénoue-langue'), sont parfaits pour muscler l'articulation. Commence lentement, puis accélère progressivement.",
            examples: [
              "Sopra la panca la capra campa, sotto la panca la capra crepa.\n(Sur le banc la chèvre vit, sous le banc la chèvre crève.)",
              "Trentatré trentini entrarono a Trento tutti e trentatré trotterellando.\n(33 Trentin·es entrèrent à Trente en trottinant tous les 33.)",
              "Tigre contro tigre.\n(Tigre contre tigre.) — simple mais efficace pour le R et le G dur",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Que signifie 'scioglilingua' en français ?",
                options: ['Leçon de langue', 'Dénoue-langue (virelangue)', 'Accent tonique', 'Son difficile'],
                correctAnswer: 'Dénoue-langue (virelangue)',
              },
              {
                type: 'true_false',
                question: "Dans le virelangue 'Tigre contro tigre', le G de 'tigre' se prononce dur comme dans 'gare'.",
                correctAnswer: true,
              },
              {
                type: 'fill_in_blank',
                question: "Dans 'trentatré', l'accent grave sur le È indique que l'accent tombe sur la ___ syllabe.",
                correctAnswer: 'dernière',
              },
            ],
          },
          {
            title: 'Les erreurs typiques des francophones',
            text: "Quelques pièges dans lesquels tombent presque tous les francophones au début :\n\n1. **Prononcer le H** → il est toujours muet (ho, hai, hanno → o, ai, anno)\n2. **Nasaliser les voyelles** → 'bon' en français ≠ 'buono' en italien (o bien distinct)\n3. **Le R guttural** → le R français du fond de la gorge sonne étranger en italien\n4. **Avaler les voyelles finales** → en italien chaque voyelle se prononce jusqu'au bout\n5. **Mal placer l'accent** → 'subito' se dit SÙ-bi-to et non su-BI-to",
            examples: [
              "Ho fame. → [o FA-me] et non [ho FA-me]",
              "Buono → [BUO-no] et non [buõ] (pas de nasale)",
              "Roma → [RO-ma] avec R roulé, pas guttural",
              "Subito → [SÙ-bi-to] et non [su-BI-to]",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment prononce-t-on 'ho' (j'ai) en italien ?",
                options: ['[ho] avec H aspiré', '[ô] nasal', '[o] H muet', '[xo] H guttural'],
                correctAnswer: '[o] H muet',
              },
              {
                type: 'true_false',
                question: "Les voyelles finales en italien peuvent être avalées, comme les E muets en français.",
                correctAnswer: false,
              },
              {
                type: 'fill_in_blank',
                question: "Le mot 'subito' (tout de suite) se prononce ___, avec l'accent sur la première syllabe.",
                correctAnswer: 'SÙ-bi-to',
              },
            ],
          },
          {
            title: 'Phrases du quotidien : entraînement final',
            text: "Des phrases courantes à lire à voix haute en appliquant toutes les règles apprises. Chaque phrase cible un point de prononciation spécifique.",
            examples: [
              "Vorrei un caffè, per favore. → accent final sur caffè, double F",
              "Piacere di conoscerti! → CC = [tch], R roulé, voyelles nettes",
              "Buongiorno! Come stai? → intonation montante sur la question",
              "Non capisco, puoi ripetere? → R roulé ×2, voyelles finales prononcées",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Dans 'Piacere di conoscerti', quel son est produit par le CC ?",
                options: ['[k]', '[tch]', '[s]', '[ts]'],
                correctAnswer: '[tch]',
              },
              {
                type: 'true_false',
                question: "Dans 'Come stai?', l'intonation doit monter à la fin car c'est une question.",
                correctAnswer: true,
              },
              {
                type: 'fill_in_blank',
                question: "Dans 'Vorrei un caffè', l'accent grave sur È indique que le mot se prononce caf-___, accent sur la dernière syllabe.",
                correctAnswer: 'FÈ',
              },
            ],
          },
        ],
        conclusion:
          "Eccellente! Tu as maintenant une prononciation italienne solide. Les virelangues, les voyelles pures, l'accent tonique, le R roulé et l'intonation n'ont plus de secrets pour toi. La prochaine étape : les salutations et les premières conversations !",
      },
    },
  ],
});
