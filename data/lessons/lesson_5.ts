// ~/data/lessons/lesson_5.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 5,
  order: 5,
  name: 'Les jours, les mois et les saisons',
  description:
    "Maîtrise le calendrier en italien : jours de la semaine, mois de l'année, saisons. Apprends à exprimer une date et à parler du moment de la journée.",
  chapter_id: 'premiers-pas',
  chapter_name: 'Premiers pas',
  sub_lessons: [
    {
      id: '5_1',
      name: 'Les jours de la semaine',
      description:
        "Découvre les sept jours, les expressions comme 'lundi prochain' ou 'le week-end'.",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "Les sept jours italiens : lunedì · martedì · mercoledì · giovedì · venerdì · sabato · domenica. Tous s'écrivent en minuscules. La semaine commence le lundi. Expressions clés : oggi (aujourd'hui), ieri (hier), domani (demain), dopodomani (après-demain), ieri l'altro (avant-hier). Avec l'article défini : il lunedì = le lundi / tous les lundis. Sans article : lunedì = lundi prochain (contexte habituel). Il fine settimana ou il weekend pour le week-end.",
      chat_questions: [
        {
          question: "On est mercredi. Je te demande quel jour tu es disponible cette semaine pour venir au bar. Tu es libre jeudi et vendredi. Comment tu me réponds ?",
          hint: "Sono libero/a giovedì e venerdì · questa settimana (cette semaine) · Va bene per te? (ça te va ?) · Giovedì = jeudi · Venerdì = vendredi",
        },
        {
          question: "Je prends mes lundis comme jour de repos. Comment je t'expliquerais ça en une phrase — et comment tu me demandes si je travaille le week-end ?",
          hint: "Il lunedì non lavoro. (le lundi je ne travaille pas) · Lavori il fine settimana? · Il sabato sì, la domenica no. · Il + jour = habitude régulière",
        },
        {
          question: "Tu veux me retrouver après-demain. Comment tu me le proposes, et comment je pourrais te répondre que c'est parfait — j'étais justement libre ce jour-là ?",
          hint: "Ci vediamo dopodomani? · Perfetto! Ero già libero/a · dopodomani = après-demain · ieri l'altro = avant-hier · già = déjà",
        },
        {
          question: "Je te raconte que j'ai travaillé six jours cette semaine, du lundi au samedi. Comment je le dirais en italien ?",
          hint: "Ho lavorato sei giorni questa settimana · dal lunedì al sabato · tutta la settimana (toute la semaine) · Solo domenica ero libero.",
        },
        {
          question: "C'est vendredi soir. Je te demande ce que tu fais ce week-end. Réponds-moi avec au moins deux jours différents.",
          hint: "Questo fine settimana... · Sabato vado a... / Domenica resto a casa · Cosa fai? → Io invece... · il sabato sera = le samedi soir",
        },
      ],
      content: {
        introduction:
          "Impossible de prendre un rendez-vous avec Marco, de parler de tes habitudes ou de raconter ta semaine sans connaître les jours. Bonne nouvelle : en italien, ils ressemblent beaucoup au français — quelques nuits de sommeil et tu les auras tous.",
        sections: [
          {
            title: 'Les sept jours de la semaine',
            text: "Les jours italiens sont tous des mots masculins, sauf **domenica** (féminin) :\n\nlunedì · martedì · mercoledì · giovedì · venerdì · sabato · domenica\n\n**À retenir** :\n- Ils s'écrivent toujours en **minuscules**\n- La semaine commence le lundi (pas le dimanche)\n- Lunedì à venerdì : accent tonique sur la dernière syllabe\n- Sabato et domenica : accent sur la première syllabe (SÀbato · DOmenica)\n\n**Étymologie** (aide pour mémoriser) :\n- Lunedì = jour de la Lune · Martedì = Mars · Mercoledì = Mercure\n- Giovedì = Jupiter · Venerdì = Vénus\n- Sabato = Sabbat · Domenica = Seigneur (Dominus)",
            examples: [
              "📅 Oggi è lunedì. → aujourd'hui c'est lundi",
              "📅 Il bar è chiuso il mercoledì. → le bar est fermé le mercredi (tous les mercredis)",
              "📅 A sabato! → à samedi !",
              "📅 Buona domenica! → bon dimanche !",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quel jour vient après 'giovedì' ?",
                options: ['mercoledì', 'sabato', 'venerdì', 'martedì'],
                correctAnswer: 'venerdì',
                explanation:
                  "L'ordre des jours : lunedì · martedì · mercoledì · giovedì · **venerdì** · sabato · domenica. Giovedì (jeudi) est suivi de venerdì (vendredi).",
              },
              {
                type: 'true_false',
                question: "En italien, les jours de la semaine prennent une majuscule.",
                correctAnswer: false,
                explanation:
                  "Faux : les jours s'écrivent en minuscules en italien — lunedì, martedì, domenica... Contrairement à l'anglais ou à l'allemand.",
              },
              {
                type: 'fill_in_blank',
                question: "Le seul jour féminin de la semaine : la ___",
                correctAnswer: ['domenica'],
                explanation:
                  "'Domenica' (dimanche) est le seul jour féminin : la domenica, bella domenica. Tous les autres sont masculins : il lunedì, il sabato...",
              },
            ],
          },
          {
            title: "Aujourd'hui, hier, demain : se repérer dans la semaine",
            text: "**Les repères temporels essentiels** :\n- oggi → aujourd'hui\n- ieri → hier\n- domani → demain\n- dopodomani → après-demain\n- ieri l'altro → avant-hier\n\n**Cette semaine / la semaine prochaine** :\n- questa settimana → cette semaine\n- la settimana prossima → la semaine prochaine\n- la settimana scorsa → la semaine dernière\n\n**Avec l'article : habitude régulière**\nEn italien, l'article devant un jour exprime la récurrence :\n- Lunedì lavoro. → lundi je travaille (ce lundi-ci)\n- **Il** lunedì lavoro. → le lundi je travaille (tous les lundis)\n- **La** domenica resto a casa. → le dimanche je reste chez moi (habitude)",
            examples: [
              "📆 Ieri era martedì, oggi è mercoledì. → hier c'était mardi, aujourd'hui c'est mercredi",
              "📆 Domani è giovedì — ci vediamo? → demain c'est jeudi — on se voit ?",
              "📆 Il venerdì sera vado sempre al cinema. → le vendredi soir je vais toujours au cinéma",
              "📆 La settimana scorsa ho lavorato troppo! → la semaine dernière j'ai trop travaillé !",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'la semaine prochaine' en italien ?",
                options: [
                  'la settimana passata',
                  'la prossima volta',
                  'la settimana prossima',
                  'il prossimo weekend',
                ],
                correctAnswer: 'la settimana prossima',
                explanation:
                  "'La settimana prossima' = la semaine prochaine. 'Prossimo/a' (prochain) se place après le nom en italien, contrairement au français.",
              },
              {
                type: 'fill_in_blank',
                question: "Après-demain en italien : ___",
                correctAnswer: ['dopodomani'],
                explanation:
                  "'Dopodomani' = après-demain (littéralement 'après-demain'). À l'opposé : 'ieri l'altro' = avant-hier.",
              },
              {
                type: 'true_false',
                question: "'Il sabato vado in palestra' signifie que le locuteur va à la salle de sport tous les samedis.",
                correctAnswer: true,
                explanation:
                  "Oui — l'article 'il' devant un jour exprime l'habitude régulière. 'Il sabato' = le samedi (tous les samedis). Sans article : 'sabato vado in palestra' = ce samedi j'y vais.",
              },
            ],
          },
          {
            title: 'Le week-end et les moments de la journée',
            text: "**Le week-end** :\n- il fine settimana → le week-end (mot à mot : la fin de semaine)\n- il weekend → aussi accepté, très courant\n- questo fine settimana → ce week-end\n- Bon week-end ! → Buon fine settimana! / Buon weekend!\n\n**Les moments de la journée** :\n- la mattina → le matin\n- il pomeriggio → l'après-midi\n- la sera → le soir\n- la notte → la nuit\n- a mezzogiorno → à midi\n- a mezzanotte → à minuit\n\n**Combinés avec un jour** :\n- lunedì mattina → lundi matin\n- venerdì sera → vendredi soir\n- sabato pomeriggio → samedi après-midi\n- domenica notte → dimanche soir/nuit",
            examples: [
              "🌅 La mattina prendo sempre un caffè con Marco. → le matin je prends toujours un café avec Marco",
              "🌆 Venerdì sera andiamo al ristorante. → vendredi soir on va au restaurant",
              "🌙 Il sabato notte Firenze è bellissima. → le samedi soir Florence est magnifique",
              "🏖️ Questo fine settimana vado al mare! → ce week-end je vais à la mer !",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'vendredi soir' en italien ?",
                options: ['la sera venerdì', 'venerdì notte', 'venerdì sera', 'sera di venerdì'],
                correctAnswer: 'venerdì sera',
                explanation:
                  "En italien, le moment de la journée se place après le jour : 'venerdì sera'. Ordre : jour + moment. Même logique pour 'lunedì mattina', 'sabato pomeriggio'.",
              },
              {
                type: 'true_false',
                question: "'Il fine settimana' et 'il weekend' sont deux façons correctes de dire week-end en italien.",
                correctAnswer: true,
                explanation:
                  "Les deux sont corrects et très courants. 'Il fine settimana' est la forme italienne pure, 'il weekend' est l'emprunt anglais intégré dans l'usage quotidien.",
              },
              {
                type: 'fill_in_blank',
                question: "Lundi matin en italien : lunedì ___",
                correctAnswer: ['mattina'],
                explanation:
                  "'Lunedì mattina' = lundi matin. Les moments de la journée : mattina (matin), pomeriggio (après-midi), sera (soir), notte (nuit).",
              },
            ],
          },
        ],
        conclusion:
          "Bene! Tu connais maintenant les sept jours, les repères temporels de base et la différence entre 'lunedì' (ce lundi) et 'il lunedì' (tous les lundis). Dans la prochaine sous-leçon, on passe aux douze mois et aux quatre saisons — et tu pourras alors parler de n'importe quelle date avec Marco.",
      },
    },
    {
      id: '5_2',
      name: 'Les mois et les saisons',
      description:
        "Apprends les douze mois, les quatre saisons et comment formuler une date complète.",
      level: 'PARTIAL_TO_WELL',
      summary:
        "Les douze mois (minuscules) : gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre. Les quatre saisons : la primavera (printemps), l'estate (été, féminin), l'autunno (automne), l'inverno (hiver). Prépositions : 'a' devant les mois (a gennaio), 'in' ou 'd'' devant les saisons (in primavera, d'estate, in autunno, d'inverno). Pour dire 'en quelle saison' ou 'en quel mois', on utilise ces prépositions directement sans article.",
      chat_questions: [
        {
          question: "Je te demande en quel mois tu es né(e) et quelle est ta saison préférée. Réponds-moi.",
          hint: "Sono nato/a a [mois] · La mia stagione preferita è... · Preferisco [stagione] perché... · l'estate (l'été) · la primavera (le printemps)",
        },
        {
          question: "Tu veux savoir quand je ferme mon bar pour les vacances. Comment tu me poses la question, et je te réponds : 'en août, comme tous les Italiens !'",
          hint: "Quando chiudi per le vacanze? · A agosto, come tutti gli italiani! · Chiudo = je ferme · Le vacanze = les vacances · Di solito = d'habitude",
        },
        {
          question: "Je te décris mon mois de juillet préféré : le bar est plein de touristes, il fait chaud, la ville est belle le soir. Essaie de reformuler ça en italien.",
          hint: "A luglio il bar è pieno di turisti · Fa caldo (il fait chaud) · La sera la città è bellissima · D'estate = en été · È la mia stagione preferita",
        },
        {
          question: "Il fait froid et il pleut. Je me plains de l'hiver florentin. Qu'est-ce que je pourrais dire — et toi, comment tu me dis que tu préfères l'automne ?",
          hint: "D'inverno a Firenze fa freddo e piove spesso · Che brutto tempo! · Io invece preferisco l'autunno · Le foglie cambiano colore (les feuilles changent de couleur)",
        },
        {
          question: "Tu planifies un voyage à Florence. Tu me demandes quelle est la meilleure période pour venir, et je te recommande le printemps ou l'automne.",
          hint: "Quando è meglio venire a Firenze? · Ti consiglio la primavera o l'autunno · Non fa né troppo caldo né troppo freddo · Evita agosto = évite août · C'è meno folla = il y a moins de monde",
        },
      ],
      content: {
        introduction:
          "Après les jours, voici les briques suivantes : les mois et les saisons. Avec ça, tu pourras parler de n'importe quelle période de l'année, planifier un voyage, commenter la météo et comprendre les références culturelles italiennes — Ferragosto, les vendanges, le Carnaval de Venise…",
        sections: [
          {
            title: 'Les douze mois de l\'année',
            text: "Les mois italiens ressemblent beaucoup au français :\n\ngennaio (jan.) · febbraio (fév.) · marzo (mars) · aprile (avr.) · maggio (mai) · giugno (juin)\nluglio (juil.) · agosto (août) · settembre (sept.) · ottobre (oct.) · novembre (nov.) · dicembre (déc.)\n\n**À retenir** :\n- Toujours en **minuscules**\n- Tous masculins sauf... aucune exception, ils sont tous masculins\n- 'Luglio' et 'giugno' : attention à ne pas les confondre (luglio = juillet, giugno = juin)\n\n**Préposition** : on dit **a** + mois (sans article) :\n- a gennaio → en janvier\n- a luglio → en juillet\n- a dicembre → en décembre",
            examples: [
              "📅 Il mio compleanno è a maggio. → mon anniversaire est en mai",
              "📅 A dicembre fa freddo a Milano. → en décembre il fait froid à Milan",
              "📅 Marco apre il bar a marzo dopo le ferie. → Marco rouvre le bar en mars après les congés",
              "📅 Ad agosto Firenze è piena di turisti. → en août Florence est pleine de touristes",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'en juillet' en italien ?",
                options: ['nel luglio', 'a luglio', 'in luglio', 'di luglio'],
                correctAnswer: 'a luglio',
                explanation:
                  "Avec les mois, on utilise 'a' (sans article) : a gennaio, a luglio, a dicembre. Exception : 'ad agosto' (pour l'euphonie, 'a' → 'ad' devant voyelle).",
              },
              {
                type: 'fill_in_blank',
                question: "Septembre en italien : ___",
                correctAnswer: ['settembre'],
                explanation:
                  "'Settembre' = septembre. Astuce : la série -embre : settembre, ottobre, novembre, dicembre — très proches du français.",
              },
              {
                type: 'true_false',
                question: "'Giugno' signifie juillet en italien.",
                correctAnswer: false,
                explanation:
                  "'Giugno' = juin, pas juillet. Juillet = 'luglio'. C'est le piège classique : giugno (juin) / luglio (juillet). Moyen mnémotechnique : 'luglio' commence comme 'lune de juillet'.",
              },
            ],
          },
          {
            title: 'Les quatre saisons',
            text: "**Les saisons** :\n- la primavera → le printemps (féminin)\n- l'estate → l'été (féminin — attention à l'article !)\n- l'autunno → l'automne (masculin)\n- l'inverno → l'hiver (masculin)\n\n**Les prépositions de saison** :\nDeux constructions selon la saison :\n- **in** + saison : in primavera · in autunno · in inverno\n- **d'** + saison (été et hiver aussi) : d'estate · d'inverno · de plus en plus courant\n\nEn pratique, les deux formes coexistent :\n- in estate = d'estate (en été) ✅ les deux sont corrects\n- in inverno = d'inverno (en hiver) ✅\n\n**Avec les adjectifs :**\n- una bella estate → un bel été\n- un inverno freddo → un hiver froid\n- la primavera scorsa → le printemps dernier",
            examples: [
              "🌸 In primavera i fiori sbocciano ovunque. → au printemps les fleurs s'épanouissent partout",
              "☀️ D'estate vado sempre al mare. → en été je vais toujours à la mer",
              "🍂 L'autunno a Firenze è magnifico. → l'automne à Florence est magnifique",
              "❄️ D'inverno mi piace restare a casa con un buon libro. → en hiver j'aime rester chez moi avec un bon livre",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle est la préposition correcte : '___ estate vado in vacanza' ?",
                options: ["In l'", "À l'", "D'", 'Al'],
                correctAnswer: "D'",
                explanation:
                  "'Estate' commence par une voyelle → on utilise 'd'' (élision) : d'estate. On peut aussi dire 'in estate'. Les deux sont corrects.",
              },
              {
                type: 'true_false',
                question: "'Estate' est un mot masculin en italien.",
                correctAnswer: false,
                explanation:
                  "'Estate' (été) est féminin : l'estate, la bella estate. Comme 'primavera'. À l'opposé, 'autunno' et 'inverno' sont masculins.",
              },
              {
                type: 'fill_in_blank',
                question: "Le printemps en italien : la ___",
                correctAnswer: ['primavera'],
                explanation:
                  "'La primavera' = le printemps. Les quatre saisons : la primavera (f), l'estate (f), l'autunno (m), l'inverno (m).",
              },
            ],
          },
          {
            title: 'Parler du temps et des périodes de l\'année',
            text: "**La météo par saison** :\n- Fa caldo. → il fait chaud\n- Fa freddo. → il fait froid\n- Piove. → il pleut\n- Nevica. → il neige\n- C'è il sole. → il y a du soleil\n- C'è vento. → il y a du vent\n- È nuvoloso. → c'est nuageux\n- Che bel tempo! → quel beau temps ! / Che brutto tempo! → quel sale temps !\n\n**Quelques repères culturels** :\n- Ferragosto (15 agosto) : fête nationale, la plupart des Italiens sont en vacances\n- La vendemmia : les vendanges, en septembre-octobre\n- Il Carnevale : en février avant le Carême, célèbre à Venise\n- Natale : Noël (25 dicembre) · Pasqua : Pâques (mars ou avril)\n\n**Exprimer une période** :\n- all'inizio di marzo → début mars\n- a metà maggio → mi-mai\n- alla fine di settembre → fin septembre",
            examples: [
              "☔ A novembre a Venezia piove spesso. → en novembre à Venise il pleut souvent",
              "🌞 D'estate fa molto caldo a Roma — più di 35 gradi! → en été il fait très chaud à Rome",
              "🎭 Il Carnevale di Venezia è a febbraio. → le Carnaval de Venise est en février",
              "🍇 La vendemmia è a fine settembre in Toscana. → les vendanges sont fin septembre en Toscane",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'il neige' en italien ?",
                options: ['Piove.', 'Fa freddo.', 'Nevica.', 'C\'è ghiaccio.'],
                correctAnswer: 'Nevica.',
                explanation:
                  "'Nevica' = il neige (de 'nevicare'). 'Piove' = il pleut. 'Fa freddo' = il fait froid. 'C'è ghiaccio' = il y a de la glace.",
              },
              {
                type: 'fill_in_blank',
                question: "'Mi-mai' en italien : a ___ maggio",
                correctAnswer: ['metà'],
                explanation:
                  "'A metà maggio' = mi-mai. Les trois repères : all'inizio di (début), a metà (mi-), alla fine di (fin). Ex : alla fine di agosto = fin août.",
              },
              {
                type: 'true_false',
                question: "Ferragosto est célébré le 15 août en Italie.",
                correctAnswer: true,
                explanation:
                  "Oui, le 15 agosto est Ferragosto — fête nationale italienne. La plupart des commerces et restaurants ferment. Le mot vient du latin 'Feriae Augusti' (les congés d'Auguste).",
              },
            ],
          },
        ],
        conclusion:
          "Perfetto! Tu peux maintenant placer n'importe quel événement dans l'année : un mois, une saison, une météo. La dernière sous-leçon va tout assembler — jours, mois, saisons — pour que tu puisses parler du temps et du calendrier de façon vraiment naturelle avec Marco.",
      },
    },
    {
      id: '5_3',
      name: 'Révision du calendrier',
      description:
        'Exercices de consolidation pour parler du temps et des dates naturellement.',
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Consolidation complète du calendrier : jours (lunedì → domenica), mois (gennaio → dicembre), saisons (primavera, estate, autunno, inverno). Prépositions : a + mois, in/d' + saison, il + jour pour les habitudes. Repères temporels : oggi, ieri, domani, dopodomani, questa settimana, la settimana prossima. Météo : fa caldo/freddo, piove, nevica, c'è il sole. Expressions de fréquence : sempre (toujours), spesso (souvent), qualche volta (parfois), mai (jamais). Dates culturelles : Ferragosto (15 agosto), Natale (25 dicembre), Carnevale (febbraio).",
      chat_questions: [
        {
          question: "Raconte-moi ta semaine type — quels jours tu travailles, ce que tu fais le soir et comment tu passes le week-end.",
          hint: "Di solito lavoro dal lunedì al venerdì · Il lunedì sera faccio... · Il fine settimana... · Qualche volta = parfois · Spesso = souvent · Non ho mai tempo per...",
        },
        {
          question: "Je te demande ta saison préférée et pourquoi. Réponds avec au moins deux raisons, et demande-moi laquelle je préfère.",
          hint: "La mia stagione preferita è... · Perché fa... / ci sono... · E tu, qual è la tua stagione preferita? · Preferisco... perché a Firenze...",
        },
        {
          question: "Tu planifies de revenir à Florence dans six mois, en plein été, pendant la première semaine d'août. Comment tu me l'expliques ?",
          hint: "Torno a Firenze tra sei mesi · D'estate, la prima settimana di agosto · All'inizio di agosto · Ci rivediamo! (on se revoit !) · Non vedo l'ora! (j'ai hâte !)",
        },
        {
          question: "Je te décris une journée de décembre : il fait froid, il pleut, le bar ferme tôt, et je rentre chez moi en tramway après le coucher du soleil. Mets ça en italien.",
          hint: "A dicembre fa freddo e piove · Il bar chiude presto · Torno a casa in tram · Dopo il tramonto = après le coucher du soleil · Di sera fa già buio = le soir il fait déjà nuit",
        },
        {
          question: "C'est bientôt Noël. Je te demande comment tu fêtes ça chez toi — et toi tu me demandes comment ça se passe à Florence à cette période.",
          hint: "Per Natale di solito... · Siamo in famiglia / con gli amici · Com'è Firenze a dicembre? · C'è il mercatino di Natale? (il y a le marché de Noël ?) · È magico! = c'est magique !",
        },
      ],
      content: {
        introduction:
          "Dernière étape pour le calendrier. On ne va pas réviser la liste des mois — tu la connais. On va s'entraîner à combiner tout ça dans des situations réelles : donner ses disponibilités, décrire ses habitudes, parler de la météo, se donner rendez-vous à des mois de distance. Avec Marco, le temps, ça se vit en direct.",
        sections: [
          {
            title: 'Fréquence et habitudes dans la semaine',
            text: "**Exprimer la fréquence** :\n- sempre → toujours\n- spesso → souvent\n- qualche volta → parfois / de temps en temps\n- raramente → rarement\n- mai → jamais (avec négation : non… mai)\n- ogni giorno → chaque jour\n- una volta a settimana → une fois par semaine\n- due volte al mese → deux fois par mois\n\n**Combiner avec les jours** :\n- Ogni lunedì vado in palestra. → chaque lundi je vais à la salle\n- Il venerdì sera usciamo spesso. → le vendredi soir on sort souvent\n- Non lavoro mai il sabato. → je ne travaille jamais le samedi\n\n**Dire depuis quand / pendant combien de temps** :\n- da lunedì → depuis lundi\n- per tre giorni → pendant trois jours\n- fino a venerdì → jusqu'à vendredi",
            examples: [
              "🗓️ Ogni domenica mattina vado al mercato. → chaque dimanche matin je vais au marché",
              "🗓️ Spesso il mercoledì sera cucino con gli amici. → souvent le mercredi soir je cuisine avec des amis",
              "🗓️ Non vado mai al bar di lunedì — è chiuso! → je ne vais jamais au bar le lundi — il est fermé !",
              "🗓️ Lavoro per tre giorni, poi sono libero fino a domenica. → je travaille trois jours, puis je suis libre jusqu'à dimanche",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'deux fois par semaine' en italien ?",
                options: [
                  'due volte per settimana',
                  'due volte a settimana',
                  'due settimane',
                  'ogni due settimane',
                ],
                correctAnswer: 'due volte a settimana',
                explanation:
                  "'Due volte a settimana' = deux fois par semaine. La préposition 'a' exprime la régularité : una volta al mese (une fois par mois), tre volte all'anno (trois fois par an).",
              },
              {
                type: 'fill_in_blank',
                question: "Je ne travaille jamais le dimanche : Non lavoro ___ la domenica.",
                correctAnswer: ['mai'],
                explanation:
                  "'Non… mai' = ne… jamais. 'Non lavoro mai la domenica.' La négation double est obligatoire : 'mai' seul sans 'non' serait rare et très littéraire.",
              },
              {
                type: 'true_false',
                question: "'Ogni lunedì' et 'il lunedì' expriment tous les deux une habitude régulière le lundi.",
                correctAnswer: true,
                explanation:
                  "Les deux expriment la récurrence : 'ogni lunedì' (chaque lundi) et 'il lunedì' (le lundi, en tant qu'habitude). Ils sont interchangeables dans la plupart des contextes.",
              },
            ],
          },
          {
            title: 'Parler du temps et des saisons en contexte',
            text: "**La météo en conversation** :\nCes verbes et expressions sont au cœur des échanges quotidiens :\n- Che tempo fa? → quel temps fait-il ?\n- Fa bello. / Fa brutto. → il fait beau / mauvais\n- Tira vento. → il y a du vent (littéralement : le vent tire)\n- C'è la nebbia. → il y a du brouillard (fréquent en Toscane en hiver !)\n- Sono previsti temporali. → des orages sont prévus\n\n**Comparer les saisons** :\n- più caldo che mai → plus chaud que jamais\n- meno freddo del solito → moins froid que d'habitude\n- quest'estate è stata pazzesca! → cet été était fou !\n- l'inverno scorso è stato lungo → l'hiver dernier a été long\n\n**Exprimer une préférence** :\n- Preferisco l'estate all'inverno. → je préfère l'été à l'hiver\n- Non sopporto il caldo / il freddo. → je ne supporte pas la chaleur / le froid\n- Mi piace quando piove. → j'aime quand il pleut",
            examples: [
              "🌦️ Che tempo fa a Firenze a marzo? / Di solito piove ma fa già caldo.",
              "☀️ Quest'estate è stata caldissima — quaranta gradi in luglio!",
              "🌫️ D'inverno a Firenze c'è spesso la nebbia al mattino.",
              "🌸 Preferisco la primavera: non fa né troppo caldo né troppo freddo.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment demande-t-on 'quel temps fait-il ?' en italien ?",
                options: ['Come fa il tempo?', 'Che tempo fa?', 'Qual è il meteo?', 'Come è fuori?'],
                correctAnswer: 'Che tempo fa?',
                explanation:
                  "'Che tempo fa?' est la formule standard. 'Fa bello/brutto/caldo/freddo' pour les réponses courantes. 'Che tempo fa a Roma domani?' pour demander la météo à un endroit précis.",
              },
              {
                type: 'true_false',
                question: "'Tira vento' signifie 'le vent souffle' en italien.",
                correctAnswer: true,
                explanation:
                  "Oui, 'tira vento' (littéralement 'le vent tire') = il y a du vent / le vent souffle. C'est une expression idiomatique très naturelle en italien courant.",
              },
              {
                type: 'fill_in_blank',
                question: "'Je préfère l'été à l'hiver' : Preferisco l'estate ___ l'inverno.",
                correctAnswer: ['all\'', 'all'],
                explanation:
                  "'Preferisco A all'B' = je préfère A à B. 'All'' est la contraction de 'a + l''. Ex : Preferisco il caffè al tè. (je préfère le café au thé).",
              },
            ],
          },
          {
            title: 'Le calendrier au quotidien : planifier, raconter, se souvenir',
            text: "**Planifier dans le futur** :\n- tra una settimana → dans une semaine\n- tra tre giorni → dans trois jours\n- il mese prossimo → le mois prochain\n- l'anno prossimo → l'année prochaine\n- a fine mese → en fin de mois\n\n**Situer dans le passé** :\n- fa tre giorni → il y a trois jours\n- la settimana scorsa → la semaine dernière\n- il mese scorso → le mois dernier\n- l'anno scorso → l'année dernière\n- due anni fa → il y a deux ans\n\n**Expressions utiles pour raconter** :\n- all'improvviso → soudainement\n- nel frattempo → entre-temps\n- alla fine → finalement\n- poco dopo → peu après\n- quella mattina / quel pomeriggio → ce matin-là / cet après-midi-là",
            examples: [
              "📅 Tra due settimane vado in vacanza in Sicilia! → dans deux semaines je pars en vacances en Sicile !",
              "📅 L'anno scorso a quest'epoca ero a Parigi. → l'année dernière à la même époque j'étais à Paris",
              "📅 Fa tre giorni ho incontrato Marco al mercato. → il y a trois jours j'ai croisé Marco au marché",
              "📅 Il mese prossimo apro un nuovo bar — incrociate le dita! → le mois prochain j'ouvre un nouveau bar — croisez les doigts !",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'il y a deux ans' en italien ?",
                options: ['per due anni', 'da due anni', 'due anni fa', 'due anni scorsi'],
                correctAnswer: 'due anni fa',
                explanation:
                  "'Fa' exprime le temps écoulé depuis : 'due anni fa' = il y a deux ans. Ne pas confondre avec 'da due anni' (depuis deux ans, durée qui continue).",
              },
              {
                type: 'fill_in_blank',
                question: "'Dans trois jours' : tra ___ giorni",
                correctAnswer: ['tre'],
                explanation:
                  "'Tra tre giorni' = dans trois jours. 'Tra' exprime un intervalle futur : tra una settimana, tra un mese, tra poco (dans peu de temps).",
              },
              {
                type: 'true_false',
                question: "'Il mese scorso' et 'il mese fa' signifient tous les deux 'le mois dernier'.",
                correctAnswer: false,
                explanation:
                  "'Il mese scorso' = le mois dernier (le mois qui vient de passer). 'Un mese fa' = il y a un mois (peut être différent selon le moment). En pratique ils sont souvent synonymes, mais 'scorso' est plus précis pour désigner le mois calendaire précédent.",
              },
            ],
          },
        ],
        conclusion:
          "Bravissimo! 🎉 Le calendrier italien n'a plus de secrets pour toi — jours, mois, saisons, météo, et toutes les expressions pour raconter, planifier et décrire. Désormais, quand Marco te proposera 'ci vediamo venerdì prossimo d'accordo?', tu sauras exactement ce qu'il veut dire — et tu pourras lui répondre avec la même aisance. Avanti vers la prochaine leçon !",
      },
    },
  ],
});
