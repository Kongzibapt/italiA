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
          question: "Qu'est-ce que tu aimes faire pendant ton temps libre ? Dis-le en italien.",
          hint: "Mi piace [activité] · Mi piace leggere = j'aime lire · Mi piace cucinare = j'aime cuisiner · Mi piace viaggiare = j'aime voyager · H toujours muet dans ho, hai, hanno",
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
          question: "Tu aimes la cuisine italienne ? Cite un plat que tu as déjà mangé ou goûté — et dis-le en italien.",
          hint: "Mi piacciono gli gnocchi · mi piace la pizza · gli = article pluriel [ʎ] · GN = [ñ] comme dans 'oignon'",
        },
        {
          question: "Décris ta famille en une ou deux phrases. Utilise le mot 'famiglia' et dis combien vous êtes.",
          hint: "La mia famiglia è... · grande = grande · piccola = petite · Siamo in... = nous sommes... · famiglia contient GLI = [ʎ]",
        },
        {
          question: "Tu pratiques un sport ou une activité physique ? Dis-le en italien.",
          hint: "Mi piace sciare = j'aime skier · nuotare = nager · correre = courir · fare yoga · SCI = [chi] comme dans 'chemin'",
        },
        {
          question: "Raconte en une phrase ce que tu as mangé hier. Essaie d'inclure un mot avec une consonne double.",
          hint: "Ho mangiato... · pizza (zz) · cappuccino (pp, cc) · spaghetti (gh, tt) · la double consonne s'allonge à l'oral",
        },
        {
          question: "Tu as une ville préférée, en Italie ou ailleurs ? Dis pourquoi tu l'aimes — et fais attention à la prononciation de 'perché'.",
          hint: "Mi piace [ville] perché... · è bella = elle est belle · c'è molto da vedere = il y a beaucoup à voir · CH + i/e = [k] dur, jamais [ch]",
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
      name: "Révision complète — L'alphabet et la prononciation",
      description:
        "Consolide tout ce que tu as appris sur l'alphabet, les voyelles, les consonnes et leurs combinaisons",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Récapitulatif complet. Alphabet : 21 lettres, J/K/W/X/Y absentes. Voyelles stables : A [a], E [é/è], I [i], O [o], U [ou]. Consonnes clés : C+a/o/u=[k], C+i/e=[tch], G+a/o/u=[g], G+i/e=[dj], H muet, SC+i/e=[ch], CH+i/e=[k]. Sons signature : GN=[ñ], GLI=[ʎ]. Doubles consonnes : allongement obligatoire qui change le sens (pala/palla, nono/nonno).",
      chat_questions: [
        {
          question: "Épelle ton prénom lettre par lettre en alphabet italien — si une lettre n'existe pas, dis-moi comment tu la remplaces. Ensuite cite deux mots italiens que tu connais déjà ou que tu as entendus : un avec un C ou G délicat (ciao, chiesa, gelato...) et un avec une consonne double (cappuccino, nonno...) — et explique pourquoi leur orthographe te surprend ou non.",
          hint: "A=a, B=bi, C=ci, D=di, E=e, F=effe, G=gi, H=acca (muet), I=i, J→non esiste, K→non esiste, L=elle, M=emme, N=enne, O=o, P=pi, Q=cu, R=erre, S=esse, T=ti, U=u, V=vi, W→non esiste, X→non esiste, Y→non esiste, Z=zeta · C+i/e=[tch] : ciao, cinema · G+i/e=[dj] : gelato · consonne double = allongement du son : cappuccino (pp, cc), nonno (nn)",
        },
      ],
      content: {
        introduction:
          "Marco, derrière son comptoir, épèle parfois les noms des clients dans ses commandes. Chaque lettre compte — une consonne doublée mal prononcée, un C doux pris pour un C dur, et le mot change de sens ou de couleur. Cette révision passe en revue toutes les règles que tu as apprises, dans l'ordre, pour que tu n'aies plus de doute.",
        sections: [
          {
            title: "L'alphabet, les lettres absentes et les voyelles",
            text: "**L'alphabet en 21 lettres :**\nA B C D E F G H I L M N O P Q R S T U V Z\n\n**5 lettres absentes** : J · K · W · X · Y — uniquement dans des emprunts (jazz, kiwi, web, taxi, yogurt).\n\n⚠️ Le son [k] devant E/I ne s'écrit pas K mais **CH** : perché [per-KÉ], chiesa [KIÉ-za].\n\n**Les 5 voyelles — toujours stables :**\n- A → [a] : mare, pasta\n- E → [é] ou [è] : bene, caffè\n- I → [i] : vino, vita\n- O → [o] : sole, modo\n- U → [ou] : luna, sugo\n\nContrairement au français, pas de voyelles nasales ni de sons variables. Ce que tu lis, tu le prononces.",
            examples: [
              "✅ luna → [LOU-na] — le U se dit toujours [ou], jamais [u] à la française",
              "✅ bene → [BÈ-ne] — le E se dit [è], clair et ouvert",
              "✅ perché → [per-KÉ] — CH devant E = [k], jamais [ch]",
              "✅ vino → [VI-no] — le I se dit [i], jamais [ain] comme en français",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment écrit-on le son [k] devant la lettre E en italien ?",
                options: ['KE', 'CE', 'CHE', 'QUE'],
                correctAnswer: 'CHE',
                explanation:
                  "En italien, K n'existe pas dans l'alphabet traditionnel. Le son [k] devant E ou I s'écrit CH : perché [per-KÉ], chiesa [KIÉ-za], chi [ki]. Devant A/O/U, c'est simplement C : casa, conto, cuore.",
              },
              {
                type: 'true_false',
                question: "Le U dans 'luna' se prononce comme le U français dans 'lune'.",
                correctAnswer: false,
                explanation:
                  "Non — le U italien se prononce [ou] comme dans 'doux' ou 'roue', jamais comme le U français nasal/arrondi de 'lune'. luna = [LOU-na], not [LY-na]. C'est l'une des premières corrections à ancrer.",
              },
              {
                type: 'fill_in_blank',
                question: "Les 5 lettres absentes de l'alphabet italien sont J, K, W, ___ et Y.",
                correctAnswer: ['X', 'x'],
                explanation:
                  "J, K, W, X et Y sont absentes de l'alphabet italien traditionnel. On les trouve uniquement dans des mots empruntés à d'autres langues : jazz (anglais), kiwi (maori), web (anglais), taxi (français), yogurt (turc).",
              },
            ],
          },
          {
            title: "Les règles des consonnes C, G, H et les sons signature",
            text: "**H est toujours muet** : ho [o], hai [ai], hanno [AN-no] — ne jamais l'aspirer.\n\n**Sons signature italiens :**\n- **SC + i/e** → [ch] comme dans 'chemin' : scena, sciare, prosciutto\n- **GN** → [ñ] comme dans 'oignon' : gnocchi, bagno, sogno\n- **GLI** → [ʎ] son mouillé unique : famiglia, foglio, gli\n\n**C et G changent de son selon la voyelle qui suit :**",
            table: {
              headers: ['Combinaison', 'Son', 'Exemple'],
              rows: [
                ['C + a / o / u', '[k] dur', 'casa, conto, cuore'],
                ['C + i / e', '[tch] doux', 'ciao, cerco, cena'],
                ['G + a / o / u', '[g] dur', 'gatto, gonna, gusto'],
                ['G + i / e', '[dj] doux', 'gelato, giro, giorno'],
                ['CH + i / e', '[k] dur', 'chiesa, perché, chi'],
                ['GH + i / e', '[g] dur', 'spaghetti, ghiaccio'],
              ],
            },
            examples: [
              "☕ cappuccino → [kap-pou-TCHI-no] : CC+i=[tch], pas [k]",
              "🍕 prosciutto → [pro-CHOUT-to] : SC+i=[ch], tt=double",
              "🏠 famiglia → [fa-MI-ʎa] : GLI=[ʎ], son mouillé",
              "💤 sogno → [SO-ño] : GN=[ñ] comme dans 'agneau'",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment se prononce le C dans 'cappuccino' ?",
                options: [
                  'Le premier C [k], le CC+i [tch]',
                  'Tous les C se prononcent [k]',
                  'Tous les C se prononcent [tch]',
                  'Le premier C [tch], le CC+i [k]',
                ],
                correctAnswer: 'Le premier C [k], le CC+i [tch]',
                explanation:
                  "Dans 'cappuccino' : ca- → C+a=[k] (dur) · -ppu- → double P · -cci- → CC+i=[tch] (doux) · -no → fin. Transcription : [kap-pou-TCHI-no]. La règle C+a/o/u=[k] et C+i/e=[tch] s'applique à chaque syllabe indépendamment.",
              },
              {
                type: 'true_false',
                question: "'Ho fame' (j'ai faim) se prononce [HO fa-me] avec un H aspiré.",
                correctAnswer: false,
                explanation:
                  "Non — le H est toujours muet en italien, sans exception. 'Ho fame' se prononce [O FA-me]. Même chose pour hai [ai], hanno [AN-no], hotel [o-TEL]. Ne jamais aspirer le H en italien.",
              },
              {
                type: 'fill_in_blank',
                question: "'Scena' (scène) se prononce [___-na] car SC + e = son [ch].",
                correctAnswer: ['che', 'CHE', 'Che'],
                explanation:
                  "SC + i/e = [ch] comme dans 'chemin'. Scena → [CHÉ-na]. Même règle : sciare [chia-re] (skier), prosciutto [pro-chout-to], scimmia [CHIM-mia] (singe). À ne pas confondre avec SC + a/o/u = [sk] : scuola [SKUO-la], scala [SKA-la].",
              },
            ],
          },
          {
            title: "Les consonnes doubles — le piège du sens",
            text: "En italien, **doubler une consonne change le sens du mot**. Ce n'est pas une option stylistique — c'est grammatical.\n\nLa consonne double se prononce plus longtemps, avec une légère tension : imagine que tu appuies une fraction de seconde sur cette consonne avant de relâcher.\n\n⚠️ L'exemple 'ano / anno' est celui que les Italiens citent toujours pour expliquer pourquoi les doubles consonnes comptent. 'Buon anno!' ne supporte aucune approximation.\n\n**Paires à retenir absolument :**",
            table: {
              headers: ['Simple', 'Sens', 'Double', 'Sens'],
              rows: [
                ['pala', 'pelle', 'palla', 'balle'],
                ['nono', 'neuvième', 'nonno', 'grand-père'],
                ['copia', 'copie', 'coppia', 'couple'],
                ['fato', 'destin', 'fatto', 'fait'],
                ['ano', 'anus', 'anno', 'année'],
              ],
            },
            examples: [
              "👴 nonno → [NON-no] : pause nette sur le NN, ≠ nono [NO-no] (neuvième)",
              "⚽ palla → [PAL-la] : L allongé, ≠ pala [PA-la] (pelle)",
              "📋 fatto → [FAT-to] : T allongé, ≠ fato [FA-to] (destin)",
              "🎊 anno → [AN-no] : N allongé · 'Buon anno!' = bonne année ≠ 'buon ano'",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle est la différence entre 'copia' et 'coppia' ?",
                options: [
                  "'copia' = copie · 'coppia' = couple",
                  "'copia' = couple · 'coppia' = copie",
                  "'copia' = copie · 'coppia' = cape",
                  "Aucune différence de sens, juste de registre",
                ],
                correctAnswer: "'copia' = copie · 'coppia' = couple",
                explanation:
                  "'Copia' (P simple) = copie, exemplaire. 'Coppia' (PP double) = couple, paire. La consonne double change radicalement le sens. En pratique : 'una copia del documento' (une copie du document) vs 'una bella coppia' (un beau couple).",
              },
              {
                type: 'true_false',
                question: "En italien, doubler une consonne est une question de style, sans impact sur le sens.",
                correctAnswer: false,
                explanation:
                  "Faux — en italien, les consonnes doubles sont phonémiques : elles changent le sens du mot. Pala (pelle) ≠ palla (balle), nono (neuvième) ≠ nonno (grand-père), fato (destin) ≠ fatto (fait). Il faut les prononcer distinctement, avec un allongement audible.",
              },
              {
                type: 'fill_in_blank',
                question: "'Buon ___!' (bonne année) — attention à la double consonne.",
                correctAnswer: ['anno', 'Anno'],
                explanation:
                  "'Buon anno!' s'écrit avec NN double. C'est l'exemple le plus célèbre pour illustrer l'importance des doubles consonnes en italien — une seule N changerait complètement le mot (et donnerait quelque chose d'embarrassant). À retenir définitivement.",
              },
            ],
          },
        ],
        conclusion:
          "Eccellente! 🎉 Tu maîtrises maintenant l'intégralité de l'alphabet et de la prononciation italienne : les 21 lettres, les 5 voyelles stables, les règles de C et G, le H muet, les sons signature GN/GLI/SC, et les doubles consonnes qui changent le sens. C'est une base solide pour toute la suite — chaque leçon à venir s'appuiera dessus. Avanti!",
      },
    },
  ],
});
