document.addEventListener('DOMContentLoaded', () => {

    // ── Tipi di pizza: preset e processo ────────────────────────────────────
    const PIZZA_TYPES = {
        napoletana: {
            label: 'Pizza Napoletana',
            description: 'Impasto a bassa percentuale di lievito, alta idratazione, maturazione lunga in frigo. Cottura ad altissima temperatura (450–500°C) per 60–90 secondi. Cornicione pronunciato, alveolatura aperta, centro morbido.',
            preset: { panielli: 4, peso: 260, idro: 70, salePerc: 2.8, grassiPerc: 0, liev: 24, frigo: 18, gradi: 18 },
            isTeglia: false,
            labelPanielli: 'Numero Panetti',
            labelPeso: 'Peso per Panetto (g)',
            tips: [
                'Farina: 00 di forza W 300–340 (es. Caputo Pizzeria, 5 Stagioni Napoletana). La farina debole rende l\'impasto appiccicoso e si strappa.',
                'Sale: scioglilo nell\'acqua prima di aggiungere la farina. Non mettere mai sale a contatto diretto con il lievito.',
                'Incordatura: impasta fino a ottenere un panetto liscio, setoso e non appiccicoso. Il test del velo (windowpane test) deve risultare positivo.',
                'Staglio: dopo la prima lievitazione, forma i panetti con una pirlatura stretta. Poni nei cassetti sigillati.',
                'Stesura: solo a mano, dal centro verso l\'esterno. Non usare il mattarello — sgonfia l\'alveolatura.',
                'Cottura: forno a legna o elettrico a 450–500°C, 60–90 secondi. Con forno di casa (max 280°C): usa la funzione grill + pietra refrattaria preriscaldata 1 ora.',
                'Il cornicione si forma solo se l\'impasto è ben lievitato e la temperatura è alta: con forno domestico sarà meno pronunciato ma la qualità rimane eccellente.'
            ],
            timeline: [
                { icon: '💧', label: 'Autolisi (opzionale)', duration: '20–30 min', note: 'Mescola farina e 90% dell\'acqua. Lascia riposare coperto: migliora l\'estensibilità e facilita l\'incordatura.' },
                { icon: '🍳', label: 'Impastamento', duration: '15–20 min', note: 'Aggiungi lievito disciolto nel restante 10% di acqua, poi sale. Impasta fino a incordatura completa: superficie liscia, non appiccicosa, windowpane positivo.' },
                { icon: '📈', label: 'Puntata (T.A.)', duration: '2–4 ore', note: 'Copri con pellicola. Fai 2–3 serie di pieghe a 30 min l\'una nella prima ora. L\'impasto deve aumentare del 30–40%.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '18–24 ore', note: 'Trasferisci in frigo a 4°C. La maturazione lenta sviluppa gli aromi e migliora la digeribilità.' },
                { icon: '🌡️', label: 'Acclimatazione + staglio', duration: '2–3 ore', note: 'Tira fuori dal frigo. Forma i panetti con pirlatura stretta e poni nei cassetti sigillati.' },
                { icon: '🔥', label: 'Cottura a 450–500°C', duration: '60–90 sec', note: 'Forno a legna o elettrico professionale. Con forno domestico: max temperatura + grill, pietra refrattaria preriscaldata 1 ora. Cottura 6–8 min.' }
            ]
        },
        teglia: {
            label: 'Pizza in Teglia',
            description: 'Alta idratazione (75–85%), impasto molto morbido e appiccicoso. Lievitazione lunga direttamente in teglia unta. Struttura soffice e alveolata, fondo croccante. Tipica della tradizione romana e delle pizzerie al taglio.',
            preset: { panielli: 1, peso: 620, idro: 80, salePerc: 2.5, grassiPerc: 3, liev: 24, frigo: 18, gradi: 18 },
            isTeglia: true,
            labelPanielli: 'Numero Teglie',
            labelPeso: 'Peso Impasto per Teglia (g)',
            tips: [
                'Farina: W 320–380. Alta idratazione richiede una farina forte che regga la struttura. Ottima la Caputo Nuvola, o un mix di 00 forte + manitoba.',
                'L\'impasto ad alta idratazione non si impasta a mano come il normale: usa la tecnica stretch & fold (slap & fold) o la planetaria con gancio.',
                'Teglia: unta abbondantemente con olio EVO (3–4 cucchiai per teglia 30×40). L\'olio non è solo antiaderente: dà croccantezza al fondo.',
                'Non stendere con il mattarello: versa l\'impasto nella teglia e allargalo con le mani unte, delicatamente, senza sgonfiare. Se si ritira, lascia riposare 10 min e riprova.',
                'Il condimento va messo prima della cottura: pomodoro + un filo d\'olio. La mozzarella va aggiunta negli ultimi 5–7 minuti per evitare che bruci.',
                'Cottura: forno statico a 220–240°C, parte bassa per i primi 15 min (per croccantezza), poi sposta a metà. Totale: 20–25 min.',
                'Test cottura: solleva un angolo con una spatola. Il fondo deve essere dorato e croccante, non bianco e molle.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '15–20 min', note: 'Planetaria con gancio o stretch & fold. Alta idratazione: aggiungi l\'acqua in 2–3 riprese, aspettando che ogni aggiunta sia assorbita prima di procedere. Aggiungi olio alla fine.' },
                { icon: '📈', label: 'Puntata (T.A.)', duration: '1–2 ore', note: '3–4 serie di pieghe in ciotola (coil fold) ogni 30 min. L\'impasto deve diventare via via più liscio e strutturato.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '18–24 ore', note: 'In ciotola coperta con pellicola. La maturazione lenta è fondamentale per la digeribilità e il sapore.' },
                { icon: '🌡️', label: 'Acclimatazione + staglio in teglia', duration: '2–3 ore', note: 'Tira fuori dal frigo. Versa l\'impasto nella teglia abbondantemente unta. Allarga con le mani unte, senza forzare. Copri e lascia a T.A.' },
                { icon: '🌤️', label: 'Apretto in teglia', duration: '3–4 ore', note: 'L\'impasto si distende e cresce nella teglia. È pronto quando è gonfo, pieno di bolle in superficie e trema leggermente se si muove la teglia.' },
                { icon: '🔥', label: 'Cottura a 220–240°C', duration: '20–25 min', note: 'Forno statico. Prima metà: griglia bassa per croccantezza del fondo. Seconda metà: griglia media. Mozzarella negli ultimi 5–7 min.' }
            ]
        },
        pinsa: {
            label: 'Pinsa Romana',
            description: 'La pinsa è un impasto romano antico rivisitato in chiave moderna: forma ovale, alveolatura aperta e irregolare, crosta croccante fuori e soffice dentro. La particolarità è il blend di farine (frumento + soia + riso) e l\'idratazione elevatissima (80–85%) con lunghissima maturazione in frigo (48–72h). Risultato: leggerissima e altamente digeribile.',
            preset: { panielli: 4, peso: 250, idro: 82, salePerc: 2.5, grassiPerc: 2, liev: 72, frigo: 68, gradi: 18 },
            isTeglia: false,
            labelPanielli: 'Numero Pinse',
            labelPeso: 'Peso per Pinsa (g)',
            tips: [
                // ── FARINE ──────────────────────────────────────────────────
                // La pinsa autentica usa un blend di tre farine:
                //   - 75–80% farina di frumento tipo 0 o 00, W 300–360
                //     (es. Caputo Nuvola, Agugiaro 5 Stagioni per Pinsa)
                //   - 15–20% farina di riso (amido di riso fine, non farina integrale):
                //     assorbe umidità, dà leggerezza e croccantezza alla crosta
                //   - 3–5% farina di soia (farina di soia desolata, non tostate):
                //     migliora la struttura della mollica e la doratura
                //   Esistono mix pronti per pinsa già bilanciati (es. Di Marco "Pinsa Romana").
                //   Con solo farina 00 forte il risultato è accettabile ma manca la leggerezza tipica.
                // ────────────────────────────────────────────────────────────
                'Farine: blend consigliato — 78% farina 00 forte (W 320–360) + 18% farina di riso fine + 4% farina di soia. In alternativa usa un mix pronto per pinsa (es. Di Marco). Solo farina 00 dà un risultato accettabile ma meno autentico.',
                'Idratazione 80–85%: l\'impasto è molto liquido. Non lavorarlo a mano — usa la planetaria con gancio, o la tecnica slap & fold energica. Non aggiungere farina: l\'appiccicosità è intenzionale.',
                'Maturazione lunghissima: minimo 48h in frigo, ideale 72h. È qui che si sviluppa la digeribilità unica della pinsa. Non abbreviare i tempi.',
                'Forma ovale: con le mani ben infarinate (usa semola rimacinata sul piano), stendi delicatamente premendo dal centro verso l\'esterno. La pinsa è irregolare e rustica: non deve essere perfettamente uniforme.',
                'Cottura in due fasi: prima "bianca" (senza condimento) a 280–300°C per 4–5 min. Poi sforna, condisci, reinforma per altri 3–4 min. Questo garantisce la crosta croccante senza ammollire la base.',
                'Per forno domestico: pietra refrattaria o acciaio preriscaldato 1 ora al massimo. La pinsa soffre con temperature basse: sotto i 250°C il risultato è piatto.',
                'La pinsa si serve leggermente più condita della napoletana: la base leggera regge bene ingredienti abbondanti.'
            ],
            timeline: [
                { icon: '🌡️', label: 'Autolisi farine', duration: '30 min', note: 'Mescola il blend di farine con il 70% dell\'acqua totale. Lascia riposare coperto 30 min: le farine di riso e soia si idratano correttamente.' },
                { icon: '🍳', label: 'Impastamento', duration: '20–25 min', note: 'Planetaria a bassa velocità. Aggiungi lievito + acqua restante in 2 riprese, poi sale, poi olio. Impasto molto morbido e appiccicoso: è corretto.' },
                { icon: '📈', label: 'Puntata con pieghe', duration: '2 ore', note: '3–4 coil fold ogni 30 min. Poi copri e lascia a T.A. fino al raddoppio parziale (~30%).' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '48–72 ore', note: 'In contenitori ben sigillati. La lunghissima maturazione è il cuore della pinsa: sviluppa leggerezza, digeribilità e sapore complesso.' },
                { icon: '🌡️', label: 'Acclimatazione + staglio', duration: '2–3 ore', note: 'Tira fuori dal frigo. Forma delicatamente le pinse (ovale, ~250 g) su piano infarinato con semola. Lascia riposare coperte.' },
                { icon: '🔥', label: 'Cottura bifase a 280–300°C', duration: '7–9 min tot', note: 'Fase 1: pinsa bianca su pietra 4–5 min. Sforna, condisci velocemente. Fase 2: reinforma 3–4 min. Risultato: crosta croccante, base asciutta, mollica soffice.' }
            ]
        },
        pala: {
            label: 'Pizza alla Pala',
            description: 'La pizza alla pala è la versione "da banco" delle pizzerie romane: lunga e stretta (forma a canoa), ad alta idratazione (75–80%), cotta direttamente sul piano del forno a legna o su pietra refrattaria. Crosta sottile e croccante, mollica soffice e irregolare. Si stende a mano con gesto lungo e si inforna su pala di legno.',
            preset: { panielli: 4, peso: 300, idro: 76, salePerc: 2.5, grassiPerc: 2.5, liev: 24, frigo: 18, gradi: 18 },
            isTeglia: false,
            labelPanielli: 'Numero Pale',
            labelPeso: 'Peso per Pala (g)',
            tips: [
                'Farina: W 330–380. L\'alta idratazione e la forma lunga richiedono una farina molto forte per reggere la stesura senza strapparsi. Ottima la Caputo Nuvola o la 5 Stagioni Superiore.',
                'Forma a canoa: stendi ogni panetto in un rettangolo allungato (circa 30×15 cm), con i bordi leggermente più spessi del centro. La pizza alla pala non è rotonda.',
                'Pala di legno: infarina abbondantemente con semola rimacinata (non farina 00 — si brucia). Fai scorrere la pizza con un movimento deciso: se si incolla, solleva delicatamente un angolo e aggiungi semola.',
                'Condimento: il pomodoro va applicato a crudo prima della cottura, in quantità moderata. Olio EVO abbondante. La mozzarella (a stracciatella o fior di latte) va aggiunta post-cottura o negli ultimi 2 minuti.',
                'Cottura su pietra: 280–320°C, 6–8 min. La pala va sfilata sul piano caldo con un gesto deciso. Con forno a legna: 350–400°C, 3–4 min.',
                'La pizza è pronta quando la base è uniformemente dorata e croccante, i bordi gonfi e leggermente colorati. Il centro deve flettersi ma non piegarsi su se stesso.',
                'Variante bianca (senza pomodoro): olio, rosmarino e sale grosso prima della cottura — poi farcisci con mortadella, stracchino o ricotta dopo aver sfornato. Ottima.'
            ],
            timeline: [
                { icon: '💧', label: 'Autolisi', duration: '30 min', note: 'Mescola farina e 85% dell\'acqua. Riposo coperto: facilita lo sviluppo del glutine con alta idratazione.' },
                { icon: '🍳', label: 'Impastamento', duration: '15–20 min', note: 'Aggiungi lievito nel restante 15% di acqua, poi sale, poi olio. Slap & fold o planetaria. Impasto molto morbido ma con buona struttura finale.' },
                { icon: '📈', label: 'Puntata con pieghe', duration: '2 ore', note: '3–4 coil fold ogni 30 min. L\'impasto deve diventare liscio, elastico e meno appiccicoso.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '18–24 ore', note: 'In ciotola coperta. La maturazione sviluppa sapore e migliora l\'estensibilità per la stesura lunga.' },
                { icon: '🌡️', label: 'Acclimatazione + staglio', duration: '2 ore', note: 'Tira fuori dal frigo. Forma rettangoli allungati (canoa) su piano con semola. Copri con pellicola.' },
                { icon: '🔥', label: 'Cottura a 280–320°C su pietra', duration: '6–8 min', note: 'Pala infarinata con semola. Inforna con gesto deciso. Fondo croccante, bordi gonfi. Mozzarella negli ultimi 2 min o post-cottura.' }
            ]
        },
        padellino: {
            label: 'Pizza al Padellino',
            description: 'Specialità torinese. Impasto arricchito con olio, cotto in padellini individuali in ghisa o alluminio con abbondante olio sul fondo. Risultato: bordi alti e croccanti quasi fritti, mollica soffice e ariosa.',
            preset: { panielli: 4, peso: 180, idro: 70, salePerc: 2.5, grassiPerc: 5, liev: 18, frigo: 12, gradi: 18 },
            isTeglia: true,
            labelPanielli: 'Numero Padellini',
            labelPeso: 'Peso Impasto per Padellino (g)',
            tips: [
                'Padellini: ideali quelli in ferro/ghisa o alluminio da 20–22 cm di diametro. Ungi abbondantemente con olio EVO o di semi: il fondo deve quasi friggere l\'impasto.',
                'Farina: W 280–320. Non serve la farina fortissima della napoletana: l\'impasto è più ricco di grassi che ne rallentano la fermentazione.',
                'L\'olio nell\'impasto (4–6%) è fondamentale per la texture: dà croccantezza esterna e mantiene la mollica soffice.',
                'Dopo lo staglio, poni ogni panetto nel padellino unto e lascia che si stenda da solo durante la lievitazione — non forzare subito. A metà apretto (dopo 1–1,5h) stendi con i polpastrelli fino al bordo.',
                'Condimento: pomodoro abbondante fino ai bordi, poi in forno. Aggiungi mozzarella tagliata a cubetti (non in dischi) a metà cottura.',
                'Cottura: 200–210°C, forno statico, griglia bassa, 18–22 min. Il bordo deve risultare dorato scuro e croccante, quasi fritto.',
                'Topping classico torinese: pomodoro, mozzarella e un filo di olio EVO a crudo dopo la cottura. Ottima anche bianca con patate e rosmarino.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '12–15 min', note: 'Impasta farina + acqua + lievito, poi aggiungi sale e infine olio in 2–3 riprese. L\'impasto deve risultare liscio, morbido e leggermente unto.' },
                { icon: '📈', label: 'Puntata (T.A.)', duration: '1 ora', note: '2 serie di pieghe in ciotola. L\'impasto cresce e si consolida.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '12–16 ore', note: 'In ciotola coperta. La maturazione arricchisce il sapore e rende l\'impasto più gestibile.' },
                { icon: '🌡️', label: 'Staglio nei padellini', duration: '30 min', note: 'Forma palline da 170–200 g. Poni ogni panetto nel padellino ben unto (3–4 cucchiai di olio sul fondo). Copri con pellicola.' },
                { icon: '🌤️', label: 'Apretto + stesura', duration: '2–3 ore', note: 'Dopo 1–1,5h, stendi con i polpastrelli fino al bordo del padellino. Copri e lascia lievitare fino a che l\'impasto è gonfo e pieno di bolle.' },
                { icon: '🔥', label: 'Cottura a 200–210°C', duration: '18–22 min', note: 'Forno statico, griglia bassa. Il bordo deve scurirsi e diventare croccante. Mozzarella a cubetti a metà cottura.' }
            ]
        },
        scrocchiarella: {
            label: 'Romana Scrocchiarella',
            description: 'La pizza romana per eccellenza: sottilissima, croccante e rigida, senza cornicione. Idratazione bassa (55–62%), impasto steso con mattarello fino a 2–3 mm. Si spezza con le mani. L\'opposto della napoletana: zero alveolatura, tutto croccantezza.',
            preset: { panielli: 4, peso: 200, idro: 58, salePerc: 2.5, grassiPerc: 4, liev: 12, frigo: 8, gradi: 18 },
            isTeglia: false,
            labelPanielli: 'Numero Panetti',
            labelPeso: 'Peso per Panetto (g)',
            tips: [
                'Farina: W 220–260. Con bassa idratazione non serve farina fortissima — anzi, la farina troppo forte renderebbe l\'impasto gommoso invece che croccante.',
                'Idratazione bassa (55–62%): l\'impasto sarà sodo e non appiccicoso. È normale — non aggiungere acqua extra.',
                'Strutto: la ricetta tradizionale romana prevede strutto invece dell\'olio (o in aggiunta). Dà croccantezza e un sapore caratteristico.',
                'Stesura: usa il mattarello! A differenza della napoletana, qui il mattarello è obbligatorio. Stendi fino a uno spessore di 2–3 mm su tutta la superficie, uniforme.',
                'La stesura è più facile se l\'impasto è ben riposato e a temperatura ambiente. Se si ritira, copri e lascia riposare 10 min.',
                'Condimento essenziale: pomodoro in quantità moderata (troppo lo ammorbidisce), olio EVO, sale. Mozzarella: fiordilatte tagliato finissimo o stracchino. Meno è meglio.',
                'Cottura: 250–280°C (max forno domestico), forno statico, pietra refrattaria o teglia in ferro preriscaldata. 7–10 min. Deve risultare uniformemente dorata e rigida.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '10–12 min', note: 'Impasto sodo: mescola farina + acqua + lievito, poi sale e grassi. Lavora fino a superficie liscia e compatta. Non è appiccicoso: è normale.' },
                { icon: '📈', label: 'Puntata', duration: '30 min', note: 'Riposo breve coperto con pellicola. L\'impasto si distende e diventa più lavorabile.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '8–12 ore', note: 'In frigo coperto. Anche qui la maturazione migliora il sapore e la friabilità finale.' },
                { icon: '🌡️', label: 'Acclimatazione + staglio', duration: '1–2 ore', note: 'Tira fuori dal frigo. Forma palline da 180–220 g. Lascia riposare coperte 30–60 min a T.A. prima di stendere.' },
                { icon: '📐', label: 'Stesura con mattarello', duration: '5–10 min', note: 'Stendi ogni panetto con il mattarello fino a 2–3 mm di spessore. La superficie deve essere uniforme. Se si ritira, lascia riposare e riprova.' },
                { icon: '🔥', label: 'Cottura a 250–280°C', duration: '7–10 min', note: 'Pietra refrattaria o teglia in ferro preriscaldata. Forno statico. La pizza deve risultare uniformemente dorata, rigida e croccante. Se piega senza rompersi, manca ancora cottura.' }
            ]
        },
        spontini: {
            label: 'Pizza Spontini Style',
            description: 'Ispirata alla leggendaria pizzeria Spontini di Milano: pizza al taglio alta, soffice e filante, venduta a tranci verticali. Impasto in teglia con idratazione medio-alta, cottura prolungata per una base leggermente croccante e una mollica ariosa. Mozzarella abbondante, pomodoro denso, acciughe opzionali.',
            preset: { panielli: 1, peso: 900, idro: 72, salePerc: 2.5, grassiPerc: 3, liev: 20, frigo: 14, gradi: 18 },
            isTeglia: true,
            labelPanielli: 'Numero Teglie',
            labelPeso: 'Peso Impasto per Teglia (g)',
            tips: [
                'Teglia: 30×40 cm in ferro blu o alluminio. Ungi con abbondante olio sul fondo — è parte del carattere della pizza, non solo antiaderente.',
                'Farina: W 300–340. Serve struttura per reggere l\'altezza (2,5–3 cm) e la farcitura pesante.',
                'La caratteristica di Spontini è la mozzarella filante abbondante: usa fior di latte ben strizzato (non mozzarella di bufala, troppo acquosa) tagliato a fette spesse. Mettila prima del pomodoro — sì, rovesciato rispetto alla tradizione: il pomodoro sopra la mozzarella la protegge e si caramella.',
                'Pomodoro: denso e ridotto, non acquoso. Ideale il San Marzano passato e fatto restringere in padella con olio e sale.',
                'Acciughe: opzionali ma tipiche. Distribuiscile sulla mozzarella prima del pomodoro.',
                'Cottura in due fasi: 200°C per 15 min (per cuocere la base), poi alzare a 220°C per altri 8–10 min per dorare la superficie.',
                'Il trancio si taglia alto e si serve verticale: l\'impasto deve reggere senza piegarsi. Se si affloscia, la seconda cottura era insufficiente.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '15 min', note: 'Planetaria o a mano con stretch & fold. Aggiungi olio negli ultimi 2 min. Impasto morbido ma incordato.' },
                { icon: '📈', label: 'Puntata', duration: '1–2 ore', note: '2–3 serie di pieghe in ciotola. L\'impasto deve strutturarsi bene per reggere l\'altezza in teglia.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '14–18 ore', note: 'In ciotola coperta. Fondamentale per sapore e digeribilità.' },
                { icon: '🌡️', label: 'Stesura in teglia', duration: '2–3 ore', note: 'Versa nella teglia unta e stendi delicatamente con le mani unte. Copri e lascia lievitare fino a che è gonfia e piena di bolle.' },
                { icon: '🧀', label: 'Condimento (rovesciato)', duration: '10 min', note: 'Prima la mozzarella a fette spesse, poi il pomodoro denso sopra. Opzionale: acciughe sotto il pomodoro. Olio EVO abbondante.' },
                { icon: '🔥', label: 'Cottura bifase a 200→220°C', duration: '23–25 min', note: 'Prima fase: 200°C per 15 min, griglia bassa. Seconda fase: 220°C per 8–10 min, griglia media. Il pomodoro deve caramellarsi in superficie.' }
            ]
        },
        deepdish: {
            label: 'Chicago Deep Dish',
            description: 'La torta-pizza di Chicago: cotta in teglie alte e unte con abbondante olio di mais o burro, con una farcitura rovesciata (formaggio sul fondo, carne/verdure nel mezzo, pomodoro crudo in cima). Impasto burroso, quasi brisée. Alta 4–5 cm, si taglia e si serve come una torta.',
            preset: { panielli: 1, peso: 700, idro: 55, salePerc: 2.0, grassiPerc: 8, liev: 6, frigo: 0, gradi: 18 },
            isTeglia: true,
            labelPanielli: 'Numero Teglie (ø 30 cm)',
            labelPeso: 'Peso Impasto per Teglia (g)',
            tips: [
                'Teglia: teglia in ghisa o alluminio da 30 cm di diametro e 5 cm di altezza. Unta abbondantemente con burro o olio di mais — dà sapore e croccantezza al fondo.',
                'L\'impasto è burroso e sodo, quasi come una pasta brisée. La bassa idratazione (52–58%) è intenzionale: non aggiungere acqua extra.',
                'Stesura: stendi con le mani dal centro verso i bordi, facendo risalire l\'impasto sulle pareti della teglia fino al bordo (4–5 cm di altezza).',
                'Farcitura rovesciata (ordine fondamentale): 1) Mozzarella a fette spesse sul fondo. 2) Salsiccia sbriciolata o pepperoni. 3) Eventuali verdure saltate (peperoni, funghi). 4) Pomodoro crudo schiacciato a mano con sale e origano sopra tutto.',
                'Il pomodoro va in cima non condito e non cotto: cuoce in forno e rimane fresco e acidulo, bilanciando la ricchezza del formaggio e dei grassi.',
                'Cottura: 200°C per 35–45 min. La pizza è pronta quando i bordi sono ben dorati e il pomodoro in superficie ha perso la sua acqua in eccesso.',
                'Lascia riposare 5–10 min prima di tagliare: la farcitura è molto calda e liquida appena uscita dal forno.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '8–10 min', note: 'Impasto corto e burroso: mescola farina + acqua + lievito + sale, poi incorpora il grasso in più riprese. Non sovra-impastare: deve essere sodo e omogeneo, non elastico.' },
                { icon: '📈', label: 'Riposo', duration: '1–2 ore', note: 'Copri con pellicola a temperatura ambiente. Non serve incordatura lunga: il glutine si sviluppa naturalmente nel riposo.' },
                { icon: '🫙', label: 'Stesura in teglia', duration: '10 min', note: 'Stendi con le mani, portando l\'impasto sulle pareti fino al bordo. Premi bene agli angoli. Spessore fondo: ~5 mm.' },
                { icon: '🧀', label: 'Farcitura a strati', duration: '10 min', note: 'Ordine: mozzarella → salsiccia/pepperoni → verdure → pomodoro crudo schiacciato con sale e origano. Niente olio sopra: il pomodoro cuoce asciutto.' },
                { icon: '🔥', label: 'Cottura a 200°C', duration: '35–45 min', note: 'Forno statico, griglia bassa. I bordi devono dorare bene. Il pomodoro in superficie deve asciugarsi e concentrarsi. Se i bordi scuriscono troppo presto, copri con un foglio di alluminio.' },
                { icon: '⏸️', label: 'Riposo pre-taglio', duration: '5–10 min', note: 'Lascia riposare prima di tagliare. Si serve a fette alte come una torta.' }
            ]
        },
        detroit: {
            label: 'Detroit Style',
            description: 'Pizza rettangolare cotta in teglie d\'acciaio blu profonde, con bordi croccanti e caramellati dal formaggio (Wisconsin brick cheese) che cola sulle pareti e si brucia leggermente. Impasto ad alta idratazione e soffice, con il condimento applicato in ordine inverso.',
            preset: { panielli: 1, peso: 750, idro: 75, salePerc: 2.3, grassiPerc: 4, liev: 20, frigo: 14, gradi: 18 },
            isTeglia: true,
            labelPanielli: 'Numero Teglie (25×35 cm)',
            labelPeso: 'Peso Impasto per Teglia (g)',
            tips: [
                'Teglia: la teglia Detroit originale è in acciaio blu (blue steel) 25×35 cm, alta 5 cm. In alternativa: teglia in ferro spessa. Ungi abbondantemente con olio — i bordi sono il punto di forza.',
                'Formaggio: la ricetta originale usa Wisconsin brick cheese (simile alla fontina americana). In Europa: sostituisci con fontina + una parte di provolone. Il formaggio va messo a cubetti su tutta la superficie, fino ai bordi della teglia.',
                'Il fry effect: il formaggio che cola sui bordi e a contatto con la teglia calda si caramella e diventa croccante — è la firma del Detroit style. Non risparmiare sul formaggio ai bordi.',
                'Condimento: al contrario della napoletana. Il formaggio va prima (copre l\'impasto), il pomodoro va sopra — a strisce o dollop, non su tutta la superficie, per lasciare il formaggio visibile e croccante.',
                'Pomodoro: usa salsa di pomodoro semplice, densa, a temperatura ambiente. Distribuiscila a strisce parallele longitudinali sopra il formaggio.',
                'Cottura: 230–240°C per 18–22 min. I bordi devono diventare rosso-marroni e caramellati. Se il centro è cotto ma i bordi sono ancora bianchi, alza la temperatura.',
                'Farina: W 300–360. Alta idratazione richiede farina forte per la struttura alveolata.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '15 min', note: 'Planetaria con gancio o stretch & fold. Alta idratazione: aggiungi acqua in 2–3 riprese. Olio alla fine. Impasto molto morbido e appiccicoso: è normale.' },
                { icon: '📈', label: 'Puntata con pieghe', duration: '1–2 ore', note: '3 serie di coil fold ogni 30 min. L\'impasto si struttura progressivamente.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '14–18 ore', note: 'In ciotola coperta. Sviluppa sapore e facilita la gestione dell\'impasto molto idratato.' },
                { icon: '🌡️', label: 'Acclimatazione + stesura in teglia', duration: '2–3 ore', note: 'Versa nella teglia abbondantemente unta. Stendi con le mani unte. Copri e lascia lievitare fino a che è gonfia e piena di bolle fino ai bordi.' },
                { icon: '🧀', label: 'Condimento (formaggio prima)', duration: '10 min', note: 'Prima: formaggio a cubetti abbondante su tutta la superficie, fino ai bordi della teglia. Poi: salsa di pomodoro a strisce parallele sopra il formaggio.' },
                { icon: '🔥', label: 'Cottura a 230–240°C', duration: '18–22 min', note: 'Forno statico, griglia bassa. Controlla i bordi: devono diventare marroni e caramellati (fry effect). Se il centro cuoce troppo in fretta, abbassa di 10°C.' }
            ]
        },
        newyork: {
            label: 'New York Style',
            description: 'La pizza americana per eccellenza: grande, sottile al centro e con un cornicione leggero, abbastanza flessibile da piegarsi a metà (the fold). Venduta a slice grandi. Impasto con un tocco di olio e zucchero, cottura su pietra o teglia in forno a 280–300°C. Mozzarella low-moisture, salsa semplice.',
            preset: { panielli: 3, peso: 320, idro: 62, salePerc: 2.3, grassiPerc: 3, liev: 24, frigo: 18, gradi: 18 },
            isTeglia: false,
            labelPanielli: 'Numero Panetti (ø ~40 cm)',
            labelPeso: 'Peso per Panetto (g)',
            tips: [
                'Farina: bread flour americana (W 300–340, proteina 12–13%). In Europa: manitoba o mix 70% farina 00 forte + 30% manitoba. La farina più proteica dà la masticabilità caratteristica.',
                'Zucchero: 1–2% sulla farina. Non è per il sapore — serve a favorire la doratura a temperature più basse rispetto al forno a legna napoletano.',
                'Olio: 2–3% sulla farina. Rende l\'impasto più morbido e la crosta leggermente più croccante rispetto alla napoletana.',
                'Stesura: a mano, partendo dal centro. La NY slice deve essere grande (diametro 35–42 cm) e sottile al centro (3–4 mm). Il cornicione è leggero, non pronunciato come nella napoletana.',
                'Mozzarella: usa mozzarella low-moisture (tipo Grande o Galbani per pizza). La mozzarella fresca ha troppa acqua e ammorbidisce la base. Grattugia o taglia a fette sottili.',
                'Cottura: pietra refrattaria o acciaio (Baking Steel) preriscaldato 1 ora a 270–280°C. Con grill acceso: 5–7 min. Deve risultare flessibile al centro ma croccante sotto.',
                'The fold test: solleva una slice. Deve piegarsi a U senza rompersi e senza che la farcitura scivoli. Se si rompe, l\'impasto era troppo sottile o la cottura eccessiva.'
            ],
            timeline: [
                { icon: '🍳', label: 'Impastamento', duration: '12–15 min', note: 'Mescola farina + acqua + lievito + zucchero, poi sale, poi olio. Impasta fino a superficie liscia e leggermente appiccicosa. Più semplice della napoletana: niente incordatura estrema.' },
                { icon: '📈', label: 'Puntata', duration: '1–2 ore', note: 'A temperatura ambiente, coperto. L\'impasto deve aumentare del 50%.' },
                { icon: '❄️', label: 'Maturazione in frigo', duration: '18–48 ore', note: 'Più lunga è, meglio è per il sapore. Minimo 18h, ottimo 48h. In contenitori separati o in ciotola coperta.' },
                { icon: '🌡️', label: 'Acclimatazione + staglio', duration: '2 ore', note: 'Tira fuori dal frigo almeno 2 ore prima. Forma panetti tondi da 300–330 g. Copri con pellicola o canovaccio.' },
                { icon: '📐', label: 'Stesura grande', duration: '5–8 min', note: 'A mano, dal centro verso l\'esterno, fino a diametro 38–42 cm. Il centro deve essere sottile (3–4 mm). Lascia un cornicione sottile di 1–1,5 cm.' },
                { icon: '🔥', label: 'Cottura a 270–280°C', duration: '5–8 min', note: 'Pietra o acciaio preriscaldato 1 ora. Con grill: 5–7 min. La base deve essere dorata e croccante. La mozzarella deve sciogliersi con qualche macchia bruna. Test fold: deve piegarsi senza rompersi.' }
            ]
        }
    };

    let currentPizzaType = 'napoletana';

    // ── Elementi DOM ──────────────────────────────────────────────────────────
    const inputs = document.querySelectorAll('input');
    const elements = {
        panielli:     document.getElementById('panielli'),
        peso:         document.getElementById('peso'),
        idro:         document.getElementById('idro'),
        salePerc:     document.getElementById('salePerc'),
        grassiPerc:   document.getElementById('grassiPerc'),
        liev:         document.getElementById('liev'),
        frigo:        document.getElementById('frigo'),
        gradi:        document.getElementById('gradi'),
        pdrp:         document.getElementById('pdrp'),
        pdrpGroup:    document.getElementById('pdrp-group'),
        soloLm:       document.getElementById('solo-lm'),
        soloLmGroup:  document.getElementById('solo-lm-group'),
        errorMessage: document.getElementById('error-message'),
        forza:        document.getElementById('forza'),
        farina:       document.getElementById('farina'),
        aqua:         document.getElementById('aqua'),
        sale:         document.getElementById('sale'),
        grassi:       document.getElementById('grassi'),
        pdr:          document.getElementById('pdr'),
        lievito:      document.getElementById('lievito'),
        impastoTotale:document.getElementById('impasto-totale'),
        pizzaTypeDesc:document.getElementById('pizza-type-description'),
        timeline:     document.getElementById('pizza-timeline'),
        tipsSection:  document.getElementById('pizza-tips-section'),
        labelPanielli:document.getElementById('label-panielli'),
        labelPeso:    document.getElementById('label-peso')
    };

    // ── Selettore tipo pizza ──────────────────────────────────────────────────
    document.querySelectorAll('.type-card[data-pizza-type]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.type-card[data-pizza-type]').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentPizzaType = card.dataset.pizzaType;
            loadPizzaPreset(currentPizzaType);
            calculate();
        });
    });

    function loadPizzaPreset(type) {
        const t = PIZZA_TYPES[type];
        if (elements.pizzaTypeDesc) elements.pizzaTypeDesc.textContent = t.description;
        const p = t.preset;
        elements.panielli.value   = p.panielli;
        elements.peso.value       = p.peso;
        elements.idro.value       = p.idro;
        elements.salePerc.value   = p.salePerc;
        elements.grassiPerc.value = p.grassiPerc;
        elements.liev.value       = p.liev;
        elements.frigo.value      = p.frigo;
        elements.gradi.value      = p.gradi;
        if (elements.labelPanielli) elements.labelPanielli.textContent = t.labelPanielli;
        if (elements.labelPeso)     elements.labelPeso.textContent     = t.labelPeso;
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
            elements.pdrp.value = 0;
            elements.pdrpGroup.style.display = 'none';
            elements.soloLmGroup.style.display = 'none';
            elements.soloLm.checked = false;
        } else {
            elements.pdrpGroup.style.display = 'flex';
            elements.soloLmGroup.style.display = 'flex';
        }
    }

    // ── Calcolo (algoritmo originale invariato) ───────────────────────────────
    function calculate() {
        elements.errorMessage.style.display = 'none';

        const num_balls               = parseFloat(elements.panielli.value);
        const weight_per_ball         = parseFloat(elements.peso.value);
        const hydration_perc          = parseFloat(elements.idro.value);
        const salt_perc               = parseFloat(elements.salePerc.value);
        const fat_perc                = parseFloat(elements.grassiPerc.value);
        const sourdough_perc_on_flour = parseFloat(document.querySelector('input[name="pdrt"]:checked').value !== '0' ? elements.pdrp.value : 0);
        const total_leavening_hr      = parseFloat(elements.liev.value);
        const fridge_hr               = parseFloat(elements.frigo.value);
        const temp_ambient            = parseFloat(elements.gradi.value);
        const is_pan_pizza            = PIZZA_TYPES[currentPizzaType].isTeglia;
        const sourdough_type          = document.querySelector('input[name="pdrt"]:checked').value;
        const use_only_sourdough      = elements.soloLm.checked;

        if ([num_balls, weight_per_ball, hydration_perc, salt_perc, fat_perc,
             sourdough_perc_on_flour, total_leavening_hr, fridge_hr, temp_ambient].some(isNaN)) {
            elements.errorMessage.textContent = 'Controlla i valori inseriti: tutti i campi devono essere numerici.';
            elements.errorMessage.style.display = 'block';
            return;
        }

        if (fridge_hr > total_leavening_hr) {
            elements.errorMessage.textContent = 'Le ore di frigo non possono essere maggiori delle ore di lievitazione totali.';
            elements.errorMessage.style.display = 'block';
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

        const total_percs_for_flour_calc = 100 + hydration_perc + salt_perc + fat_perc - (lm_flour_perc * lm_water_perc_of_lm_flour);
        const flour_total_for_calc = (total_dough_weight / total_percs_for_flour_calc) * (100 - lm_flour_perc);

        const sourdough_weight = flour_total_for_calc * (sourdough_perc_on_flour / (100 - lm_flour_perc));
        const sourdough_flour  = (sourdough_type === '0') ? 0 : sourdough_weight / (1 + lm_water_perc_of_lm_flour);
        const sourdough_water  = sourdough_weight - sourdough_flour;

        const flour = flour_total_for_calc - sourdough_flour;
        const water = (flour_total_for_calc * hydration_perc / 100) - sourdough_water;
        const salt  = flour_total_for_calc * (salt_perc / 100);
        const fat   = flour_total_for_calc * (fat_perc / 100);

        const REF_HOURS = 24, REF_TEMP = 20, BASE_YEAST_PERC_ON_FLOUR = 0.08;
        const effective_hours = Math.max(1, (total_leavening_hr - fridge_hr) + (fridge_hr / 20));
        const time_factor = REF_HOURS / effective_hours;
        const temp_factor = Math.pow(2, (REF_TEMP - temp_ambient) / 9);
        let yeast_perc = BASE_YEAST_PERC_ON_FLOUR * time_factor * temp_factor;
        yeast_perc *= 1 + Math.max(0, (salt_perc - 2.5) * 0.15);
        yeast_perc *= 1 + (fat_perc * 0.05);
        if (is_pan_pizza) yeast_perc *= 1.25;

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

        elements.impastoTotale.textContent = `${total_dough_weight.toFixed(0)} g`;
        elements.farina.textContent        = `${flour.toFixed(0)} g`;
        elements.aqua.textContent          = `${water.toFixed(0)} g`;
        elements.sale.textContent          = `${salt.toFixed(1)} g`;
        elements.grassi.textContent        = `${fat.toFixed(1)} g`;
        elements.pdr.textContent           = `${sourdough_weight.toFixed(0)} g`;
        elements.lievito.textContent       = `${Math.max(0, yeast).toFixed(2).replace('.', ',')} g`;
        elements.forza.textContent         = `W ${Math.round(flour_strength_W / 10) * 10}`;

        renderTimeline(currentPizzaType);
        renderTips(currentPizzaType);
    }

    // ── Timeline ─────────────────────────────────────────────────────────────
    function renderTimeline(type) {
        if (!elements.timeline) return;
        const steps = PIZZA_TYPES[type].timeline;
        elements.timeline.innerHTML = `
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
        if (!elements.tipsSection) return;
        const t = PIZZA_TYPES[type];
        elements.tipsSection.innerHTML = `
            <h3><span class="icon">💡</span> Consigli per ${t.label}</h3>
            <ul class="tips-list">
                ${t.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    updateLMVisibility();
    loadPizzaPreset(currentPizzaType);
    calculate();
});
