// ~/data/lessons/lesson_3.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 3,
  order: 3,
  name: 'Saluer, se présenter et engager la conversation',
  description:
    "Apprends les salutations, les présentations et les premières formules pour parler de toi avec naturel.",
  chapter_id: 'salutations-conversations',
  chapter_name: 'Salutations et Conversations',
  sub_lessons: [
    {
      id: '3_1',
      name: 'Saluer et prendre congé',
      description:
        "Maîtrise les salutations formelles et informelles et les formules de politesse essentielles.",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "Les salutations varient selon le contexte : Ciao (informel, amis), Salve (neutre, toujours poli), Buongiorno/Buonasera (formel ou avec inconnus). Pour demander comment ça va : Come stai? (tu) / Come sta? (vous). Pour prendre congé : Ciao, Arrivederci, A presto, Ci vediamo. Le tutoiement (tu) est très courant en Italie, même entre inconnus de même génération.",
      chat_questions: [
        {
          question: "Il est 9h du matin et tu me croises dans la rue. Comment tu me salues ?",
          hint: "Ami : Ciao Marco, come stai? · Directeur : Buongiorno, come sta? · Lei = forme de politesse (vous)",
        },
        {
          question: "Je te demande 'Come stai ?' — réponds avec une vraie réponse, pas juste 'bene' ! Et renvoie-moi la question.",
          hint: "Sto bene, grazie ! / Così così. / Non c'è male. · E tu, come stai ? · Dai, non mi lamento = bof, je me plains pas",
        },
        {
          question: "Tu rencontres ma colocataire Giulia pour la première fois. Présente-toi et dis d'où tu viens.",
          hint: "Ciao, mi chiamo... · Sono francese, vengo da... · Piacere ! / Molto piacere !",
        },
        {
          question: "La soirée se termine chez moi. Comment tu dis au revoir à tout le monde ? Donne au moins 3 façons différentes.",
          hint: "Ciao ! · Arrivederci ! · A presto ! · Ci vediamo ! · A domani ! · Buonanotte ! (si c'est tard)",
        },
        {
          question: "Tu passes devant une boutique et la vendeuse te dit 'Buonasera'. À quelle heure environ sommes-nous ? Et comment lui répondre poliment ?",
          hint: "Buonasera = à partir de ~17h · Buonasera ! / Buonasera a lei. · Prego = de rien / je vous en prie",
        },
      ],
      content: {
        introduction:
          "Benvenuti nella leçon 3 ! Après avoir maîtrisé les sons de l'italien, il est temps de parler pour de vrai. La première chose que tu dis à quelqu'un en Italie, c'est une salutation — et les Italiens y attachent beaucoup d'importance. Un bon 'Buongiorno !' bien placé peut tout changer.",
        sections: [
          {
            title: 'Les salutations selon le contexte',
            text: "L'italien distingue très clairement le registre informel et le registre formel :\n\n**Informel** (amis, famille, collègues proches) :\n- Ciao ! → bonjour / salut / au revoir\n- Salve ! → salut (légèrement plus poli que ciao)\n\n**Formel** (inconnus, supérieurs, commerçants) :\n- Buongiorno → bonjour (matin et après-midi)\n- Buonasera → bonsoir (à partir de ~17h)\n- Buonanotte → bonne nuit (en quittant le soir tard)\n\nNote : en Italie, même les inconnus se disent 'Ciao' assez facilement entre jeunes !",
            examples: [
              "👉 Ciao Marco, come stai? → entre amis, n'importe quelle heure",
              "👉 Buongiorno signora, come sta? → à une dame qu'on ne connaît pas",
              "👉 Salve! → passe partout, registre neutre",
              "👉 Buonasera a tutti! → bonsoir à tous",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Tu entres dans une pharmacie à 18h. Quelle salutation utilises-tu ?",
                options: ['Buongiorno', 'Buonanotte', 'Buonasera', 'Ciao'],
                correctAnswer: 'Buonasera',
                explanation: "Buonasera s'utilise à partir de ~17h. Buongiorno est réservé au matin et à l'après-midi.",
              },
              {
                type: 'true_false',
                question: "'Ciao' peut s'utiliser aussi bien pour dire bonjour que pour dire au revoir.",
                correctAnswer: true,
                explanation: "Ciao est polyvalent : il sert à saluer et à prendre congé, en contexte informel.",
              },
              {
                type: 'fill_in_blank',
                question: "Pour saluer poliment un inconnu à 10h du matin, on dit ___.",
                correctAnswer: ['Buongiorno', 'buongiorno'],
                explanation: "Buongiorno est la salutation formelle de la matinée et du début d'après-midi.",
              },
            ],
          },
          {
            title: "Comment ça va ? : demander et répondre",
            text: "En italien, on distingue le 'tu' (tu) du 'vous de politesse' (Lei, avec majuscule) :\n\n- Come stai? → comment tu vas ? (informel, tu)\n- Come sta? → comment allez-vous ? (formel, Lei)\n\nRéponses possibles :\n- Bene, grazie! → bien, merci !\n- Molto bene! → très bien !\n- Così così. → comme ci comme ça\n- Non c'è male. → pas mal (litt. 'il n'y a pas de mal')\n- Dai, non mi lamento. → bof, je me plains pas\n- Abbastanza bene. → assez bien\n\nToujours renvoyer la question : E tu? / E Lei?",
            examples: [
              "👉 — Ciao! Come stai? / — Bene, grazie! E tu?",
              "👉 — Buongiorno, come sta? / — Non c'è male, grazie! E Lei?",
              "👉 — Allora, come va? / — Così così, sai com'è… (tu sais ce que c'est…)",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment demande-t-on 'comment allez-vous ?' en forme de politesse ?",
                options: ['Come stai?', 'Come va?', 'Come sta?', 'Come ti chiami?'],
                correctAnswer: 'Come sta?',
                explanation: "'Come sta?' utilise la forme Lei (vous de politesse), contrairement à 'Come stai?' (tu).",
              },
              {
                type: 'fill_in_blank',
                question: "'Così così' exprime une réponse ___ à la question 'come stai'.",
                correctAnswer: ['mitigée', 'neutre', 'comme ci comme ça'],
                explanation: "'Così così' signifie littéralement 'comme ci comme ça' — une réponse ni positive ni négative.",
              },
              {
                type: 'true_false',
                question: "En italien, on peut renvoyer la question avec 'E tu?' ou 'E Lei?' selon le registre.",
                correctAnswer: true,
                explanation: "'E tu?' pour le registre informel, 'E Lei?' pour le formel. C'est l'équivalent de 'Et vous ?'.",
              },
            ],
          },
          {
            title: 'Prendre congé : les formules du départ',
            text: "Partir en bonne et due forme, ça s'apprend aussi :\n\n- Ciao! → au revoir (informel)\n- Arrivederci! → au revoir (poli, universel)\n- A presto! → à bientôt !\n- Ci vediamo! → on se voit !\n- A domani! → à demain !\n- A dopo! → à tout à l'heure !\n- Buonanotte! → bonne nuit (en partant tard le soir)\n\n**Arrivederci** vient de 'arrivedersi' (se revoir) — c'est littéralement 'jusqu'à ce qu'on se revoie'.",
            examples: [
              "👉 Dai, ci vediamo domani! Ciao! → parfait entre amis",
              "👉 È stato un piacere, arrivederci! → formel et élégant",
              "👉 A presto! / A prestissimo! → à bientôt / très bientôt",
              "👉 Buonanotte a tutti! → en partant d'une soirée",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Laquelle de ces formules signifie 'à demain' ?",
                options: ['A presto', 'A dopo', 'A domani', 'Ci vediamo'],
                correctAnswer: 'A domani',
                explanation: "'A domani' = à demain. 'A presto' = à bientôt, 'A dopo' = à tout à l'heure.",
              },
              {
                type: 'true_false',
                question: "'Arrivederci' est une formule exclusivement formelle qu'on n'utilise jamais entre amis.",
                correctAnswer: false,
                explanation: "'Arrivederci' est universel et poli — on peut l'utiliser dans tous les contextes, même entre amis.",
              },
              {
                type: 'fill_in_blank',
                question: "Pour dire 'bonne nuit' en quittant une soirée, on dit ___.",
                correctAnswer: ['Buonanotte', 'buonanotte'],
                explanation: "'Buonanotte' s'utilise le soir au moment de se quitter définitivement pour la nuit.",
              },
            ],
          },
        ],
        conclusion:
          "Perfetto! Tu sais maintenant saluer, prendre des nouvelles et prendre congé dans toutes les situations. C'est le socle de toute conversation en italien. Souviens-toi : les Italiens apprécient énormément quand on fait l'effort de les saluer dans leur langue — même imparfaitement !",
      },
    },
    {
      id: '3_2',
      name: 'Se présenter et parler de soi',
      description:
        "Apprends à te présenter, parler de ta famille, ton métier et ta ville.",
      level: 'PARTIAL_TO_WELL',
      summary:
        "Se présenter en italien : Mi chiamo (je m'appelle), Ho X anni (j'ai X ans), Sono di + ville / Sono + nationalité. Pour parler du métier : Faccio il/la + métier, Lavoro come, Studio. Pour la famille : Ho un fratello/una sorella, Sono figlio unico. Pour habiter : Abito a + ville, Vivo a + ville. Le verbe 'avere' (avoir) gère l'âge — jamais 'essere' pour l'âge !",
      chat_questions: [
        {
          question: "Présente-toi à moi en 3-4 phrases : prénom, âge, ville et nationalité.",
          hint: "Mi chiamo... · Ho [X] anni · Sono di... / Vengo da... · Sono francese · Abito a...",
        },
        {
          question: "Je te demande ce que tu fais dans la vie. Comment tu m'expliques ton métier ou tes études ?",
          hint: "Faccio il/la [métier] · Lavoro come... · Studio [matière] all'università · Sono studente/studentessa",
        },
        {
          question: "Je te parle de ma famille. Raconte-moi la tienne : as-tu des frères, sœurs, êtes-vous nombreux ?",
          hint: "Ho un fratello / una sorella · Sono figlio unico / figlia unica · Siamo in 4 · Mio padre / mia madre",
        },
        {
          question: "Je te dis que je vis à Milan depuis 3 ans. Et toi, depuis combien de temps tu habites là où tu es ? Comment le dire en italien ?",
          hint: "Abito a [ville] da [X] anni · Sono qui da... · Vivo a... da quando ero piccolo = depuis que j'étais petit",
        },
        {
          question: "Tu dois me décrire à un ami qui ne me connaît pas encore : qui suis-je, d'où est-ce que je viens, que fais-je ? Improvise à partir de ce que tu sais de moi.",
          hint: "Si chiama Marco · Ha circa... anni · È italiano, viene da... · Fa il... / Lavora come... · È simpatico !",
        },
      ],
      content: {
        introduction:
          "Maintenant qu'on sait se saluer, il faut savoir répondre à la question inévitable : 'E tu, chi sei?' (Et toi, qui es-tu ?). Prénom, âge, nationalité, métier, famille — les briques de base pour que Marco apprenne à te connaître.",
        sections: [
          {
            title: "Prénom, âge, nationalité et ville",
            text: "Les formules essentielles pour se présenter :\n\n**Prénom** :\n- Mi chiamo [prénom] → je m'appelle\n- Il mio nome è [prénom] → mon nom est (plus formel)\n\n**Âge** (avec AVERE, pas essere !) :\n- Ho ventidue anni → j'ai 22 ans\n- Quanti anni hai? → tu as quel âge ?\n\n**Nationalité / Origine** :\n- Sono francese → je suis français(e)\n- Vengo dalla Francia / Sono di Parigi → je viens de France / de Paris\n\n**Ville** :\n- Abito a Parigi → j'habite à Paris\n- Vivo a Lione da tre anni → je vis à Lyon depuis 3 ans",
            examples: [
              "👉 Mi chiamo Baptiste, ho venticinque anni e sono francese.",
              "👉 Vengo da Bordeaux, ma abito a Parigi da due anni.",
              "👉 Quanti anni hai? / Ho ventotto anni. E tu?",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Pour dire son âge en italien, on utilise quel verbe ?",
                options: ['essere (essere venti anni)', 'avere (ho venti anni)', 'fare (faccio venti anni)', 'stare (sto venti anni)'],
                correctAnswer: 'avere (ho venti anni)',
                explanation: "En italien l'âge se construit avec 'avere' (avoir) : ho vent'anni. Jamais avec essere (être).",
              },
              {
                type: 'fill_in_blank',
                question: "'Je m'appelle Sofia' se dit en italien : ___ Sofia.",
                correctAnswer: ['Mi chiamo', 'mi chiamo'],
                explanation: "'Mi chiamo' est la formule standard pour se présenter.",
              },
              {
                type: 'true_false',
                question: "'Sono di Roma' et 'Vengo da Roma' signifient tous les deux 'je viens de Rome'.",
                correctAnswer: true,
                explanation: "Les deux formules sont équivalentes pour exprimer son origine géographique.",
              },
            ],
          },
          {
            title: 'Métier et études',
            text: "Parler de son activité professionnelle ou académique :\n\n**Métier** :\n- Faccio il medico / la professoressa → je suis médecin / professeure (litt. 'je fais le…')\n- Lavoro come architetto → je travaille comme architecte\n- Sono [métier] → je suis [métier]\n\n**Études** :\n- Studio medicina all'università → j'étudie la médecine à l'université\n- Sono studente / studentessa → je suis étudiant(e)\n- Ho appena finito gli studi → je viens de finir mes études\n\nNote : en italien, le métier après 'sono' ne prend pas d'article ('Sono medico', pas 'Sono un medico').",
            examples: [
              "👉 Lavoro in un'agenzia di comunicazione.",
              "👉 Faccio la grafica in proprio da tre anni.",
              "👉 Studio ingegneria al Politecnico di Milano.",
              "👉 Cosa fai nella vita? / — Sono insegnante di francese.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'je suis architecte' en italien ?",
                options: ['Sono un architetto', 'Sono architetto', 'Faccio architetto', 'Ho architetto'],
                correctAnswer: 'Sono architetto',
                explanation: "Après 'sono' + métier, l'article disparaît : 'Sono medico', 'Sono insegnante', 'Sono architetto'.",
              },
              {
                type: 'true_false',
                question: "'Studio' peut signifier à la fois 'j'étudie' et 'le bureau/l'atelier' en italien.",
                correctAnswer: true,
                explanation: "'Studio' est la 1ère personne du verbe studiare ET le nom commun pour 'bureau' ou 'studio'.",
              },
              {
                type: 'fill_in_blank',
                question: "Pour demander à quelqu'un ce qu'il fait dans la vie : ___ fai nella vita?",
                correctAnswer: ['Cosa', 'cosa'],
                explanation: "'Cosa fai nella vita?' = qu'est-ce que tu fais dans la vie ? Cosa = quoi/que.",
              },
            ],
          },
          {
            title: 'La famille : fratelli, sorelle e parenti',
            text: "Parler de sa famille en italien :\n\n- il padre / la madre → le père / la mère\n- il fratello / la sorella → le frère / la sœur\n- i genitori → les parents\n- il marito / la moglie → le mari / la femme\n- il figlio / la figlia → le fils / la fille\n- i nonni → les grands-parents\n\n**Structures utiles** :\n- Ho un fratello e due sorelle → j'ai un frère et deux sœurs\n- Sono figlio unico / figlia unica → je suis fils/fille unique\n- Siamo in quattro in famiglia → nous sommes 4 dans la famille\n- Mio padre si chiama... → mon père s'appelle...",
            examples: [
              "👉 Ho una sorella maggiore e un fratello minore.",
              "👉 Sono figlia unica — solo io!",
              "👉 Siamo in cinque: i miei genitori, io e i miei due fratelli.",
              "👉 Mia madre è insegnante, mio padre lavora in banca.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'je suis fils unique' en italien ?",
                options: ['Sono il solo figlio', 'Sono figlio unico', 'Ho nessun fratello', 'Non ho fratelli né sorelle'],
                correctAnswer: 'Sono figlio unico',
                explanation: "'Figlio unico' (fils unique) / 'figlia unica' (fille unique) est l'expression standard.",
              },
              {
                type: 'fill_in_blank',
                question: "'Les parents' (père et mère) se dit ___ en italien.",
                correctAnswer: ['i genitori', 'genitori'],
                explanation: "'I genitori' signifie 'les parents' (père + mère). 'I miei genitori' = mes parents.",
              },
              {
                type: 'true_false',
                question: "En italien, 'mio padre' et 'il mio padre' sont tous les deux corrects.",
                correctAnswer: false,
                explanation: "Avec les membres de la famille au singulier, l'article est omis : 'mio padre', 'mia madre', 'mio fratello'. Sauf au pluriel : 'i miei genitori'.",
              },
            ],
          },
        ],
        conclusion:
          "Bravissimo! Tu peux maintenant te présenter en entier à Marco et comprendre sa présentation. Prénom, âge, métier, ville, famille — tu as tout le vocabulaire pour les premières minutes d'une vraie conversation italienne. Et maintenant, si on parlait de ce qu'on aime ?",
      },
    },
    {
      id: '3_3',
      name: 'Goûts, loisirs et navigation en conversation',
      description:
        "Exprime tes préférences, parle de tes loisirs et apprends à gérer une conversation quand tu bloques.",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Exprimer ses goûts : Mi piace + nom singulier (mi piace il cinema) / Mi piacciono + pluriel (mi piacciono i gatti). Non mi piace = je n'aime pas. Adorer : Adoro / Amo. Les loisirs : suonare (jouer d'un instrument), leggere (lire), viaggiare (voyager), cucinare (cuisiner). Gérer une conversation : Non capisco (je ne comprends pas), Puoi ripetere? (tu peux répéter?), Come si dice...? (comment on dit...?), Parli piano? (tu parles lentement?).",
      chat_questions: [
        {
          question: "Je te demande ce que tu aimes faire le week-end. Réponds-moi avec au moins 3 activités — utilise 'mi piace' et 'mi piacciono' correctement.",
          hint: "Mi piace + verbe infinitif (mi piace leggere) · Mi piace + singulier (mi piace il cinema) · Mi piacciono + pluriel (mi piacciono i musei)",
        },
        {
          question: "Je te parle de mes passions : la musique, le foot et la cuisine. Réagis en disant si tu partages ces goûts ou pas.",
          hint: "Anche a me! (moi aussi !) · Davvero? Non mi piace molto... · Adoro la musica! · Il calcio non fa per me (le foot c'est pas pour moi)",
        },
        {
          question: "Tu voyages et tu me demandes des conseils pour visiter ma ville. Pose-moi 2 questions sur ce qu'il y a à faire et à manger.",
          hint: "Cosa c'è da fare a...? · Qual è il tuo posto preferito? · Cosa si mangia di tipico? · Mi consigli...? (tu me conseilles...?)",
        },
        {
          question: "Je parle un peu vite et tu n'as pas tout compris. Comment tu me demandes de ralentir et de répéter ?",
          hint: "Scusa, non ho capito · Puoi ripetere, per favore? · Parli più piano? (tu parles plus lentement?) · Come si dice... in italiano?",
        },
        {
          question: "Fais le bilan avec moi : dis-moi ce que tu aimes dans l'apprentissage de l'italien et ce que tu trouves difficile.",
          hint: "Mi piace molto la pronuncia · Trovo difficile... (je trouve difficile...) · L'italiano è una bella lingua · Ho ancora molto da imparare (j'ai encore beaucoup à apprendre)",
        },
      ],
      content: {
        introduction:
          "Maintenant qu'on sait qui on est et d'où on vient, on peut enfin parler de ce qui nous passionne. Et si la conversation devient trop rapide ? Pas de panique — les Italiens sont habitués à ce que les étrangers leur demandent de ralentir, et ils adorent ça.",
        sections: [
          {
            title: 'Mi piace / Mi piacciono : exprimer ses goûts',
            text: "Le verbe 'piacere' fonctionne différemment du français : c'est grammaticalement le sujet qui 'plaît', pas la personne.\n\n- Mi piace + singulier ou verbe infinitif\n- Mi piacciono + pluriel\n- Non mi piace / Non mi piacciono → version négative\n- Ti piace...? / Ti piacciono...? → pour demander\n\n**Degrés d'intensité** :\n- Adoro / Amo → j'adore\n- Mi piace molto → j'aime beaucoup\n- Mi piace abbastanza → j'aime assez\n- Non mi piace molto → je n'aime pas trop\n- Non sopporto / Odio → je ne supporte pas / je déteste",
            examples: [
              "👉 Mi piace il caffè italiano. → j'aime le café italien (singulier)",
              "👉 Mi piacciono i film di Fellini. → j'aime les films de Fellini (pluriel)",
              "👉 Mi piace cucinare con gli amici. → j'aime cuisiner avec des amis (infinitif)",
              "👉 Ti piace la pizza? / Adoro la pizza!",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle phrase est grammaticalement correcte ?",
                options: [
                  'Mi piace i gatti',
                  'Mi piacciono il cane',
                  'Mi piacciono i gatti',
                  'Mi piace le vacanze',
                ],
                correctAnswer: 'Mi piacciono i gatti',
                explanation: "Avec un nom pluriel, on utilise 'piacciono' (et non 'piace'). I gatti = les chats → mi piacciono i gatti.",
              },
              {
                type: 'true_false',
                question: "'Mi piace viaggiare' est une façon correcte d'exprimer qu'on aime voyager.",
                correctAnswer: true,
                explanation: "Mi piace + infinitif = j'aime + verbe. Mi piace viaggiare = j'aime voyager. L'infinitif est traité comme un singulier.",
              },
              {
                type: 'fill_in_blank',
                question: "Pour demander à Marco s'il aime la musique : ___ la musica?",
                correctAnswer: ['Ti piace', 'ti piace'],
                explanation: "'Ti piace' = est-ce que ça te plaît / tu aimes. Ti piace la musica? = tu aimes la musique ?",
              },
            ],
          },
          {
            title: 'Les loisirs et le temps libre',
            text: "Quelques activités courantes pour parler de ses loisirs :\n\n**Sports** :\n- giocare a calcio / tennis / pallavolo → jouer au foot / tennis / volley\n- nuotare → nager | correre → courir | fare yoga → faire du yoga\n\n**Culture / Arts** :\n- leggere → lire | scrivere → écrire\n- suonare la chitarra / il pianoforte → jouer de la guitare / du piano\n- disegnare → dessiner | fotografare → photographer\n\n**Vie sociale** :\n- viaggiare → voyager | cucinare → cuisiner\n- uscire con gli amici → sortir avec des amis\n- guardare serie tv → regarder des séries\n\n**Structure** : Nel tempo libero, mi piace... → Dans mon temps libre, j'aime...",
            examples: [
              "👉 Nel tempo libero, suono la chitarra e leggo molto.",
              "👉 Mi piace viaggiare — sono stato in Spagna l'anno scorso.",
              "👉 Il sabato sera esco con gli amici o guardo una serie.",
              "👉 Faccio attività fisica tre volte a settimana: nuoto e corro.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'jouer de la guitare' en italien ?",
                options: [
                  'giocare la chitarra',
                  'suonare la chitarra',
                  'fare la chitarra',
                  'toccare la chitarra',
                ],
                correctAnswer: 'suonare la chitarra',
                explanation: "En italien : 'suonare' pour jouer d'un instrument, 'giocare' pour jouer à un sport ou un jeu.",
              },
              {
                type: 'fill_in_blank',
                question: "'Dans mon temps libre' se dit en italien : ___ tempo libero.",
                correctAnswer: ['Nel', 'nel'],
                explanation: "'Nel tempo libero' = dans le temps libre. Nel = in + il (contraction).",
              },
              {
                type: 'true_false',
                question: "'Giocare a calcio' et 'suonare il pianoforte' utilisent le même verbe en italien.",
                correctAnswer: false,
                explanation: "'Giocare' s'utilise pour les sports/jeux, 'suonare' pour les instruments de musique. Ce sont deux verbes différents.",
              },
            ],
          },
          {
            title: 'Gérer une conversation : les phrases de survie',
            text: "Même avec un bon niveau, on bloque parfois. Ces phrases te permettront de rester dans la conversation sans panique :\n\n**Si tu ne comprends pas** :\n- Non ho capito. → je n'ai pas compris\n- Non capisco. → je ne comprends pas\n- Puoi ripetere, per favore? → tu peux répéter ?\n- Puoi parlare più piano? → tu peux parler plus lentement ?\n\n**Si tu cherches un mot** :\n- Come si dice... in italiano? → comment on dit... en italien ?\n- Cosa significa...? → que veut dire... ?\n- Non ricordo la parola... → je ne me souviens plus du mot...\n\n**Pour gagner du temps** :\n- Aspetta... → attends...\n- Come dire... → comment dire...\n- Cioè... → c'est-à-dire...",
            examples: [
              "👉 Hai capito? / Non del tutto, puoi ripetere più lentamente?",
              "👉 Come si dice 'flâner' in italiano?",
              "👉 Cosa significa 'in bocca al lupo'?",
              "👉 Aspetta, come dire... ah sì, mi è venuto in mente!",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment demandes-tu à Marco de parler plus lentement ?",
                options: [
                  'Parla più forte!',
                  'Puoi parlare più piano?',
                  'Non capisco la lingua.',
                  'Ripeti ancora?',
                ],
                correctAnswer: 'Puoi parlare più piano?',
                explanation: "'Piano' signifie 'doucement / lentement'. 'Puoi parlare più piano?' = tu peux parler plus doucement/lentement ?",
              },
              {
                type: 'fill_in_blank',
                question: "Pour demander ce que signifie un mot inconnu : ___ significa 'tramonto'?",
                correctAnswer: ['Cosa', 'cosa'],
                explanation: "'Cosa significa...?' = qu'est-ce que ... signifie ? (tramonto = coucher de soleil)",
              },
              {
                type: 'true_false',
                question: "'In bocca al lupo' est une expression italienne qui signifie 'bonne chance'.",
                correctAnswer: true,
                explanation: "'In bocca al lupo' (dans la gueule du loup) est l'équivalent de 'merde !' ou 'bonne chance !'. On répond 'Crepi!' (que le loup crève !).",
              },
            ],
          },
        ],
        conclusion:
          "Eccellente! Tu as maintenant toutes les clés pour engager une vraie conversation avec Marco : saluer, te présenter, parler de tes goûts et de tes loisirs — et surtout, ne pas paniquer si tu ne comprends pas tout. In bocca al lupo pour la suite ! 🐺",
      },
    },
  ],
});
