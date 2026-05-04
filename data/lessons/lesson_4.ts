// ~/data/lessons/lesson_4.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 4,
  order: 4,
  name: 'Les verbes réguliers au présent',
  description:
    "Conjugue les trois groupes de verbes (-are, -ere, -ire) au présent. Les outils de base pour construire n'importe quelle phrase simple.",
  chapter_id: 'premiers-pas',
  chapter_name: 'Premiers pas',
  sub_lessons: [
    {
      id: '4_1',
      name: 'Les verbes en -ARE',
      description:
        "Le groupe le plus large de l'italien. Conjugaison, règles orthographiques et verbes incontournables.",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "Les verbes en -ARE se conjuguent avec les terminaisons : -o (io), -i (tu), -a (lui/lei), -iamo (noi), -ate (voi), -ano (loro). Règles à retenir : 1) verbes en -care/-gare ajoutent un H devant -i et -iamo pour conserver le son dur (cercare → cerchi, pagare → paghi, giocare → giochi) ; 2) verbes en -ciare/-giare ne doublent pas le I (mangiare → mangi et non *mangii, cominciare → cominci). Verbes clés : parlare, lavorare, abitare, mangiare, ascoltare, studiare, chiamare, guardare, arrivare, amare.",
      chat_questions: [
        {
          question: "Tu habites où, en ce moment ? Et tu travailles dans quel secteur ?",
          hint: "Abito a [ville] · Lavoro come [métier] / in [secteur] · abito = j'habite · lavoro = je travaille · studio = j'étudie",
        },
        {
          question: "Qu'est-ce que tu manges le matin d'habitude ? Et tu écoutes quelque chose en mangeant ?",
          hint: "Di solito mangio... · Ascolto la radio / della musica / un podcast · ascolto = j'écoute · mangio = je mange",
        },
        {
          question: "Tu parles combien de langues ? Lesquelles ?",
          hint: "Parlo [nombre] lingue : il francese e un po' di italiano · parlo = je parle · sto imparando = j'apprends · un po' = un peu",
        },
        {
          question: "Qu'est-ce que tu regardes le soir ? Une série, un film, ou tu n'allumes pas la télé ?",
          hint: "La sera guardo... · guardo la tv / una serie / un film · non guardo molto la tv · guardo = je regarde",
        },
        {
          question: "À quelle heure tu arrives généralement au boulot ou à tes cours ?",
          hint: "Di solito arrivo alle... · arrivo = j'arrive · comincio = je commence · arrivo in ritardo (en retard) / in anticipo (en avance)",
        },
      ],
      content: {
        introduction:
          "Si tu veux dire la moindre chose en italien — parler de toi, de ce que tu fais, de ce que tu aimes — tu as besoin des verbes. Les verbes en -ARE sont le groupe le plus peuplé de la langue : une fois les terminaisons mémorisées, tu peux exprimer des dizaines d'actions. On commence par là.",
        sections: [
          {
            title: 'Les terminaisons des verbes en -ARE',
            text: "Pour conjuguer un verbe en -ARE, on retire la terminaison -are de l'infinitif et on ajoute les terminaisons ci-dessous.\n\nVerbes essentiels du groupe :\n- **parlare** (parler) · **lavorare** (travailler) · **abitare** (habiter)\n- **mangiare** (manger) · **studiare** (étudier) · **ascoltare** (écouter)\n- **guardare** (regarder) · **chiamare** (appeler) · **arrivare** (arriver)\n- **amare** (aimer) · **camminare** (marcher) · **comprare** (acheter)",
            table: {
              headers: ['Pronom', 'Terminaison', 'Exemple (parlare)'],
              rows: [
                ['io (je)', '-o', 'parl-o'],
                ['tu', '-i', 'parl-i'],
                ['lui / lei / Lei', '-a', 'parl-a'],
                ['noi (nous)', '-iamo', 'parl-iamo'],
                ['voi (vous)', '-ate', 'parl-ate'],
                ['loro (ils/elles)', '-ano', 'parl-ano'],
              ],
            },
            examples: [
              "👤 Io parlo italiano. → je parle italien",
              "👤 Tu lavori molto! → tu travailles beaucoup !",
              "👤 Marco abita a Milano. → Marco habite à Milan",
              "👥 Noi studiamo insieme. → nous étudions ensemble",
              "👥 Loro arrivano alle otto. → ils arrivent à 8h",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle est la bonne conjugaison de 'lavorare' à la 3e personne du singulier (lui) ?",
                options: ['lavori', 'lavora', 'lavorano', 'lavoramo'],
                correctAnswer: 'lavora',
                explanation:
                  "Lui/lei prend la terminaison -a : lavor-a. C'est la même terminaison que le pronom de politesse Lei (vous formel).",
              },
              {
                type: 'fill_in_blank',
                question: "Noi ___ (studiare) ogni giorno.",
                correctAnswer: ['studiamo'],
                explanation:
                  "La forme noi des verbes en -are est -iamo : studiamo. Attention, pas de accent.",
              },
              {
                type: 'true_false',
                question: "La conjugaison 'loro parlano' signifie 'ils parlent'.",
                correctAnswer: true,
                explanation:
                  "Exact : loro + -ano = parlano. La terminaison -ano est toujours accentuée sur l'avant-dernière syllabe : pàrlano.",
              },
            ],
          },
          {
            title: 'Les règles orthographiques : -care/-gare et -ciare/-giare',
            text: "Deux groupes de verbes ont des particularités orthographiques au présent :\n\n**Verbes en -care et -gare** (maintenir le son dur [k] et [g]) :\nOn ajoute un H devant les terminaisons -i et -iamo :\n- cercare (chercher) : cerc**h**i, cerc**h**iamo\n- pagare (payer) : pag**h**i, pag**h**iamo\n- giocare (jouer) : gioc**h**i, gioc**h**iamo\n\n**Verbes en -ciare et -giare** (éviter le double I) :\nLa terminaison -i absorbe le I du radical :\n- mangiare : mangi (pas *mangii), mangiamo\n- cominciare (commencer) : cominci (pas *comincii), cominciamo\n- lasciare (laisser) : lasci, lasciamo",
            examples: [
              "✅ Tu cerchi qualcosa? → tu cherches quelque chose ? (cerchi, pas *cerci)",
              "✅ Quanto paghi? → tu paies combien ? (paghi, pas *pagi)",
              "✅ Quando cominci? → tu commences quand ? (cominci, pas *comincii)",
              "✅ Noi giochiamo a calcio. → nous jouons au foot (giochiamo, pas *giociamo)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment conjugue-t-on 'pagare' à la forme 'tu' ?",
                options: ['pagi', 'paghi', 'pagii', 'paghe'],
                correctAnswer: 'paghi',
                explanation:
                  "Les verbes en -gare ajoutent un H devant -i : pag + h + i = paghi. Sans le H, 'pagi' se lirait [padji] — son incorrect.",
              },
              {
                type: 'true_false',
                question: "La forme correcte de 'mangiare' à la 2e personne est 'mangii'.",
                correctAnswer: false,
                explanation:
                  "Non : les verbes en -giare ne doublent pas le I. La terminaison -i absorbe le I du radical : mangi (pas mangii). Même règle pour 'lasci', 'cominci'.",
              },
              {
                type: 'fill_in_blank',
                question: "Noi ___ (giocare) a tennis ogni sabato.",
                correctAnswer: ['giochiamo'],
                explanation:
                  "Giocare → noi gioc + h + iamo = giochiamo. Le H conserve le son [k] devant la terminaison -iamo.",
              },
            ],
          },
          {
            title: 'Les verbes -ARE dans la conversation',
            text: "Voici les verbes en -ARE les plus utiles au quotidien, organisés par thème :\n\n**Parler et communiquer** :\nparlare (parler) · chiamare (appeler) · ascoltare (écouter)\n\n**Activités et loisirs** :\ngiocare (jouer) · guardare (regarder) · cantare (chanter) · ballare (danser) · viaggiare (voyager)\n\n**Vie quotidienne** :\nmangiare (manger) · lavorare (travailler) · studiare (étudier) · abitare (habiter) · camminare (marcher)\n\n**Acheter et payer** :\ncomprare (acheter) · pagare (payer) · cercare (chercher) · trovare (trouver)\n\nNote sur le sujet en italien : les pronoms (io, tu, lui…) sont souvent **omis** car la terminaison suffit à identifier la personne :\n- (Io) Parlo italiano. = Je parle italien.\n- (Noi) Lavoriamo insieme. = Nous travaillons ensemble.",
            examples: [
              "📞 Chiamo Marco domani. → j'appelle Marco demain",
              "🎵 Lei canta molto bene! → elle chante très bien !",
              "✈️ Viaggiate spesso? → vous voyagez souvent ?",
              "🛒 Dove compri di solito? → où tu achètes d'habitude ?",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "En italien, est-il obligatoire d'utiliser le pronom sujet (io, tu...) ?",
                options: [
                  'Oui, toujours',
                  'Non, la terminaison suffit généralement',
                  'Seulement à la forme négative',
                  'Seulement avec essere et avere',
                ],
                correctAnswer: 'Non, la terminaison suffit généralement',
                explanation:
                  "L'italien est une langue à sujet nul : la terminaison verbale indique la personne. On utilise les pronoms pour insister ou lever une ambiguïté : 'Parlo io!' (c'est moi qui parle !).",
              },
              {
                type: 'fill_in_blank',
                question: "Dove ___ (abitare) tu ?",
                correctAnswer: ['abiti'],
                explanation:
                  "Abitare à la 2e personne : abit + i = abiti. 'Dove abiti?' est la question naturelle pour demander où quelqu'un habite.",
              },
              {
                type: 'true_false',
                question: "'Viaggiamo' est la forme noi du verbe 'viaggiare'.",
                correctAnswer: true,
                explanation:
                  "Oui : viaggi-are → noi → retirer -are → viaggi → + -iamo → viaggiamo. Comme mangiare → mangiamo.",
              },
            ],
          },
        ],
        conclusion:
          "Bene! Tu maîtrises maintenant le groupe -ARE, le plus riche de la langue. Retiens bien les deux pièges : le H dans cerchi/paghi, et le I unique dans mangi/cominci. Dans la prochaine sous-leçon, on aborde les groupes -ERE et -IRE — deux groupes plus petits mais tout aussi essentiels.",
      },
    },
    {
      id: '4_2',
      name: 'Les verbes en -ERE et -IRE',
      description:
        "Les deuxième et troisième groupes avec leurs terminaisons et la particularité -ISC- des verbes en -ire.",
      level: 'PARTIAL_TO_WELL',
      summary:
        "Verbes en -ERE : terminaisons -o, -i, -e, -iamo, -ete, -ono (leggere → leggo, leggi, legge, leggiamo, leggete, leggono). Verbes en -IRE : deux sous-groupes — type 1 sans -isc- : -o, -i, -e, -iamo, -ite, -ono (dormire → dormo, dormi, dorme, dormiamo, dormite, dormono) ; type 2 avec -isc- entre radical et terminaison aux 3 personnes du singulier + 3e pluriel : capire → capisco, capisci, capisce, capiamo, capite, capiscono. Verbes -ISC- courants : capire (comprendre), finire (finir), preferire (préférer), pulire (nettoyer), costruire (construire).",
      chat_questions: [
        {
          question: "Tu lis beaucoup ? Qu'est-ce que tu lis en ce moment ?",
          hint: "Leggo... / Non leggo molto · leggo = je lis · un libro / il giornale / dei fumetti (des BD) · in questo momento = en ce moment",
        },
        {
          question: "Tu comprends quand les Italiens parlent vite entre eux ?",
          hint: "Capisco... / Non capisco molto quando parlano veloce · capisco = je comprends · veloce = vite · a volte = parfois · dipende (ça dépend)",
        },
        {
          question: "Tu prends le métro ou tu préfères marcher pour aller au boulot ?",
          hint: "Prendo la metro / Preferisco camminare · prendo = je prends · preferisco = je préfère · di solito = d'habitude",
        },
        {
          question: "Tu finis à quelle heure le soir, d'habitude ?",
          hint: "Di solito finisco alle... · finisco = je finis · alle cinque / alle sei e mezza · tardi = tard · presto = tôt",
        },
        {
          question: "Qu'est-ce que tu réponds quand quelqu'un te demande 'Come stai?' ?",
          hint: "Rispondo... / Di solito dico... · bene / così così / non c'è male (pas mal) · rispondo = je réponds · dipende dall'umore (ça dépend de l'humeur)",
        },
      ],
      content: {
        introduction:
          "On passe maintenant aux deux autres groupes. Les verbes en -ERE incluent des incontournables comme vedere, leggere, prendere. Les verbes en -IRE ont une petite surprise : certains d'entre eux intercalent -ISC- dans la conjugaison. Rien de compliqué — il suffit de savoir lesquels.",
        sections: [
          {
            title: 'Les verbes en -ERE',
            text: "On retire -ere et on ajoute :\n\nVerbes essentiels en -ERE :\n- **leggere** (lire) · **scrivere** (écrire) · **vedere** (voir)\n- **prendere** (prendre) · **mettere** (mettre) · **chiedere** (demander)\n- **rispondere** (répondre) · **vivere** (vivre) · **credere** (croire)\n- **correre** (courir) · **cadere** (tomber) · **vendere** (vendre)\n\nDifférence clé avec -ARE : la voi devient **-ete** (pas -ate) et la loro fait **-ono** (pas -ano).",
            table: {
              headers: ['Pronom', 'Terminaison', 'Exemple (leggere)'],
              rows: [
                ['io', '-o', 'leggo'],
                ['tu', '-i', 'leggi'],
                ['lui / lei', '-e', 'legge'],
                ['noi', '-iamo', 'leggiamo'],
                ['voi', '-ete', 'leggete'],
                ['loro', '-ono', 'leggono'],
              ],
            },
            examples: [
              "📖 Leggo un libro ogni settimana. → je lis un livre par semaine",
              "📝 Cosa scrivi? → qu'est-ce que tu écris ?",
              "👀 Vede tutto! → il/elle voit tout !",
              "📦 Prendiamo due caffè. → on prend deux cafés",
              "❓ Chiedono sempre perché. → ils demandent toujours pourquoi",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle est la forme 'voi' du verbe 'scrivere' ?",
                options: ['scrivate', 'scrivono', 'scrivete', 'scriviate'],
                correctAnswer: 'scrivete',
                explanation:
                  "Les verbes en -ERE prennent -ete à la forme voi : scrivete. Attention de ne pas confondre avec -ate des verbes en -ARE.",
              },
              {
                type: 'fill_in_blank',
                question: "Io non ___ (credere) a questa storia.",
                correctAnswer: ['credo'],
                explanation:
                  "Credere → io → cred + o = credo. La terminaison -o est identique pour tous les groupes à la 1re personne.",
              },
              {
                type: 'true_false',
                question: "La forme 'loro' des verbes en -ERE se termine par -ano.",
                correctAnswer: false,
                explanation:
                  "Non : la forme loro des verbes en -ERE prend -ono (leggono, scrivono, vedono). C'est -ano uniquement pour les verbes en -ARE (parlano, lavorano).",
              },
            ],
          },
          {
            title: 'Les verbes en -IRE : deux sous-groupes',
            text: "Les verbes en -IRE se divisent en deux groupes :\n\nVerbes -ISC- courants :\n- **capire** (comprendre) · **finire** (finir) · **preferire** (préférer)\n- **pulire** (nettoyer) · **costruire** (construire) · **spedire** (envoyer)\n\n**Comment savoir lequel ?** Il n'y a pas de règle absolue — les verbes -ISC- sont à mémoriser. Mais la majorité des verbes courts et courants (dormire, partire, aprire) sont du groupe 1.",
            table: {
              headers: ['Pronom', 'Groupe 1 sans -ISC- (dormire)', 'Groupe 2 avec -ISC- (capire)'],
              rows: [
                ['io', 'dormo', 'capisco'],
                ['tu', 'dormi', 'capisci'],
                ['lui / lei', 'dorme', 'capisce'],
                ['noi', 'dormiamo', 'capiamo'],
                ['voi', 'dormite', 'capite'],
                ['loro', 'dormono', 'capiscono'],
              ],
            },
            examples: [
              "😴 Dormo otto ore per notte. → je dors 8h par nuit",
              "🚆 Quando parti? → quand est-ce que tu pars ?",
              "💡 Capisco! → je comprends !",
              "⏰ Finisci a che ora? → tu finis à quelle heure ?",
              "🎵 Preferisce il jazz. → il/elle préfère le jazz",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'je comprends' en italien ?",
                options: ['capiro', 'capio', 'capisco', 'capire'],
                correctAnswer: 'capisco',
                explanation:
                  "Capire appartient au groupe -ISC- : cap + isc + o = capisco. C'est l'une des formes les plus utilisées — à mémoriser en priorité.",
              },
              {
                type: 'fill_in_blank',
                question: "Noi ___ (finire) il lavoro alle sei.",
                correctAnswer: ['finiamo'],
                explanation:
                  "Attention ! Aux formes noi et voi, les verbes -ISC- retrouvent les terminaisons normales : fin + iamo = finiamo (pas *finisciamo).",
              },
              {
                type: 'true_false',
                question: "La forme 'loro' de 'preferire' est 'preferono'.",
                correctAnswer: false,
                explanation:
                  "'Preferire' est un verbe -ISC- : la forme loro prend -iscono → preferiscono. 'Preferono' n'existe pas.",
              },
            ],
          },
          {
            title: 'Les trois groupes en parallèle',
            text: "Voici les trois groupes côte à côte pour une vision d'ensemble.\n\n**Points de vigilance** :\n- io : toujours **-o** pour tous les groupes\n- noi : toujours **-iamo** pour tous les groupes\n- voi : **-ate** (-are) / **-ete** (-ere) / **-ite** (-ire)\n- loro : **-ano** (-are) / **-ono** (-ere et -ire)",
            table: {
              headers: ['Pronom', '-ARE (parlare)', '-ERE (leggere)', '-IRE type 1 (dormire)', '-IRE type 2 (capire)'],
              rows: [
                ['io', 'parlo', 'leggo', 'dormo', 'capisco'],
                ['tu', 'parli', 'leggi', 'dormi', 'capisci'],
                ['lui / lei', 'parla', 'legge', 'dorme', 'capisce'],
                ['noi', 'parliamo', 'leggiamo', 'dormiamo', 'capiamo'],
                ['voi', 'parlate', 'leggete', 'dormite', 'capite'],
                ['loro', 'parlano', 'leggono', 'dormono', 'capiscono'],
              ],
            },
            examples: [
              "🗣️ Parli italiano? / Leggi molto? / Capisci tutto?",
              "👥 Parliamo, leggiamo, capiamo — noi è sempre -iamo !",
              "🌙 Dormono già. / Finiscono tardi. → ils dorment déjà / ils finissent tard",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quel est le point commun entre tous les verbes à la forme 'noi' ?",
                options: [
                  'Ils se terminent tous par -amo',
                  'Ils se terminent tous par -iamo',
                  'Ils se terminent tous par -emo',
                  'Ça dépend du groupe',
                ],
                correctAnswer: 'Ils se terminent tous par -iamo',
                explanation:
                  "La terminaison -iamo est universelle pour la forme noi, quel que soit le groupe : parliamo, leggiamo, dormiamo, capiamo.",
              },
              {
                type: 'fill_in_blank',
                question: "Loro ___ (leggere) il giornale ogni mattina.",
                correctAnswer: ['leggono'],
                explanation:
                  "Leggere → loro → legg + ono = leggono. Les verbes en -ERE et -IRE prennent -ono à la 3e personne du pluriel.",
              },
              {
                type: 'true_false',
                question: "La terminaison 'voi' est identique pour les verbes en -ERE et -IRE.",
                correctAnswer: false,
                explanation:
                  "Non : voi prend -ete pour les verbes en -ERE (leggete) et -ite pour les verbes en -IRE (dormite, capite).",
              },
            ],
          },
        ],
        conclusion:
          "Eccellente! Tu as maintenant les trois groupes en main. Le point le plus délicat est le groupe -ISC- des verbes en -IRE — mais il suffit de mémoriser les plus courants : capisco, finisco, preferisco. Dans la révision, on va consolider tout ça dans des situations réelles avec Marco.",
      },
    },
    {
      id: '4_3',
      name: 'Révision : les verbes en action',
      description:
        "Consolide les trois groupes de conjugaison dans des échanges naturels avec Marco.",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Révision des trois groupes au présent. -ARE : -o/-i/-a/-iamo/-ate/-ano, attention à -care/-gare (H) et -ciare/-giare (I unique). -ERE : -o/-i/-e/-iamo/-ete/-ono. -IRE type 1 : -o/-i/-e/-iamo/-ite/-ono ; type 2 (-ISC-) : -isco/-isci/-isce/-iamo/-ite/-iscono. Points forts : io = toujours -o ; noi = toujours -iamo. Pièges : voi -ate/-ete/-ite ; loro -ano/-ono.",
      chat_questions: [
        {
          question: "Décris ta journée typique du matin : qu'est-ce que tu manges, tu écoutes quoi, tu pars à quelle heure ?",
          hint: "La mattina mangio... · ascolto... · parto alle... · di solito = d'habitude · prendo il caffè · cammino fino a...",
        },
        {
          question: "Tu cuisines ? Qu'est-ce que tu prépares quand tu as le temps ?",
          hint: "Cucino spesso / raramente · di solito preparo... · preferisco cucinare / ordinare = commander · cucino = je cuisine · preparo = je prépare",
        },
        {
          question: "Est-ce que tu comprends l'espagnol ou le portugais quand tu les entends ?",
          hint: "Capisco un po' lo spagnolo · sento che è simile / diverso · quando parlano lentamente = quand ils parlent lentement · capisco abbastanza (assez) / poco (peu)",
        },
        {
          question: "Tu finis à quelle heure le vendredi ? Tu sors avec des amis le soir ou tu préfères rester chez toi ?",
          hint: "Il venerdì finisco alle... · esco con gli amici (je sors avec des amis) · preferisco restare a casa · a volte = parfois · dipende (ça dépend)",
        },
        {
          question: "Tu apprends l'italien depuis combien de temps ? Et comment tu étudies — tu écoutes, tu lis, tu pratiques avec des gens ?",
          hint: "Studio l'italiano da [durée] · ascolto podcast / musica italiana · leggo semplici testi · pratico con... · da poco (depuis peu) / da qualche mese (depuis quelques mois)",
        },
      ],
      content: {
        introduction:
          "Dans cette révision, on ne revoit pas les tableaux — on les utilise. Les situations ci-dessous reprennent les trois groupes dans des contextes où tu en auras vraiment besoin : parler de ta routine, de tes goûts, de ce que tu fais au quotidien.",
        sections: [
          {
            title: 'Les pièges classiques des trois groupes',
            text: "Avant de passer aux situations, voici les erreurs les plus fréquentes chez les francophones :\n\n**1. Oublier le H dans -care/-gare** :\n- cerchi ✅ / cerci ✗ · paghi ✅ / pagi ✗ · giochiamo ✅ / giochiamo ✅\n\n**2. Doubler le I dans -ciare/-giare** :\n- mangi ✅ / mangii ✗ · cominci ✅ / comincii ✗\n\n**3. Confondre voi -ate/-ete/-ite** :\n- parlate ✅ (parlare) · leggete ✅ (leggere) · dormite ✅ (dormire)\n\n**4. Oublier -ISC- aux bonnes personnes** :\n- capisco ✅ · capiamo ✅ (pas *capisco*) · capiscono ✅\n\n**5. Utiliser -ano là où il faut -ono** :\n- loro parlano ✅ (-are) · loro leggono ✅ (-ere, pas *leggano*)",
            examples: [
              "⚠️ Tu cerchi casa? ✅ / Tu cerci casa? ✗",
              "⚠️ Voi leggete molto? ✅ / Voi leggete → pas *leggete*… attendez, c'est correct !",
              "⚠️ Loro capiscono ✅ / Loro capono ✗",
              "⚠️ Noi capiamo ✅ / Noi capísciamo ✗ (pas de -isc- à noi)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Laquelle de ces formes est INCORRECTE ?",
                options: ['capiamo', 'capiscono', 'capisce', 'capiono'],
                correctAnswer: 'capiono',
                explanation:
                  "'Capiono' n'existe pas. La forme loro de 'capire' est 'capiscono' (avec -isc-). Les formes correctes : capisco, capisci, capisce, capiamo, capite, capiscono.",
              },
              {
                type: 'fill_in_blank',
                question: "Voi ___ (giocare) a carte il sabato?",
                correctAnswer: ['giocate'],
                explanation:
                  "Giocare → voi → gioc + ate = giocate. Attention : le H n'est pas nécessaire devant -ate (seulement devant -i et -iamo : giochi, giochiamo).",
              },
              {
                type: 'true_false',
                question: "Pour les verbes en -ERE, la forme 'loro' se termine par -ono.",
                correctAnswer: true,
                explanation:
                  "Oui : leggono, scrivono, vedono, rispondono… La terminaison -ono concerne les groupes -ERE et -IRE (les deux). Seuls les -ARE prennent -ano.",
              },
            ],
          },
          {
            title: 'Parler de soi : routine et quotidien',
            text: "Voici comment utiliser les verbes pour parler de ta journée :\n\n**Le matin** :\n- Mi sveglio alle 7. → je me réveille à 7h *(sveglio = je réveille, réfléchi)*\n- Faccio colazione. → je prends le petit déjeuner\n- Prendo un caffè / leggo le notizie.\n- Parto alle 8 e mezza.\n\n**Dans la journée** :\n- Lavoro / Studio dalle 9 alle 18.\n- Mangio spesso fuori. → je mange souvent dehors\n- Rispondo alle email. → je réponds aux mails\n\n**Le soir** :\n- Finisco tardi / presto.\n- Guardo una serie o leggo un po'.\n- Dormo bene di solito.\n\n**Demander à quelqu'un** :\n- Cosa fai di solito? → qu'est-ce que tu fais d'habitude ?\n- Lavori o studi? → tu travailles ou tu étudies ?\n- Dove abiti? → tu habites où ?",
            examples: [
              "🌅 Di solito mi alzo presto e leggo prima di uscire. → je me lève tôt et lis avant de sortir",
              "☕ Prendo sempre un caffè al bar — non capisco come fate senza! → je ne comprends pas comment vous faites sans !",
              "🌙 La sera guardo una serie e finisco tardi. → le soir je regarde une série et je finis tard",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment demande-t-on 'tu travailles ou tu étudies ?' en italien ?",
                options: [
                  'Lavori o studi?',
                  'Lavorate o studiate?',
                  'Lavora o studia?',
                  'Lavorano o studiano?',
                ],
                correctAnswer: 'Lavori o studi?',
                explanation:
                  "Pour s'adresser à 'tu' : lavori (lavorare → tu) et studi (studiare → tu). Les terminaisons -i caractérisent la 2e personne du singulier pour tous les groupes.",
              },
              {
                type: 'fill_in_blank',
                question: "A che ora ___ (finire) tu di solito?",
                correctAnswer: ['finisci'],
                explanation:
                  "Finire est un verbe -ISC- : tu → fin + isci = finisci. 'A che ora finisci?' est la question naturelle pour demander à quelqu'un à quelle heure il termine.",
              },
              {
                type: 'true_false',
                question: "'Leggo e scrivo ogni giorno' signifie 'je lis et j'écris chaque jour'.",
                correctAnswer: true,
                explanation:
                  "Oui : leggo (leggere, io) et scrivo (scrivere, io). Les deux prennent -o à la 1re personne. 'Ogni giorno' = chaque jour.",
              },
            ],
          },
          {
            title: 'Mini-dialogues : les trois groupes en situation',
            text: "Voici des échanges courts qui mêlent les trois groupes :\n\n**Au bar :**\n- Cosa prendi? / Prendo un cappuccino, grazie.\n- Mangi qualcosa? / No, bevo solo il caffè.\n\n**En ville :**\n- Cerchi qualcosa? / Sì, cerco la farmacia.\n- La trovi a destra, passi il semaforo.\n\n**En conversation :**\n- Capisci quando parlo veloce? / Capisco abbastanza, ma preferisco quando parli piano!\n- Leggi in italiano? / Leggo dei testi semplici, ma finisco sempre per usare il dizionario.\n\n**Exprimer ses goûts** :\n- Preferisco il caffè al tè. → je préfère le café au thé\n- Senti, ti piace il jazz? → dis, tu aimes le jazz ?\n- Ascolto tutto tranne il metal! → j'écoute tout sauf le métal !",
            examples: [
              "🗣️ Parli bene! / Capisco ma non parlo ancora bene. → tu parles bien ! / Je comprends mais je parle pas encore bien.",
              "📍 Dove abiti? / Abito in centro, vicino al mercato.",
              "📚 Studi l'italiano da quanto? / Studio da tre mesi — e finisco sempre per parlare in francese!",
            ],
            exercises: [
              {
                type: 'fill_in_blank',
                question: "— Cosa ___ (prendere) tu? — ___ (prendere) un'acqua, grazie.",
                correctAnswer: ['prendi, Prendo', 'prendi, prendo'],
                explanation:
                  "Prendere → tu : prend + i = prendi. Prendere → io : prend + o = prendo. Dialogue typique au bar ou au restaurant.",
              },
              {
                type: 'multiple_choice',
                question: "Laquelle de ces phrases signifie 'ils préfèrent rester à la maison' ?",
                options: [
                  'Preferono restare a casa.',
                  'Preferiscono restare a casa.',
                  'Preferiscon restare a casa.',
                  'Preferano restare a casa.',
                ],
                correctAnswer: 'Preferiscono restare a casa.',
                explanation:
                  "Preferire est un verbe -ISC- : loro → preferiscono. 'Preferono' est une erreur classique — il faut bien le -isc-.",
              },
              {
                type: 'true_false',
                question: "'Senti' peut signifier à la fois 'tu entends' et 'écoute !' (impératif).",
                correctAnswer: true,
                explanation:
                  "Oui : 'senti' est la 2e personne du présent de 'sentire' (tu entends / tu sens) mais aussi l'impératif familier pour attirer l'attention : 'Senti, ti chiedo una cosa.' = 'Écoute, je te demande quelque chose.'",
              },
            ],
          },
        ],
        conclusion:
          "Perfetto! Tu maîtrises maintenant les verbes réguliers italiens dans les trois groupes. Ce sont tes premiers vrais outils pour construire des phrases — conjuguer, questionner, répondre. Dans la prochaine leçon, on passe aux chiffres : indispensables pour l'heure, les prix et tout ce qui compte dans une vraie conversation. Avanti!",
      },
    },
  ],
});
