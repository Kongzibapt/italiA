// ~/data/lessons/lesson_6.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 6,
  order: 6,
  name: 'Les questions essentielles',
  description:
    "Apprends à poser les questions de base : Chi ? (Qui ?), Cosa ? (Quoi ?), Dove ? (Où ?), Quando ? (Quand ?), Come ? (Comment ?) et Perché ? (Pourquoi ?). Indispensable pour toute conversation.",
  chapter_id: 'premiers-pas',
  chapter_name: 'Premiers pas',
  sub_lessons: [
    {
      id: '6_1',
      name: 'Chi, Cosa, Dove',
      description:
        "Maîtrise les questions sur les personnes, les objets et les lieux.",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "Les trois premiers mots interrogatifs italiens : Chi? (Qui?) pour les personnes — invariable. Cosa? / Che cosa? / Che? (Quoi? / Qu'est-ce que?) — les trois formes sont équivalentes. Dove? (Où?) · Di dove sei? / Da dove vieni? (D'où tu viens?). En italien, les questions se forment sans inversion : on garde l'ordre sujet-verbe et on monte simplement l'intonation, ou on place le mot interrogatif en tête de phrase. Pas de 'do/does' comme en anglais.",
      chat_questions: [
        {
          question: "Un client entre dans mon bar et commande, mais je n'ai pas bien entendu. Aide-moi à lui demander ce qu'il a dit — et qu'est-ce qu'il y a dans un cappuccino selon toi ?",
          hint: "Cosa ha detto? / Che cosa vuole? (qu'est-ce qu'il veut ?) · Un cappuccino è fatto di caffè e latte montato · Cosa c'è in...? (qu'est-ce qu'il y a dans...?)",
        },
        {
          question: "Je dois appeler un livreur mais j'ai perdu sa fiche. Comment je lui demanderais son nom, son numéro et d'où il vient ?",
          hint: "Come si chiama? (comment il s'appelle?) · Qual è il suo numero? · Di dove è? / Da dove viene? · Chi è il fornitore? (qui est le fournisseur?)",
        },
        {
          question: "Tu arrives dans mon bar pour la première fois. Je veux savoir qui tu es et d'où tu viens. Comment je te pose ces deux questions ?",
          hint: "Chi sei? / Come ti chiami? · Di dove sei? / Da dove vieni? · Sei italiano/a? · Sono di Parigi = je suis de Paris",
        },
        {
          question: "Quelqu'un a renversé du café sur le comptoir et je ne sais pas qui c'est. Comment je demande aux clients présents qui a fait ça — et où est passée la serviette ?",
          hint: "Chi ha fatto questo? (qui a fait ça?) · Chi era? (c'était qui?) · Dov'è lo straccio? (où est le torchon?) · Dove sono le tovagliette? (où sont les serviettes?)",
        },
        {
          question: "Un touriste me demande où se trouve la fontaine de Trevi. Je ne sais pas exactement. Comment il m'a posé la question — et comment je lui réponds que je ne sais pas bien ?",
          hint: "Dov'è la Fontana di Trevi? · Non so esattamente (je ne sais pas exactement) · È vicino a... (c'est près de...) · Devo controllare (je dois vérifier)",
        },
      ],
      content: {
        introduction:
          "Savoir poser des questions, c'est pouvoir explorer. Avec juste trois mots — chi, cosa, dove — tu peux déjà mener une conversation entière : identifier les gens, comprendre ce qu'on te dit, te repérer dans une ville. Ce sont les outils de base de tout locuteur curieux.",
        sections: [
          {
            title: "Chi ? — Qui ?",
            text: "**Chi** (= qui) s'utilise pour interroger sur des personnes. Il est invariable — il ne change jamais de forme.\n\n**Fonctions** :\n- Sujet : Chi viene stasera? → qui vient ce soir ?\n- Complément d'objet : Chi aspetti? → tu attends qui ?\n- Après préposition : Con chi parli? → tu parles avec qui ? · Per chi è? → c'est pour qui ?\n- Exclamatif : Chi sei? → qui es-tu ?\n\n**Formes courantes** :\n- Come ti chiami? → comment tu t'appelles ? (litt. : comment tu t'appelles)\n- Di chi è? → c'est à qui ? (appartenance)\n- Chi è? / Chi sono? → qui est-ce ? / qui sont-ils ?\n\n**À ne pas confondre** :\n- Chi = qui (personne)\n- Che / Cosa = quoi (chose)\n→ Chi ha preso il mio caffè? (qui a pris mon café?) ≠ Cosa hai preso? (qu'est-ce que tu as pris?)",
            examples: [
              "☎️ Chi chiamo adesso? → qui j'appelle maintenant ?",
              "👤 Chi è quel signore al bancone? → qui est ce monsieur au comptoir ?",
              "🤝 Con chi lavori? → tu travailles avec qui ?",
              "☕ Di chi è questo caffè? → ce café, c'est à qui ?",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'avec qui tu viens ?' en italien ?",
                options: ['Con cosa vieni?', 'Chi viene con?', 'Con chi vieni?', 'Chi con vieni?'],
                correctAnswer: 'Con chi vieni?',
                explanation:
                  "La préposition se place avant 'chi' en italien — jamais après. 'Con chi?' = avec qui? · 'Per chi?' = pour qui? · 'Di chi?' = de qui?",
              },
              {
                type: 'true_false',
                question: "'Chi' peut aussi s'utiliser pour demander des informations sur des objets.",
                correctAnswer: false,
                explanation:
                  "Non, 'chi' ne s'utilise que pour les personnes. Pour les choses, on utilise 'cosa' ou 'che cosa'. Ex : Chi è? (une personne) ≠ Cos'è? (une chose).",
              },
              {
                type: 'fill_in_blank',
                question: "'C'est à qui ce sac ?' : Di ___ è questa borsa?",
                correctAnswer: ['chi'],
                explanation:
                  "'Di chi è...?' exprime l'appartenance. 'Di chi è questa borsa?' = c'est à qui ce sac ? On utilise 'di' devant 'chi' pour indiquer la possession.",
              },
            ],
          },
          {
            title: "Cosa ? — Qu'est-ce que ? / Quoi ?",
            text: "Pour interroger sur une chose, l'italien offre trois formes équivalentes :\n\n**Che cosa? = Che? = Cosa?**\n→ Che cosa vuoi? = Che vuoi? = Cosa vuoi? → qu'est-ce que tu veux ?\n\nEn pratique : 'Cosa?' est la forme la plus courante à l'oral. 'Che cosa?' est plus soutenue. 'Che?' peut paraître un peu brusque seul.\n\n**Fonctions** :\n- Objet direct : Cosa mangi? → tu manges quoi ?\n- Sujet : Cosa succede? → qu'est-ce qui se passe ?\n- Après préposition : Di cosa parli? → tu parles de quoi ? · A cosa pensi? → à quoi tu penses ?\n\n**Cos'è?** (élision courante) : Cos'è questo? → qu'est-ce que c'est ?\n\n**Attention — Che devant un nom** :\nDevant un nom, 'che' devient un adjectif interrogatif (= quel/quelle) :\n- Che tipo è? → quel genre de personne c'est ?\n- Che ora è? → quelle heure est-il ?\n- Che lavoro fai? → quel est ton travail ?",
            examples: [
              "🍕 Cosa c'è nella pizza margherita? → qu'est-ce qu'il y a dans la pizza margherita ?",
              "📰 Cosa dice il giornale oggi? → qu'est-ce que dit le journal aujourd'hui ?",
              "💭 A cosa stai pensando? → à quoi tu penses ?",
              "🤔 Cos'è successo? → qu'est-ce qui s'est passé ?",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Laquelle de ces formes n'est PAS correcte pour dire 'qu'est-ce que tu fais ?' ?",
                options: ['Cosa fai?', 'Che cosa fai?', 'Che fai?', 'Chi fai?'],
                correctAnswer: 'Chi fai?',
                explanation:
                  "'Chi fai?' est incorrect car 'chi' s'utilise uniquement pour les personnes. Les trois formes correctes sont : Cosa fai? / Che cosa fai? / Che fai?",
              },
              {
                type: 'fill_in_blank',
                question: "'Qu'est-ce que c'est ?' en une seule question courte (avec élision) : ___",
                correctAnswer: ["Cos'è?", "cos'è?"],
                explanation:
                  "'Cos'è?' est l'élision de 'Cosa è?' — la voyelle finale de 'cosa' tombe devant la voyelle initiale de 'è'. Très courant à l'oral.",
              },
              {
                type: 'true_false',
                question: "'Che lavoro fai?' signifie 'quel travail tu fais ?'",
                correctAnswer: true,
                explanation:
                  "Oui. Devant un nom, 'che' devient adjectif interrogatif et équivaut à 'quel/quelle' : Che lavoro? (quel travail?) · Che giorno? (quel jour?) · Che ora? (quelle heure?)",
              },
            ],
          },
          {
            title: "Dove ? — Où ?",
            text: "**Dove** (= où) interroge sur un lieu. Très simple d'emploi, il supporte plusieurs prépositions :\n\n**Dove?** → où ? (lieu statique)\n- Dov'è il bagno? → où sont les toilettes ? (élision courante : dove + è = dov'è)\n- Dove abiti? → tu habites où ?\n- Dove siamo? → on est où ?\n\n**Da dove?** → d'où ? (origine, point de départ)\n- Da dove vieni? → tu viens d'où ?\n- Da dove parte il treno? → le train part d'où ?\n\n**Di dove?** → de quelle ville/région ? (origine géographique)\n- Di dove sei? → tu es d'où ? (souvent préféré à 'da dove' pour l'origine nationale)\n\n**Dove + andare** → où tu vas ?\n- Dove vai? → tu vas où ?\n- Dove andate stasera? → vous allez où ce soir ?\n\n**Dovunque** = n'importe où / partout (ne pas confondre avec dove).",
            examples: [
              "🚻 Scusi, dov'è il bagno? → excusez-moi, où sont les toilettes ?",
              "🗺️ Di dove sei? / Sono di Roma, e tu? → tu es d'où ? / Je suis de Rome, et toi ?",
              "🚶 Dove vai di bello? → tu vas où comme ça ? (expression familière)",
              "📍 Dove ci troviamo? → on se retrouve où ?",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Pour demander 'tu es originaire de quelle ville ?', on utilise :",
                options: ['Dove sei?', 'Da dove sei?', 'Di dove sei?', 'Dove vieni?'],
                correctAnswer: 'Di dove sei?',
                explanation:
                  "'Di dove sei?' est la formule standard pour l'origine géographique d'une personne. 'Da dove vieni?' est aussi correct mais légèrement plus formel. 'Dove sei?' sans préposition signifierait 'où es-tu ?' (lieu actuel).",
              },
              {
                type: 'fill_in_blank',
                question: "'Où sont les clés ?' avec élision : ___ le chiavi?",
                correctAnswer: ["Dov'è", "dov'è", "Dove sono", "dove sono"],
                explanation:
                  "Pour un objet singulier : 'Dov'è la chiave?' · Pour un pluriel : 'Dove sono le chiavi?' L'élision 'dov'è' (dove + è) est très courante à l'oral.",
              },
              {
                type: 'true_false',
                question: "'Dove vai?' et 'Da dove vieni?' veulent dire la même chose.",
                correctAnswer: false,
                explanation:
                  "'Dove vai?' = où tu vas ? (destination) · 'Da dove vieni?' = d'où tu viens ? (origine ou point de départ). Ce sont deux questions opposées !",
              },
            ],
          },
        ],
        conclusion:
          "Bene! Avec chi, cosa et dove, tu peux déjà mener l'essentiel d'une conversation de base — identifier les gens, comprendre les choses, te repérer dans l'espace. Dans la prochaine sous-leçon, on complète la boîte à outils avec quando, come et perché — les questions du temps, de la manière et de la cause.",
      },
    },
    {
      id: '6_2',
      name: 'Quando, Come, Perché',
      description:
        "Apprends à poser des questions sur le temps, la manière et la cause.",
      level: 'PARTIAL_TO_WELL',
      summary:
        "Quando? (Quand?) · Come? (Comment? — aussi pour dire l'état ou le nom) · Perché? (Pourquoi? — et aussi Parce que, avec le même mot) · Quale/Quali? (Quel/Laquelle? — accord en nombre) · Quanto/Quanta/Quanti/Quante? (Combien? — accord en genre et nombre). Pièges : perché = pourquoi ET parce que / come = comment ET comme / quale devant 'è' perd son E (qual è). Ces six mots couvrent l'essentiel des situations de conversation.",
      chat_questions: [
        {
          question: "Je veux savoir depuis combien de temps tu apprends l'italien et comment tu trouves ça. Dis-moi aussi pourquoi tu as choisi l'italien plutôt qu'une autre langue.",
          hint: "Da quanto tempo studi l'italiano? · Come trovi l'italiano? / Lo trovo... (je le trouve...) · Perché ho scelto l'italiano? · Perché mi piace = parce que ça me plaît",
        },
        {
          question: "Mon bar ouvre à 7h mais ce matin j'ai eu du retard. Un client régulier me demande comment j'allais et à quelle heure j'ai ouvert. Comment il me pose ces deux questions ?",
          hint: "Come stai? / Come stavi stamattina? · A che ora hai aperto? / Quando hai aperto? · Stavo bene ma... · Sono arrivato tardi perché...",
        },
        {
          question: "Tu regardes le menu et tu veux savoir quel café je recommande et combien coûte le meilleur. Comment tu me poses ces deux questions ?",
          hint: "Quale caffè consigli? · Qual è il migliore? · Quanto costa? · Quant'è? (combien ça fait?) · Consiglio il... = je recommande le...",
        },
        {
          question: "Je te raconte que j'ai changé de fournisseur de café. Tu veux savoir pourquoi j'ai changé et quand ça s'est passé.",
          hint: "Perché hai cambiato fornitore? · Quando è successo? · Da quando? (depuis quand?) · Ho cambiato perché... = j'ai changé parce que...",
        },
        {
          question: "Un nouveau client me demande comment se prononce mon nom de famille et quel est mon plat préféré à la carte. Aide-moi à reconstituer ses deux questions.",
          hint: "Come si pronuncia il tuo cognome? · Qual è il tuo piatto preferito? · Come si dice...? (comment on dit...?) · Quale preferisci?",
        },
      ],
      content: {
        introduction:
          "Chi, cosa, dove couvrent la scène statique — les personnes, les objets, les lieux. Maintenant on ajoute le mouvement : le temps avec quando, la manière avec come, la cause avec perché. Et deux interrogatifs bonus — quale et quanto — qui permettent de préciser et de chiffrer.",
        sections: [
          {
            title: "Quando ? — Quand ?",
            text: "**Quando** (= quand) interroge sur le temps d'une action.\n\n**Quand le moment est précis** :\n- Quando arrivi? → tu arrives quand ?\n- Quando comincia il film? → le film commence quand ?\n- Quando sei nato? → tu es né quand ?\n\n**Expressions avec quando** :\n- Da quando? → depuis quand ?\n- Fino a quando? → jusqu'à quand ?\n- A partire da quando? → à partir de quand ?\n\n**Quando dans une subordonnée** (conjonction) :\n- Quando arrivo, ti chiamo. → quand j'arrive, je t'appelle.\n- Fammi sapere quando sei pronto. → dis-moi quand tu es prêt.\n\n**Mots de temps associés** :\n- presto (tôt / bientôt) · tardi (tard) · subito (tout de suite)\n- già (déjà) · ancora (encore / toujours) · non ancora (pas encore)",
            examples: [
              "⏰ Quando apri il bar la mattina? → tu ouvres le bar à quelle heure le matin ?",
              "📅 Da quando lavori qui? → tu travailles ici depuis quand ?",
              "🚆 Fino a quando parte il treno? → le train part jusqu'à quand ? (dernier départ)",
              "💬 Dimmi quando sei libero. → dis-moi quand tu es libre.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'depuis quand' en italien ?",
                options: ['Fino a quando', 'Da quando', 'Quando mai', 'A partire da'],
                correctAnswer: 'Da quando',
                explanation:
                  "'Da quando?' = depuis quand? 'Fino a quando?' = jusqu'à quand? 'Da' exprime le point de départ dans le temps ou dans l'espace.",
              },
              {
                type: 'true_false',
                question: "'Quando' peut aussi fonctionner comme conjonction (lorsque) dans une phrase.",
                correctAnswer: true,
                explanation:
                  "Oui : 'Quando arrivo, chiamo.' (quand j'arrive, j'appelle). 'Quando' est à la fois interrogatif (quand ?) et conjonction temporelle (lorsque / quand).",
              },
              {
                type: 'fill_in_blank',
                question: "'Jusqu'à quand es-tu à Rome ?' : ___ a quando sei a Roma?",
                correctAnswer: ['Fino', 'fino'],
                explanation:
                  "'Fino a quando?' = jusqu'à quand? 'Fino' exprime la limite temporelle ou spatiale : fino a domani (jusqu'à demain), fino alla fine (jusqu'à la fin).",
              },
            ],
          },
          {
            title: "Come ? — Comment ?",
            text: "**Come** (= comment) est l'un des mots interrogatifs les plus polyvalents de l'italien.\n\n**Pour demander la manière** :\n- Come stai? → comment tu vas ?\n- Come si fa? → comment on fait ?\n- Come funziona? → comment ça marche ?\n\n**Pour demander un nom / une prononciation** :\n- Come ti chiami? → comment tu t'appelles ?\n- Come si dice '...' in italiano? → comment dit-on '...' en italien ?\n- Come si scrive? → comment ça s'écrit ?\n\n**Come + essere** (pour décrire) :\n- Com'è? → comment c'est ? / c'est comment ?\n- Come sono? → ils sont comment ?\n- Com'era? → c'était comment ?\n\n**Come nel sens de 'comme'** (conjonction) :\n- Come al solito. → comme d'habitude.\n- Fai come vuoi. → fais comme tu veux.\n\n**Come mai?** = comment ça se fait ? / pourquoi donc ? (nuance de surprise)\n- Come mai sei qui? → comment ça se fait que tu sois là ?",
            examples: [
              "😊 Come stai? / Sto bene, grazie! E tu? → comment tu vas? / Bien merci, et toi?",
              "🗣️ Come si pronuncia 'gnocchi'? → comment on prononce 'gnocchi' ?",
              "☕ Com'è il caffè qui? → le café est comment ici ?",
              "🤔 Come mai non sei venuto ieri? → comment ça se fait que tu ne sois pas venu hier ?",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Pour demander 'comment ça s'écrit ?', on dit :",
                options: ['Come si legge?', 'Come si scrive?', 'Come si dice?', 'Come si fa?'],
                correctAnswer: 'Come si scrive?',
                explanation:
                  "'Come si scrive?' = comment ça s'écrit? · 'Come si legge?' = comment ça se lit? · 'Come si dice?' = comment ça se dit? · 'Come si fa?' = comment on fait?",
              },
              {
                type: 'fill_in_blank',
                question: "'Comment c'était ?' (au passé) : Com'___?",
                correctAnswer: ['era', "Com'era", "com'era"],
                explanation:
                  "'Com'era?' (élision de come + era) = comment c'était ? C'est la forme passée de 'Com'è?' (comment c'est ?). L'élision de 'come' devant une voyelle est systématique.",
              },
              {
                type: 'true_false',
                question: "'Come mai?' exprime la surprise et peut remplacer 'perché?' dans certains contextes.",
                correctAnswer: true,
                explanation:
                  "Oui, 'come mai?' signifie 'pourquoi donc ?' avec une nuance de surprise ou d'étonnement. Ex : 'Come mai sei triste?' = pourquoi tu es triste ? (je m'y attendais pas).",
              },
            ],
          },
          {
            title: "Perché, Quale, Quanto — les interrogatifs qui complètent tout",
            text: "**Perché** (= pourquoi ET parce que) :\n- Perché? → pourquoi ?\n- Perché sei in ritardo? → pourquoi tu es en retard ?\n- Perché sono in ritardo. → parce que je suis en retard.\n⚠️ Un seul mot pour la question et la réponse — contrairement au français (pourquoi ≠ parce que).\n\n**Quale / Quali** (= quel / laquelle / lesquels) :\n- S'accorde en nombre : quale (sing.) / quali (plur.)\n- Quale preferisci? → lequel tu préfères ?\n- Quali sono i tuoi piatti preferiti? → quels sont tes plats préférés ?\n- **Qual è** (élision obligatoire devant 'è') : Qual è il tuo nome? → quel est ton nom ?\n  ⚠️ On écrit 'qual è' et NON *quale è*\n\n**Quanto / Quanta / Quanti / Quante** (= combien) :\n- S'accorde en genre ET en nombre avec le nom qui suit :\n  · Quanto costa? → combien ça coûte ?\n  · Quanta gente c'è? → il y a combien de monde ?\n  · Quanti anni hai? → tu as quel âge ?\n  · Quante ore lavori? → tu travailles combien d'heures ?",
            examples: [
              "❓ Perché studi l'italiano? / Perché mi piace la cultura italiana. → pourquoi? / parce que j'aime la culture italienne.",
              "🍕 Quale pizza consigli? / Consiglio la margherita. → laquelle tu conseilles? / je conseille la margherita.",
              "💶 Quanto costa un caffè? / Costa un euro e venti. → combien coûte un café? / 1,20€.",
              "👥 Quante persone vengono stasera? → combien de personnes viennent ce soir ?",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Laquelle de ces phrases est correcte ?",
                options: ['Quale è il tuo nome?', "Qual'è il tuo nome?", 'Qual è il tuo nome?', 'Quale il tuo nome?'],
                correctAnswer: 'Qual è il tuo nome?',
                explanation:
                  "Devant 'è', 'quale' s'élide en 'qual' — sans apostrophe ! On écrit 'qual è' (deux mots, pas d'apostrophe). C'est une règle fixe et souvent mal appliquée.",
              },
              {
                type: 'fill_in_blank',
                question: "'Pourquoi tu ne manges pas ?' : ___ non mangi?",
                correctAnswer: ['Perché', 'perché'],
                explanation:
                  "'Perché non mangi?' = pourquoi tu ne manges pas? Réponse possible : 'Perché non ho fame.' (parce que je n'ai pas faim). Même mot pour les deux.",
              },
              {
                type: 'true_false',
                question: "'Quanti' et 'quante' sont des formes différentes du même mot et s'accordent avec le nom.",
                correctAnswer: true,
                explanation:
                  "Correct : 'quanto' s'accorde. Quant**o** (masc. sing.) / quant**a** (fém. sing.) / quant**i** (masc. plur.) / quant**e** (fém. plur.). Ex : quanti giorni (m.pl.) / quante ore (f.pl.).",
              },
            ],
          },
        ],
        conclusion:
          "Perfetto! Tu maîtrises maintenant les six interrogatifs fondamentaux : chi, cosa, dove, quando, come, perché — plus quale et quanto en bonus. Retiens surtout les deux pièges : 'perché' pour pourquoi ET parce que, et 'qual è' sans apostrophe. Dans la dernière sous-leçon, on va tout faire travailler ensemble dans des conversations réelles avec Marco.",
      },
    },
    {
      id: '6_3',
      name: 'Révision des questions',
      description:
        "Exercices de consolidation pour formuler et répondre aux questions courantes.",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Récapitulatif complet des mots interrogatifs : Chi (personnes) · Cosa/Che cosa (choses) · Dove / Da dove / Di dove (lieu, origine) · Quando / Da quando / Fino a quando (temps) · Come / Com'è / Come mai (manière, description, surprise) · Perché (pourquoi/parce que) · Qual è / Quale / Quali (quel/lequel) · Quanto / Quanta / Quanti / Quante (combien). En situation : questions indirectes (Non so dove…), réponses enchaînées, questions en cascade.",
      chat_questions: [
        {
          question: "Je viens d'embaucher un nouvel employé au bar. Pose-lui cinq questions pour apprendre à le connaître — son nom, son origine, son expérience, ses disponibilités et pourquoi il a postulé.",
          hint: "Come ti chiami? · Di dove sei? · Quanta esperienza hai? · Quando sei disponibile? · Perché vuoi lavorare qui? · Hai già lavorato in un bar? (tu as déjà travaillé dans un bar?)",
        },
        {
          question: "Un journaliste m'interviewe sur mon bar. Il veut savoir depuis quand j'ai ouvert, combien de clients je reçois par jour, comment je trouve l'ambiance du quartier et quel est mon café signature.",
          hint: "Da quando è aperto il bar? · Quanti clienti ricevi al giorno? · Come trovi l'atmosfera del quartiere? · Qual è il tuo caffè speciale? · Il mio caffè signature è...",
        },
        {
          question: "Tu es perdu dans Rome et tu dois demander à un passant où se trouve la station de métro la plus proche, à quelle heure elle ferme et combien coûte le ticket.",
          hint: "Dov'è la stazione della metropolitana più vicina? · Fino a quando è aperta? · Quanto costa il biglietto? · Scusi, sa dirmi...? (excusez-moi, pouvez-vous me dire...?)",
        },
        {
          question: "On fait le bilan de la leçon ensemble. Je te demande quelle question italienne tu as trouvée la plus difficile à retenir et pourquoi, et laquelle tu penses utiliser le plus souvent.",
          hint: "La domanda più difficile per me è stata... · Perché ho confuso... · Quella che userò di più è... · Penso che userò spesso... · Come mai è difficile? = pourquoi c'est difficile?",
        },
        {
          question: "Un ami me demande ce que je fais ce week-end, avec qui je sors, où on va et combien ça va coûter. Réponds-lui à toutes ces questions en une ou deux phrases.",
          hint: "Questo fine settimana vado a... · Con il mio amico Marco · Andiamo a... · Costa circa... euro a testa · A testa = par personne",
        },
      ],
      content: {
        introduction:
          "On arrive à la dernière étape : consolider tous les mots interrogatifs dans des situations qui ressemblent à de vraies conversations. L'objectif n'est plus de réciter une liste, mais de choisir instinctivement le bon interrogatif et d'enchaîner naturellement question et réponse.",
        sections: [
          {
            title: "Tableau récapitulatif et pièges à éviter",
            text: "Voici les huit interrogatifs et leurs points de vigilance :\n\n| Mot | Traduction | Piège fréquent |\n|-----|-----------|----------------|\n| Chi? | Qui? | Uniquement pour les personnes |\n| Cosa? / Che? | Quoi? | Trois formes équivalentes |\n| Dove? | Où? | Di dove = origine · Da dove = départ |\n| Quando? | Quand? | Da quando = depuis quand |\n| Come? | Comment? | Com'è (élision) · Come mai = pourquoi donc |\n| Perché? | Pourquoi? | = aussi 'parce que' |\n| Quale/Quali? | Quel(s)/Laquelle? | Qual è (sans apostrophe!) |\n| Quanto/a/i/e? | Combien? | Accord en genre ET nombre |\n\n**Questions indirectes** :\nQuand on insère une question dans une phrase déclarative, on garde le même mot interrogatif mais on ne met pas de point d'interrogation :\n- Non so dove sei. → je ne sais pas où tu es.\n- Dimmi chi viene. → dis-moi qui vient.\n- Sai quando apre? → tu sais quand ça ouvre ?",
            examples: [
              "✅ Qual è il tuo numero? ❌ Quale è il tuo numero?",
              "✅ Perché non vieni? / Perché sono stanco. → pourquoi? / parce que je suis fatigué.",
              "✅ Quante persone vengono? (fém. plur.) ✅ Quanti giorni mancano? (masc. plur.)",
              "✅ Non so dove abita. (phrase déclarative, pas de ?) ✅ Dove abita? (question directe)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle est la phrase correcte ?",
                options: [
                  "Qual'è il problema?",
                  "Quale è il problema?",
                  "Qual è il problema?",
                  "Quali è il problema?",
                ],
                correctAnswer: 'Qual è il problema?',
                explanation:
                  "'Qual è' s'écrit sans apostrophe — c'est une apocope (chute de syllabe), pas une élision. Règle fixe : toujours 'qual è', jamais 'quale è' ni 'qual'è'.",
              },
              {
                type: 'true_false',
                question: "Dans la phrase 'Non so perché è triste', il y a un point d'interrogation.",
                correctAnswer: false,
                explanation:
                  "Non. Les questions indirectes (enchâssées dans une phrase déclarative) ne prennent pas de point d'interrogation : 'Non so perché è triste.' (je ne sais pas pourquoi il est triste).",
              },
              {
                type: 'fill_in_blank',
                question: "'Combien de jours reste-t-il ?' : ___ giorni mancano?",
                correctAnswer: ['Quanti', 'quanti'],
                explanation:
                  "'Giorni' est masculin pluriel → 'quanti'. L'accord de quanto : quant**o** (m.sg.) / quant**a** (f.sg.) / quant**i** (m.pl.) / quant**e** (f.pl.).",
              },
            ],
          },
          {
            title: "Questions en cascade : mener une vraie conversation",
            text: "Dans une conversation réelle, les questions s'enchaînent. Voici quelques schémas naturels :\n\n**Se renseigner sur quelqu'un** :\nCome ti chiami? → Di dove sei? → Cosa fai? → Da quanto tempo sei a Roma?\n\n**Commander / se renseigner** :\nCosa avete oggi? → Qual è il piatto del giorno? → Quanto costa? → Quando è pronto?\n\n**Organiser un rendez-vous** :\nQuando sei libero? → Dove ci vediamo? → A che ora? → Come ci arrivi?\n\n**Répondre à une question par une question** :\n- Perché me lo chiedi? → pourquoi tu me demandes ça ?\n- E tu? → et toi ? (reformulation en écho)\n- Come mai? → comment ça ?\n\n**Formules pour ne pas comprendre** :\n- Come? / Cosa? → quoi ? (pour faire répéter)\n- Puoi ripetere? → tu peux répéter ?\n- Non ho capito — puoi spiegare? → j'ai pas compris — tu peux expliquer ?",
            examples: [
              "🗣️ Chi sei? / Dove lavori? / Da quanto tempo? → enchaînement naturel",
              "🍽️ Cosa consiglia? / Qual è il più buono? / Quanto ci vuole? → au restaurant",
              "😕 Come? Non ho sentito bene. → quoi ? j'ai pas bien entendu.",
              "🔄 Puoi ripetere più lentamente? → tu peux répéter plus lentement ?",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Un ami te dit qu'il part en voyage. Tu veux savoir où et avec qui. Dans quel ordre poses-tu tes questions ?",
                options: [
                  'Quando parti? / Con chi?',
                  'Dove vai? / Con chi?',
                  'Come vai? / Perché?',
                  'Cosa fai? / Dove?',
                ],
                correctAnswer: 'Dove vai? / Con chi?',
                explanation:
                  "Pour le lieu → Dove? · Pour la personne → Chi? → 'Dove vai? Con chi?' est la séquence naturelle pour un voyage. 'Quando parti?' viendrait ensuite.",
              },
              {
                type: 'fill_in_blank',
                question: "Pour faire répéter poliment : Puoi ___ più lentamente?",
                correctAnswer: ['ripetere', 'Ripetere'],
                explanation:
                  "'Puoi ripetere?' = tu peux répéter ? 'Più lentamente' = plus lentement. Autre formule : 'Può ripetere?' (vouvoiement formel).",
              },
              {
                type: 'true_false',
                question: "'Come?' tout seul peut s'utiliser pour demander à quelqu'un de répéter.",
                correctAnswer: true,
                explanation:
                  "Oui, 'Come?' seul (avec intonation montante) équivaut à 'Quoi ? / Pardon ?' en français. Très naturel à l'oral. On peut aussi dire 'Cosa?' dans le même sens.",
              },
            ],
          },
          {
            title: "Synthèse : toutes les questions dans un dialogue",
            text: "Voici un dialogue complet qui mobilise tous les interrogatifs :\n\n**Au bar de Marco** :\n\n— *Buongiorno! Chi è il titolare?*\n→ Sono io. Come posso aiutarla?\n— *Vorrei un caffè. Quanto costa?*\n→ Un euro e venti.\n— *Qual è il migliore caffè che avete?*\n→ Il nostro blend della casa — lo consiglio.\n— *Da dove vengono i chicchi?*\n→ Dal Brasile e dall'Etiopia.\n— *Quando fate la consegna la mattina?*\n→ Alle sei e mezza, ogni giorno.\n— *Perché avete chiuso ieri?*\n→ Perché era il giorno di riposo settimanale.\n— *Come mai così presto stamattina?*\n→ Perché oggi ho molti clienti!\n\nTous les interrogatifs en contexte : chi · come · quanto · qual è · da dove · quando · perché · come mai.",
            examples: [
              "🎯 Chi + cosa + dove = les fondations (personnes, choses, lieux)",
              "🎯 Quando + come + perché = la dynamique (temps, manière, cause)",
              "🎯 Quale + quanto = la précision (choix, quantité)",
              "🎯 Question indirecte : Non so + [interrogatif] + phrase (sans ?)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Dans le dialogue, 'Da dove vengono i chicchi?' interroge sur :",
                options: ["l'heure", "l'origine des grains de café", "le prix", "la quantité"],
                correctAnswer: "l'origine des grains de café",
                explanation:
                  "'Da dove vengono?' = d'où ils viennent ? · 'Chicchi' = grains (de café). 'Da dove' interroge sur le point d'origine — ici géographique (Brésil, Éthiopie).",
              },
              {
                type: 'true_false',
                question: "On peut utiliser 'cosa' pour demander une raison, comme alternative à 'perché'.",
                correctAnswer: false,
                explanation:
                  "Non. 'Cosa?' interroge sur une chose (quoi?), pas sur une cause. Pour la raison, on utilise toujours 'perché?' Il n'y a pas de substitution possible entre les deux.",
              },
              {
                type: 'fill_in_blank',
                question: "'Je ne sais pas quand il arrive' (question indirecte) : Non so ___ arriva.",
                correctAnswer: ['quando'],
                explanation:
                  "'Non so quando arriva.' = je ne sais pas quand il arrive. Question indirecte : même interrogatif (quando), mais sans point d'interrogation et ordre sujet-verbe normal.",
              },
            ],
          },
        ],
        conclusion:
          "Complimenti! Tu maîtrises maintenant les huit mots interrogatifs italiens dans tous leurs usages — questions directes, indirectes, en cascade. Les deux règles d'or à garder en tête : 'qual è' sans apostrophe, et 'perché' qui fait les deux emplois (pourquoi + parce que). Avec ça, tu peux déjà mener une vraie conversation et te débrouiller dans n'importe quelle situation. La prochaine leçon t'emmène vers la famille italienne — et ses propres questions !",
      },
    },
  ],
});
