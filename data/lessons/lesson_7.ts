// ~/data/lessons/lesson_7.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 7,
  order: 7,
  name: 'La famille',
  description:
    "Découvre le vocabulaire de la famille en italien : parents, frères et sœurs, grands-parents, cousins. Apprends à parler de ta famille, à décrire les liens de parenté et à maîtriser la règle des possessifs avec les noms de famille.",
  chapter_id: 'premiers-pas',
  chapter_name: 'Premiers pas',
  sub_lessons: [
    {
      id: '7_1',
      name: 'La famille proche',
      description:
        "Apprends les membres de la famille immédiate et comment les présenter.",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "Vocabulaire de la famille proche : padre (père), madre (mère), figlio/figlia (fils/fille), fratello/sorella (frère/sœur), nonno/nonna (grand-père/grand-mère), marito/moglie (mari/femme). Règle clé des possessifs : avec un nom de parenté singulier, PAS d'article défini — mio padre (et NON *il mio padre*), tua sorella, suo figlio. Exception : loro garde l'article (il loro figlio). Au pluriel, l'article revient : i miei fratelli, le mie sorelle. Autre exception : noms avec suffixe affectif ou altéré → il mio fratellino.",
      chat_questions: [
        {
          question: "Je travaille au bar depuis ce matin et j'ai la tête ailleurs parce que mes parents fêtent leur anniversaire de mariage ce soir. Aide-moi à expliquer ça à un client régulier — et comment je lui dis que mon père est très romantique ?",
          hint: "I miei genitori festeggiano il loro anniversario · Sono sposati da... anni · Mio padre è molto romantico · Stasera siamo tutti in famiglia = ce soir on est tous en famille",
        },
        {
          question: "Un client me demande si j'ai des frères et sœurs et si quelqu'un de ma famille travaille aussi dans la restauration. Qu'est-ce que je lui réponds — j'ai une grande sœur qui est cuisinière et un petit frère encore à l'école.",
          hint: "Ho una sorella maggiore che fa la cuoca · Ho un fratello minore che va ancora a scuola · La mia famiglia è molto legata al cibo = ma famille est très liée à la nourriture · Siamo in tre figli = nous sommes trois enfants",
        },
        {
          question: "Ma grand-mère vient me rendre visite au bar pour la première fois. Je veux la présenter à mon équipe. Comment je dis 'voici ma grand-mère' — et comment je lui demande comment elle va en tuscan/familier ?",
          hint: "Vi presento mia nonna · Questa è mia nonna [Prénom] · Come stai, nonna? · Come ti senti? (comment tu te sens?) · Nonna, benvenuta! (grand-mère, bienvenue!)",
        },
        {
          question: "Je te parle de mes grands-parents paternels qui habitent à Naples. Ils sont tous les deux encore très actifs — mon grand-père tient encore une petite épicerie. Comment je décris ça ?",
          hint: "I miei nonni paterni abitano a Napoli · Mio nonno ha ancora una piccola bottega = mon grand-père a encore une petite épicerie · Sono ancora molto attivi = ils sont encore très actifs · I nonni materni (les grands-parents maternels)",
        },
        {
          question: "Mon fils de 4 ans est venu au bar aujourd'hui avec sa mère. Un vieux client lui demande son prénom et quel âge il a. Aide-moi à reconstituer les deux questions du client — et comment mon fils pourrait répondre.",
          hint: "Come ti chiami? · Quanti anni hai? · Mi chiamo... · Ho quattro anni · È il tuo bambino? (c'est ton enfant?) · Mio figlio si chiama... · Ha quattro anni",
        },
      ],
      content: {
        introduction:
          "La famille est l'un des premiers sujets qui revient dans toute conversation italienne — et l'une des vraies spécificités grammaticales de la langue. En français tu dis 'mon père', en italien tu dis 'mio padre' — sans article. Une règle simple à retenir, mais qu'on oublie souvent. On commence par les membres du cercle proche : les parents, les frères et sœurs, les grands-parents, les enfants.",
        sections: [
          {
            title: "Les parents et grands-parents",
            text: "**Les membres** :\n- padre (père) · madre (mère) · **i genitori** (les parents — toujours au pluriel)\n- nonno (grand-père) · nonna (grand-mère) · **i nonni** (les grands-parents)\n- bisnonno/bisnonna (arrière-grand-père/-mère)\n\n**Adjectifs pour distinguer les branches** :\n- paterno/a (paternel/le) → i nonni paterni (les grands-parents paternels)\n- materno/a (maternel/le) → i nonni materni\n\n**La règle d'or des possessifs avec la famille** :\nAvec un nom de parenté singulier NON altéré → PAS d'article :\n✅ mio padre · tua madre · suo nonno · nostra nonna\n❌ *il mio padre · la tua madre*\n\nMais avec **loro**, l'article reste :\n✅ il loro padre · la loro madre\n\nAu **pluriel**, l'article revient :\n✅ i miei genitori · le nostre nonne · i tuoi nonni\n\n**Ancêtres et famille au sens large** :\n- i parenti (les proches / la famille au sens large — ≠ parents biologiques !)\n- ⚠️ 'parenti' ≠ 'parents' : en italien, 'parenti' = les proches/la famille, 'parents' = genitori",
            examples: [
              "👨‍👩‍👦 I miei genitori abitano a Roma. → mes parents habitent à Rome.",
              "👴 Mio nonno ha ottant'anni e sta ancora benissimo. → mon grand-père a 80 ans et va encore très bien.",
              "👩‍👧 Tua madre è molto gentile. → ta mère est très gentille.",
              "🌳 I nostri nonni paterni sono di Napoli. → nos grands-parents paternels sont de Naples.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on correctement 'mon père' en italien ?",
                options: ['Il mio padre', 'Mio padre', 'Il padre mio', 'Padre mio'],
                correctAnswer: 'Mio padre',
                explanation:
                  "Avec les noms de parenté singuliers non altérés, le possessif s'utilise SANS article défini : mio padre, tua madre, suo fratello. L'article réapparaît au pluriel : i miei fratelli.",
              },
              {
                type: 'true_false',
                question: "'I parenti' se traduit par 'les parents' (père et mère).",
                correctAnswer: false,
                explanation:
                  "Faux ! 'I parenti' = les proches, la famille au sens large (cousins, oncles, etc.). Pour dire 'les parents' (père et mère), on dit 'i genitori'. C'est un faux ami classique.",
              },
              {
                type: 'fill_in_blank',
                question: "'Leurs parents habitent à Milan' : ___ genitori abitano a Milano.",
                correctAnswer: ['I loro', 'i loro'],
                explanation:
                  "Avec 'loro', l'article défini reste toujours : il loro padre, la loro madre, i loro genitori. C'est la seule exception à la règle des possessifs sans article avec les noms de famille.",
              },
            ],
          },
          {
            title: "Frères, sœurs et enfants",
            text: "**Frères et sœurs** :\n- fratello (frère) · sorella (sœur)\n- fratello maggiore / sorella maggiore (frère/sœur aîné·e)\n- fratello minore / sorella minore (frère/sœur cadet·te)\n- fratellino / sorellina (petit frère / petite sœur — forme affective → reprend l'article : il mio fratellino)\n- i fratelli = les frères OU les frères et sœurs (sens large)\n- figlio unico / figlia unica (fils/fille unique)\n\n**Enfants** :\n- figlio (fils) · figlia (fille)\n- bambino/bambina (petit garçon / petite fille — moins de ~12 ans)\n- i figli (les enfants — quel que soit le genre)\n- gemelli/gemelle (jumeaux/jumelles)\n\n**Présenter un enfant** :\n- È mio figlio / mia figlia. → c'est mon fils / ma fille.\n- I miei figli si chiamano... → mes enfants s'appellent...\n- Ha [X] anni. → il/elle a [X] ans.\n\n**Expressions familières** :\n- Siamo in tre / in quattro figli. → on est trois / quatre enfants.\n- Sono figlio unico. → je suis fils unique.\n- Abbiamo due gemelle. → on a deux jumelles.",
            examples: [
              "👦👧 Ho un fratello maggiore e una sorella minore. → j'ai un frère aîné et une sœur cadette.",
              "👶 Il mio fratellino ha solo tre anni. → mon petit frère a seulement 3 ans.",
              "🎭 I miei figli sono gemelli! → mes enfants sont jumeaux !",
              "🙋 Sono figlio unico — non ho né fratelli né sorelle. → je suis fils unique, je n'ai ni frères ni sœurs.",
            ],
            exercises: [
              {
                type: 'fill_in_blank',
                question: "Pour dire 'mon petit frère' avec la forme affective, on dit : il mio ___.",
                correctAnswer: ['fratellino'],
                explanation:
                  "'Fratellino' est la forme affective/diminutive de 'fratello'. Avec les formes altérées (diminutifs, augmentatifs), l'article défini revient : il mio fratellino, la mia sorellina.",
              },
              {
                type: 'multiple_choice',
                question: "'I figli' peut désigner :",
                options: [
                  'Uniquement des garçons',
                  'Uniquement des filles',
                  'Les enfants quel que soit le genre',
                  'Les jumeaux seulement',
                ],
                correctAnswer: 'Les enfants quel que soit le genre',
                explanation:
                  "En italien, le masculin pluriel est générique : 'i figli' = les enfants (garçons et filles). 'I fratelli' peut aussi signifier 'les frères et sœurs'. Pour spécifier : i figli maschi (les fils) / le figlie femmine (les filles).",
              },
              {
                type: 'true_false',
                question: "'Siamo in quattro figli' signifie 'nous sommes quatre enfants'.",
                correctAnswer: true,
                explanation:
                  "Oui. 'Essere in + nombre' exprime le nombre de personnes dans un groupe : siamo in tre (on est trois), siamo in due fratelli (on est deux frères/sœurs). Très courant à l'oral.",
              },
            ],
          },
          {
            title: "Le couple et les conjoints",
            text: "**Le couple selon le statut** :\n- marito (mari) · moglie (femme/épouse) → **i coniugi** (les époux, le couple marié)\n- compagno/compagna (compagnon/compagne — couple non marié)\n- fidanzato/fidanzata (fiancé·e / petit ami, petite amie)\n- ex marito / ex moglie · l'ex (l'ex)\n\n**Se marier, être en couple** :\n- sposato/a (marié·e) → Sono sposato. (je suis marié.)\n- convivente (en concubinage) · divorziato/a (divorcé·e) · vedovo/vedova (veuf/veuve)\n- fidanzarsi (se fiancer / se mettre en couple) · sposarsi (se marier)\n\n**Parler de son couple** :\n- Mia moglie si chiama... → ma femme s'appelle...\n- Il mio compagno lavora come... → mon compagnon travaille comme...\n- Siamo insieme da [X] anni. → on est ensemble depuis [X] ans.\n- Ci siamo sposati a... (on s'est mariés à...)\n\n**Formules utiles** :\n- È single. (il/elle est célibataire) · È fidanzato/a. (il/elle est en couple)\n- Hanno appena avuto un bambino. (ils viennent d'avoir un enfant)",
            examples: [
              "💍 Mia moglie è medico — lavora all'ospedale Gemelli. → ma femme est médecin, elle travaille à l'hôpital Gemelli.",
              "💑 Siamo insieme da dieci anni ma non ancora sposati. → on est ensemble depuis dix ans mais pas encore mariés.",
              "🥂 I miei genitori si sono sposati trent'anni fa. → mes parents se sont mariés il y a trente ans.",
              "📱 Il mio fidanzato abita a Milano, io a Roma. → mon fiancé habite à Milan, moi à Rome.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Pour parler de sa femme (épouse) en italien, on dit :",
                options: ['La mia donna', 'Mia moglie', 'La mia moglie', 'Mia compagna'],
                correctAnswer: 'Mia moglie',
                explanation:
                  "'Moglie' est un nom de parenté singulier → pas d'article avec le possessif : mia moglie. 'La mia donna' est incorrect dans ce sens. 'Mia compagna' désigne une compagne non mariée.",
              },
              {
                type: 'fill_in_blank',
                question: "'On est ensemble depuis cinq ans' : Siamo ___ da cinque anni.",
                correctAnswer: ['insieme', 'Siamo insieme'],
                explanation:
                  "'Siamo insieme' = on est ensemble. 'Da' exprime la durée qui continue jusqu'à maintenant (équivalent de 'depuis'). Siamo insieme da cinque anni = on est ensemble depuis cinq ans (et on l'est encore).",
              },
              {
                type: 'true_false',
                question: "'I coniugi' désigne uniquement les époux hétérosexuels.",
                correctAnswer: false,
                explanation:
                  "'I coniugi' désigne légalement les époux d'un couple marié, quel que soit leur genre. En registre neutre ou administratif, 'i coniugi' est le terme standard pour 'les époux / le couple marié'.",
              },
            ],
          },
        ],
        conclusion:
          "Ottimo! Tu connais maintenant les membres du cercle familial proche — et la règle des possessifs sans article. Dans la prochaine sous-leçon, on élargit à la famille élargie : oncles, tantes, cousins, belle-famille. Le vocabulaire est plus riche, les contextes plus variés.",
      },
    },
    {
      id: '7_2',
      name: 'La famille élargie',
      description:
        "Découvre le vocabulaire des cousins, oncles, tantes et de la belle-famille.",
      level: 'PARTIAL_TO_WELL',
      summary:
        "La famille élargie : zio/zia (oncle/tante), cugino/cugina (cousin/cousine), nipote (neveu/nièce ET petit-fils/petite-fille selon le contexte — ambigu !). Belle-famille : suocero/suocera (beau-père/belle-mère), cognato/cognata (beau-frère/belle-sœur), genero/nuora (gendre/belle-fille). Les possessifs pluriels reprennent l'article : i miei zii, le mie cugine. 'Nipote' est le mot le plus piégeux : il signifie à la fois neveu/nièce (par rapport aux frères/sœurs) ET petit-enfant (par rapport aux grands-parents) — seul le contexte permet de trancher.",
      chat_questions: [
        {
          question: "Mon neveu de 18 ans voudrait faire un stage dans mon bar cet été. Je t'en parle et j'explique qui il est dans ma famille — c'est le fils de ma sœur aînée. Comment je dis ça ?",
          hint: "Mio nipote vuole fare uno stage nel mio bar · È il figlio di mia sorella maggiore · Ha diciotto anni · Mi ha chiesto di lavorare con me questa estate = il m'a demandé de travailler avec moi cet été",
        },
        {
          question: "Ma belle-mère débarque à Rome ce week-end et elle veut absolument goûter mon espresso. Je t'explique ma relation avec ma belle-famille — plutôt bonne dans l'ensemble. Comment j'en parle ?",
          hint: "Mia suocera viene a Roma questo weekend · Vuole assaggiare il mio espresso · Vado d'accordo con la mia suocera = je m'entends bien avec ma belle-mère · I miei suoceri sono molto simpatici = mes beaux-parents sont très sympathiques",
        },
        {
          question: "Je te raconte la dernière réunion de famille : il y avait oncles, tantes et cousins de partout. Il y avait du monde ! Comment je décris cette scène animée ?",
          hint: "C'erano tutti gli zii e le zie · Anche tutti i cugini e le cugine · Eravamo almeno venti persone = on était au moins vingt personnes · Una gran confusione = un sacré bazar · Mi piacciono le riunioni di famiglia = j'aime les réunions de famille",
        },
        {
          question: "Un client me demande si ma sœur a des enfants et si je suis donc 'zio'. Je lui explique que oui, j'ai deux neveux et une nièce. Comment je lui réponds ?",
          hint: "Sì, sono zio! · Mia sorella ha tre figli · Ho due nipoti maschi e una nipote femmina · Essere zio è bellissimo = être oncle c'est génial · I miei nipoti vengono spesso al bar = mes neveux viennent souvent au bar",
        },
        {
          question: "Mon beau-frère (le mari de ma sœur) a ouvert un restaurant à Florence. Je suis fier de lui et j'en parle à un client. Comment je présente ce lien de parenté et comment j'exprime ma fierté ?",
          hint: "Mio cognato ha aperto un ristorante a Firenze · È il marito di mia sorella · Sono molto orgoglioso di lui = je suis très fier de lui · Ha lavorato duro per arrivarci = il a travaillé dur pour y arriver",
        },
      ],
      content: {
        introduction:
          "La famille italienne, c'est souvent grand et bruyant. Oncles, tantes, cousins, belle-famille… autant de liens à nommer avec précision. Le vocabulaire est plus fourni qu'en français — et il y a un piège de taille : le mot 'nipote', qui désigne à la fois le neveu/la nièce ET le petit-fils/la petite-fille. Contexte obligatoire.",
        sections: [
          {
            title: "Oncles, tantes et cousins",
            text: "**Oncles et tantes** :\n- zio (oncle) · zia (tante)\n- gli zii = les oncles OU les oncles et tantes (sens collectif)\n- zio paterno / zio materno (oncle paternel / maternel)\n\n**Cousins** :\n- cugino (cousin) · cugina (cousine)\n- i cugini (les cousins — genre mixte) · le cugine (les cousines)\n- cugino di primo grado (cousin germain) · cugino di secondo grado (cousin issu de germain)\n\n**Possessifs au pluriel** (l'article revient) :\n✅ i miei zii · le mie zie · i tuoi cugini · le sue cugine\n\n**Expressions courantes** :\n- Ho molti cugini. → j'ai beaucoup de cousins.\n- Mio zio abita in campagna. → mon oncle habite à la campagne.\n- Mia zia fa la cuoca. → ma tante est cuisinière.\n- Siamo cugini di primo grado. → on est cousins germains.\n\n**Famille au sens large** :\n- i parenti (les proches, la famille — rappel du faux ami)\n- un lontano parente (un parent éloigné)\n- la famiglia allargata (la famille élargie)",
            examples: [
              "👨‍👩‍👧‍👦 I miei zii abitano a Firenze — li vedo d'estate. → mes oncles et tantes habitent à Florence — je les vois l'été.",
              "🤝 Ho dieci cugini tra maschi e femmine. → j'ai dix cousins entre garçons et filles.",
              "🍷 Mia zia prepara sempre il tiramisù per le feste. → ma tante prépare toujours le tiramisu pour les fêtes.",
              "🌍 Ho un cugino lontano che vive in Argentina. → j'ai un cousin éloigné qui vit en Argentine.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'mes oncles et tantes' en italien ?",
                options: ['I miei zii e zie', 'I miei zii', 'Le mie zie', 'I miei parenti'],
                correctAnswer: 'I miei zii',
                explanation:
                  "'Gli zii' (ou 'i miei zii') peut désigner collectivement les oncles ET les tantes, comme 'i fratelli' peut désigner frères et sœurs. En pratique, 'i miei zii' couvre les deux genres.",
              },
              {
                type: 'fill_in_blank',
                question: "'Ta cousine travaille à Rome' : ___ cugina lavora a Roma.",
                correctAnswer: ['Tua', 'tua'],
                explanation:
                  "Nom de parenté singulier → pas d'article avec le possessif : tua cugina (et non *la tua cugina*). Au pluriel, l'article revient : le tue cugine.",
              },
              {
                type: 'true_false',
                question: "'I parenti' est le mot exact pour traduire 'mes parents' (père et mère).",
                correctAnswer: false,
                explanation:
                  "Faux — c'est le faux ami classique de l'italien. 'I parenti' = les proches / la famille. Pour 'mes parents' (père et mère), on dit 'i miei genitori'.",
              },
            ],
          },
          {
            title: "Neveux, nièces et petits-enfants : le cas 'nipote'",
            text: "**Le mot le plus ambigu de la famille italienne** :\n\n**Nipote** a deux sens selon le contexte :\n1. **Neveu / nièce** (par rapport à un frère ou une sœur)\n   → mio nipote = mon neveu · mia nipote = ma nièce\n2. **Petit-fils / petite-fille** (par rapport à des grands-parents)\n   → il nipote di Marco = le petit-fils de Marco\n\n**Comment lever l'ambiguïté** :\n- Il nipote di mio zio → le fils de mon oncle = mon cousin (contexte clair)\n- Il nipote di mia nonna → le petit-fils de ma grand-mère (= moi ?)\n- Per i nonni, i nipoti sono tutto. → pour les grands-parents, les petits-enfants sont tout.\n\n**Pluriel** :\n- i nipoti = les neveux / nièces OU les petits-enfants\n- le nipoti (féminin pluriel, plus rare)\n\n**Oncle et tante de référence** :\n- Être oncle/tante : Sono lo zio / la zia di...\n- Essere zio è una gioia. → être oncle est une joie.\n\n**Petit-enfant (terme alternatif non ambigu)** :\n- pronipote = arrière-petit-enfant (mais aussi parfois petit-enfant selon les régions)",
            examples: [
              "👶 I miei nipoti vengono al bar ogni domenica. → mes neveux/petits-enfants viennent au bar chaque dimanche. (ambigu → contexte nécessaire)",
              "👨‍👧 Per mia nonna, siamo tutti i suoi nipoti preferiti! → pour ma grand-mère, on est tous ses petits-enfants préférés !",
              "🤗 Sono diventato zio la settimana scorsa — mio nipote si chiama Luca. → je suis devenu oncle la semaine dernière — mon neveu s'appelle Luca.",
              "🍰 La zia porta sempre i dolci ai nipoti. → la tante apporte toujours des gâteaux aux neveux/petits-enfants.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Dans la phrase 'I nipoti di mia nonna vengono a pranzo', 'nipoti' désigne :",
                options: [
                  'Les neveux de la grand-mère',
                  'Les petits-enfants de la grand-mère',
                  'Les cousins de la grand-mère',
                  "Les enfants de la grand-mère",
                ],
                correctAnswer: 'Les petits-enfants de la grand-mère',
                explanation:
                  "Par rapport à une grand-mère, 'nipoti' désigne ses petits-enfants. Par rapport à un frère ou une sœur, 'nipoti' désigne ses neveux et nièces. Le contexte (qui est le référent) est la seule façon de lever l'ambiguïté.",
              },
              {
                type: 'true_false',
                question: "'Mia nipote' peut signifier à la fois 'ma nièce' et 'ma petite-fille'.",
                correctAnswer: true,
                explanation:
                  "Oui, 'nipote' est ambigu en italien : il désigne neveu/nièce (par rapport aux frères/sœurs) ET petit-fils/petite-fille (par rapport aux grands-parents). Seul le contexte permet de trancher.",
              },
              {
                type: 'fill_in_blank',
                question: "'Je suis devenu oncle' : Sono diventato ___.",
                correctAnswer: ['zio'],
                explanation:
                  "'Sono diventato zio' = je suis devenu oncle. Avec 'diventare' + titre de parenté, on n'utilise pas l'article : sono diventato padre, sono diventata zia, è diventato nonno.",
              },
            ],
          },
          {
            title: "La belle-famille",
            text: "**Beaux-parents** :\n- suocero (beau-père) · suocera (belle-mère)\n- i suoceri (les beaux-parents)\n\n**Beaux-frères et belles-sœurs** :\n- cognato (beau-frère) · cognata (belle-sœur)\n- i cognati (les beaux-frères et belles-sœurs)\n\n**Gendre et belle-fille** :\n- genero (gendre — le mari de sa fille)\n- nuora (belle-fille — la femme de son fils)\n\n**Règle possessif** : mêmes règles que pour la famille proche :\n✅ mio suocero · mia suocera · mio cognato\n❌ *il mio suocero*\n\n**Expressions sur la belle-famille** :\n- Vado d'accordo con mia suocera. → je m'entends bien avec ma belle-mère.\n- I suoceri vengono a cena stasera. → les beaux-parents viennent dîner ce soir.\n- Mio cognato è un ottimo cuoco. → mon beau-frère est un excellent cuisinier.\n\n**Famille recomposée** :\n- patrigno (beau-père — nouveau compagnon de la mère) ≠ suocero (beau-père par le mariage)\n- matrigna (belle-mère — nouvelle compagne du père) ≠ suocera\n- fratellastro / sorellastra (demi-frère / demi-sœur)",
            examples: [
              "🤝 Mia suocera fa il caffè meglio di me! → ma belle-mère fait le café mieux que moi !",
              "🍽️ I miei suoceri vengono ogni domenica a pranzo. → mes beaux-parents viennent chaque dimanche à déjeuner.",
              "👨‍🍳 Mio cognato ha aperto un ristorante a Napoli. → mon beau-frère a ouvert un restaurant à Naples.",
              "🏠 Il genero di Marco abita in Germania. → le gendre de Marco habite en Allemagne.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment appelle-t-on le mari de sa fille en italien ?",
                options: ['Cognato', 'Suocero', 'Genero', 'Fratellastro'],
                correctAnswer: 'Genero',
                explanation:
                  "'Genero' = gendre (le mari de sa fille). 'Nuora' = belle-fille (la femme de son fils). 'Suocero' = beau-père (le père de son époux/épouse). 'Cognato' = beau-frère.",
              },
              {
                type: 'fill_in_blank',
                question: "'Ma belle-mère vient dîner ce soir' : ___ suocera viene a cena stasera.",
                correctAnswer: ['Mia', 'mia'],
                explanation:
                  "Nom de parenté singulier → pas d'article : mia suocera, mio suocero, mio cognato. La règle s'applique aussi à la belle-famille : pas d'article sauf avec 'loro' (il loro suocero).",
              },
              {
                type: 'true_false',
                question: "'Patrigno' et 'suocero' désignent tous les deux le 'beau-père'.",
                correctAnswer: true,
                explanation:
                  "Vrai — mais ce sont deux situations différentes. 'Suocero' = beau-père par le mariage (le père de ton époux/épouse). 'Patrigno' = beau-père par recomposition familiale (le nouveau compagnon de ta mère). La distinction est importante !",
              },
            ],
          },
        ],
        conclusion:
          "Perfetto! Tu maîtrises maintenant toute la famille italienne — du noyau au cercle élargi et à la belle-famille. Le piège principal à retenir : 'nipote' est ambigu (neveu/nièce ET petit-enfant) et 'parenti' ne veut pas dire 'parents'. Dans la prochaine sous-leçon, on révise l'ensemble et on s'entraîne à décrire sa famille dans des situations concrètes.",
      },
    },
    {
      id: '7_3',
      name: 'Révision de la famille',
      description:
        "Exercices de consolidation pour parler de ta famille naturellement.",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Révision complète du vocabulaire de la famille. Famille proche : padre/madre/genitori · nonno/nonna/nonni · figlio/figlia/figli · fratello/sorella · marito/moglie · compagno/compagna. Famille élargie : zio/zia/zii · cugino/cugina · nipote (ambigu : neveu/nièce ET petit-enfant) · suocero/suocera · cognato/cognata · genero/nuora. Règle possessif : NOM de parenté SINGULIER → PAS d'article (mio padre, non il mio padre) · PLURIEL → article obligatoire (i miei fratelli) · LORO → toujours article (il loro figlio) · formes altérées → article (il mio fratellino).",
      chat_questions: [
        {
          question: "Je t'invite à décrire ta famille en commençant par les plus proches — parents, frères/sœurs — puis en disant si tu as une famille élargie présente dans ta vie (oncles, cousins, etc.).",
          hint: "Ho... fratelli/sorelle · I miei genitori abitano a... · Ho molti/pochi parenti · La mia famiglia è grande/piccola · Vedo spesso i miei zii e cugini = je vois souvent mes oncles et cousins",
        },
        {
          question: "Un client régulier me demande des nouvelles de ma famille. Je lui parle de ma sœur qui vient d'avoir un bébé — je suis donc devenu oncle pour la première fois. Comment j'annonce ça avec enthousiasme ?",
          hint: "Mia sorella ha appena avuto un bambino! · Sono diventato zio per la prima volta · Mi chiamo [Prénom] il bambino · Il mio nipotino si chiama... · Sono felicissimo! = je suis trop heureux !",
        },
        {
          question: "Ma nonna vient fêter ses 80 ans au bar avec toute la famille — les enfants, petits-enfants, neveux et cousins. Je dois expliquer à mon équipe qui sont toutes ces personnes. Comment j'organise cette présentation ?",
          hint: "Questa è mia nonna — compie ottant'anni oggi · Questi sono i miei genitori · Quelli sono i miei zii e cugini · I bambini sono i nipoti di mia nonna = les enfants sont les petits-enfants de ma grand-mère",
        },
        {
          question: "Mon beau-père (suocero) est venu voir mon bar pour la première fois. Je veux faire bonne impression et lui préparer l'espresso parfait. Comment je lui parle et comment je présente ce moment à un ami ?",
          hint: "Mio suocero è venuto al bar oggi · Volevo fare bella figura = je voulais faire bonne impression · Gli ho preparato il miglior espresso della mia vita = je lui ai préparé le meilleur espresso de ma vie · Sembra contento! = il a l'air content !",
        },
        {
          question: "Tu me demandes si les Italiens parlent beaucoup de leur famille. Je t'explique que oui, c'est très important dans la culture italienne — les repas en famille, les fêtes, et le rôle central des grands-parents.",
          hint: "La famiglia è molto importante in Italia · I nonni hanno un ruolo centrale = les grands-parents ont un rôle central · I pranzi in famiglia la domenica sono una tradizione · Si parla sempre di famiglia = on parle toujours de famille",
        },
      ],
      content: {
        introduction:
          "Dans cette révision, on remet en jeu tout le vocabulaire de la famille — famille proche, élargie, belle-famille — avec un focus particulier sur les deux pièges qui font trébucher tout le monde : la règle des possessifs sans article et l'ambiguïté de 'nipote'. L'objectif : parler de ta famille avec naturel et précision.",
        sections: [
          {
            title: "Les possessifs avec la famille : la règle complète",
            text: "**Rappel de la règle** :\n\nNom de parenté **singulier non altéré** + possessif → **PAS d'article** :\n- mio padre · tua madre · suo fratello · nostra sorella · vostro figlio\n\n**Exceptions → article obligatoire** :\n1. Avec **loro** : il loro padre · la loro madre · i loro figli\n2. Avec formes **altérées** (diminutifs, augmentatifs) : il mio fratellino · la mia sorellona\n3. Au **pluriel** : i miei fratelli · le tue sorelle · i suoi genitori · i nostri nonni\n4. Avec un **qualificatif** (selon certaines grammaires, optionnel) : il mio caro padre (possible avec adjectif emphatique)\n\n**Tableau récapitulatif** :\n| Cas | Exemple | Article ? |\n|---|---|---|\n| Singulier standard | mio padre | ❌ |\n| Pluriel | i miei fratelli | ✅ |\n| Loro | il loro zio | ✅ |\n| Diminutif | il mio fratellino | ✅ |",
            examples: [
              "✅ Mia sorella abita a Torino. → ma sœur habite à Turin.",
              "✅ I miei nonni sono di Sicilia. → mes grands-parents sont de Sicile.",
              "✅ Il loro figlio studia medicina. → leur fils étudie la médecine.",
              "✅ Il mio fratellino ha sei anni. → mon petit frère a six ans.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Laquelle de ces phrases est correctement construite ?",
                options: [
                  'Il mio padre è medico.',
                  'Mio padre è medico.',
                  'Padre mio è medico.',
                  'Mio il padre è medico.',
                ],
                correctAnswer: 'Mio padre è medico.',
                explanation:
                  "Nom de parenté singulier (padre) + possessif → pas d'article : 'mio padre'. L'article 'il' devant un nom de parenté singulier est une erreur très courante chez les francophones.",
              },
              {
                type: 'fill_in_blank',
                question: "Complète : '___ nonni di Marco vengono a cena.' (les grands-parents de Marco)",
                correctAnswer: ['I nonni', 'i nonni'],
                explanation:
                  "Avec 'di Marco' (appartenance par préposition, pas par possessif), on utilise l'article normalement : 'i nonni di Marco'. La règle du possessif sans article s'applique uniquement avec les adjectifs possessifs (mio, tuo, suo...).",
              },
              {
                type: 'true_false',
                question: "'La loro sorella è avvocata' est grammaticalement correct.",
                correctAnswer: true,
                explanation:
                  "Oui. Avec 'loro', l'article défini est obligatoire même avec un nom de parenté singulier : la loro sorella, il loro padre, il loro figlio. C'est la seule exception au singulier.",
              },
            ],
          },
          {
            title: "Nipote, parenti, cognato : les mots qui piègent",
            text: "**Nipote — l'ambigu** :\n- Par rapport à un **frère/sœur** → neveu / nièce\n  Mio fratello ha un figlio → sono zio → quel bambino è mio nipote\n- Par rapport à des **grands-parents** → petit-fils / petite-fille\n  I nonni hanno nipoti → mia nonna ha sei nipoti\n\n**Lever l'ambiguïté** :\n- Il nipote di mia sorella → le fils de ma sœur = mon neveu (ou cousin, selon le contexte)\n- Il nipote di mia nonna → le petit-fils de ma grand-mère\n- En contexte de grands-parents, 'nipote' = petit-enfant · en contexte de frères/sœurs, 'nipote' = neveu/nièce\n\n**Parenti — le faux ami** :\n- parenti ≠ parents → parenti = proches, famille au sens large\n- parents (père et mère) = genitori\n- Ho molti parenti a Milano. → j'ai beaucoup de famille à Milan.\n\n**Cognato vs suocero vs genero** :\n- cognato = beau-frère (frère de ton conjoint OU mari de ta sœur)\n- suocero = beau-père (père de ton conjoint)\n- genero = gendre (mari de ta fille) ← souvent oublié\n- nuora = belle-fille (femme de ton fils) ← souvent oublié",
            examples: [
              "❓ Ho tre nipoti. → j'ai trois neveux/nièces (ou petits-enfants) — contexte nécessaire !",
              "✅ I miei genitori abitano a Roma, non i miei parenti. → mes parents habitent à Rome. (et non 'mes proches')",
              "👨‍👩‍👧 Mio cognato è il marito di mia sorella. → mon beau-frère est le mari de ma sœur.",
              "👵 Mia nonna adora i suoi nipoti. → ma grand-mère adore ses petits-enfants.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Dans 'Mia nonna ha cinque nipoti', 'nipoti' désigne :",
                options: [
                  'Les neveux de la grand-mère',
                  'Les petits-enfants de la grand-mère',
                  'Les cousins de la grand-mère',
                  'Les enfants de la grand-mère',
                ],
                correctAnswer: 'Les petits-enfants de la grand-mère',
                explanation:
                  "Par rapport à une grand-mère, 'nipoti' = petits-enfants. Par rapport à un frère ou une sœur, 'nipoti' = neveux et nièces. Ici le référent est 'mia nonna' → petits-enfants.",
              },
              {
                type: 'fill_in_blank',
                question: "'J'ai beaucoup de famille à Rome' (proches au sens large) : Ho molti ___ a Roma.",
                correctAnswer: ['parenti'],
                explanation:
                  "'Parenti' = les proches / la famille au sens large. Pour 'parents' (père et mère), c'est 'genitori'. 'Ho molti parenti a Roma' = j'ai beaucoup de proches à Rome.",
              },
              {
                type: 'true_false',
                question: "'Cognato' désigne uniquement le frère de ton conjoint.",
                correctAnswer: false,
                explanation:
                  "'Cognato' désigne le beau-frère dans les deux sens : le frère de ton conjoint(e) OU le mari de ta sœur. De même, 'cognata' = la belle-sœur (sœur de ton conjoint OU femme de ton frère).",
              },
            ],
          },
          {
            title: "Parler de sa famille : structures et expressions",
            text: "**Présenter sa famille** :\n- Ho una famiglia grande/piccola/numerosa. → j'ai une grande/petite/nombreuse famille.\n- Siamo in cinque in famiglia. → on est cinq dans la famille.\n- Vengo da una famiglia di ristoratori. → je viens d'une famille de restaurateurs.\n\n**Décrire les liens** :\n- È il figlio / la figlia di... → c'est le fils / la fille de...\n- È il fratello / la sorella di... → c'est le frère / la sœur de...\n- Siamo parenti alla lontana. → on est de lointains parents.\n\n**Parler des relations** :\n- Andiamo molto d'accordo. → on s'entend très bien.\n- Siamo molto uniti. → on est très soudés.\n- Ci vediamo spesso / raramente. → on se voit souvent / rarement.\n- La mia famiglia mi manca. → ma famille me manque.\n\n**Traditions familiales** :\n- Il pranzo della domenica è sacro. → le déjeuner du dimanche est sacré.\n- A Natale ci riuniamo tutti. → à Noël on se réunit tous.\n- I nonni badano ai nipoti. → les grands-parents gardent les petits-enfants.",
            examples: [
              "👨‍👩‍👧‍👦 Vengo da una famiglia numerosa — siamo in sei fratelli. → je viens d'une famille nombreuse — on est six frères et sœurs.",
              "❤️ La mia famiglia è molto unita — ci vediamo ogni settimana. → ma famille est très soudée — on se voit chaque semaine.",
              "🎄 A Natale siamo sempre più di venti a tavola. → à Noël on est toujours plus de vingt à table.",
              "🥺 Mi manca mia madre — abita lontano. → ma mère me manque — elle habite loin.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Pour dire 'ma famille me manque', on dit :",
                options: [
                  'Ho nostalgia la mia famiglia.',
                  'La mia famiglia mi manca.',
                  'La mia famiglia manca me.',
                  'Mia famiglia mi manca.',
                ],
                correctAnswer: 'La mia famiglia mi manca.',
                explanation:
                  "'Mancare' fonctionne comme 'piacere' : le sujet grammatical est la chose qui manque, pas la personne. 'La mia famiglia mi manca' = ma famille me manque (litt. : ma famille manque à moi). Au pluriel : 'I miei mi mancano' = les miens me manquent.",
              },
              {
                type: 'fill_in_blank',
                question: "'On est très soudés dans ma famille' : Nella mia famiglia siamo molto ___.",
                correctAnswer: ['uniti', 'uniti.'],
                explanation:
                  "'Essere uniti' = être soudés, unis. C'est une expression très courante pour parler des liens familiaux : 'siamo molto uniti' (on est très soudés), 'una famiglia unita' (une famille unie).",
              },
              {
                type: 'true_false',
                question: "'Vengo da una famiglia di medici' signifie 'je viens d'une famille de médecins'.",
                correctAnswer: true,
                explanation:
                  "Oui. 'Venire da una famiglia di + métier/activité' est la structure standard pour décrire l'origine professionnelle ou culturelle de sa famille : vengo da una famiglia di commercianti, di artigiani, di artisti...",
              },
            ],
          },
        ],
        conclusion:
          "Eccellente! Tu maîtrises maintenant toute la famille italienne, ses règles grammaticales et ses pièges. Le vocabulaire de la famille est l'un des plus utilisés dans la conversation quotidienne — il va revenir dans presque chaque échange. Prochaine étape : les émotions et les sentiments, pour exprimer ce que tu ressens.",
      },
    },
  ],
});
