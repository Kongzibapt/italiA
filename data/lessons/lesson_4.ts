// ~/data/lessons/lesson_4.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 4,
  order: 4,
  name: 'Les chiffres et les nombres',
  description:
    "Compte, donne l'heure, parle des prix et des dates — les nombres sont partout en italien.",
  theme_id: 'premiers-pas',
  theme_name: 'Premiers pas',
  sub_lessons: [
    {
      id: '4_1',
      name: 'Les nombres de 0 à 100',
      description:
        "Découvre les chiffres italiens et leurs règles de formation, des basiques aux composés.",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "Les chiffres de 0 à 20 sont à apprendre par cœur (ils sont irréguliers). De 21 à 100, on combine les dizaines avec les unités — avec une règle clé : la voyelle finale des dizaines tombe devant 'uno' et 'otto' (ventuno, ventotto, trentuno…). Tre prend un accent quand il termine un nombre composé (ventitré, trentatré). Les dizaines : venti (20), trenta (30), quaranta (40), cinquanta (50), sessanta (60), settanta (70), ottanta (80), novanta (90), cento (100).",
      chat_questions: [
        {
          question: "Je veux enregistrer ton numéro. Donne-moi un numéro de téléphone fictif — dicte-le chiffre par chiffre.",
          hint: "In Italia i numeri si dicono cifra per cifra : 0 = zero · 6 = sei · 7 = sette · 8 = otto · Esempio : 06 47 23 18 → zero sei, quattro sette, due tre, uno otto",
        },
        {
          question: "Tu vois un prix sur le menu : 8€, 11€, 23€. Comment tu lis ces trois prix à voix haute en italien ?",
          hint: "otto euro · undici euro · ventitré euro (le accent sur le é de tré dans les composés) · Euro ne prend pas de S au pluriel en usage courant",
        },
        {
          question: "Je te demande combien vous étiez à table hier soir. C'était 14 personnes. Comment tu me réponds ?",
          hint: "Eravamo in quattordici · quindici = 15 · dodici = 12 · tredici = 13 · quattordici = 14",
        },
        {
          question: "Il y a 38 personnes dans la salle. Écris ce nombre en toutes lettres — et explique pourquoi ce n'est pas 'trentaotto'.",
          hint: "La voyelle finale de 'trenta' tombe devant 'otto' → trentotto · Même règle pour uno : trentuno · Attention : ventitré (accent) mais ventidue (sans accent)",
        },
        {
          question: "J'ai 28 ans, ma sœur en a 22, mon frère 35. Écris les trois âges en toutes lettres.",
          hint: "ventotto (28) · ventidue (22) · trentacinque (35) · La voyelle de venti tombe devant otto et uno : ventuno, ventotto",
        },
      ],
      content: {
        introduction:
          "Avec Marco, tu vas vite en avoir besoin : commander un café, payer, donner un numéro de téléphone, comprendre une heure. Les nombres sont la colonne vertébrale de la langue. Bonne nouvelle : une fois les 20 premiers appris, le reste suit une logique simple.",
        sections: [
          {
            title: 'Les chiffres de 0 à 20 : à apprendre par cœur',
            text: "Les vingt premiers nombres sont irréguliers — il faut les mémoriser :\n\n0 zero · 1 uno · 2 due · 3 tre · 4 quattro · 5 cinque\n6 sei · 7 sette · 8 otto · 9 nove · 10 dieci\n11 undici · 12 dodici · 13 tredici · 14 quattordici · 15 quindici\n16 sedici · 17 diciassette · 18 diciotto · 19 diciannove · 20 venti\n\nQuelques prononciations à surveiller :\n- quattro : le 'qu' se prononce [kw], pas [k]\n- sei : [sɛi], comme le '-eil' de 'soleil' mais avec un 's' devant\n- dieci : [DIÉTCHI], le 'ci' final = [tchi]",
            examples: [
              "👉 Ho diciassette anni. → j'ai 17 ans",
              "👉 Dammi due cappuccini, per favore. → deux cappuccinos",
              "👉 Sono le undici. → il est 11h",
              "👉 Ci sono dodici mesi nell'anno. → 12 mois dans l'année",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment s'écrit le nombre 17 en italien ?",
                options: ['settedici', 'dicesette', 'diciassette', 'disette'],
                correctAnswer: 'diciassette',
                explanation:
                  "17 = diciassette. Attention : ce n'est pas 'dici + sette' mais 'diciassette' avec un double S — à mémoriser.",
              },
              {
                type: 'true_false',
                question: "En italien, le chiffre 3 s'écrit 'tre' et se prononce [trè].",
                correctAnswer: true,
                explanation:
                  "'Tre' se prononce comme le 'tré' français. Il prend un accent uniquement quand il termine un nombre composé : ventitré, trentatré.",
              },
              {
                type: 'fill_in_blank',
                question: "Le nombre 14 en italien : ___",
                correctAnswer: ['quattordici'],
                explanation:
                  "'Quattordici' = 14. La série 11–16 se forme avec 'undici, dodici, tredici, quattordici, quindici, sedici' — des formes à mémoriser.",
              },
            ],
          },
          {
            title: 'Les dizaines et les composés : la règle du chute de voyelle',
            text: "De 21 à 99, on combine dizaines et unités. Voici les dizaines :\n\n20 venti · 30 trenta · 40 quaranta · 50 cinquanta\n60 sessanta · 70 settanta · 80 ottanta · 90 novanta · 100 cento\n\n**La règle clé** : la voyelle finale de la dizaine tombe devant 'uno' (1) et 'otto' (8) :\n- vent**i** + uno → ventuno ✅ (pas *ventiuno*)\n- vent**i** + otto → ventotto ✅ (pas *ventiotto*)\n- trent**a** + uno → trentuno ✅\n- trent**a** + otto → trentotto ✅\n\n**Cas particulier — tre** : quand tre termine un nombre composé, il prend un accent : ventitré, trentatré, quarantatré...",
            examples: [
              "✅ 21 → ventuno · 28 → ventotto · 31 → trentuno · 38 → trentotto",
              "✅ 23 → ventitre ✗ → ventitré ✓ (accent sur le é final)",
              "✅ 45 → quarantacinque · 67 → sessantasette · 99 → novantanove",
              "🧩 Combien ? Quanti? → Quanti anni hai? / Ho ventisette anni.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle est l'orthographe correcte de 21 en italien ?",
                options: ['ventiuno', 'ventuno', 'venteuno', 'venti e uno'],
                correctAnswer: 'ventuno',
                explanation:
                  "La voyelle finale de 'venti' tombe devant 'uno' : venti + uno → ventuno. Même règle devant 'otto' : ventotto.",
              },
              {
                type: 'fill_in_blank',
                question: "Le nombre 33 en italien s'écrit ___.",
                correctAnswer: ['trentatré', 'trentatre'],
                explanation:
                  "33 = trentatré. Quand 'tre' termine un nombre composé, il prend un accent : ventitré, trentatré, quarantatré…",
              },
              {
                type: 'true_false',
                question: "En italien, 'trentaotto' est la forme correcte pour 38.",
                correctAnswer: false,
                explanation:
                  "Faux — la règle de chute de voyelle s'applique : trenta perd son 'a' devant otto → trentotto. 'Trentaotto' est incorrect.",
              },
            ],
          },
          {
            title: "Les nombres dans la vie courante : prix, âges, quantités",
            text: "Maintenant qu'on les connaît, utilisons-les ! Trois contextes essentiels :\n\n**Les prix** :\n- Quanto costa? → combien ça coûte ?\n- Costa tre euro e cinquanta. → ça coûte 3,50€\n- Sono cinque euro. → c'est 5 euros\n- 'Euro' est invariable : uno euro, venti euro (pas d'S)\n\n**L'âge** (rappel : avec avere, pas essere) :\n- Ho trent'anni. → j'ai 30 ans\n- Quanti anni hai? → tu as quel âge ?\n\n**Les quantités** :\n- un chilo di... → un kilo de...\n- due etti di... → 200g de...\n- mezzo chilo → un demi-kilo\n- una dozzina di... → une douzaine de...",
            examples: [
              "☕ Un caffè, quanto costa? / Costa un euro e venti.",
              "🎂 Quanti anni compi? / Compio ventinove anni domani!",
              "🛒 Vorrei un chilo di pomodori e mezzo chilo di mozzarella.",
              "📱 Il mio numero è: zero sei, quarantadue, diciannove, ottantuno.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'combien ça coûte ?' en italien ?",
                options: ['Quanto vale?', 'Quanto costa?', 'Quale prezzo?', 'Che costo?'],
                correctAnswer: 'Quanto costa?',
                explanation:
                  "'Quanto costa?' est la formule standard pour demander le prix. 'Quanto costano?' s'utilise pour plusieurs articles.",
              },
              {
                type: 'true_false',
                question: "En italien, 'euro' prend un S au pluriel : 'venti euros'.",
                correctAnswer: false,
                explanation:
                  "'Euro' est invariable en italien courant : 'venti euro', pas 'venti euros'. Même règle pour 'cento euro', 'mille euro'.",
              },
              {
                type: 'fill_in_blank',
                question: "Pour demander l'âge de quelqu'un : ___ anni hai?",
                correctAnswer: ['Quanti', 'quanti'],
                explanation:
                  "'Quanti anni hai?' = tu as quel âge ? 'Quanti' est le pluriel de 'quanto' (combien), accordé avec 'anni' (ans).",
              },
            ],
          },
        ],
        conclusion:
          "Bene! Tu peux déjà compter jusqu'à 100, donner un prix et dire ton âge. La règle de la voyelle qui tombe est le seul vrai piège — retiens ventuno, ventotto et ça devient automatique. Dans la prochaine leçon, on monte en puissance : l'heure, les centaines, les milliers.",
      },
    },
    {
      id: '4_2',
      name: "L'heure et les grands nombres",
      description:
        "Apprends à dire l'heure, à lire les grands nombres et à découvrir les ordinaux.",
      level: 'PARTIAL_TO_WELL',
      summary:
        "L'heure en italien : Che ore sono? → Sono le [heure] pour toutes les heures sauf : È l'una (1h), È mezzogiorno (midi), È mezzanotte (minuit). Les minutes : e venti (+ 20), e mezza (et demie), meno un quarto (moins le quart). Les grands nombres : cento (100), duecento (200), mille (1000), duemila (2000) — attention, mille → mila au pluriel. Les ordinaux : primo, secondo, terzo, quarto, quinto… puis suffixe -esimo à partir du 11e.",
      chat_questions: [
        {
          question: "Il est 8h30 et tu arrives à mon bar. Comment tu me demandes à quelle heure j'ai ouvert ce matin ?",
          hint: "Sono le otto e mezza · A che ora hai aperto? (à quelle heure tu as ouvert?) · Alle sette = à 7h · Alle sei e mezza = à 6h30",
        },
        {
          question: "Tu fixes un rendez-vous avec moi à 15h45. Comment tu me proposes par message ?",
          hint: "Ci vediamo alle tre e tre quarti? · Ou plus courant : alle quattro meno un quarto · meno = moins · un quarto = un quart",
        },
        {
          question: "Le menu de mon bar indique : caffè 1,20€ · cappuccino 1,80€ · cornetto 1,50€. Tu commandes 2 cafés et 1 cornetto. Combien tu dois ? Calcule en italien.",
          hint: "due caffè = due euro e quaranta · un cornetto = un euro e cinquanta · Totale: tre euro e novanta · Sono tre euro e novanta.",
        },
        {
          question: "Si je te dis que mon bar a ouvert en 2009 et que travaille là depuis 3 ans. Comment dire '3 ans' et '2009' en italien ?",
          hint: "il terzo anno (la 3e année) · duemilanove (2009) · gli anni : millenovecentonovantanove = 1999 · il primo / secondo / terzo = 1er / 2e / 3e",
        },
        {
          question: "Tu as besoin de 250g de parmesan et d'un litre et demi de lait. Comment tu le demandes à l'épicier ?",
          hint: "Vorrei due etti e mezzo di parmigiano · un litro e mezzo di latte · un etto = 100g · mezzo = demi",
        },
      ],
      content: {
        introduction:
          "Dire l'heure, comprendre les horaires, parler de dates — autant de situations où les nombres deviennent indispensables. Et pour les grands nombres, l'italien a ses propres règles, notamment sur 'mille' qui devient 'mila' au pluriel. On y va pas à pas.",
        sections: [
          {
            title: "Dire l'heure : Che ore sono?",
            text: "**Demander l'heure** : Che ore sono? ou Che ora è?\n\n**Répondre** :\n- Sono le due. → il est 2h\n- Sono le otto e venti. → il est 8h20\n- Sono le tre e mezza. → il est 3h30 (mezza = demie)\n- Sono le cinque e un quarto. → il est 5h15\n- Sono le sette meno un quarto. → il est 6h45 (meno = moins)\n- Sono le nove meno dieci. → il est 8h50\n\n**Exceptions** (sans 'le') :\n- È l'una. → il est 1h (l'una, pas le una)\n- È mezzogiorno. → il est midi\n- È mezzanotte. → il est minuit\n\n**Dire à quelle heure** :\n- Alle tre. → à 3h\n- All'una. → à 1h\n- A mezzogiorno. → à midi",
            examples: [
              "⏰ Che ore sono? / Sono le undici e mezza.",
              "⏰ A che ora apri? / All'una meno un quarto — alle dodici e tre quarti.",
              "⏰ Il treno parte alle sedici e trenta. → le train part à 16h30",
              "⏰ Ci vediamo a mezzanotte! → on se retrouve à minuit !",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'il est 1h du matin' en italien ?",
                options: ["Sono le uno.", "È l'una.", "Sono le una.", "È uno."],
                correctAnswer: "È l'una.",
                explanation:
                  "1h est un cas particulier : on dit 'È l'una' (singulier, avec l'article féminin). Pour toutes les autres heures, on utilise 'Sono le...'.",
              },
              {
                type: 'fill_in_blank',
                question: "'Il est 7h30' se dit en italien : Sono le sette e ___.",
                correctAnswer: ['mezza', 'mezza.'],
                explanation:
                  "'E mezza' = et demie. Sono le sette e mezza = 7h30. On dit aussi 'e trenta' dans les horaires officiels.",
              },
              {
                type: 'true_false',
                question: "Pour dire 'à midi', on dit 'alle mezzogiorni' en italien.",
                correctAnswer: false,
                explanation:
                  "'Mezzogiorno' et 'mezzanotte' sont invariables. On dit 'a mezzogiorno' (à midi) et 'a mezzanotte' (à minuit).",
              },
            ],
          },
          {
            title: 'Les grands nombres : centaines, milliers et millions',
            text: "**Centaines** :\n100 cento · 200 duecento · 300 trecento · 400 quattrocento · 500 cinquecento · 1000 mille\n\nNote : pas d'article devant cento et mille (pas de *un cento*, *un mille*).\n\n**Milliers** :\n1 000 mille · 2 000 duemila · 5 000 cinquemila · 10 000 diecimila · 100 000 centomila\n⚠️ Attention : mille → **mila** au pluriel !\n1 000 = mille / 2 000 = duemila / 3 000 = tremila\n\n**Millions** :\n1 000 000 un milione · 2 000 000 due milioni\n'Milione' prend un S au pluriel (milioni) et est suivi de 'di' : un milione di euro.\n\n**Les années** :\n2024 → duemilaventiquattro\n1999 → millenovecentonovantanove\n1985 → millenovecentottantacinque",
            examples: [
              "💶 Il prezzo è duemila euro. → le prix est 2 000€",
              "📅 Sono nato nel millenovecentonovantadue. → je suis né en 1992",
              "🏙️ Roma ha circa tre milioni di abitanti. → Rome a environ 3 millions d'habitants",
              "📊 Cinquecento persone → 500 personnes",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle est la forme correcte de 'mille' au pluriel (pour 3000) ?",
                options: ['tremigli', 'tremille', 'tremila', 'tromila'],
                correctAnswer: 'tremila',
                explanation:
                  "Au pluriel, 'mille' devient 'mila' : duemila, tremila, cinquemila... C'est une exception importante à retenir.",
              },
              {
                type: 'fill_in_blank',
                question: "L'année 2010 se dit en italien : duemila___.",
                correctAnswer: ['dieci', 'duemiladieci'],
                explanation:
                  "2010 = duemiladieci. Les années se lisent en un seul mot : duemilaquattordici (2014), duemilaventidue (2022).",
              },
              {
                type: 'true_false',
                question: "'Un milione' est suivi de 'di' quand il précède un nom : un milione di euro.",
                correctAnswer: true,
                explanation:
                  "Correct : 'milione' (et 'milioni') sont suivis de 'di' : tre milioni di persone, un milione di euro.",
              },
            ],
          },
          {
            title: 'Les nombres ordinaux : premier, deuxième, troisième…',
            text: "Les ordinaux servent à classer : le premier café, la deuxième rue à gauche, le troisième étage...\n\n**Les 10 premiers** (irréguliers) :\n1° primo · 2° secondo · 3° terzo · 4° quarto · 5° quinto\n6° sesto · 7° settimo · 8° ottavo · 9° nono · 10° decimo\n\n**À partir du 11e** : suffixe -esimo ajouté au nombre (sans la voyelle finale) :\n11° undicesimo · 15° quindicesimo · 20° ventesimo · 100° centesimo\n\n**Accord** : les ordinaux s'accordent en genre et en nombre :\n- il primo piano → le premier étage\n- la seconda strada → la deuxième rue\n- i primi giorni → les premiers jours\n\n**Abréviations écrites** : on note les ordinaux avec un exposant — 1° (masculin), 1ª (féminin). Ex : 1° piano (1er étage), 2ª strada (2e rue).",
            examples: [
              "🏠 Abito al terzo piano. → j'habite au troisième étage",
              "🏆 È arrivato secondo. → il est arrivé deuxième",
              "📖 È il mio primo libro in italiano! → c'est mon premier livre en italien !",
              "🗓️ Il primo gennaio → le 1er janvier (les dates utilisent les ordinaux au 1er du mois seulement)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'le troisième café à droite' en italien ?",
                options: [
                  'il terzo caffè a destra',
                  'il terzesimo caffè a destra',
                  'il tre caffè a destra',
                  'il terzione caffè a destra',
                ],
                correctAnswer: 'il terzo caffè a destra',
                explanation:
                  "'Terzo' est l'ordinal irrégulier pour 3e. Les 10 premiers ordinaux sont tous irréguliers et s'accordent avec le nom.",
              },
              {
                type: 'true_false',
                question: "En italien, les dates utilisent les ordinaux pour tous les jours du mois.",
                correctAnswer: false,
                explanation:
                  "Seul le 1er du mois utilise l'ordinal (il primo gennaio). Pour tous les autres jours, on utilise les nombres cardinaux : il due gennaio, il quindici marzo.",
              },
              {
                type: 'fill_in_blank',
                question: "Le 20e en italien : il ___ posto.",
                correctAnswer: ['ventesimo'],
                explanation:
                  "À partir du 11e, on ajoute -esimo au nombre (sans voyelle finale) : ventesimo (20e), trentesimo (30e), centesimo (100e).",
              },
            ],
          },
        ],
        conclusion:
          "Ottimo lavoro! Tu peux maintenant dire l'heure, parler de grandes quantités et te repérer dans des listes avec les ordinaux. Deux points à ancrer : 'È l'una' pour 1h (seul cas singulier), et 'mila' au pluriel de mille. La prochaine et dernière sous-leçon te permettra de tout consolider dans des contextes vraiment vivants.",
      },
    },
    {
      id: '4_3',
      name: 'Révision des nombres : dans la vraie vie',
      description:
        "Mobilise tous les nombres dans des situations concrètes avec Marco.",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Les nombres en contexte : dates complètes (jour + mois + année), calculs courants, horaires, numéros de téléphone, prix. Pièges fréquents : 'mille' → 'mila' au pluriel, voyelle tombante (ventuno, ventotto…), ordinal du 1er janvier (primo), 'euro' invariable. Marco en action : commander, payer, fixer un rendez-vous, parler d'un anniversaire.",
      chat_questions: [
        {
          question: "Je fête mes 30 ans le 14 mars. Envoie-moi un message d'anniversaire en mentionnant ma date et mon âge.",
          hint: "Buon compleanno Marco! · Oggi compi trent'anni · Il quattordici marzo · Tanti auguri! (tous mes vœux) · Sei il migliore! (t'es le meilleur !)",
        },
        {
          question: "Tu veux me retrouver demain à la gare. Il est 14h15 maintenant et tu proposes de se retrouver dans 3h45. À quelle heure ? Écris-moi le message.",
          hint: "14h15 + 3h45 = 18h · Ci vediamo alle diciotto / alle sei di sera · Alla stazione centrale · Ok per te?",
        },
        {
          question: "Tu es au marché avec moi. Tu achètes 400g de jambon à 3,50€/100g et une bouteille de vin à 8,90€. Combien tu dois en tout ?",
          hint: "quattrocento grammi di prosciutto → 4 × 3,50 = 14 euro · più una bottiglia di vino → 8,90 euro · Totale : ventidue euro e novanta",
        },
        {
          question: "Je te montre une photo de groupe : on était 47 au repas de fin d'année du bar en 2023. Dis-moi en italien combien on était et l'année.",
          hint: "Eravate in quarantasette? · nel duemilaventitré · Che bella festa! · Eravamo = on était (nous étions)",
        },
        {
          question: "Fais le bilan de ta leçon avec moi : dis-moi quel nombre tu as trouvé le plus difficile à retenir et pourquoi.",
          hint: "Il numero che ho trovato più difficile è... · Per esempio : diciassette, millenovecentonovantanove, ventotté... · Perché = parce que · Ho confuso... (j'ai confondu...)",
        },
      ],
      content: {
        introduction:
          "Dans cette dernière sous-leçon, les nombres quittent le tableau et entrent dans la vraie conversation. Dates d'anniversaire, additions au restaurant, horaires de trains — on va tout passer en revue avec les situations où Marco et toi en aurez besoin.",
        sections: [
          {
            title: 'Les dates complètes : jours, mois, années',
            text: "**La structure d'une date** :\njour (cardinal) + mois (invariable) + année\n→ il quattordici febbraio duemilaventitre = le 14 février 2023\n\n**Les mois** (pas de majuscule en italien !) :\ngennaio · febbraio · marzo · aprile · maggio · giugno\nluglio · agosto · settembre · ottobre · novembre · dicembre\n\n**Règle pour le jour** :\n- 1er = il primo (seul ordinal)\n- Tous les autres = cardinal : il due, il tre, il quindici…\n\n**Pour demander la date** :\n- Quanti ne abbiamo oggi? → on est le combien aujourd'hui ?\n- Che giorno è oggi? → on est quel jour ?\n- Oggi è il venti aprile. → aujourd'hui on est le 20 avril",
            examples: [
              "📅 Sono nato il tre luglio millenovecentonovantuno. → né le 3 juillet 1991",
              "🎂 Il compleanno di Marco è il primo marzo. → l'anniversaire de Marco est le 1er mars",
              "📅 Quanti ne abbiamo oggi? / Oggi è il ventidue settembre.",
              "🗓️ La lezione è il lunedì e il mercoledì. → le cours est le lundi et le mercredi",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'le 1er janvier' en italien ?",
                options: ['il uno gennaio', 'il primo gennaio', 'il unicesimo gennaio', 'il gennaro primo'],
                correctAnswer: 'il primo gennaio',
                explanation:
                  "Seul le 1er du mois utilise l'ordinal 'primo'. Pour les autres jours : il due, il tre, il quindici... (cardinaux).",
              },
              {
                type: 'fill_in_blank',
                question: "Les mois italiens prennent-ils une majuscule ? ___ (oui/no)",
                correctAnswer: ['no', 'No', 'Non', 'non'],
                explanation:
                  "En italien, les mois et les jours de la semaine s'écrivent en minuscules : gennaio, febbraio, lunedì, martedì...",
              },
              {
                type: 'true_false',
                question: "'Il venticinque dicembre duemilaventiquattro' est la façon correcte de dire le 25 décembre 2024.",
                correctAnswer: true,
                explanation:
                  "Oui : jour (cardinal) + mois (invariable) + année. 25 = venticinque, dicembre sans majuscule, 2024 = duemilaventiquattro.",
              },
            ],
          },
          {
            title: 'Les pièges classiques avec les nombres',
            text: "Quelques erreurs très fréquentes chez les francophones :\n\n**1. Mille / mila** : la confusion la plus courante\n- 1 000 = mille · 2 000 = duemila ← pas *due mille*\n- 5 000 = cinquemila · 10 000 = diecimila\n\n**2. La voyelle tombante** : ventuno (pas *ventiuno*), ventotto (pas *ventiotto*), trentuno, trentotto…\n\n**3. Tre avec accent** dans les composés : ventitré, trentatré, quarantatré — mais 'tre' seul sans accent.\n\n**4. Euro invariable** : venti euro, mille euro (jamais *euros*)\n\n**5. L'heure à 1h** : È l'una (pas *Sono le una*)\n\n**6. L'âge avec avere** : Ho vent'anni (pas *Sono venti anni*)",
            examples: [
              "⚠️ 2 000 → duemila ✅ · due mille ✗",
              "⚠️ 21 → ventuno ✅ · ventiuno ✗",
              "⚠️ 23 → ventitré ✅ · ventitre ✗ (sans accent = presque acceptable mais incomplet)",
              "⚠️ 1h → È l'una ✅ · Sono le una ✗",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Laquelle de ces formes est incorrecte ?",
                options: ['duemila', 'trentuno', 'ventisei', 'ventiotto'],
                correctAnswer: 'ventiotto',
                explanation:
                  "'Ventiotto' est faux. La voyelle de 'venti' tombe devant 'otto' : la forme correcte est 'ventotto'.",
              },
              {
                type: 'true_false',
                question: "On peut dire 'cinque mille euro' pour 5 000 euros en italien.",
                correctAnswer: false,
                explanation:
                  "Non, 'mille' ne prend jamais d'article au pluriel : 5 000 = cinquemila (un seul mot). 'Cinque mille' n'existe pas.",
              },
              {
                type: 'fill_in_blank',
                question: "Corrige la phrase : 'Sono le una' → ___",
                correctAnswer: ["È l'una", "è l'una"],
                explanation:
                  "1h est une exception : on dit 'È l'una' (singulier féminin). Toutes les autres heures utilisent 'Sono le...'.",
              },
            ],
          },
          {
            title: 'Les nombres en action : scènes du quotidien',
            text: "Entraînons-nous avec des mini-situations concrètes :\n\n**Au bar** :\n- Quanto viene tutto? → ça fait combien en tout ?\n- Sono quattro euro e sessanta. → ça fait 4,60€\n- Ho solo un biglietto da venti. → j'ai seulement un billet de 20\n- Il resto, grazie. → la monnaie, merci\n\n**Les horaires** :\n- A che ora parte il treno? → à quelle heure part le train ?\n- Parte alle diciassette e quarantacinque. → il part à 17h45\n- C'è un ritardo di venti minuti. → il y a 20 minutes de retard\n\n**Les numéros de téléphone** :\n- En Italie, ils se lisent par paires ou chiffre par chiffre\n- 333 42 18 67 → tre tre tre, quarantadue, diciotto, sessantasette",
            examples: [
              "☕ Due caffè e un cornetto: quanto viene? / Vengono tre euro e settanta.",
              "🚆 Il treno delle diciotto e trenta è in ritardo di quindici minuti.",
              "📱 Il mio numero è: tre tre tre, sei cinque, due uno, otto nove.",
              "💰 Ho venti euro — il resto è per te. → le reste c'est pour toi (pourboire !)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Tu dois payer 7,30€. Le caissier te demande 'Quant'è?'. Quelle est ta réponse ?",
                options: [
                  'Sono sette euro e trenta.',
                  'È sette euro e trenta.',
                  'Sono le sette e trenta.',
                  'Fa sette euro e trenta.',
                ],
                correctAnswer: 'Sono sette euro e trenta.',
                explanation:
                  "Pour les prix, on utilise 'sono' : 'Sono sette euro e trenta'. 'Fa' (ça fait) fonctionne aussi : 'Fa sette euro e trenta'. 'Sono le sette e trenta' serait l'heure 7h30, pas un prix.",
              },
              {
                type: 'fill_in_blank',
                question: "Le train part à 17h45 : il treno parte alle ___ e ___ .",
                correctAnswer: ['diciassette e quarantacinque', 'diciassette, quarantacinque'],
                explanation:
                  "17h45 = alle diciassette e quarantacinque. On peut aussi dire 'alle diciotto meno un quarto' (18h moins le quart).",
              },
              {
                type: 'true_false',
                question: "'Ho solo un biglietto da venti' signifie 'je n'ai qu'un billet de 20'.",
                correctAnswer: true,
                explanation:
                  "'Ho solo...' = je n'ai que... / j'ai seulement... Un biglietto da venti = un billet de vingt (euros). Formule utile pour demander de la monnaie.",
              },
            ],
          },
        ],
        conclusion:
          "Bravissimo! 🎉 Tu maîtrises maintenant les nombres italiens dans toutes leurs dimensions : compter, dire l'heure, les dates, les prix, les années. Les pièges classiques n'ont plus de secret pour toi. La prochaine leçon t'emmène vers le calendrier — jours, mois et saisons — pour que chaque conversation prenne ancrage dans le temps réel. Avanti!",
      },
    },
  ],
});
