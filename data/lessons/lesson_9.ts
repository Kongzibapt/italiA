// ~/data/lessons/lesson_9.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 9,
  order: 9,
  name: 'Décrire les personnes',
  description:
    "Apprends à décrire l'apparence physique et la personnalité d'une personne. Vocabulaire des couleurs de cheveux et yeux, taille, caractère et expressions pour faire des compliments.",
  chapter_id: 'premiers-pas',
  chapter_name: 'Premiers pas',
  sub_lessons: [
    {
      id: '9_1',
      name: 'La description physique',
      description:
        "Découvre le vocabulaire pour décrire l'apparence : taille, couleur des cheveux et des yeux, silhouette.",
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "Décrire l'apparence physique. La statura : alto/a (grand·e), basso/a (petit·e), di media statura (de taille moyenne). La corporatura : magro/a (mince), robusto/a (costaud·e), snello/a (svelte), in forma (en forme). Les cheveux : capelli + couleur (neri, biondi, castani, rossi, bianchi, grigi) + texture (lisci, ricci, ondulati) + longueur (corti, lunghi). Les yeux : occhi azzurri/verdi/marroni/neri. Grammaire clé : essere pour les traits de stature (è alto/a) · avere pour les attributs (ha i capelli biondi, ha gli occhi verdi) · accord des adjectifs en genre et nombre.",
      chat_questions: [
        {
          question: "Tu te décrirais comment physiquement à quelqu'un qui ne t'a jamais vu ? Taille, cheveux, yeux.",
          hint: "Sono alto/a · di media statura · basso/a · Ho i capelli [couleur] e [texture] · Ho gli occhi [couleur] · Porto gli occhiali = je porte des lunettes",
        },
        {
          question: "Tu ressembles plus à ton père ou à ta mère physiquement ? Dans quoi tu peux le voir ?",
          hint: "Assomiglio a... (je ressemble à...) · Ho gli stessi occhi di... · Stessa corporatura = même silhouette · Ho preso i capelli di... = j'ai hérité les cheveux de... · Mi dicono che... = on me dit que...",
        },
        {
          question: "Pense à une célébrité que tu trouves physiquement marquante. Tu la décrirais comment ?",
          hint: "È alto/a · Ha i capelli [couleur/texture] · Ha gli occhi [couleur] · Ha una corporatura [aggettivo] · È molto [aggettivo] · Si distingue per...",
        },
        {
          question: "Tu as les cheveux courts ou longs ? Tu les as toujours portés comme ça ?",
          hint: "Ho i capelli corti / lunghi / di media lunghezza · Li ho sempre portati così · Prima li portavo... · Li ho tagliati = je les ai coupés · Ho cambiato stile = j'ai changé de style",
        },
        {
          question: "La personne de ta famille avec l'apparence la plus distinctive, tu la décrirais comment ?",
          hint: "È molto alto/a · Ha i capelli particolari... · Ha una caratteristica fisica che si nota subito = une caractéristique physique qui se remarque tout de suite · Si distingue per...",
        },
      ],
      content: {
        introduction:
          "Marco voit des dizaines de personnes par jour dans son bar. Et quand tu veux lui parler de quelqu'un — un collègue, un ami, quelqu'un que tu as croisé — tu dois pouvoir le décrire. La description physique en italien repose sur deux verbes : essere pour ce qu'on est (è alto, è magra) et avere pour ce qu'on a (ha gli occhi verdi, ha i capelli ricci). Simple, logique, et avec le bon vocabulaire, tu peux dresser un portrait précis en trois phrases.",
        sections: [
          {
            title: "La statura e la corporatura",
            text: "**La taille (la statura)** :\n- alto/a → grand·e\n- basso/a → petit·e\n- di media statura → de taille moyenne\n\n**La silhouette (la corporatura)** :\n- magro/a → mince\n- grasso/a → gros·se\n- robusto/a → costaud·e, robuste\n- snello/a → svelte, élancé·e\n- in forma → en forme\n\n**Essere vs avere** :\nPour la stature et la silhouette, on utilise toujours **essere** :\n✅ È alto e magro. → il est grand et mince.\n✅ Sei di media statura? → tu es de taille moyenne ?\n❌ *Ha alto* — incorrect.\n\n**Accord des adjectifs** :\nIls s'accordent avec la personne décrite :\n- Mio fratello è robusto. / Mia sorella è robusta.\n- Sono snelli / snelle. (ils/elles sont svelt·e·s)",
            examples: [
              "📏 Marco è di media statura — né alto né basso, proprio nella media. → Marco est de taille moyenne — ni grand ni petit, vraiment dans la moyenne.",
              "💪 Mio fratello è molto robusto — va in palestra ogni giorno. → mon frère est très costaud — il va à la salle tous les jours.",
              "👗 È alta e snella — indossa sempre abiti eleganti. → elle est grande et svelte — elle porte toujours des vêtements élégants.",
              "🏋️ Da quando fa sport, è diventata più snella e in forma. → depuis qu'elle fait du sport, elle est devenue plus svelte et en forme.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'elle est petite' en italien ?",
                options: ['È piccola.', 'È bassa.', 'È corta.', 'Ha bassa statura.'],
                correctAnswer: 'È bassa.',
                explanation:
                  "Pour la taille d'une personne, l'adjectif est 'basso/a'. 'Piccolo/a' s'utilise plutôt pour les enfants (jeune, petit) ou les objets. 'Corto/a' = court·e (longueur d'un objet). → È bassa est la formule standard.",
              },
              {
                type: 'true_false',
                question: "Pour décrire la silhouette de quelqu'un (mince, costaud), on utilise 'avere'.",
                correctAnswer: false,
                explanation:
                  "Non — pour la stature et la silhouette (è alto, è magro, è robusto), on utilise 'essere'. On réserve 'avere' aux attributs : ha i capelli biondi, ha gli occhi verdi. La distinction essere/avere est fondamentale pour la description physique.",
              },
              {
                type: 'fill_in_blank',
                question: "'Mon frère est svelte et grand' : Mio fratello è ___ e alto.",
                correctAnswer: ['snello'],
                explanation:
                  "'Snello' = svelte, élancé. Accord au masculin singulier : snello (m.sg.) / snella (f.sg.) / snelli (m.pl.) / snelle (f.pl.). 'Magro' (mince) est aussi possible mais 'snello' implique une silhouette plus élancée.",
              },
            ],
          },
          {
            title: "I capelli — les cheveux",
            text: "Les cheveux se décrivent avec **avere** + **i capelli** + adjectif(s).\n\n**La couleur** — accord au pluriel masculin :",
            table: {
              headers: ['Français', 'Italiano (pl. masc.)', 'Exemple'],
              rows: [
                ['noirs', 'neri', 'Ha i capelli neri.'],
                ['blonds', 'biondi', 'Ha i capelli biondi.'],
                ['châtains', 'castani', 'Ha i capelli castani.'],
                ['roux', 'rossi', 'Ha i capelli rossi.'],
                ['blancs', 'bianchi', 'Ha i capelli bianchi.'],
                ['gris', 'grigi', 'Ha i capelli grigi.'],
                ['colorés / teints', 'tinti', 'Ha i capelli tinti di rosso.'],
              ],
            },
            examples: [
              "👱 Ha i capelli biondi e lisci — sembra proprio nordeuropea. → elle a les cheveux blonds et raides — elle a vraiment l'air nord-européenne.",
              "🌀 Ho i capelli ricci — li ho sempre avuti così, da quando ero bambino. → j'ai les cheveux bouclés — je les ai toujours eu comme ça, depuis que je suis enfant.",
              "🔴 Mia sorella ha i capelli rossi e lunghi — si distingue subito in mezzo alla folla. → ma sœur a les cheveux roux et longs — elle se remarque tout de suite dans la foule.",
              "⚪ Mio padre ha i capelli bianchi da quando aveva quarant'anni. → mon père a les cheveux blancs depuis qu'il a quarante ans.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'elle a les cheveux bouclés' ?",
                options: ['I capelli sono ricci.', 'Ha i capelli ricci.', 'È ricci i capelli.', 'I capelli hanno ricci.'],
                correctAnswer: 'Ha i capelli ricci.',
                explanation:
                  "Pour les caractéristiques qu'on 'a', on utilise 'avere' : ha i capelli ricci, ha gli occhi verdi. C'est la structure standard. 'I capelli sono ricci' est grammaticalement possible mais moins naturel à l'oral.",
              },
              {
                type: 'fill_in_blank',
                question: "'J'ai les cheveux châtains et courts' : Ho i capelli ___ e corti.",
                correctAnswer: ['castani'],
                explanation:
                  "'Castani' = châtains (masc. pluriel). Accord : castano (m.sg.), castana (f.sg.), castani (m.pl.), castane (f.pl.). Attention à ne pas confondre avec 'chiari' (clairs) ou 'scuri' (foncés) qui décrivent l'intensité de la couleur.",
              },
              {
                type: 'true_false',
                question: "'Lisci' et 'ricci' décrivent la longueur des cheveux.",
                correctAnswer: false,
                explanation:
                  "'Lisci' (raides) et 'ricci' (bouclés) décrivent la texture, pas la longueur. Pour la longueur : corti (courts), lunghi (longs), di media lunghezza (mi-longs). Pour la texture : lisci (raides), ricci (bouclés), ondulati (ondulés), mossi (légèrement ondulés).",
              },
            ],
          },
          {
            title: "Gli occhi e i dettagli del viso",
            text: "**Les yeux (gli occhi)** :\nOn utilise aussi **avere** pour les yeux :\n- Ha gli occhi azzurri / verdi / marroni / neri / chiari / scuri.\n\n⚠️ 'Marroni' et 'nocciola' sont invariables — ce sont des noms de couleur utilisés comme adjectifs :\n✅ Ha gli occhi marroni. (pas *marrone*)\n✅ Ha gli occhi nocciola.\n\n**Palette complète** :\n- azzurri → bleus · verdi → verts\n- marroni → marrons · nocciola → noisette\n- neri → noirs · grigi → gris · chiari → clairs · scuri → foncés\n\n**Accessoires et détails** :\n- portare gli occhiali → porter des lunettes\n- avere la barba → avoir la barbe · avere i baffi → avoir la moustache\n- avere le lentiggini → avoir des taches de rousseur\n- avere un tatuaggio / un piercing → avoir un tatouage / un piercing\n\n**Âge apparent** :\n- sembra giovane / anziano/a → il/elle paraît jeune / âgé·e\n- Ha una trentina d'anni. → il/elle a environ trente ans.\n- Dimostra la sua età. → il/elle fait son âge.",
            examples: [
              "👀 Ha gli occhi verdi — si notano subito quando entra nel bar. → elle a les yeux verts — ils se remarquent tout de suite quand elle entre dans le bar.",
              "👓 Porta sempre gli occhiali da sole anche d'inverno — è il suo stile! → il porte toujours des lunettes de soleil même en hiver — c'est son style !",
              "🧔 Marco ha la barba corta e gli occhi marroni caldi. → Marco a une courte barbe et les yeux marrons chaleureux.",
              "🌟 Ha delle lentiggini sul naso — le stanno benissimo! → elle a des taches de rousseur sur le nez — ça lui va très bien !",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Pourquoi 'marroni' ne s'accorde-t-il pas ?",
                options: [
                  "Parce que gli occhi est toujours masculin",
                  "Parce que c'est un nom de couleur invariable",
                  "Parce que les yeux sont toujours au pluriel",
                  "Parce que c'est un emprunt à l'anglais",
                ],
                correctAnswer: "Parce que c'est un nom de couleur invariable",
                explanation:
                  "'Marroni' et 'nocciola' sont des noms utilisés comme adjectifs de couleur — ils sont invariables en genre. Même logique pour 'rosa', 'viola', 'arancione'. On dit ha gli occhi marroni (pas *marrono* ni *marronissima*).",
              },
              {
                type: 'fill_in_blank',
                question: "'Il porte des lunettes' : Porta gli ___.",
                correctAnswer: ['occhiali'],
                explanation:
                  "'Gli occhiali' = les lunettes (toujours au pluriel en italien, comme en français). 'Portare gli occhiali' = porter des lunettes. Ne pas confondre avec 'gli occhi' (les yeux).",
              },
              {
                type: 'true_false',
                question: "'Ha gli occhi azzurri' et 'I suoi occhi sono azzurri' sont deux formulations équivalentes.",
                correctAnswer: true,
                explanation:
                  "Les deux sont correctes et équivalentes. 'Ha gli occhi azzurri' (avere + partie du corps + adjectif) est plus naturelle à l'oral. 'I suoi occhi sono azzurri' (essere + adjectif) est plus formelle. En conversation, la première est quasi systématique.",
              },
            ],
          },
        ],
        conclusion:
          "Ottimo! Tu peux maintenant décrire une personne physiquement — sa taille, sa silhouette, ses cheveux et ses yeux. Les deux règles à ancrer : essere pour ce qu'on est (è alto, è magra), avere pour ce qu'on a (ha i capelli biondi, ha gli occhi verdi). Dans la prochaine sous-leçon, on passe à l'intérieur — le caractère, la personnalité, et les mots pour décrire quelqu'un au-delà de son apparence.",
      },
    },
    {
      id: '9_2',
      name: 'Le caractère et la personnalité',
      description:
        "Apprends les adjectifs de personnalité et les expressions pour parler du caractère de quelqu'un.",
      level: 'PARTIAL_TO_WELL',
      summary:
        "Adjectifs positifs : simpatico/a (sympa), gentile (invariable en genre), generoso/a, allegro/a (joyeux·se), curioso/a, intelligente (invariable), creativo/a, paziente (invariable), affidabile (invariable), onesto/a, divertente (invariable). Négatifs : timido/a, pigro/a, nervoso/a, antipatico/a, distratto/a, impulsivo/a, geloso/a, arrogante (invariable), egoista (invariable en genre — adjectifs en -ista). Accord : -o/-a pour les adjectifs en -o · invariables en genre pour les adjectifs en -e et -ista (seul le pluriel change). Intensifieurs : molto, abbastanza, un po', davvero, troppo. Sembrare pour les impressions.",
      chat_questions: [
        {
          question: "Tu te décrirais comment en trois adjectifs de personnalité ? Dis-le en italien.",
          hint: "Sono... · Mi considero... (je me considère...) · Di solito sono molto / abbastanza / un po' [aggettivo] · Penso di essere...",
        },
        {
          question: "Tu es plutôt paziente ou nervoso/a ? Dans quelles situations ça change ?",
          hint: "Di solito sono paziente / nervoso/a · Ma quando... divento... · Con il traffico = avec la circulation · Al lavoro = au travail · In famiglia = en famille · Dipende dalla situazione",
        },
        {
          question: "Il y a un trait de caractère que tu aimerais améliorer chez toi ?",
          hint: "Vorrei essere più... · Sono a volte troppo... · È difficile per me essere... · Ci sto lavorando = j'y travaille · Lo ammetto = je l'admets",
        },
        {
          question: "La personne la plus simpatica que tu connaisses — qui c'est et pourquoi ?",
          hint: "La persona più simpatica che conosco è... · È sempre di buon umore = toujours de bonne humeur · È generosa / divertente / allegra · Mette a proprio agio = met à l'aise",
        },
        {
          question: "Si un ami devait te décrire à quelqu'un, qu'est-ce qu'il dirait selon toi ?",
          hint: "Credo che direbbe... · Probabilmente direbbe che sono... · I miei amici mi definiscono... = mes amis me définissent comme... · Forse direbbe anche che sono un po'...",
        },
      ],
      content: {
        introduction:
          "Décrire l'extérieur, c'est bien. Mais c'est le caractère qui fait vraiment la différence — c'est ce que Marco retient de ses clients, de ses amis, de toi. La personnalité en italien suit les mêmes règles d'accord que la description physique : les adjectifs s'accordent avec la personne. Et comme en français, on peut nuancer avec molto, un po' ou abbastanza. On commence par les traits positifs — puis les nuances et les moins flatteurs.",
        sections: [
          {
            title: "I tratti positivi — les traits positifs",
            text: "**Règle d'accord** :\n- Adjectifs en **-o** : accord complet → simpatico / simpatica / simpatici / simpatiche\n- Adjectifs en **-e** : invariables en genre, changent au pluriel → gentile / gentile / gentili\n\nVoici les adjectifs positifs les plus courants :",
            table: {
              headers: ['Masc.', 'Fém.', 'Traduction', 'Note'],
              rows: [
                ['simpatico', 'simpatica', 'sympa, agréable', 'le plus courant'],
                ['gentile', 'gentile', 'gentil·le', 'invariable en genre'],
                ['generoso', 'generosa', 'généreux·se', ''],
                ['allegro', 'allegra', 'joyeux·se', 'aussi : de bonne humeur'],
                ['curioso', 'curiosa', 'curieux·se', ''],
                ['intelligente', 'intelligente', 'intelligent·e', 'invariable en genre'],
                ['creativo', 'creativa', 'créatif·ive', ''],
                ['paziente', 'paziente', 'patient·e', 'invariable en genre'],
                ['affidabile', 'affidabile', 'fiable', 'invariable en genre'],
                ['onesto', 'onesta', 'honnête', ''],
                ['divertente', 'divertente', 'amusant·e', 'invariable en genre'],
              ],
            },
            examples: [
              "😊 Marco è simpaticissimo — mette a proprio agio tutti i clienti dal primo minuto. → Marco est adorablement sympa — il met à l'aise tous les clients dès la première minute.",
              "🤝 Il mio collega è molto affidabile — posso sempre contare su di lui. → mon collègue est très fiable — je peux toujours compter sur lui.",
              "🎨 Tua sorella è davvero creativa — ha un gusto unico per tutto. → ta sœur est vraiment créative — elle a un goût unique pour tout.",
              "😄 È sempre allegra anche nei momenti difficili — è contagioso! → elle est toujours joyeuse même dans les moments difficiles — c'est contagieux !",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle est la forme féminine de 'intelligente' ?",
                options: ['intelligenta', 'intelligente', 'intelligenti', 'intelligentea'],
                correctAnswer: 'intelligente',
                explanation:
                  "'Intelligente' est un adjectif en -e → invariable en genre : un uomo intelligente / una donna intelligente. Il change seulement au pluriel : degli uomini intelligenti / delle donne intelligenti.",
              },
              {
                type: 'fill_in_blank',
                question: "'Elle est très généreuse' : È molto ___.",
                correctAnswer: ['generosa'],
                explanation:
                  "'Generoso' est un adjectif en -o → accord complet : generoso (m.sg.) / generosa (f.sg.) / generosi (m.pl.) / generose (f.pl.). Pour une femme : è molto generosa. Pour un homme : è molto generoso.",
              },
              {
                type: 'true_false',
                question: "'Simpatico' exprime une chaleur humaine plus forte que 'gentile'.",
                correctAnswer: true,
                explanation:
                  "Oui. 'Simpatico' (sympa, chaleureux, agréable) décrit une qualité de contact plus chaleureuse que 'gentile' (gentil, poli, aimable). Un inconnu peut être 'gentile' sans être 'simpatico'. Marco, lui, est les deux !",
              },
            ],
          },
          {
            title: "I tratti negativi e le sfumature",
            text: "**Les traits moins positifs** :\n- timido/a → timide\n- pigro/a → paresseux·se\n- nervoso/a → nerveux·se\n- antipatico/a → antipathique\n- distratto/a → distrait·e\n- impulsivo/a → impulsif·ive\n- geloso/a → jaloux·se\n- noioso/a → ennuyeux·se\n- arrogante → arrogant·e *(invariable en genre)*\n- egoista → égoïste *(invariable en genre)*\n\n⚠️ **Les adjectifs en -ista sont invariables en genre** :\n✅ È egoista. (lui ET elle)\n❌ *È egoisto / egoistia* — incorrect.\nMême règle pour : ottimista, pessimista, idealista...\n\n**Nuancer avec des adverbes** :\n- molto → très · abbastanza → assez · un po' → un peu\n- davvero → vraiment · troppo → trop · non molto → pas très\n\n**Exemples de nuances** :\n- È un po' timido, ma molto gentile. → il est un peu timide mais très gentil.\n- Abbastanza paziente, ma a volte nervoso. → assez patient, mais parfois nerveux.\n- Non è antipatico — è solo timido. → il n'est pas antipathique, il est juste timide.",
            examples: [
              "🙈 All'inizio ero molto timido, adesso parlo con tutti senza problemi. → au début j'étais très timide, maintenant je parle avec tout le monde sans problèmes.",
              "😤 Non sopporto le persone arroganti — per fortuna non ce ne sono molte. → je ne supporte pas les gens arrogants — heureusement il n'y en a pas beaucoup.",
              "⚡ È un po' impulsiva — a volte agisce senza pensare. → elle est un peu impulsive — parfois elle agit sans réfléchir.",
              "😴 Sono un po' pigro il lunedì mattina — è normale no? → je suis un peu paresseux le lundi matin — c'est normal non ?",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on correctement 'elle est égoïste' ?",
                options: ['È egoistia.', 'È egoisto.', 'È egoista.', 'È egoiste.'],
                correctAnswer: 'È egoista.',
                explanation:
                  "'Egoista' est invariable en genre : un uomo egoista / una donna egoista (même forme). C'est la règle de tous les adjectifs en -ista : ottimista, pessimista, idealista, egoista. Seul le pluriel change : egoisti (m.pl.) / egoiste (f.pl.).",
              },
              {
                type: 'fill_in_blank',
                question: "'Il est assez distrait' : È ___ distratto.",
                correctAnswer: ['abbastanza'],
                explanation:
                  "'Abbastanza' = assez, plutôt. L'intensifieur se place avant l'adjectif : è abbastanza distratto, è molto gentile, è un po' timido, è davvero simpatico. 'Abbastanza' peut aussi signifier 'suffisamment' selon le contexte.",
              },
              {
                type: 'true_false',
                question: "Les adjectifs en -ista comme 'egoista' s'accordent normalement en genre.",
                correctAnswer: false,
                explanation:
                  "Faux. Les adjectifs en -ista sont invariables en genre : egoista, ottimista, pessimista — ils ne changent pas entre masculin et féminin. Ils ne changent qu'au pluriel : egoisti (m.pl.) / egoiste (f.pl.).",
              },
            ],
          },
          {
            title: "Sembrare et structures pour décrire",
            text: "**Sembrare** (paraître, sembler) pour les impressions :\nQuand on ne connaît pas encore bien quelqu'un :\n- Sembra molto simpatico. → il/elle a l'air très sympa.\n- Non sembra arrogante — sembra solo timida. → il/elle n'a pas l'air arrogant·e — il/elle a juste l'air timide.\n- Sembra una persona affidabile. → il/elle semble être quelqu'un de fiable.\n\n**Parler de soi** :\n- Sono una persona... → je suis quelqu'un de...\n- Tendo ad essere... → j'ai tendance à être...\n- Di solito sono... → en général je suis...\n- A volte posso essere... → parfois je peux être...\n\n**La nuance essere / sembrare** :\n- Sembra timido. (impression — on ne le connaît pas bien)\n- È timido. (fait établi — on le connaît)\n\n**Une même chose, deux sens** :\n'nervoso' peut désigner un trait de caractère OU un état du moment :\n- È una persona nervosa. → c'est quelqu'un de nerveux. (trait habituel)\n- Oggi è nervoso. → aujourd'hui il est nerveux. (état du moment)\n\n**Faire un compliment** :\n- Sei molto simpatico/a! · Hai un carattere bellissimo.\n- Sei una persona speciale. · Hai una personalità unica!",
            examples: [
              "🤔 Sembra timida, ma quando la conosci è la persona più divertente del gruppo. → elle a l'air timide, mais quand tu la connais c'est la personne la plus amusante du groupe.",
              "💬 Di solito sono paziente, ma con il traffico divento nervoso — lo ammetto! → en général je suis patient, mais avec la circulation je deviens nerveux — je l'admets !",
              "✨ Sei la persona più generosa che conosca — grazie di tutto. → tu es la personne la plus généreuse que je connaisse — merci pour tout.",
              "👥 Nel lavoro tendo ad essere molto preciso, nella vita privata sono più rilassato. → au travail j'ai tendance à être très précis, dans ma vie privée je suis plus détendu.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Pour exprimer une impression sur quelqu'un qu'on connaît peu, on utilise :",
                options: ['essere', 'avere', 'sembrare', 'stare'],
                correctAnswer: 'sembrare',
                explanation:
                  "'Sembrare' = paraître, sembler — s'utilise pour les impressions : 'sembra gentile' (il/elle a l'air gentil·le). 'Essere' exprime un fait établi : 'è gentile' (il/elle est gentil·le — on le sait avec certitude). La distinction est fine mais naturelle.",
              },
              {
                type: 'fill_in_blank',
                question: "'En général je suis patient' : ___ sono paziente.",
                correctAnswer: ['Di solito', 'di solito'],
                explanation:
                  "'Di solito' = en général, d'habitude. Autres : a volte (parfois), spesso (souvent), di rado (rarement), quasi sempre (presque toujours). Ces expressions de fréquence se placent en début ou en milieu de phrase.",
              },
              {
                type: 'true_false',
                question: "'È nervoso' peut décrire à la fois un trait de caractère permanent et un état momentané.",
                correctAnswer: true,
                explanation:
                  "Oui, le contexte fait la différence. 'È una persona nervosa' (trait habituel) ≠ 'Oggi è nervoso' (état du moment). L'intonation et le contexte permettent de distinguer les deux usages — comme en français avec 'il est nerveux'.",
              },
            ],
          },
        ],
        conclusion:
          "Bene! Tu maîtrises maintenant les adjectifs de personnalité positifs et négatifs, avec leurs accords et leurs nuances. Deux pièges à garder en tête : 'egoista' et les adjectifs en -ista sont invariables en genre, et 'sembrare' s'utilise pour les impressions. Dans la dernière sous-leçon, on assemble tout — physique + personnalité — pour faire de vraies descriptions complètes et nuancées.",
      },
    },
    {
      id: '9_3',
      name: 'Révision des descriptions',
      description:
        "Exercices de consolidation pour décrire des personnes de façon naturelle et variée.",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Révision complète : description physique (statura, capelli, occhi) + personnalité (aggettivi positivi/negativi + accord). Structures combinées : È alto e simpatico · Ha i capelli biondi e sembra timida. Comparatifs : più [adj] di (plus... que), meno [adj] di (moins... que), [adj] come / tanto [adj] quanto (aussi... que). Superlatifs : il/la più [adj] di (relatif), [adj]-issimo/a (absolu). Portrait complet : identification → physique → carattere → impressione generale.",
      chat_questions: [
        {
          question: "Décris-moi quelqu'un que tu aimes bien — d'abord physiquement (taille, cheveux, yeux), puis son caractère avec au moins deux adjectifs. Ensuite dis-moi si les gens font souvent des erreurs sur ta personnalité à première vue, et comment tu te décrirais toi-même en deux adjectifs.",
          hint: "È [statura] · Ha i capelli [couleur/texture] · Ha gli occhi [couleur] · Di carattere è... e anche... · Spesso la gente pensa che io sia... · In realtà sono... · Sembro [aggettivo] ma in realtà... · Le apparenze ingannano",
        },
      ],
      content: {
        introduction:
          "Dans cette révision, on ne fait pas la liste du vocabulaire — on l'utilise. On va apprendre à assembler une description complète, à comparer deux personnes, et à faire des portraits nuancés qui vont au-delà des adjectifs isolés. C'est là que la langue prend tout son sens : quand tu peux parler de quelqu'un de façon vivante et précise.",
        sections: [
          {
            title: "Assemblare una descrizione completa",
            text: "**Combiner physique et personnalité** :\nL'ordre naturel : identification → physique → caractère → impression générale.\n\n**Connecteurs** :\n- e → et (pour accumuler)\n- ma → mais (pour nuancer)\n- però → mais, cependant\n- anche → aussi · invece → en revanche\n\n**Éviter la répétition** :\nOn peut enchaîner plusieurs adjectifs avec 'e' sans répéter le verbe :\n- È alto, snello e molto simpatico. (pas besoin de répéter 'è')\n- Ha i capelli biondi, lisci e lunghi. (pas besoin de répéter 'ha')\n\n**Impression générale** :\n- Nel complesso è una persona ottima. → dans l'ensemble c'est une excellente personne.\n- È difficile da descrivere — è una persona unica. → c'est difficile à décrire — c'est quelqu'un d'unique.\n- È il tipo di persona con cui ti senti subito a tuo agio. → c'est le genre de personne avec qui tu te sens tout de suite à l'aise.",
            examples: [
              "📝 È una donna di media statura, ha i capelli castani e ricci e gli occhi verdi. Di carattere è molto allegra e generosa — tutti la adorano.",
              "👨 Il mio capo è alto, robusto, ha i capelli grigi corti. Sembra severo, ma in realtà è abbastanza paziente e molto affidabile.",
              "💁 Mia cugina è bionda, alta, con gli occhi azzurri. È simpaticissima ma a volte un po' troppo impulsiva — dice sempre quello che pensa.",
              "🤵 Il nuovo collega? Sembra timido, parla poco. Ma quando lo conosci è davvero divertente e creativo.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle formulation est la plus naturelle pour décrire les yeux et les cheveux ?",
                options: [
                  'Ha i capelli neri. Ha gli occhi verdi.',
                  'Ha i capelli neri e gli occhi verdi.',
                  'Ha i capelli neri, ha anche gli occhi verdi.',
                  'I capelli neri e gli occhi verdi.',
                ],
                correctAnswer: 'Ha i capelli neri e gli occhi verdi.',
                explanation:
                  "La façon la plus fluide est d'enchaîner avec 'e' et d'omettre le deuxième 'ha' : 'ha i capelli neri e gli occhi verdi'. C'est plus élégant que de répéter le verbe. La même règle s'applique avec essere : è alto, snello e simpatico.",
              },
              {
                type: 'fill_in_blank',
                question: "'Il a l'air sévère, ___ en réalité il est gentil' : Sembra severo, ___ in realtà è gentile.",
                correctAnswer: ['ma', 'però'],
                explanation:
                  "'Ma' et 'però' signifient tous les deux 'mais'. 'Ma' est plus courant et direct, 'però' est plus emphatique et se place souvent après une virgule. Les deux sont corrects ici.",
              },
              {
                type: 'true_false',
                question: "En italien, on peut enchaîner plusieurs adjectifs avec 'e' sans répéter 'essere' ou 'avere'.",
                correctAnswer: true,
                explanation:
                  "Oui : 'È alto, snello e simpatico' (essere non répété). 'Ha i capelli biondi, lisci e lunghi' (avere non répété). C'est naturel et fluide, et c'est exactement comme ça qu'on décrit quelqu'un à l'oral en italien.",
              },
            ],
          },
          {
            title: "Il comparativo e il superlativo",
            text: "**Comparer deux personnes** :",
            table: {
              headers: ['Degré', 'Structure', 'Exemple'],
              rows: [
                ['Plus... que', 'più [adj] di', 'È più alto di me.'],
                ['Moins... que', 'meno [adj] di', 'Sono meno timido di prima.'],
                ['Aussi... que', '[adj] come', 'È simpatico come te.'],
                ['Aussi... que (insistance)', 'tanto [adj] quanto', 'È tanto generosa quanto gentile.'],
                ['Le plus (relatif)', 'il/la più [adj] di', 'È la più gentile del gruppo.'],
                ['Le moins (relatif)', 'il/la meno [adj] di', 'È il meno timido di tutti.'],
                ['Très (absolu)', '[adj]-issimo/a', 'È simpaticissimo.'],
              ],
            },
            examples: [
              "🏆 Marco è il barista più simpatico di Firenze — lo dicono tutti! → Marco est le barman le plus sympa de Florence — tout le monde le dit !",
              "⚖️ Sei più paziente di me — io divento nervoso quasi subito. → tu es plus patient que moi — moi je deviens nerveux presque tout de suite.",
              "✨ È gentilissima — non ho mai conosciuto nessuno così disponibile. → elle est extrêmement gentille — je n'ai jamais connu quelqu'un d'aussi disponible.",
              "🤔 È meno arrogante di quanto sembri — bisogna conoscerlo meglio. → il est moins arrogant qu'il n'y paraît — il faut mieux le connaître.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'elle est plus créative que lui' ?",
                options: [
                  'È più creativa di lui.',
                  'È più creativa che lui.',
                  'È creativa più di lui.',
                  'È più creativa come lui.',
                ],
                correctAnswer: 'È più creativa di lui.',
                explanation:
                  "Comparatif d'inégalité : 'più + adjectif + di' devant un pronom ou un nom. On utilise 'che' dans d'autres cas (comparaison entre deux adjectifs ou deux verbes : 'è più simpatico che intelligente'). Ici c'est 'di lui' car on compare deux personnes.",
              },
              {
                type: 'fill_in_blank',
                question: "'Il est très grand' (superlatif absolu) : È ___.",
                correctAnswer: ['altissimo'],
                explanation:
                  "Le superlatif absolu : radical + -issimo/-issima. Alto → alt- + issimo = altissimo (très grand). Attention : on supprime la voyelle finale avant d'ajouter -issimo : alto → altissimo (pas *altoissimo).",
              },
              {
                type: 'true_false',
                question: "'È il più bello del gruppo' et 'È bellissimo' expriment la même idée.",
                correctAnswer: false,
                explanation:
                  "'È il più bello del gruppo' = superlatif relatif (il est le plus beau comparé aux autres du groupe). 'È bellissimo' = superlatif absolu (il est très beau, sans comparaison). Ce sont deux degrés différents — le premier implique une comparaison, le second est absolu.",
              },
            ],
          },
          {
            title: "Il ritratto completo",
            text: "**Faire un portrait complet** :\nUn portrait réussi combine description physique, traits de caractère et une impression générale :\n\n1. *Identificazione* : qui est cette personne pour toi ?\n2. *Aspetto fisico* : statura, capelli, occhi, détails marquants\n3. *Carattere* : adjectifs + nuances + comportements concrets\n4. *Impressione* : ton ressenti, ce qui te frappe\n\n**Vocabulaire pour nuancer** :\n- a prima vista → à première vue\n- in realtà → en réalité\n- sotto sotto → au fond\n- con il tempo → avec le temps\n- man mano che lo/la conosci → au fur et à mesure qu'on le/la connaît\n- nel profondo → en profondeur\n\n**Expressions pour conclure un portrait** :\n- È una persona che ispira fiducia. → c'est quelqu'un qui inspire confiance.\n- Ha qualcosa di speciale — non so come spiegarlo. → il/elle a quelque chose de spécial.\n- È il tipo di persona con cui ti senti subito a tuo agio. → c'est le genre de personne avec qui tu te sens tout de suite à l'aise.\n- Non si può non volergli bene. → on ne peut pas ne pas l'aimer.",
            examples: [
              "🖼️ Marco è di media statura, robusto, con i capelli castani corti e gli occhi marroni caldi. È simpaticissimo, sempre allegro, generoso con tutti — è il tipo di persona che mette a proprio agio chiunque.",
              "👩 Mia cugina? Bionda, alta, sportiva. A prima vista sembra un po' riservata, ma sotto sotto è la più divertente di tutta la famiglia.",
              "👴 Mio nonno è basso, robusto, con i capelli completamente bianchi e uno sguardo simpatico. È la persona più paziente che conosca — non l'ho mai sentito arrabbiarsi.",
              "🤵 Il mio capo a prima vista sembra severo — alto, serio, parla poco. Con il tempo ho capito che è affidabilissimo e davvero generoso con il suo team.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Dans 'a prima vista', que signifie 'prima' ?",
                options: ['dernière', 'première', 'meilleure', 'seule'],
                correctAnswer: 'première',
                explanation:
                  "'A prima vista' = à première vue (litt. : à première vue). 'Prima' = premier·ère / avant. Expression très utilisée pour parler des impressions initiales : 'a prima vista sembra timido' = à première vue il a l'air timide. Contraire : 'con il tempo' (avec le temps).",
              },
              {
                type: 'fill_in_blank',
                question: "'Il y a quelque chose de spécial chez lui' : Ha qualcosa ___ speciale.",
                correctAnswer: ['di'],
                explanation:
                  "'Qualcosa di + adjectif' = quelque chose de... : qualcosa di speciale, qualcosa di bello, qualcosa di strano. La préposition 'di' est obligatoire entre 'qualcosa' et l'adjectif. Même structure avec 'niente di + adj' : niente di speciale (rien de spécial).",
              },
              {
                type: 'true_false',
                question: "Il est naturel d'utiliser 'sembra' pour une première impression et 'è' une fois qu'on connaît bien la personne.",
                correctAnswer: true,
                explanation:
                  "Exactement. 'Sembra timido' (il a l'air timide — impression) convient quand on connaît peu quelqu'un. 'È timido' (il est timide) exprime un fait établi après observation. Cette nuance sembra/è est très présente dans le parler naturel en italien.",
              },
            ],
          },
        ],
        conclusion:
          "Eccellente! 🎉 Tu peux maintenant faire un portrait complet en italien — physique et personnalité, comparatifs et superlatifs, impressions et réalités. C'est l'une des compétences les plus utilisées dans la conversation quotidienne : décrire quelqu'un à Marco, parler de ta famille, présenter un ami. Prochaine étape : les émotions et les sentiments — parce qu'après avoir décrit qui sont les gens, il faudra dire ce qu'on ressent !",
      },
    },
  ],
});
