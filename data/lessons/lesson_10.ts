// ~/data/lessons/lesson_10.ts
import { defineLesson } from '~/types/lessons/defineLesson';

export default defineLesson({
  id: 10,
  order: 10,
  name: 'La nourriture et les repas',
  description:
    "Apprends à commander au bar, à parler des repas italiens et à exprimer tes goûts alimentaires. Vocabulaire du café, de la table, des plats typiques, et la grammaire essentielle de 'mi piace / mi piacciono'.",
  chapter_id: 'premiers-pas',
  chapter_name: 'Premiers pas',
  sub_lessons: [
    {
      id: '10_1',
      name: 'Au bar — Boissons et petit-déjeuner',
      description:
        'Découvre le vocabulaire du bar italien : café, boissons, viennoiseries, et les formules pour commander poliment.',
      level: 'NOT_LEARNED_TO_PARTIAL',
      summary:
        "Le bar italien et la colazione. Les cafés : caffè / espresso (café court), cappuccino (café au lait mousseux), caffè macchiato (espresso + goutte de lait), caffè americano (café allongé), caffè corretto (espresso + grappa). Le petit-déjeuner : cornetto / brioche (croissant), toast, tramezzino (sandwich triangle). Les boissons : acqua (naturale / frizzante), succo di frutta, spremuta (jus pressé), tè, birra, vino. Commander : 'Vorrei un caffè, per favore' · 'Prendo un cappuccino' · 'Mi dà un cornetto?' · 'Quanto costa?' · 'Il conto, per favore'. Grammaire clé : vorrei (conditionnel de volere) = formule polie, plus douce que voglio.",
      chat_questions: [
        {
          question: "Tu es au bar avec Marco le matin. Qu'est-ce que tu commandes d'habitude au petit-déjeuner ?",
          hint: "Di solito prendo... · Vorrei un/una... · Mi piace molto il/la... · A colazione mangio... / bevo... · Non bevo caffè = je ne bois pas de café",
        },
        {
          question: "En France on fait souvent le café à la maison. En quoi le rituel du bar italien te semble différent ?",
          hint: "In Italia si va al bar per... · Si beve in piedi = on boit debout · È diverso perché... · In Francia invece... · Mi sembra che... = il me semble que...",
        },
        {
          question: "Tu préfères le café fort ou léger ? Tu l'aimes comment — noir, avec du lait, sucré ?",
          hint: "Preferisco il caffè... · Lo prendo amaro = je le prends sans sucre · con zucchero = avec du sucre · con il latte = avec du lait · corto (court) / lungo (allongé) / macchiato (tâché de lait)",
        },
        {
          question: "Marco te propose quelque chose à manger. Qu'est-ce que tu lui demandes s'il y a des options sans gluten ou végétariennes ?",
          hint: "C'è qualcosa senza glutine? · Sono vegetariano/a · Non mangio carne / pesce · Avete opzioni vegane? · Sono allergico/a a... = je suis allergique à...",
        },
        {
          question: "C'est l'heure de payer. Comment tu demandes l'addition et tu règles ?",
          hint: "Il conto, per favore · Quanto costa? · Quanto fa? = ça fait combien ? · Pago io = je paye · Facciamo alla romana = on partage · Posso pagare con carta? = je peux payer par carte ?",
        },
      ],
      content: {
        introduction:
          "Chaque matin, des dizaines de personnes passent au bar de Marco. Elles commandent, elles paient, elles repartent — souvent en moins de cinq minutes. Le bar est l'un des lieux les plus italiens qui soit : rapide, chaleureux, ritualisé. Et pour s'y sentir à l'aise, il faut maîtriser deux choses : le vocabulaire des boissons et des viennoiseries, et les formules pour commander sans hésiter. C'est exactement ce qu'on va apprendre ici.",
        sections: [
          {
            title: "Il caffè — le vocabulaire du café",
            text: "En Italie, 'un caffè' désigne par défaut un **espresso** — petit, fort, bu en quelques gorgées. Les variantes sont nombreuses :\n\n**Les cafés essentiels** :\n- caffè / espresso → café court et fort\n- cappuccino → espresso + lait mousseux chaud (uniquement le matin !)\n- caffè macchiato → espresso avec une goutte de lait\n- caffè latte → café au lait (grand verre)\n- caffè americano → espresso allongé à l'eau chaude\n- caffè corretto → espresso + une goutte d'alcool (grappa, sambuca)\n- caffè decaffeinato / deca → déca\n\n⚠️ **Règle culturelle importante** : le cappuccino se boit le matin. Commander un cappuccino après le repas du midi, c'est se trahir immédiatement comme touriste. Les Italiens trouvent ça bizarre — le lait chaud après un repas est considéré indigeste.\n\n**Personnaliser son café** :\n- amaro → sans sucre\n- con zucchero / dolce → sucré\n- macchiato caldo / freddo → avec lait chaud / froid\n- lungo → allongé · ristretto → très court et concentré",
            examples: [
              "☕ Ogni mattina Marco prepara una ventina di cappuccini prima delle nove — è l'ora di punta. → Chaque matin Marco prépare une vingtaine de cappuccinos avant neuf heures — c'est l'heure de pointe.",
              "🥛 'Un caffè macchiato caldo, amaro, per favore.' → 'Un café macchiato chaud, sans sucre, s'il vous plaît.'",
              "🌙 A cena, il cliente ha ordinato un cappuccino — Marco ha sorriso senza dire niente. → Au dîner, le client a commandé un cappuccino — Marco a souri sans rien dire.",
              "⚡ Il caffè ristretto è piccolo ma fortissimo — non è per i deboli di cuore! → Le ristretto est petit mais très fort — ce n'est pas pour les âmes sensibles !",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Un client commande 'un caffè'. Qu'est-ce que Marco lui sert par défaut ?",
                options: ['Un café allongé à la française', 'Un espresso court et fort', 'Un cappuccino', 'Un café au lait'],
                correctAnswer: 'Un espresso court et fort',
                explanation:
                  "En Italie, 'un caffè' = un espresso par défaut. Court, fort, en petite tasse. Le cappuccino, le caffè latte ou l'americano sont des variantes qu'on précise explicitement. Cette différence est fondamentale — un 'café' en France et un 'caffè' en Italie ne sont pas la même chose.",
              },
              {
                type: 'true_false',
                question: "Il est tout à fait normal en Italie de commander un cappuccino après le dîner.",
                correctAnswer: false,
                explanation:
                  "Non — le cappuccino est une boisson du matin en Italie. Les Italiens considèrent que le lait chaud après un repas copieux est lourd et indigeste. Après le déjeuner ou le dîner, on commande un caffè (espresso). Commander un cappuccino le soir signale immédiatement qu'on est étranger.",
              },
              {
                type: 'fill_in_blank',
                question: "'Un espresso sans sucre' : Un caffè ___.",
                correctAnswer: ['amaro'],
                explanation:
                  "'Amaro' signifie littéralement 'amer' — c'est le terme pour dire qu'on ne veut pas de sucre dans son café. Contraire : con zucchero ou dolce. 'Amaro' s'utilise aussi pour d'autres boissons : un succo amaro (un jus amer), un vino amaro.",
              },
            ],
          },
          {
            title: "La colazione — petit-déjeuner et boissons",
            text: "Au bar le matin, on boit mais on mange aussi. Le petit-déjeuner italien est rapide et sucré — très différent du modèle français.\n\n**À manger** :\n- cornetto / brioche → croissant (souvent fourré : alla crema, alla marmellata, al cioccolato, vuoto)\n- toast → pain de mie grillé (jambon/fromage)\n- tramezzino → sandwich triangle à la mie de pain blanche\n- pasta / pasticcino → viennoiserie, gâteau individuel\n- fetta di torta → tranche de tarte\n\n**Les autres boissons** :\n- acqua naturale / frizzante → eau plate / gazeuse\n- succo di frutta → jus de fruit (en brique)\n- spremuta → jus pressé (arancia, pompelmo, limone)\n- tè caldo / freddo → thé chaud / froid\n- latte → lait\n- bibita → soda (Coca-Cola, aranciata, limonata)\n- birra alla spina / in bottiglia → bière pression / en bouteille\n- vino rosso / bianco / rosé → vin rouge / blanc / rosé\n\n**Commander** :\n- **Vorrei** un cornetto alla crema. → je voudrais un croissant à la crème.\n- **Prendo** un cappuccino. → je prends un cappuccino.\n- **Mi dà** una spremuta d'arancia? → vous me donnez un jus d'orange pressé ?\n- **C'è** qualcosa di salato? → est-ce qu'il y a quelque chose de salé ?\n\n⚠️ **Vorrei vs Voglio** : 'Voglio' (je veux) existe mais sonne direct, presque brusque au bar. 'Vorrei' (conditionnel = je voudrais) est la formule polie standard — à utiliser systématiquement.",
            examples: [
              "🥐 'Buongiorno! Vorrei un cornetto al cioccolato e un cappuccino, per favore.' → 'Bonjour ! Je voudrais un croissant au chocolat et un cappuccino, s'il vous plaît.'",
              "🍊 La domenica mattina Marco prepara le spremute fresche — è una delle cose preferite dai clienti abituali. → Le dimanche matin Marco prépare des jus pressés frais — c'est une des choses préférées des habitués.",
              "🧃 'C'è succo di frutta alla pesca?' 'Sì, ce l'abbiamo.' → 'Vous avez du jus de pêche ?' 'Oui, on en a.'",
              "🥛 Di mattina molti italiani prendono solo un cappuccino e un cornetto — la colazione è veloce e si fa al bar, non a casa. → Le matin beaucoup d'Italiens prennent juste un cappuccino et un croissant — le petit-déjeuner est rapide et se fait au bar, pas à la maison.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Pourquoi préfère-t-on dire 'vorrei' plutôt que 'voglio' pour commander ?",
                options: [
                  "'Voglio' est incorrect grammaticalement",
                  "'Vorrei' est le conditionnel de politesse, moins direct",
                  "'Voglio' ne s'utilise qu'à l'écrit",
                  "C'est une règle régionale du nord de l'Italie",
                ],
                correctAnswer: "'Vorrei' est le conditionnel de politesse, moins direct",
                explanation:
                  "'Vorrei' est le conditionnel de 'volere' (vouloir). En italien comme en français, le conditionnel adoucit la demande : 'je voudrais' vs 'je veux'. 'Voglio un caffè' est grammaticalement correct mais peut sembler abrupt. 'Vorrei un caffè' est la norme polie dans un bar ou un restaurant.",
              },
              {
                type: 'fill_in_blank',
                question: "'Un jus d'orange pressé' : Una ___ d'arancia.",
                correctAnswer: ['spremuta'],
                explanation:
                  "'Spremuta' vient du verbe 'spremere' (presser, exprimer). C'est le jus fraîchement pressé, différent du 'succo di frutta' (jus en brique ou en bouteille). On dit 'una spremuta d'arancia' (orange), 'di pompelmo' (pamplemousse), 'di limone' (citron).",
              },
              {
                type: 'true_false',
                question: "Un 'cornetto vuoto' est un croissant fourré à la vanille.",
                correctAnswer: false,
                explanation:
                  "'Vuoto' signifie 'vide' — un cornetto vuoto est un croissant nature, sans garniture. Les cornetti fourrés se précisent : alla crema (crème pâtissière), alla marmellata (confiture), al cioccolato (chocolat), alla Nutella. Si tu ne précises rien, le bariste peut te demander : 'Vuoto o con la crema?'",
              },
            ],
          },
          {
            title: "Ordinare e pagare — commander et payer",
            text: "**Les formules essentielles au bar** :\n\n**Pour commander** :\n- Vorrei... / Prendo... / Mi dà...? → je voudrais... / je prends... / vous me donnez...?\n- Buongiorno! Un caffè, per favore. → formule minimale et parfaitement naturelle\n- Scusi! → pour appeler le bariste\n- Per me... → pour moi...\n- Anche per me. → pour moi aussi.\n\n**Pour demander le prix ou l'addition** :\n- Quanto costa? / Quanto fa? → combien ça coûte ? / ça fait combien ?\n- Il conto, per favore. → l'addition, s'il vous plaît.\n- Posso pagare con carta / in contanti? → je peux payer par carte / en espèces ?\n\n**Pour payer** :\n- Pago io. → c'est moi qui paye.\n- Paghiamo alla romana. → on partage (chacun paye sa part).\n- Offro io. → c'est ma tournée / je vous invite.\n- Tenga il resto. → gardez la monnaie.\n\n**Formules de politesse** :\n- Prego! → de rien / je vous en prie / voilà (en tendant quelque chose)\n- Grazie mille. → merci mille fois.\n- Arrivederci! / A presto! → au revoir / à bientôt !",
            examples: [
              "💳 'Il conto, per favore. Posso pagare con carta?' 'Certo, prego.' → 'L'addition, s'il vous plaît. Je peux payer par carte ?' 'Bien sûr, je vous en prie.'",
              "🗣️ 'Scusi, posso avere un bicchiere d'acqua frizzante?' 'Subito!' → 'Excusez-moi, je peux avoir un verre d'eau gazeuse ?' 'Tout de suite !'",
              "💶 'Quanto fa in tutto?' 'Quattro euro e cinquanta, grazie.' → 'Ça fait combien en tout ?' 'Quatre euros cinquante, merci.'",
              "🤝 'Offro io — sei mio ospite!' → 'C'est moi qui régale — tu es mon invité !'",
              "👋 Marco saluta sempre i clienti per nome quando escono: 'A domani, signora Rossi!' → Marco dit toujours au revoir aux clients par leur prénom quand ils partent : 'À demain, madame Rossi !'",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'on partage l'addition' en italien ?",
                options: ['Dividiamo il conto.', 'Paghiamo alla romana.', 'Pago io per tutti.', 'Il conto separato.'],
                correctAnswer: 'Paghiamo alla romana.',
                explanation:
                  "'Alla romana' est l'expression idiomatique pour partager une addition (chacun paye sa part). L'expression vient de Rome où cette pratique est culturellement bien établie. 'Dividiamo il conto' est aussi compris mais moins idiomatique. À noter : en Italie entre amis, il est aussi très courant que quelqu'un paye pour tout et que ça s'équilibre la prochaine fois.",
              },
              {
                type: 'true_false',
                question: "'Prego' se dit uniquement pour répondre à un remerciement.",
                correctAnswer: false,
                explanation:
                  "'Prego' est un mot très polyvalent en italien : (1) de rien / je vous en prie (réponse à grazie), (2) voilà / tenez (en tendant quelque chose), (3) je vous en prie / après vous (pour inviter à passer), (4) oui ? / vous désirez ? (pour inviter quelqu'un à parler). C'est l'un des mots italiens les plus utilisés.",
              },
              {
                type: 'fill_in_blank',
                question: "'Gardez la monnaie' : ___ il resto.",
                correctAnswer: ['Tenga'],
                explanation:
                  "'Tenga' est le subjonctif/impératif de politesse (lei) de 'tenere' (tenir, garder). 'Tenga il resto' = gardez la monnaie. C'est la formule standard pour laisser un pourboire. 'Tenere' signifie aussi 'garder' : 'tieni' (garde) avec tu, 'tenga' (gardez) avec lei formel.",
              },
            ],
          },
        ],
        conclusion:
          "Ottimo! Tu sais maintenant naviguer dans un bar italien — commander un café, choisir une viennoiserie, payer poliment. Ces formules te seront utiles dès le premier matin en Italie. Dans la prochaine leçon, on passe à table : la structure des repas italiens, les plats typiques, et la grammaire de 'mi piace' pour dire ce qu'on aime ou ce qu'on n'aime pas.",
      },
    },
    {
      id: '10_2',
      name: 'Les repas italiens — structure et plats',
      description:
        "Découvre la structure du repas italien, le vocabulaire des plats, et la grammaire de 'mi piace / mi piacciono' pour exprimer tes goûts.",
      level: 'PARTIAL_TO_WELL',
      summary:
        "Les repas italiens. La structure : colazione (petit-déjeuner, tôt et sucré), pranzo (déjeuner, repas principal), cena (dîner, plus léger). Le menu traditionnel : antipasto (entrée), primo piatto (pâtes/risotto/soupe), secondo piatto (viande/poisson), contorno (légumes d'accompagnement), dolce (dessert), caffè. Vocabulaire : pasta, riso, carne (manzo, pollo, maiale), pesce, verdure, frutta, pane, formaggio, uova. Grammaire clé : mi piace + singulier / mi piacciono + pluriel · ti piace? / le piace? (tu aimes ? / vous aimez ?) · Non mi piace per niente = je n'aime pas du tout.",
      chat_questions: [
        {
          question: "Quels plats italiens tu connais déjà et tu aimes ? Tu en manges souvent en France ?",
          hint: "Mi piace molto la/il... · Mangio spesso... · È il mio piatto preferito = c'est mon plat préféré · Non ho mai assaggiato... = je n'ai jamais goûté... · Conosco solo... = je connais seulement...",
        },
        {
          question: "En France, le déjeuner est souvent le repas principal. Est-ce pareil pour toi ? Et en Italie, c'est comment ?",
          hint: "In Italia il pranzo è... · Per me il pasto principale è... · A pranzo di solito mangio... · In Italia si mangia di più a pranzo / a cena · È diverso dalla Francia perché...",
        },
        {
          question: "Marco te propose de goûter un plat que tu n'as jamais essayé. Comment tu réagis ?",
          hint: "Volentieri! = volontiers · Non ho mai assaggiato... · Come si fa? = comment c'est fait ? · Di cosa è fatto? = c'est fait avec quoi ? · È piccante? = c'est épicé ? · Ha un sapore particolare? = ça a un goût particulier ?",
        },
        {
          question: "Y a-t-il des aliments que tu n'aimes vraiment pas ou que tu ne manges pas ? Tu les décrirais comment à Marco ?",
          hint: "Non mi piace per niente... · Non riesco a mangiare... = je n'arrive pas à manger... · Lo trovo troppo... = je le trouve trop... · Non sono abituato/a a... = je n'ai pas l'habitude de... · È una questione di texture / sapore",
        },
        {
          question: "Si tu devais choisir un seul repas italien pour toute une semaine, qu'est-ce que ce serait ?",
          hint: "Sceglierei... = je choisirais... · Mangierei... tutti i giorni = je mangerais... tous les jours · Non mi stancherei mai di... = je ne me lasserais jamais de... · È troppo difficile scegliere perché...",
        },
      ],
      content: {
        introduction:
          "Marco mange rarement seul. Quand il ferme le bar le midi, il s'installe souvent avec des amis ou des habitués pour un vrai repas. Parce qu'en Italie, manger n'est pas juste une nécessité — c'est un moment social, structuré, presque rituel. Pour participer à cette culture, il faut connaître les noms des plats, comprendre comment un repas s'organise, et surtout savoir dire ce qu'on aime. Ce dernier point repose sur une grammaire particulière que beaucoup de Français ratent : 'mi piace / mi piacciono'.",
        sections: [
          {
            title: "La struttura del pasto italiano",
            text: "Un repas italien traditionnel suit un ordre précis :\n\n**Les trois repas** :\n- **la colazione** → le petit-déjeuner (léger, souvent au bar, 7h-9h)\n- **il pranzo** → le déjeuner (repas principal, 13h-14h30)\n- **la cena** → le dîner (plus léger, 20h-21h30)\n\n**La structure du menu** :\n1. **l'antipasto** → l'entrée (charcuteries, bruschetta, légumes marinés)\n2. **il primo piatto** → le premier plat (pasta, risotto, zuppa — soupe)\n3. **il secondo piatto** → le plat principal (carne ou pesce)\n4. **il contorno** → le légume d'accompagnement (commandez-le séparément !)\n5. **il dolce** → le dessert\n6. **il caffè** → l'espresso pour finir\n\n⚠️ **Piège culturel** : en Italie, le contorno (légumes) ne vient pas automatiquement avec le secondo. Il faut le commander séparément. Si tu ne le précises pas, ton plat de viande arrive seul dans l'assiette.",
            examples: [
              "🍽️ 'Per primo prendo le tagliatelle al ragù, per secondo l'arrosto di vitello.' → 'En premier plat je prends les tagliatelles à la bolognaise, en plat principal le rôti de veau.'",
              "🥗 'E come contorno?' 'Patate al forno, per favore.' → 'Et comme accompagnement ?' 'Des pommes de terre au four, s'il vous plaît.'",
              "☕ In Italia la cena finisce quasi sempre con un caffè — il dolce viene prima. → En Italie le dîner se finit presque toujours par un café — le dessert vient avant.",
              "🕐 Marco chiude il bar all'una e mangia con calma — il pranzo è sacro. → Marco ferme le bar à une heure et mange tranquillement — le déjeuner est sacré.",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Dans un repas italien traditionnel, qu'est-ce qu'un 'primo piatto' ?",
                options: [
                  "L'entrée (charcuteries, bruschetta)",
                  "Le plat de pâtes, risotto ou soupe",
                  "Le plat de viande ou poisson",
                  "Le dessert",
                ],
                correctAnswer: "Le plat de pâtes, risotto ou soupe",
                explanation:
                  "Le 'primo piatto' est littéralement le 'premier plat' — il arrive après l'antipasto et consiste typiquement en pâtes, risotto ou soupe. Le 'secondo piatto' est ensuite la viande ou le poisson. Cette distinction primo/secondo n'existe pas vraiment dans la structure des repas français — c'est une spécificité italienne.",
              },
              {
                type: 'true_false',
                question: "En Italie, les légumes sont automatiquement servis avec la viande ou le poisson.",
                correctAnswer: false,
                explanation:
                  "Non — le 'contorno' (légumes d'accompagnement) doit être commandé séparément en Italie. C'est une différence importante avec les restaurants français où la garniture est souvent incluse. Si tu ne commandes pas de contorno, ton secondo arrivera seul. Cette logique s'applique même dans les trattorias familiales.",
              },
              {
                type: 'fill_in_blank',
                question: "'Le dîner' en italien : la ___.",
                correctAnswer: ['cena'],
                explanation:
                  "'La cena' = le dîner (repas du soir). 'Il pranzo' = le déjeuner. 'La colazione' = le petit-déjeuner. En Italie, la cena commence assez tard — rarement avant 20h, souvent vers 20h30-21h. Manger à 19h est perçu comme très tôt, presque 'à l'étrangère'.",
              },
            ],
          },
          {
            title: "Il vocabolario dei piatti — les plats et aliments",
            text: "**Les grandes catégories** :\n- **la pasta** → les pâtes (pluriel féminin en italien !)\n- **il riso / il risotto** → le riz / le risotto\n- **la carne** → la viande\n- **il pesce** → le poisson\n- **le verdure / i legumi** → les légumes\n- **la frutta** → les fruits\n- **il pane** → le pain\n- **il formaggio** → le fromage\n- **le uova** → les œufs\n- **l'olio d'oliva** → l'huile d'olive",
            table: {
              headers: ['Catégorie', 'Italien', 'Exemples typiques'],
              rows: [
                ['Viandes', 'le carni', 'manzo (bœuf), pollo (poulet), maiale (porc), agnello (agneau), vitello (veau)'],
                ['Poissons', 'i pesci', 'salmone (saumon), tonno (thon), branzino (bar), merluzzo (cabillaud), gamberi (crevettes)'],
                ['Pâtes', 'la pasta', 'spaghetti, penne, rigatoni, tagliatelle, fusilli, farfalle, lasagne'],
                ['Légumes', 'le verdure', 'pomodoro (tomate), zucchina (courgette), melanzana (aubergine), spinaci (épinards), patate (pommes de terre)'],
                ['Fromages', 'i formaggi', 'parmigiano (parmesan), mozzarella, gorgonzola, pecorino, ricotta'],
                ['Desserts', 'i dolci', 'tiramisù, panna cotta, gelato, cannolo, crostata (tarte)'],
              ],
            },
            examples: [
              "🍝 La pasta al pomodoro è uno dei piatti più semplici e più buoni della cucina italiana. → Les pâtes à la tomate sont l'un des plats les plus simples et les meilleurs de la cuisine italienne.",
              "🐟 Marco ordina spesso il branzino al forno il venerdì — è fresco e leggero. → Marco commande souvent du bar au four le vendredi — c'est frais et léger.",
              "🧀 In Italia il parmigiano si mette sulla pasta, ma mai sul pesce — è una regola non scritta. → En Italie on met du parmesan sur les pâtes, mais jamais sur le poisson — c'est une règle non écrite.",
              "🍨 'Per dolce prendo un gelato al pistacchio — non resisto!' → 'Pour le dessert je prends une glace à la pistache — je ne résiste pas !'",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'les pâtes' en italien ?",
                options: ['il pasta', 'la pasta', 'le paste', 'i pastai'],
                correctAnswer: 'la pasta',
                explanation:
                  "'La pasta' est féminin singulier en italien — même si en français on dit 'les pâtes' au pluriel. On dit 'la pasta è buona' (les pâtes sont bonnes) avec un verbe au singulier. 'Pasta' désigne aussi la pâte en général (pasta fresca = pâtes fraîches, pasta sfoglia = pâte feuilletée).",
              },
              {
                type: 'true_false',
                question: "En Italie, il est courant de mettre du parmesan râpé sur un plat de poisson.",
                correctAnswer: false,
                explanation:
                  "Non — c'est une règle gastronomique très respectée en Italie : le parmesan (et les fromages râpés en général) ne se mettent pas sur les plats de poisson ou de fruits de mer. Proposer du parmesan sur une pasta alle vongole (aux palourdes) est une hérésie culinaire pour un Italien. Le fromage va avec la viande, pas le poisson.",
              },
              {
                type: 'fill_in_blank',
                question: "'L'aubergine' en italien : la ___.",
                correctAnswer: ['melanzana'],
                explanation:
                  "'Melanzana' = l'aubergine (pluriel : le melanzane). C'est un légume central de la cuisine du sud de l'Italie : parmigiana di melanzane (gratin d'aubergines), pasta alla Norma (avec aubergines et ricotta salée). Attention à la prononciation : me-lan-ZA-na.",
              },
            ],
          },
          {
            title: "Mi piace / Mi piacciono — exprimer ses goûts",
            text: "C'est l'un des points grammaticaux les plus importants — et les plus piégeux pour un francophone.\n\n**La règle** :\n- **Mi piace** + singulier ou infinitif\n- **Mi piacciono** + pluriel\n\nEn réalité, 'piacere' signifie littéralement 'plaire'. Donc :\n- Mi piace la pizza. → La pizza me plaît. (= j'aime la pizza)\n- Mi piacciono le tagliatelle. → Les tagliatelles me plaisent. (= j'aime les tagliatelles)\n\nLe verbe s'accorde avec **ce qui plaît**, pas avec la personne.\n\n**Toutes les personnes** :\n- Mi piace/piacciono → à moi (j'aime)\n- Ti piace/piacciono → à toi (tu aimes)\n- Gli/Le piace/piacciono → à lui / à elle (il/elle aime)\n- Ci piace/piacciono → à nous (nous aimons)\n- Vi piace/piacciono → à vous (vous aimez)\n- Gli piace/piacciono → à eux/elles (ils/elles aiment)\n\n**Degrés d'intensité** :\n- Mi piace molto. → j'aime beaucoup.\n- Mi piace tantissimo / da morire → j'adore (litt. j'aime à en mourir)\n- Non mi piace. → je n'aime pas.\n- Non mi piace per niente / affatto. → je n'aime pas du tout.\n- Mi piace così così. → ça me plaît comme ci comme ça.\n- Non fa per me. → ce n'est pas pour moi.\n\n⚠️ **Erreur classique** : *Mi piacciono la pizza* — NON. Pizza est singulier → Mi piace la pizza.",
            examples: [
              "❤️ 'Ti piace il caffè?' 'Sì, mi piace moltissimo — lo bevo tre volte al giorno!' → 'Tu aimes le café ?' 'Oui, je l'adore — je le bois trois fois par jour !'",
              "🤔 'Ti piacciono gli spinaci?' 'Così così — non mi fanno impazzire.' → 'Tu aimes les épinards ?' 'Comme ci comme ça — ils ne me rendent pas fou.'",
              "😍 A Marco piacciono tantissimo i dolci — soprattutto il tiramisù. → Marco adore les sucreries — surtout le tiramisù.",
              "🙅 'Non mi piace per niente il fegato — non riesco proprio a mangiarlo.' → 'Je n'aime pas du tout le foie — je n'arrive vraiment pas à le manger.'",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on correctement 'j'aime les spaghetti' ?",
                options: ['Mi piace gli spaghetti.', 'Mi piacciono gli spaghetti.', 'Mi piacciono i spaghetti.', 'Mi piace spaghetti.'],
                correctAnswer: 'Mi piacciono gli spaghetti.',
                explanation:
                  "'Spaghetti' est pluriel → verbe au pluriel : mi piacciono. L'article correct pour 'spaghetti' (pluriel masculin commençant par 'sp') est 'gli' (pas 'i'). 'Gli' s'utilise devant les masculins pluriels commençant par s+consonne, z, gn, ps, x, y, i semi-vocalique.",
              },
              {
                type: 'true_false',
                question: "Dans 'mi piace la pasta', le verbe 'piace' est au singulier parce que le sujet grammatical est 'la pasta'.",
                correctAnswer: true,
                explanation:
                  "Exactement. En italien, 'piacere' fonctionne à l'envers du français : le sujet réel est la chose qui plaît (la pasta), pas la personne. 'Mi' est un complément indirect (à moi). Donc : mi piace la pizza (sujet = la pizza, sing.) mais mi piacciono le pizze (sujet = le pizze, plur.). C'est la clé pour ne plus se tromper.",
              },
              {
                type: 'fill_in_blank',
                question: "'Il/Elle aime le risotto' : ___ piace il risotto.",
                correctAnswer: ['Gli', 'Le', 'gli', 'le'],
                explanation:
                  "'Gli piace' = il aime (à lui ça plaît) · 'Le piace' = elle aime (à elle ça plaît). En italien parlé, 'gli' est souvent utilisé pour les deux genres. Dans un contexte formel ou écrit, 'le' pour elle, 'gli' pour lui. Les deux réponses sont donc acceptées.",
              },
            ],
          },
        ],
        conclusion:
          "Bravissimo! Tu connais maintenant la structure des repas italiens et le vocabulaire des principaux plats. Surtout, tu maîtrises 'mi piace / mi piacciono' — l'une des structures les plus utilisées dans la conversation quotidienne. Dans la dernière leçon de ce bloc, on consolide tout ça : commander au restaurant, exprimer des préférences plus nuancées, et parler de la cuisine comme un vrai Italien.",
      },
    },
    {
      id: '10_3',
      name: 'Révision — À table et exprimer ses goûts',
      description:
        "Révise et approfondie le vocabulaire du restaurant, les adjectifs gustatifs, et toutes les façons d'exprimer tes préférences alimentaires en italien.",
      level: 'WELL_LEARNED_REVIEW',
      summary:
        "Synthèse nourriture et repas. Au restaurant : il menù (la carte), ordinare (commander), il cameriere/la cameriera (le serveur/la serveuse), il conto (l'addition), la mancia (le pourboire), prenotare un tavolo (réserver une table). Adjectifs gustatifs : buono/a (bon), delizioso/a (délicieux), saporito/a (savoureux), dolce (sucré/doux), salato/a (salé), amaro/a (amer), piccante (épicé), leggero/a (léger), pesante (lourd), crudo/a (cru), cotto/a (cuit). Préférences : preferisco... (je préfère...) · È il mio piatto preferito (c'est mon plat préféré) · Non fa per me (ce n'est pas pour moi) · Mi fa impazzire (ça me rend fou/j'adore). Récap mi piace/piacciono avec toutes les personnes.",
      chat_questions: [
        {
          question: "On est au restaurant ce soir. Commande un antipasto, un primo et un secondo en utilisant 'vorrei' et 'mi piacerebbe'. Ensuite demande-moi comment est préparé mon plat signature et ce qu'il contient. Pour finir, décris-moi tes habitudes alimentaires habituelles en une ou deux phrases.",
          hint: "Vorrei come antipasto... · Per primo mi piacerebbe... · Per secondo... · Come si prepara? · Di cosa è fatto? · È piccante / leggero / pesante? · Di solito mangio... · A colazione mi piace... · Cerco di mangiare sano",
        },
      ],
      content: {
        introduction:
          "Ce soir, Marco t'emmène dans sa trattoria préférée — celle où il va quand il veut vraiment bien manger, loin du rush du bar. Autour d'une table, on ne commande pas juste de la nourriture : on exprime ses goûts, on pose des questions, on réagit, on compare. Cette leçon de révision t'équipe pour faire tout ça avec aisance — avec le vocabulaire du restaurant, les adjectifs pour décrire les saveurs, et une maîtrise complète de la structure 'mi piace'.",
        sections: [
          {
            title: "Al ristorante — vocabulaire et situation",
            text: "**Les personnes et objets** :\n- il cameriere / la cameriera → le serveur / la serveuse\n- il menù / la carta → le menu / la carte\n- il conto → l'addition\n- la mancia → le pourboire\n- il tavolo → la table\n- la prenotazione → la réservation\n\n**Les actions** :\n- prenotare un tavolo → réserver une table\n- ordinare → commander\n- chiedere il conto → demander l'addition\n- lasciare la mancia → laisser un pourboire\n- portare via / fare il doggy bag → emporter les restes\n\n**Phrases utiles au restaurant** :\n- Ho una prenotazione a nome... → j'ai une réservation au nom de...\n- Avete un tavolo per due / per quattro? → vous avez une table pour deux / quatre ?\n- Posso vedere il menù? → je peux voir la carte ?\n- Cosa consiglia? / Cosa mi consiglia? → qu'est-ce que vous conseillez ?\n- Come sono le specialità di oggi? → quelles sont les spécialités du jour ?\n- Il piatto è già incluso? → le plat est déjà inclus ?\n- Sono celiaco/a. → je suis cœliaque / intolérant·e au gluten.\n- Sono allergico/a alle noci / ai crostacei. → je suis allergique aux noix / aux crustacés.",
            examples: [
              "📞 'Buonasera, vorrei prenotare un tavolo per due persone per domani sera alle otto.' → 'Bonsoir, je voudrais réserver une table pour deux personnes pour demain soir à huit heures.'",
              "🍷 'Cosa ci consiglia questa sera?' 'Il risotto ai funghi porcini — è freschissimo, lo abbiamo fatto stamattina.' → 'Qu'est-ce que vous nous conseillez ce soir ?' 'Le risotto aux cèpes — il est tout frais, on l'a fait ce matin.'",
              "💸 In Italia la mancia non è obbligatoria ma è apprezzata — di solito il 10% del conto. → En Italie le pourboire n'est pas obligatoire mais est apprécié — habituellement 10% de l'addition.",
              "🌾 'Sono celiaca — c'è qualcosa senza glutine nel menù?' 'Sì, abbiamo pasta di riso e due secondi senza glutine.' → 'Je suis cœliaque — il y a quelque chose sans gluten dans le menu ?' 'Oui, on a des pâtes de riz et deux plats principaux sans gluten.'",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment demander au serveur ce qu'il recommande ?",
                options: [
                  "'Che cosa è buono?'",
                  "'Cosa consiglia?'",
                  "'Qual è il piatto migliore?'",
                  "'Cosa preferisce lei?'",
                ],
                correctAnswer: "'Cosa consiglia?'",
                explanation:
                  "'Cosa consiglia?' (qu'est-ce que vous conseillez ?) est la formule naturelle et polie. Elle utilise 'lei' implicite (forme de politesse). 'Che cosa è buono?' est compris mais moins élégant. 'Cosa preferisce lei?' demanderait la préférence personnelle du serveur, ce qui est une question différente.",
              },
              {
                type: 'fill_in_blank',
                question: "'J'ai une réservation au nom de Dupont' : Ho una prenotazione a ___ Dupont.",
                correctAnswer: ['nome'],
                explanation:
                  "'A nome di...' = au nom de... C'est la formule standard pour se présenter à l'accueil d'un restaurant avec une réservation. 'Ho una prenotazione a nome Dupont' ou 'a nome di Dupont' — les deux fonctionnent. Synonyme moins formel : 'Ho prenotato a nome Dupont.'",
              },
              {
                type: 'true_false',
                question: "En Italie, le pourboire (la mancia) est obligatoire et toujours inclus dans l'addition.",
                correctAnswer: false,
                explanation:
                  "Non — en Italie le pourboire n'est pas obligatoire et n'est pas systématiquement inclus dans l'addition (contrairement à certains pays). Il est courant de laisser quelques euros ou ~10% si le service était bon. Attention : parfois le 'coperto' (couvert — de 1 à 3€ par personne) est inclus dans l'addition ; ce n'est pas un pourboire.",
              },
            ],
          },
          {
            title: "Gli aggettivi del gusto — décrire les saveurs",
            text: "Pour réagir à un plat et exprimer ce qu'on ressent en mangeant, il faut les adjectifs du goût :",
            table: {
              headers: ['Français', 'Italiano', 'Exemple'],
              rows: [
                ['bon / bonne', 'buono / buona', 'È molto buono questo risotto!'],
                ['délicieux / délicieuse', 'delizioso / deliziosa', 'La panna cotta è deliziosa.'],
                ['savoureux / savoureuse', 'saporito / saporita', 'Il sugo è molto saporito.'],
                ['sucré / sucrée', 'dolce', 'È troppo dolce per i miei gusti.'],
                ['salé / salée', 'salato / salata', 'Il prosciutto è abbastanza salato.'],
                ['amer / amère', 'amaro / amara', "Il caffè amaro non fa per me."],
                ['épicé / épicée', 'piccante', 'La salsiccia è piccante — attenzione!'],
                ['léger / légère', 'leggero / leggera', 'La zuppa è leggera e fresca.'],
                ['lourd / lourde', 'pesante', 'La lasagna è buona ma un po\' pesante.'],
                ['cru / crue', 'crudo / cruda', 'Il carpaccio di manzo si mangia crudo.'],
                ['cuit / cuite', 'cotto / cotta', 'Preferisco il pesce ben cotto.'],
                ['frais / fraîche', 'fresco / fresca', 'La mozzarella è freschissima.'],
              ],
            },
            examples: [
              "😋 'È buonissimo — non ho mai mangiato una pasta così saporita!' → 'C'est délicieux — je n'ai jamais mangé des pâtes aussi savoureuses !'",
              "🌶️ 'Attenzione — il peperoncino è piccantissimo! Sei sicuro di volerlo?' → 'Attention — le piment est très épicé ! Tu es sûr de vouloir en mettre ?'",
              "⚖️ 'Com'è la zuppa?' 'Leggera e delicata — perfetta dopo un primo abbondante.' → 'Comment est la soupe ?' 'Légère et délicate — parfaite après un premier plat copieux.'",
              "🧀 'Il gorgonzola è troppo amaro per me — preferisco un formaggio più dolce.' → 'Le gorgonzola est trop amer pour moi — je préfère un fromage plus doux.'",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Comment dit-on 'c'est trop épicé pour moi' ?",
                options: [
                  'È troppo forte per me.',
                  'È troppo piccante per me.',
                  'È troppo salato per me.',
                  'È troppo amaro per me.',
                ],
                correctAnswer: 'È troppo piccante per me.',
                explanation:
                  "'Piccante' = épicé (qui pique). 'Forte' peut s'utiliser aussi (intense, fort en goût) mais 'piccante' est le terme précis pour la chaleur des épices. 'Salato' = salé · 'amaro' = amer. 'Troppo' = trop — très utile pour nuancer : è troppo piccante, è troppo dolce, è troppo pesante.",
              },
              {
                type: 'fill_in_blank',
                question: "'Les pâtes sont délicieuses' : La pasta è ___.",
                correctAnswer: ['deliziosa'],
                explanation:
                  "'La pasta' est féminin singulier → accord au féminin singulier : deliziosa. Si on dit 'i piatti sono deliziosi' (masculin pluriel), l'adjectif prend la forme -i. Rappel des accords : buono/buona/buoni/buone · delizioso/deliziosa/deliziosi/deliziose.",
              },
              {
                type: 'true_false',
                question: "'Dolce' signifie uniquement 'sucré' en italien.",
                correctAnswer: false,
                explanation:
                  "'Dolce' a plusieurs sens : (1) sucré (questo gelato è dolce), (2) doux/douce (una voce dolce = une voix douce, un carattere dolce = un caractère doux), (3) le dessert (comme nom : il dolce = le dessert). C'est un mot très polyvalent — le contexte indique le sens.",
              },
            ],
          },
          {
            title: "Récapitulatif — mi piace et préférences complètes",
            text: "**Tableau récapitulatif de 'piacere'** :\n\nRappel de la logique : le sujet de 'piacere' est la chose qui plaît, pas la personne. Le complément indirect (mi, ti, gli...) désigne la personne.\n\n**Structure** : [pronom indirect] + piace (sing.) / piacciono (pl.) + [ce qui plaît]\n\n| Pronom | Sens | Exemple |\n|--------|------|---------|\n| mi | à moi | Mi piacciono le olive. |\n| ti | à toi | Ti piace il vino? |\n| gli | à lui | Gli piace tantissimo il tiramisù. |\n| le | à elle | Le piace la cucina francesa. |\n| ci | à nous | Ci piacciono i frutti di mare. |\n| vi | à vous | Vi piace questo ristorante? |\n| gli | à eux/elles | Gli piacciono le tagliatelle. |\n\n**Exprimer des préférences plus fines** :\n- Preferisco... a / rispetto a... → je préfère... à...\n- È il mio piatto preferito. → c'est mon plat préféré.\n- Non fa per me. → ce n'est pas pour moi.\n- Mi fa impazzire! → j'adore ça ! (litt. ça me rend fou)\n- Lo mangerei tutti i giorni. → je pourrais en manger tous les jours.\n- Non ne posso più! → j'en ai assez ! / j'adore ça à la folie !\n- Mi lascia indifferente/a. → ça me laisse indifférent·e.\n\n**Avec l'infinitif** :\n- Mi piace cucinare. → j'aime cuisiner.\n- Non mi piace aspettare. → je n'aime pas attendre.\n- Le piace mangiare fuori. → elle aime manger dehors.",
            examples: [
              "🔄 'Ti piace di più la pizza o la pasta?' 'Preferisco la pasta — la mangerei tutti i giorni!' → 'Tu préfères la pizza ou les pâtes ?' 'Je préfère les pâtes — j'en mangerais tous les jours !'",
              "🤷 'Vi piace il sushi?' 'A me sì, mi fa impazzire! A lui invece lascia un po' indifferente.' → 'Vous aimez les sushis ?' 'Moi oui, j'adore ! Lui en revanche ça le laisse un peu indifférent.'",
              "👨‍🍳 A Marco piace molto cucinare — dice che è il suo modo di rilassarsi. → Marco aime beaucoup cuisiner — il dit que c'est sa façon de se détendre.",
              "🍋 'Non mi piace per niente il limone — lo trovo troppo acido.' → 'Je n'aime pas du tout le citron — je le trouve trop acide.'",
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: "Quelle phrase est correcte pour dire 'nous aimons les fruits de mer' ?",
                options: [
                  'Ci piace i frutti di mare.',
                  'Ci piacciono i frutti di mare.',
                  'Mi piacciono i frutti di mare.',
                  'Ci piacciamo i frutti di mare.',
                ],
                correctAnswer: 'Ci piacciono i frutti di mare.',
                explanation:
                  "'Ci' = à nous. 'I frutti di mare' est pluriel → piacciono. Donc : 'Ci piacciono i frutti di mare.' Erreur fréquente : utiliser 'mi' au lieu de 'ci' (mi = à moi seulement). 'Piacciamo' n'existe pas dans ce sens — c'est nous qui plaisons à quelqu'un, structure inverse.",
              },
              {
                type: 'fill_in_blank',
                question: "'J'aime cuisiner' : Mi ___ cucinare.",
                correctAnswer: ['piace'],
                explanation:
                  "Avec un infinitif (cucinare, mangiare, bere...), on utilise toujours 'piace' (singulier) — l'infinitif est grammaticalement singulier. Mi piace cucinare · mi piace mangiare bene · mi piace scoprire nuovi ristoranti. Jamais 'piacciono' avec un infinitif.",
              },
              {
                type: 'true_false',
                question: "On peut dire 'mi piace' suivi d'un infinitif pour exprimer qu'on aime faire quelque chose.",
                correctAnswer: true,
                explanation:
                  "Oui — 'mi piace + infinitif' est parfaitement correct et très courant : mi piace cucinare (j'aime cuisiner), mi piace ascoltare la musica (j'aime écouter de la musique), non mi piace aspettare (je n'aime pas attendre). L'infinitif est toujours traité comme singulier, donc toujours 'piace' (jamais 'piacciono' avec un infinitif).",
              },
            ],
          },
        ],
        conclusion:
          "Perfetto! 🎉 Tu peux maintenant commander au bar et au restaurant, décrire les saveurs, exprimer tes goûts et tes préférences avec précision. 'Mi piace / mi piacciono' n'a plus de secret pour toi. La nourriture est au cœur de la culture italienne — savoir en parler, c'est déjà comprendre une grande partie de l'Italie. La prochaine leçon t'emmènera du côté des actions quotidiennes et des verbes de mouvement : tout ce qu'on fait dans une journée avec Marco.",
      },
    },
  ],
});
