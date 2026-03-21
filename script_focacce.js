document.addEventListener('DOMContentLoaded', () => {

    // ── Tipi di focaccia: preset e processo ──────────────────────────────────
    const FOCACCIA_TYPES = {

        altaidro: {
            label: 'Focaccia ad Alta Idratazione',
            description: 'Ispirata alla "Fucking Focaccia" di Cooker Girl: impasto ad altissima idratazione (80–90%), open crumb pronunciato, superficie ricca di avvallamenti pieni d\'olio, crosta sottile e croccante. Richiede tecnica (stretch & fold, niente impastatrice) e maturazione lunga. Il risultato è spettacolare.',
            preset: { pezzi: 1, peso: 700, idro: 85, salePerc: 2.5, grassiPerc: 6, liev: 24, frigo: 18, gradi: 20 },
            isTeglia: true,
            noLievito: false,
            hasPatate: false,
            hasSalamoia: true,
            labelPezzi: 'Numero Teglie',
            labelPeso: 'Peso Impasto per Teglia (g)',
            tips: [
                'Farina: W 340–400 (manitoba pura o mix 80% 00 forte + 20% manitoba). Con idratazioni così alte serve una farina con almeno 13% di proteine.',
                'Non usare l\'impastatrice: la tecnica corretta è lo slap & fold (Rubaud method) a mano. Questo sviluppa il glutine senza surriscaldare l\'impasto.',
                'Aggiungi l\'acqua fredda (4°C) in 3 riprese: il freddo compensa il calore generato dall\'impastamento energico.',
                'Pieghe in ciotola ogni 30 min per le prime 2 ore (coil fold): l\'impasto passa da colloso e informe a liscio, elastico e pieno di bolle.',
                'Teglia: abbondante olio EVO sul fondo (4–5 cucchiai). Versa l\'impasto senza sgonfiare. Non stendere subito: lascia che si rilassi da solo per 30–60 min, poi allarga delicatamente con i polpastrelli ungendoli.',
                'Gli avvallamenti sono fondamentali: premi con decisione tutta la superficie con i polpastrelli, devono rimanere profondi. Riempiono di olio in cottura — è lì che sta il carattere della focaccia.',
                'Salamoia prima della cottura: 50 g acqua + 50 g olio EVO emulsionati, versati sopra abbondantemente.',
                'Cottura: 220–230°C, forno statico, griglia bassa per i primi 15 min (fondo croccante), poi sposta a metà. 20–25 min totali. La superficie deve essere dorata e irregolare.',
                'Sale grosso o fiocchi di sale Maldon sopra prima di infornare: essenziale.'
            ],
            timeline: [
                { icon: '🧊', label: 'Autolisi con acqua fredda', duration: '30–45 min', note: 'Mescola farina + 80% dell\'acqua fredda (4°C). Lascia riposare coperto. Il freddo è intenzionale: compenserà il calore dell\'impastamento energico.' },
                { icon: '🍳', label: 'Impastamento (Rubaud/slap & fold)', duration: '15–20 min', note: 'Aggiungi lievito disciolto nell\'acqua restante, poi sale. Impasta con tecnica slap & fold vigorosa per 10 min. Aggiungi olio a filo negli ultimi 5 min. L\'impasto è molto morbido: è corretto.' },
                { icon: '📈', label: 'Puntata con coil fold', duration: '2–3 ore', note: '4–5 serie di coil fold ogni 30 min. L\'impasto deve passare da colloso e piatto a liscio, elastico e con bolle visibili. Copri tra una serie e l\'altra.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '16–20 ore', note: 'In ciotola coperta a 4°C. La maturazione lenta sviluppa sapore complesso e rende l\'impasto più gestibile nonostante l\'alta idratazione.' },
                { icon: '🌡️', label: 'In teglia + acclimatazione', duration: '3–4 ore', note: 'Versa nella teglia abbondantemente unta. Lascia rilassare 30–60 min, poi stendi delicatamente con i polpastrelli ungendoli. Fai gli avvallamenti profondi. Copri e lascia lievitare.' },
                { icon: '💧', label: 'Salamoia + condimento', duration: '5 min', note: 'Emulsiona 50 g acqua + 50 g olio EVO. Versa abbondantemente sulla focaccia. Aggiungi sale grosso o Maldon. Opzionale: rosmarino fresco.' },
                { icon: '🔥', label: 'Cottura a 220–230°C', duration: '20–25 min', note: 'Forno statico. Primi 15 min griglia bassa (fondo croccante). Poi griglia media per dorare la superficie. La focaccia è pronta quando è dorata, irregolare e croccante.' }
            ]
        },

        genovese: {
            label: 'Focaccia Genovese',
            description: 'La fugassa: focaccia alta circa 2 cm, morbida e soffice con una superficie lucida, unta e leggermente croccante, coperta di salamoia (acqua + olio). Mollica alveolata e leggera. La ricetta autentica prevede un\'idratazione medio-alta, olio abbondante nell\'impasto e in teglia, e la salamoia versata prima della cottura che crea le caratteristiche fossette.',
            preset: { pezzi: 1, peso: 600, idro: 68, salePerc: 2.5, grassiPerc: 6, liev: 18, frigo: 12, gradi: 20 },
            isTeglia: true,
            noLievito: false,
            hasPatate: false,
            hasSalamoia: true,
            labelPezzi: 'Numero Teglie',
            labelPeso: 'Peso Impasto per Teglia (g)',
            tips: [
                'Farina: W 260–300 (farina 00 di forza media). Non serve farina fortissima: l\'impasto genovese non è ultra-idratato come quello ad alta idratazione.',
                'Olio EVO: deve essere buono. La focaccia genovese è praticamente un veicolo per l\'olio d\'oliva. Usa un extravergine delicato (Ligurie o Toscano leggero).',
                'Impasto: liscio e morbido, non appiccicoso. Non over-lavorarlo — non serve sviluppo estremo del glutine.',
                'Prima lievitazione in ciotola, poi in teglia abbondantemente unta (almeno 4 cucchiai di olio EVO). L\'impasto nella teglia deve riposare almeno 30 min prima di stendere.',
                'Fossette: premi con le dita tutta la superficie in modo deciso e uniforme. Le fossette devono essere profonde e rimangono aperte — se si chiudono, l\'impasto non è abbastanza lievitato.',
                'Salamoia (ricetta tradizionale): 1 parte acqua + 1 parte olio EVO + sale fino disciolto. Versala abbondantemente sulle fossette — deve riempirle. Questa è la firma della fugassa.',
                'Cottura: 200–210°C, forno statico, griglia bassa. 18–22 min. La superficie deve essere dorata e lucida, il fondo leggermente croccante. Non cuocere troppo: deve rimanere morbida dentro.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '10–12 min', note: 'Impasta farina + acqua + lievito. Aggiungi sale, poi olio in 2 riprese. Impasto liscio, morbido, leggermente unto. Non sovra-impastare.' },
                { icon: '📈', label: 'Puntata', duration: '1 ora', note: '1–2 pieghe in ciotola. Copri con pellicola. L\'impasto deve aumentare del 50%.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '10–14 ore', note: 'In ciotola coperta. La maturazione migliora il sapore e la leggerezza della mollica.' },
                { icon: '🌡️', label: 'In teglia', duration: '30 min riposo + 2 ore lievitazione', note: 'Versa nella teglia unta con abbondante olio. Stendi con le mani unte. Copri e lascia lievitare fino a che è gonfia.' },
                { icon: '👆', label: 'Fossette + salamoia', duration: '5 min', note: 'Premi con le dita tutta la superficie, fossette profonde e uniformi. Versa la salamoia (acqua + olio + sale) abbondantemente. Le fossette devono riempirsi.' },
                { icon: '🔥', label: 'Cottura a 200–210°C', duration: '18–22 min', note: 'Forno statico, griglia bassa. Superficie dorata e lucida, fondo leggermente croccante. Morbida dentro — non asciugare troppo.' }
            ]
        },

        recco: {
            label: 'Focaccia di Recco',
            description: 'Non è una focaccia lievitata: è una sfoglia sottilissima senza lievito, farcita con formaggio crescenza o stracchino fresco. Due strati di pasta tiratissima (quasi trasparenti), formaggio abbondante nel mezzo, olio EVO, sale. Cottura veloce ad altissima temperatura. Semplicissima negli ingredienti, tecnica nella stesura.',
            preset: { pezzi: 1, peso: 300, idro: 50, salePerc: 1.5, grassiPerc: 8, liev: 0, frigo: 0, gradi: 20 },
            isTeglia: false,
            noLievito: true,
            hasPatate: false,
            hasSalamoia: false,
            labelPezzi: 'Numero Teglie (ø 32 cm)',
            labelPeso: 'Peso Impasto totale per Teglia (g)',
            tips: [
                'Farina: 00 debole W 150–200 (la farina da dolci o la comune 00 del supermercato). Una farina forte renderebbe la sfoglia gommosa e impossibile da tirare sottile.',
                'Impasto: senza lievito. Solo farina + acqua + olio + sale. Mescola brevemente, lascia riposare 30 min coperto — il glutine si rilassa e la stesura diventa possibile.',
                'Il segreto è il riposo: non impastare a lungo, ma far riposare bene. Dopo 30 min l\'impasto è estensibile e quasi non si ritira.',
                'Stesura: su tela infarinata, stendi il primo disco finché è quasi trasparente (puoi leggere attraverso). Trasferisci sulla teglia unta. Non importa se si strappa leggermente: è rustico.',
                'Formaggio: crescenza o stracchino freschissimo (non squacquerone, troppo liquido). Distribuisci a cucchiaiate abbondanti su tutta la superficie dello strato inferiore.',
                'Secondo strato: ancora più sottile del primo. Sigilla i bordi pizzicandoli. Fai dei buchi irregolari con le dita sulla superficie (per fare uscire il vapore del formaggio).',
                'Cottura: forno al massimo (280–300°C se possibile), pietra refrattaria o teglia in ferro preriscaldata. 7–10 min. La sfoglia deve fare bolle e scurire in modo irregolare. Serve olio EVO a filo sopra prima di infornare e sale grosso.',
                'Si mangia caldissima, appena sfornata. Il formaggio deve essere ancora filante.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impasto rapido', duration: '5 min', note: 'Mescola farina + acqua + olio + sale fino a ottenere un panetto omogeneo. Non sviluppare il glutine: solo amalgamare. L\'impasto è sodo.' },
                { icon: '⏸️', label: 'Riposo fondamentale', duration: '30 min', note: 'Copri con pellicola a temperatura ambiente. Il glutine si rilassa completamente: senza questo riposo la sfoglia si ritirerebbe impossibile da stendere.' },
                { icon: '📐', label: 'Stesura primo strato', duration: '5–8 min', note: 'Su tela/tovagliolo infarinato. Tira il disco finché è quasi trasparente (ø 35–40 cm per teglia da 32 cm). Trasferisci nella teglia abbondantemente unta.' },
                { icon: '🧀', label: 'Farciture con formaggio', duration: '5 min', note: 'Distribuisci crescenza/stracchino a cucchiaiate abbondanti (150–180 g per teglia). Non coprire tutto: lascia 1 cm di bordo libero.' },
                { icon: '📐', label: 'Stesura secondo strato', duration: '5–8 min', note: 'Ancora più sottile del primo. Adagia sopra il formaggio. Sigilla i bordi pizzicando. Fai buchi irregolari con le dita sulla superficie. Olio EVO a filo + sale grosso.' },
                { icon: '🔥', label: 'Cottura a 280–300°C', duration: '7–10 min', note: 'Forno al massimo, pietra o teglia preriscaldata. La sfoglia deve gonfiarsi, fare bolle e scurire irregolarmente. Servire caldissima, formaggio filante.' }
            ]
        },

        schiacciata: {
            label: 'Schiacciata Toscana',
            description: 'La schiacciata toscana (chiamata anche ciaccia o focaccia toscana) è piatta, sottile (1–1,5 cm), con una crosta irregolare e croccante e pochissima mollica. Olio EVO abbondante, sale grosso in superficie, rosmarino opzionale. Impasto semplice con poco lievito e maturazione media. Diversa dalla focaccia genovese: più rustica, più secca, più croccante.',
            preset: { pezzi: 1, peso: 450, idro: 65, salePerc: 2.5, grassiPerc: 5, liev: 12, frigo: 8, gradi: 20 },
            isTeglia: true,
            noLievito: false,
            hasPatate: false,
            hasSalamoia: false,
            labelPezzi: 'Numero Teglie / Schiacciate',
            labelPeso: 'Peso Impasto (g)',
            tips: [
                'Farina: W 240–280 (farina 00 normale o 0). Non serve farina forte: la schiacciata deve rimanere friabile e croccante, non elastica e alveolata.',
                'Impasto più sodo rispetto alla focaccia genovese (idro 60–68%). È normale: deve essere lavorabile a mano senza appicciarsi.',
                'Lo spessore è fondamentale: stendi molto sottile, 1–1,5 cm max. Con il mattarello o a mano. Se si ritira, lascia riposare 10 min e riprova.',
                'Olio EVO: abbondante prima della cottura (non nell\'impasto in quantità eccessive). La schiacciata deve luccicare di olio in superficie.',
                'Sale grosso o sale fino generoso prima di infornare: è il condimento principale, non un dettaglio.',
                'Rosmarino: fresco, abbondante, pressato nell\'impasto prima della cottura. È opzionale ma caratteristico della versione più diffusa.',
                'Cottura: 220–230°C, forno statico, griglia bassa o media, 18–22 min. Deve essere dorata, croccante e leggermente irregolare. Non morbida: la schiacciata si raffredda croccante.',
                'Variante autunnale: schiacciata con l\'uva (schiacciata all\'uva), con chicchi di uva da vino rosso premuti nell\'impasto + zucchero. Tipica fiorentina di settembre.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '8–10 min', note: 'Impasto semplice: farina + acqua + lievito + sale + olio. Lavora fino a superficie liscia e non appiccicosa. Non serve lunga incordatura.' },
                { icon: '📈', label: 'Puntata', duration: '45 min', note: 'Copri con pellicola a T.A. L\'impasto deve aumentare del 40–50%.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '8–10 ore', note: 'In frigo coperto. Migliora il sapore e rende l\'impasto più estensibile.' },
                { icon: '🌡️', label: 'Acclimatazione + stesura', duration: '1 ora', note: 'Tira fuori dal frigo. Lascia acclimatare 30 min. Stendi sulla teglia unta o sulla pietra infarinata: spessore 1–1,5 cm, superficie irregolare.' },
                { icon: '🫒', label: 'Condimento', duration: '5 min', note: 'Olio EVO abbondante su tutta la superficie. Sale grosso generoso. Rosmarino fresco pressato nell\'impasto. Opzionale: olive nere o pomodorini.' },
                { icon: '🔥', label: 'Cottura a 220–230°C', duration: '18–22 min', note: 'Forno statico, griglia bassa o media. Dorata, croccante, leggermente irregolare. Si raffredda croccante.' }
            ]
        },

        pugliese: {
            label: 'Focaccia Pugliese (senza patate)',
            description: 'Focaccia pugliese nella versione senza patate nell\'impasto: più semplice e diretta rispetto alla barese classica, alta e morbida, con pomodorini ciliegino affondati nella superficie, olive nere, origano e olio EVO abbondante. Impasto ad alta idratazione, cottura in teglia di alluminio. La versione "pulita" del gusto pugliese.',
            preset: { pezzi: 1, peso: 650, idro: 72, salePerc: 2.5, grassiPerc: 5, liev: 18, frigo: 12, gradi: 20 },
            isTeglia: true,
            noLievito: false,
            hasPatate: false,
            hasSalamoia: false,
            labelPezzi: 'Numero Teglie',
            labelPeso: 'Peso Impasto per Teglia (g)',
            tips: [
                'Farina: semola rimacinata di grano duro al 100% o mix 50% semola + 50% farina 00. La semola dà il sapore caratteristico e la crosta leggermente più dorata e friabile.',
                'Olio EVO pugliese: abbondante sia nell\'impasto che in teglia che sopra i pomodorini. Non risparmiare: è il cuore del gusto.',
                'Pomodorini: ciliegino o datterino, tagliati a metà e premuti con decisione nell\'impasto durante la stesura in teglia. Il succo deve penetrare nell\'impasto — è il condimento principale.',
                'Le olive: nere al naturale (non in salamoia acida), denocciolate o no. Premi anche queste nell\'impasto come i pomodorini.',
                'Origano: secco e abbondante. Aggiungi sia sui pomodorini che sull\'impasto intorno.',
                'Sale grosso in superficie prima di infornare: essenziale.',
                'Cottura: teglia in alluminio, 210–220°C, griglia bassa, 25–30 min. Il fondo deve essere ben dorato e croccante, i pomodorini caramellati. Non avere fretta: la focaccia pugliese vuole cottura piena.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '12–15 min', note: 'Mescola semola/farina + acqua + lievito. Aggiungi sale poi olio. Con semola di grano duro l\'impasto è più sodo e meno appiccicoso del normale. Incorda bene.' },
                { icon: '📈', label: 'Puntata', duration: '1–2 ore', note: '2–3 pieghe in ciotola. L\'impasto cresce lentamente: la semola assorbe l\'acqua più lentamente della 00.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '12–16 ore', note: 'In ciotola coperta. Fondamentale con la semola: si idrata pienamente e l\'impasto diventa più estensibile.' },
                { icon: '🌡️', label: 'In teglia + lievitazione', duration: '2–3 ore', note: 'Versa nella teglia unta con olio EVO abbondante. Stendi con le mani unte. Copri e lascia lievitare fino a che è gonfia e piena di bolle.' },
                { icon: '🍅', label: 'Condimento', duration: '10 min', note: 'Affondi i pomodorini tagliati a metà (lato tagliato in giù) nell\'impasto con decisione. Olive, origano abbondante, sale grosso, filo d\'olio EVO generoso.' },
                { icon: '🔥', label: 'Cottura a 210–220°C', duration: '25–30 min', note: 'Teglia in alluminio, griglia bassa. Fondo croccante e dorato, pomodorini caramellati. Non avere fretta: vuole cottura completa.' }
            ]
        },

        barese: {
            label: 'Focaccia Barese (con patate)',
            description: 'La versione più ricca e tradizionale della focaccia pugliese: le patate lesse schiacciate nell\'impasto danno una morbidezza e una leggerezza straordinarie, oltre a un sapore più rotondo. Alta, soffice, con il fondo croccante per l\'olio in teglia. Pomodorini, olive, origano. Un classico immancabile della cucina barese.',
            preset: { pezzi: 1, peso: 750, idro: 68, salePerc: 2.5, grassiPerc: 5, liev: 18, frigo: 12, gradi: 20 },
            isTeglia: true,
            noLievito: false,
            hasPatate: true,
            hasSalamoia: false,
            labelPezzi: 'Numero Teglie',
            labelPeso: 'Peso Impasto totale per Teglia (g)',
            tips: [
                'Farine: mix 50% semola rimacinata + 50% farina 00. La semola dà sapore e colore; la 00 ammorbidisce la struttura che le patate renderebbero troppo densa da sola.',
                'Patate: lesse con la buccia, pelate e schiacciate al passapatate mentre sono ancora calde. Stendile su un vassoio e lascia raffreddare completamente prima di aggiungerle — non calde: cuocerebbero il lievito.',
                'Le patate sostituiscono parte dell\'acqua: se usi 30% di patate sulla farina, riduci l\'acqua di circa il 15–20%. L\'impasto deve risultare morbido ma non appiccicoso.',
                'L\'impasto con le patate è inizialmente grumoso: è normale. Dopo 5–8 min di impastamento si ammorbidisce e diventa liscio.',
                'Teglia in alluminio unta con olio EVO abbondante (fondo quasi coperto). Il fondo croccante e unto è la firma della focaccia barese — non risparmiare sull\'olio.',
                'Pomodorini: ciliegino tagliati a metà, affondati con decisione nell\'impasto (lato tagliato verso il basso). Il succo entra nell\'impasto durante la cottura.',
                'Cottura: 220°C, griglia bassa, 25–30 min. Il fondo deve sfrignare e dorarsi bene. Se il top si colora troppo in fretta, copri con alluminio per gli ultimi 5 min.'
            ],
            timeline: [
                { icon: '🥔', label: 'Prepara le patate', duration: '30 min', note: 'Lessa le patate con la buccia in acqua salata. Pela e schiaccia al passapatate mentre sono calde. Stendi su vassoio e lascia raffreddare completamente (importante: non aggiungerle calde).' },
                { icon: '🍳', label: 'Impastamento', duration: '12–15 min', note: 'Aggiungi le patate fredde alla farina. Sciogli il lievito in acqua e aggiungi. Impasta: i primi minuti è grumoso, poi si ammorbidisce. Aggiungi sale e olio. Deve risultare morbido e liscio.' },
                { icon: '📈', label: 'Puntata', duration: '1–2 ore', note: 'Copri con pellicola. L\'impasto con le patate è più tenero e lievita velocemente: controlla che non superi il raddoppio.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '12–16 ore', note: 'In frigo coperto. Sviluppa sapore e ammorbidisce ulteriormente l\'impasto.' },
                { icon: '🌡️', label: 'In teglia + lievitazione', duration: '2–3 ore', note: 'Teglia con abbondante olio EVO. Versa l\'impasto e stendi con le mani unte. Lievita fino a che è gonfia e alveolata.' },
                { icon: '🍅', label: 'Condimento', duration: '10 min', note: 'Pomodorini ciliegino a metà affondati nell\'impasto (taglio in giù). Olive nere. Origano generoso. Sale grosso. Olio EVO a filo abbondante.' },
                { icon: '🔥', label: 'Cottura a 220°C', duration: '25–30 min', note: 'Griglia bassa, forno statico. Il fondo deve sfrigolare e dorarsi (l\'olio in teglia lo frigge quasi). Pomodorini caramellati in superficie. Se il top scurisce troppo, copri con alluminio.' }
            ]
        },

        messinese: {
            label: 'Focaccia Messinese',
            description: 'La focaccia messinese (detta anche "pizza messinese") è una delle focacce più particolari d\'Italia: base alta e soffice, condita con tuma (formaggio fresco di pecora messinese, sostituibile con primo sale o ricotta salata fresca), acciughe sotto sale, pomodoro a pezzetti e origano. Cotta in teglia con olio EVO. Sapore intenso, contrasto tra il sale delle acciughe e la dolcezza della tuma.',
            preset: { pezzi: 1, peso: 600, idro: 65, salePerc: 2.0, grassiPerc: 4, liev: 16, frigo: 10, gradi: 20 },
            isTeglia: true,
            noLievito: false,
            hasPatate: false,
            hasSalamoia: false,
            labelPezzi: 'Numero Teglie',
            labelPeso: 'Peso Impasto per Teglia (g)',
            tips: [
                'Farina: 00 o 0 di forza media (W 260–300). Impasto semplice e diretto, non richiede farine ultra-forti.',
                'Sale nell\'impasto: usa poco (2% max) perché le acciughe e la tuma sono già molto sapide. Puoi scendere a 1,5% se usi acciughe sotto sale abbondanti.',
                'Tuma: il formaggio originale è la tuma messinese, un formaggio fresco di pecora a pasta molle. Fuori dalla Sicilia: sostituisci con primo sale fresco (non stagionato) tagliato a pezzetti, o con ricotta salata fresca grattugiata grossolanamente. La mozzarella non è un sostituto appropriato: cambia completamente il profilo del gusto.',
                'Acciughe sotto sale: dissalale bene sotto acqua corrente, asciugale. Usale intere o spezzettate, distribuite uniformemente sul formaggio prima della cottura.',
                'Pomodoro: pelato a pezzetti (non passato), strizzato dall\'acqua in eccesso. Va messo sulla tuma + acciughe, non sotto.',
                'Ordine dei condimenti (dal basso verso l\'alto): 1) impasto, 2) tuma a pezzetti, 3) acciughe, 4) pomodoro a pezzetti, 5) origano abbondante, 6) olio EVO a filo.',
                'Cottura: 200–210°C, forno statico, griglia bassa, 25–28 min. La focaccia è pronta quando il formaggio ha ceduto la sua acqua e si è leggermente dorato ai bordi, il pomodoro si è asciugato e la base è croccante.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '10–12 min', note: 'Impasto diretto: farina + acqua + lievito + sale + olio. Liscio e morbido, non appiccicoso. Semplice e veloce.' },
                { icon: '📈', label: 'Puntata', duration: '1–1,5 ore', note: 'Copri con pellicola a T.A. L\'impasto deve raddoppiare.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '10–12 ore', note: 'In frigo coperto. Sviluppa sapore.' },
                { icon: '🌡️', label: 'In teglia + lievitazione', duration: '2–3 ore', note: 'Teglia unta. Versa e stendi con le mani unte. Lascia lievitare coperta fino a che è gonfia.' },
                { icon: '🐟', label: 'Condimento a strati', duration: '10 min', note: 'Sul impasto lievitato: 1) tuma/primo sale a pezzetti, 2) acciughe dissalate, 3) pomodoro pelato a pezzetti ben strizzato, 4) origano abbondante, 5) olio EVO a filo generoso.' },
                { icon: '🔥', label: 'Cottura a 200–210°C', duration: '25–28 min', note: 'Griglia bassa. Formaggio leggermente dorato ai bordi, pomodoro asciugato, base croccante. Non cuocere troppo: il formaggio non deve bruciare.' }
            ]
        }
    };

    let currentType = 'altaidro';

    // ── Elementi DOM ──────────────────────────────────────────────────────────
    const inputs = document.querySelectorAll('input');
    const el = {
        pezzi:          document.getElementById('pezzi'),
        peso:           document.getElementById('peso'),
        idro:           document.getElementById('idro'),
        salePerc:       document.getElementById('salePerc'),
        grassiPerc:     document.getElementById('grassiPerc'),
        patatePerc:     document.getElementById('patatePerc'),
        liev:           document.getElementById('liev'),
        frigo:          document.getElementById('frigo'),
        gradi:          document.getElementById('gradi'),
        pdrp:           document.getElementById('pdrp'),
        pdrpGroup:      document.getElementById('pdrp-group'),
        soloLm:         document.getElementById('solo-lm'),
        soloLmGroup:    document.getElementById('solo-lm-group'),
        lmOptions:      document.getElementById('lm-options'),
        lievGroup:      document.getElementById('liev-group'),
        frigoGroup:     document.getElementById('frigo-group'),
        patateGroup:    document.getElementById('patate-group'),
        reccoNote:      document.getElementById('recco-note'),
        errorMessage:   document.getElementById('error-message'),
        forza:          document.getElementById('forza'),
        extraForza:     document.getElementById('extra-forza'),
        farina:         document.getElementById('farina'),
        acqua:          document.getElementById('acqua'),
        sale:           document.getElementById('sale'),
        grassi:         document.getElementById('grassi'),
        patateRes:      document.getElementById('patate-res'),
        resultPatate:   document.getElementById('result-patate'),
        pdr:            document.getElementById('pdr'),
        resultPdr:      document.getElementById('result-pdr'),
        lievito:        document.getElementById('lievito'),
        resultLievito:  document.getElementById('result-lievito'),
        impastoTotale:  document.getElementById('impasto-totale'),
        typeDesc:       document.getElementById('focaccia-type-description'),
        timeline:       document.getElementById('focaccia-timeline'),
        tipsSection:    document.getElementById('focaccia-tips-section'),
        labelPezzi:     document.getElementById('label-pezzi'),
        labelPeso:      document.getElementById('label-peso'),
        extraSalamoia:  document.getElementById('extra-salamoia'),
        salamoiaRes:    document.getElementById('salamoia-res')
    };

    // ── Selettore tipo ────────────────────────────────────────────────────────
    document.querySelectorAll('.type-card[data-focaccia-type]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.type-card[data-focaccia-type]').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentType = card.dataset.focacciaType;
            loadPreset(currentType);
            calculate();
        });
    });

    function loadPreset(type) {
        const t = FOCACCIA_TYPES[type];
        if (el.typeDesc) el.typeDesc.textContent = t.description;
        const p = t.preset;
        el.pezzi.value      = p.pezzi;
        el.peso.value       = p.peso;
        el.idro.value       = p.idro;
        el.salePerc.value   = p.salePerc;
        el.grassiPerc.value = p.grassiPerc;
        el.liev.value       = p.liev;
        el.frigo.value      = p.frigo;
        el.gradi.value      = p.gradi;
        if (el.labelPezzi) el.labelPezzi.textContent = t.labelPezzi;
        if (el.labelPeso)  el.labelPeso.textContent  = t.labelPeso;

        // Mostra/nascondi sezioni contestuali
        const isRecco = t.noLievito;
        if (el.lmOptions)   el.lmOptions.style.display  = isRecco ? 'none' : 'block';
        if (el.lievGroup)   el.lievGroup.style.display   = isRecco ? 'none' : 'block';
        if (el.frigoGroup)  el.frigoGroup.style.display  = isRecco ? 'none' : 'block';
        if (el.reccoNote)   el.reccoNote.style.display   = isRecco ? 'block' : 'none';
        if (el.resultPdr)   el.resultPdr.style.display   = isRecco ? 'none' : 'flex';
        if (el.resultLievito) el.resultLievito.style.display = isRecco ? 'none' : 'flex';
        if (el.extraForza)  el.extraForza.style.display  = isRecco ? 'none' : 'flex';

        // Patate
        if (el.patateGroup) el.patateGroup.style.display = t.hasPatate ? 'block' : 'none';
        if (el.resultPatate) el.resultPatate.style.display = t.hasPatate ? 'flex' : 'none';

        // Salamoia
        if (el.extraSalamoia) el.extraSalamoia.style.display = t.hasSalamoia ? 'flex' : 'none';
    }

    // ── Event listeners ───────────────────────────────────────────────────────
    inputs.forEach(input => input.addEventListener('input', calculate));

    document.querySelectorAll('input[name="pdrt"]').forEach(radio => {
        radio.addEventListener('change', () => {
            updateLMVisibility();
            calculate();
        });
    });

    function updateLMVisibility() {
        const sourdough_type = document.querySelector('input[name="pdrt"]:checked').value;
        if (sourdough_type === '0') {
            el.pdrp.value = 0;
            el.pdrpGroup.style.display = 'none';
            el.soloLmGroup.style.display = 'none';
            el.soloLm.checked = false;
        } else {
            el.pdrpGroup.style.display = 'flex';
            el.soloLmGroup.style.display = 'flex';
        }
    }

    // ── Calcolo ───────────────────────────────────────────────────────────────
    // Stesso algoritmo identico di script_pizza.js, adattato per le focacce.
    // L'unica differenza: is_pan_pizza è sempre true per le focacce in teglia
    // (applica il moltiplicatore x1.25 sul lievito), e Recco bypassa tutto.
    function calculate() {
        el.errorMessage.style.display = 'none';

        const t = FOCACCIA_TYPES[currentType];

        // ── Caso speciale: Focaccia di Recco (nessun lievito) ─────────────────
        if (t.noLievito) {
            const num   = parseFloat(el.pezzi.value) || 1;
            const peso  = parseFloat(el.peso.value)  || 0;
            const idro  = parseFloat(el.idro.value)  || 0;
            const saleP = parseFloat(el.salePerc.value) || 0;
            const fatP  = parseFloat(el.grassiPerc.value) || 0;

            const totale = num * peso;
            const totalPerc = 100 + idro + saleP + fatP;
            const farina = (totale / totalPerc) * 100;
            const acqua  = farina * idro / 100;
            const sale   = farina * saleP / 100;
            const grassi = farina * fatP / 100;

            el.impastoTotale.textContent = `${totale.toFixed(0)} g`;
            el.farina.textContent        = `${farina.toFixed(0)} g`;
            el.acqua.textContent         = `${acqua.toFixed(0)} g`;
            el.sale.textContent          = `${sale.toFixed(1)} g`;
            el.grassi.textContent        = `${grassi.toFixed(1)} g`;
            el.pdr.textContent           = '—';
            el.lievito.textContent       = '—';
            el.forza.textContent         = '—';
            renderTimeline(currentType);
            renderTips(currentType);
            return;
        }

        // ── Calcolo standard (identico a script_pizza.js) ─────────────────────
        const num_balls               = parseFloat(el.pezzi.value);
        const weight_per_ball         = parseFloat(el.peso.value);
        const hydration_perc          = parseFloat(el.idro.value);
        const salt_perc               = parseFloat(el.salePerc.value);
        const fat_perc                = parseFloat(el.grassiPerc.value);
        const sourdough_perc_on_flour = parseFloat(
            document.querySelector('input[name="pdrt"]:checked').value !== '0' ? el.pdrp.value : 0
        );
        const total_leavening_hr      = parseFloat(el.liev.value);
        const fridge_hr               = parseFloat(el.frigo.value);
        const temp_ambient            = parseFloat(el.gradi.value);
        const is_pan                  = t.isTeglia;
        const sourdough_type          = document.querySelector('input[name="pdrt"]:checked').value;
        const use_only_sourdough      = el.soloLm.checked;

        if ([num_balls, weight_per_ball, hydration_perc, salt_perc, fat_perc,
             sourdough_perc_on_flour, total_leavening_hr, fridge_hr, temp_ambient].some(isNaN)) {
            el.errorMessage.textContent = 'Controlla i valori inseriti: tutti i campi devono essere numerici.';
            el.errorMessage.style.display = 'block';
            return;
        }
        if (fridge_hr > total_leavening_hr) {
            el.errorMessage.textContent = 'Le ore di frigo non possono essere maggiori delle ore di lievitazione totali.';
            el.errorMessage.style.display = 'block';
            return;
        }

        const total_dough_weight = num_balls * weight_per_ball;

        let lm_flour_perc = 0;
        let lm_water_perc_of_lm_flour = 0;
        if (sourdough_perc_on_flour > 0) {
            if (sourdough_type === '1') {
                lm_flour_perc = sourdough_perc_on_flour / 2;
                lm_water_perc_of_lm_flour = 1;
            } else if (sourdough_type === '2') {
                lm_flour_perc = sourdough_perc_on_flour * (2/3);
                lm_water_perc_of_lm_flour = 0.5;
            } else {
                lm_flour_perc = sourdough_perc_on_flour / 1.8;
                lm_water_perc_of_lm_flour = 0.8;
            }
        }

        const total_percs_for_flour_calc = 100 + hydration_perc + salt_perc + fat_perc
            - (lm_flour_perc * lm_water_perc_of_lm_flour);
        const flour_total_for_calc = (total_dough_weight / total_percs_for_flour_calc) * (100 - lm_flour_perc);

        const sourdough_weight = flour_total_for_calc * (sourdough_perc_on_flour / (100 - lm_flour_perc));
        const sourdough_flour  = (sourdough_type === '0') ? 0 : sourdough_weight / (1 + lm_water_perc_of_lm_flour);
        const sourdough_water  = sourdough_weight - sourdough_flour;

        const flour  = flour_total_for_calc - sourdough_flour;
        const water  = (flour_total_for_calc * hydration_perc / 100) - sourdough_water;
        const salt   = flour_total_for_calc * (salt_perc / 100);
        const fat    = flour_total_for_calc * (fat_perc / 100);

        // ── Calcolo lievito (algoritmo identico a script_pizza.js) ────────────
        const REF_HOURS = 24, REF_TEMP = 20, BASE_YEAST_PERC_ON_FLOUR = 0.08;
        const effective_hours = Math.max(1, (total_leavening_hr - fridge_hr) + (fridge_hr / 20));
        const time_factor  = REF_HOURS / effective_hours;
        const temp_factor  = Math.pow(2, (REF_TEMP - temp_ambient) / 9);
        let yeast_perc     = BASE_YEAST_PERC_ON_FLOUR * time_factor * temp_factor;
        yeast_perc *= 1 + Math.max(0, (salt_perc - 2.5) * 0.15);
        yeast_perc *= 1 + (fat_perc * 0.05);
        if (is_pan) yeast_perc *= 1.25;

        let yeast = flour_total_for_calc * (yeast_perc / 100);
        if (sourdough_perc_on_flour > 0 && use_only_sourdough) {
            yeast = 0;
        } else if (sourdough_perc_on_flour > 0) {
            let lm_ldb_equiv = 0;
            if (sourdough_type === '1') lm_ldb_equiv = sourdough_weight / 80;
            if (sourdough_type === '2') lm_ldb_equiv = sourdough_weight / 150;
            if (sourdough_type === '3') lm_ldb_equiv = sourdough_weight / 120;
            yeast = Math.max(0, yeast - lm_ldb_equiv);
        }

        const flour_strength_W = 81.42 + 78.39 * Math.log(total_leavening_hr);

        // ── Patate (solo barese) ───────────────────────────────────────────────
        let patate = 0;
        if (t.hasPatate) {
            const patateP = parseFloat(el.patatePerc.value) || 30;
            patate = flour_total_for_calc * patateP / 100;
        }

        // ── Salamoia indicativa (focaccia alta idratazione e genovese) ─────────
        if (t.hasSalamoia && el.salamoiaRes) {
            const salamoiaAcqua = Math.round(flour_total_for_calc * 0.05);
            const salamoiaOlio  = Math.round(flour_total_for_calc * 0.05);
            el.salamoiaRes.textContent = `${salamoiaAcqua} g acqua + ${salamoiaOlio} g olio`;
        }

        // ── Aggiorna UI ───────────────────────────────────────────────────────
        el.impastoTotale.textContent = `${total_dough_weight.toFixed(0)} g`;
        el.farina.textContent        = `${flour.toFixed(0)} g`;
        el.acqua.textContent         = `${water.toFixed(0)} g`;
        el.sale.textContent          = `${salt.toFixed(1)} g`;
        el.grassi.textContent        = `${fat.toFixed(1)} g`;
        el.pdr.textContent           = `${sourdough_weight.toFixed(0)} g`;
        el.lievito.textContent       = `${Math.max(0, yeast).toFixed(2).replace('.', ',')} g`;
        el.forza.textContent         = `W ${Math.round(flour_strength_W / 10) * 10}`;
        if (t.hasPatate && el.patateRes) {
            el.patateRes.textContent = `${patate.toFixed(0)} g`;
        }

        renderTimeline(currentType);
        renderTips(currentType);
    }

    // ── Timeline ─────────────────────────────────────────────────────────────
    function renderTimeline(type) {
        if (!el.timeline) return;
        const steps = FOCACCIA_TYPES[type].timeline;
        el.timeline.innerHTML = `
            <h3 style="margin-bottom:1rem"><span class="icon">⏱️</span> Processo</h3>
            ${steps.map(s => `
                <div class="timeline-step">
                    <div class="step-dot">${s.icon}</div>
                    <div class="step-content">
                        <div class="step-header">
                            <span class="step-label">${s.label}</span>
                            <span class="step-duration">${s.duration}</span>
                        </div>
                        <p class="step-note">${s.note}</p>
                    </div>
                </div>
            `).join('')}
        `;
    }

    // ── Consigli ─────────────────────────────────────────────────────────────
    function renderTips(type) {
        if (!el.tipsSection) return;
        const t = FOCACCIA_TYPES[type];
        el.tipsSection.innerHTML = `
            <h3><span class="icon">💡</span> Consigli per ${t.label}</h3>
            <ul class="tips-list">
                ${t.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    updateLMVisibility();
    loadPreset(currentType);
    calculate();
});
