document.addEventListener('DOMContentLoaded', () => {

    // ── Profili per tipo ─────────────────────────────────────────────────────
    const TYPES = {
        croissant: {
            label: 'Croissant Francese',
            description: 'L\'impasto classico francese: détrempe neutra, burro di tourage 84% m.g. a blocco piatto, sfogliatura con 3 pieghe da 3 per 27 strati di burro (55 strati totali). Niente uova nell\'impasto, solo latte per l\'idratazione e una piccola quota di burro in détrempe.',
            idro: 50, burroImp: 8, uova: 0, zucchero: 6, sale: 2, tourage: 50,
            pieghe: 3, tipoPiega: '3',
            lievito: true,
            farinaW: '240–280',
            pesoDefault: 60,
            pezziDefault: 12,
            peso_hint: 'Croissant: 50–80 g a pezzo crudo',
        },
        cornetto: {
            label: 'Cornetto Italiano',
            description: 'Il cornetto all\'italiana: impasto più dolce e profumato rispetto al croissant. Contiene uova, scorza di agrumi, vaniglia e spesso un po\' di miele. Texture più compatta e meno sfogliata del croissant francese, ma più ricca e aromatica.',
            idro: 45, burroImp: 12, uova: 10, zucchero: 12, sale: 1.5, tourage: 45,
            pieghe: 3, tipoPiega: '3',
            lievito: true,
            farinaW: '240–280',
            pesoDefault: 65,
            pezziDefault: 12,
            peso_hint: 'Cornetto: 60–70 g a pezzo crudo',
        },
        'sfoglia-neutra': {
            label: 'Sfoglia Neutra (Fagottini & Brioche Feuilletée)',
            description: 'Impasto laminato con lievito, neutro e versatile. Ideale per fagottini salati, pain au chocolat, trecce e croissant ripieno. Poco zucchero, pochissimi aromi. Si presta a farciture sia dolci che salate.',
            idro: 48, burroImp: 8, uova: 5, zucchero: 4, sale: 2, tourage: 52,
            pieghe: 3, tipoPiega: '3',
            lievito: true,
            farinaW: '240–280',
            pesoDefault: 70,
            pezziDefault: 10,
            peso_hint: 'Fagottino: 60–80 g; rettangolo pain au choc: 50–60 g',
        },
        ciavattoni: {
            label: 'Sfoglia senza Lievito (Ciavattoni Romani)',
            description: 'Impasto sfogliato senza lievito, tipico della pasticceria romana. Struttura croccante e friabile, non soffice. Usato per i ciavattoni e i maritozzi sfogliati. La laminatura è più aggressiva, con burro di tourage abbondante. Niente riposo per lievitazione.',
            idro: 45, burroImp: 0, uova: 0, zucchero: 5, sale: 2, tourage: 65,
            pieghe: 4, tipoPiega: '4',
            lievito: false,
            farinaW: '180–220',
            pesoDefault: 80,
            pezziDefault: 10,
            peso_hint: 'Ciavattone: 70–90 g a pezzo',
        }
    };

    // ── Elementi DOM ─────────────────────────────────────────────────────────
    const el = {
        pezzi:         document.getElementById('pezzi'),
        pesoPezzo:     document.getElementById('peso-pezzo'),
        pesoHint:      document.getElementById('peso-hint'),
        idroPerc:      document.getElementById('idro-perc'),
        burroImpPerc:  document.getElementById('burro-imp-perc'),
        uovaPerc:      document.getElementById('uova-perc'),
        zuccheroPerc:  document.getElementById('zucchero-perc'),
        salePerc:      document.getElementById('sale-perc'),
        touragePerc:   document.getElementById('tourage-perc'),
        pieghe:        document.getElementById('pieghe'),
        tempAmb:       document.getElementById('temp-amb'),
        lievSection:   document.getElementById('liev-section'),
        lmPercGroup:   document.getElementById('lm-perc-group'),
        lmPerc:        document.getElementById('lm-perc'),
        aromiSection:  document.getElementById('aromi-section'),
        mieleSection:  document.getElementById('miele-section'),
        aromi:         document.getElementById('aromi'),
        strutto:       document.getElementById('strutto'),
        miele:         document.getElementById('miele'),
        // output
        resFarina:     document.getElementById('res-farina'),
        resLiquidi:    document.getElementById('res-liquidi'),
        resBurroImp:   document.getElementById('res-burro-imp'),
        resUova:       document.getElementById('res-uova'),
        resZucchero:   document.getElementById('res-zucchero'),
        resSale:       document.getElementById('res-sale'),
        resLievito:    document.getElementById('res-lievito'),
        resLievitoBox: document.getElementById('res-lievito-box'),
        resLmBox:      document.getElementById('res-lm-box'),
        resLm:         document.getElementById('res-lm'),
        resTourage:    document.getElementById('res-tourage'),
        tourageDetail: document.getElementById('tourage-detail'),
        resTotale:     document.getElementById('res-totale'),
        resStrati:     document.getElementById('res-strati'),
        resForza:      document.getElementById('res-forza'),
        resUovaNumRow: document.getElementById('res-uova-num-row'),
        resUovaNum:    document.getElementById('res-uova-num'),
        aroміRow:      document.getElementById('aromi-row'),
        resAromi:      document.getElementById('res-aromi'),
        struttoRow:    document.getElementById('strutto-row'),
        resStrutto:    document.getElementById('res-strutto'),
        timeline:      document.getElementById('timeline'),
        tipsSection:   document.getElementById('tips-section'),
        typeDesc:      document.getElementById('type-description'),
        errorMsg:      document.getElementById('error-message'),
    };

    let currentType = 'croissant';

    // ── Selettore tipo ────────────────────────────────────────────────────────
    document.querySelectorAll('.type-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.type-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentType = card.dataset.type;
            loadDefaults(currentType);
            calculate();
        });
    });

    // ── Listener generici ─────────────────────────────────────────────────────
    document.querySelectorAll('input').forEach(i => i.addEventListener('input', calculate));

    // ── Visibilità LM ────────────────────────────────────────────────────────
    document.querySelectorAll('input[name="liev-tipo"]').forEach(r => {
        r.addEventListener('change', () => {
            const val = document.querySelector('input[name="liev-tipo"]:checked').value;
            el.lmPercGroup.style.display = val === 'madre' ? 'flex' : 'none';
            el.resLmBox.style.display    = val === 'madre' ? 'flex' : 'none';
            el.resLievitoBox.style.display = val === 'madre' ? 'none' : 'flex';
            calculate();
        });
    });

    // ── Carica defaults per tipo ──────────────────────────────────────────────
    function loadDefaults(type) {
        const t = TYPES[type];
        el.idroPerc.value      = t.idro;
        el.burroImpPerc.value  = t.burroImp;
        el.uovaPerc.value      = t.uova;
        el.zuccheroPerc.value  = t.zucchero;
        el.salePerc.value      = t.sale;
        el.touragePerc.value   = t.tourage;
        el.pieghe.value        = t.pieghe;
        el.pesoPezzo.value     = t.pesoDefault;
        el.pezzi.value         = t.pezziDefault;
        el.pesoHint.textContent = t.peso_hint;
        el.typeDesc.textContent = t.description;

        // Imposta tipo piega radio
        const piegaRadio = document.querySelector(`input[name="tipo-piega"][value="${t.tipoPiega}"]`);
        if (piegaRadio) piegaRadio.checked = true;

        // Mostra/nascondi sezione lievito
        el.lievSection.style.display = t.lievito ? 'block' : 'none';

        // Sezioni speciali
        el.aromiSection.style.display = type === 'cornetto' ? 'block' : 'none';
        el.mieleSection.style.display = type === 'croissant' ? 'block' : 'none';
    }

    // ── Calcolo strati ────────────────────────────────────────────────────────
    // Strati TOTALI (pasta + burro) = fattore^pieghe × 2 + 1
    // Strati di burro = fattore^pieghe
    function calcolaStrati(pieghe, tipoPiega) {
        let stratiburro;
        if (tipoPiega === 'mix') {
            // 2×piega4 + 1×piega3 → strati burro = 4² × 3 = 48
            stratiburro = Math.pow(4, 2) * 3;
        } else {
            const fattore = parseInt(tipoPiega);
            stratiburro = Math.pow(fattore, pieghe);
        }
        return stratiburro * 2 + 1; // strati totali
    }

    // ── Calcolo principale ────────────────────────────────────────────────────
    function calculate() {
        el.errorMsg.style.display = 'none';

        const t            = TYPES[currentType];
        const pezzi        = parseFloat(el.pezzi.value)        || 0;
        const pesoPezzo    = parseFloat(el.pesoPezzo.value)    || 0;
        const idroP        = parseFloat(el.idroPerc.value)     || 0;
        const burroImpP    = parseFloat(el.burroImpPerc.value) || 0;
        const uovaP        = parseFloat(el.uovaPerc.value)     || 0;
        const zuccheroP    = parseFloat(el.zuccheroPerc.value) || 0;
        const saleP        = parseFloat(el.salePerc.value)     || 0;
        const tourageP     = parseFloat(el.touragePerc.value)  || 0;
        const nPieghe      = parseInt(el.pieghe.value)         || 3;
        const tempAmb      = parseFloat(el.tempAmb.value)      || 20;
        const tipoPiega    = document.querySelector('input[name="tipo-piega"]:checked').value;
        const lievTipo     = t.lievito
            ? (document.querySelector('input[name="liev-tipo"]:checked')?.value || 'fresco')
            : 'nessuno';
        const lmP          = parseFloat(el.lmPerc.value)       || 15;
        const hasAromi     = currentType === 'cornetto' && el.aromi.checked;
        const hasStrutto   = currentType === 'cornetto' && el.strutto.checked;
        const hasMiele     = currentType === 'croissant' && el.miele && el.miele.checked;

        if (pezzi <= 0 || pesoPezzo <= 0) {
            el.errorMsg.textContent = 'Inserisci un numero valido di pezzi e peso.';
            el.errorMsg.style.display = 'block';
            return;
        }

        // Baker's percentage sulla farina détrempe
        // Il peso totale del pezzo include sia la détrempe che il tourage inglobato
        // tourage = farina × tourageP/100
        // détrempe = farina × (1 + idroP/100 + burroImpP/100 + uovaP/100 + zuccheroP/100 + saleP/100)
        // peso_pezzo ≈ (détrempe + tourage) / pezzi
        // Perdita cottura ~15% per laminati con lievito, ~8% per sfoglia senza lievito

        const perdita = t.lievito ? 1.15 : 1.08;
        const totDough = pezzi * pesoPezzo * perdita;

        // Contributo LM
        const lmContributo = lievTipo === 'madre' ? lmP : 0;

        // Somma percentuali Baker's sulla farina
        const struttoP = hasStrutto ? 5 : 0;
        const totalPerc = 100 + idroP + burroImpP + uovaP + zuccheroP + saleP
                        + lmContributo + struttoP + tourageP;

        const farina    = (totDough / totalPerc) * 100;
        const liquidi   = farina * idroP / 100;
        const burroImp  = farina * burroImpP / 100;
        const uova      = farina * uovaP / 100;
        const zucchero  = farina * zuccheroP / 100;
        const sale      = farina * saleP / 100;
        const tourage   = farina * tourageP / 100;
        const struttog  = farina * struttoP / 100;
        const lmWeight  = farina * lmContributo / 100;

        // Aromi
        const mieleg    = hasMiele ? farina * 0.02 : 0;
        const miele_cornetto = hasAromi ? farina * 0.02 : 0;
        const scorze    = hasAromi ? (farina * 0.005).toFixed(1) : 0;

        // Lievito di birra
        const richnessFactor = 1 + (burroImpP / 100) * 0.6 + (zuccheroP / 100) * 0.4;
        const tempFactor     = Math.max(0.5, (30 - tempAmb) / 10);
        const baseYeastPerc  = 0.012 * richnessFactor * tempFactor;
        let yeast = 0, lievDesc = '';
        if (lievTipo === 'fresco') {
            yeast = farina * baseYeastPerc;
            lievDesc = 'g fresco';
        } else if (lievTipo === 'secco') {
            yeast = farina * (baseYeastPerc / 3);
            lievDesc = 'g secco';
        }

        // Strati
        const strati = calcolaStrati(nPieghe, tipoPiega);

        // Dettaglio tourage (distribuzione nelle pieghe)
        const touragePerPiega = tourage / nPieghe;

        // ── Output détrempe ──────────────────────────────────────────────────
        el.resFarina.textContent    = fmt(farina)   + ' g';
        el.resLiquidi.textContent   = fmt(liquidi)  + ' g';
        el.resBurroImp.textContent  = fmt(burroImp) + ' g';
        el.resUova.textContent      = uova > 0 ? fmt(uova) + ' g' : '—';
        el.resZucchero.textContent  = fmt(zucchero) + ' g';
        el.resSale.textContent      = fmtDec(sale)  + ' g';

        // Lievito
        if (lievTipo === 'nessuno') {
            el.resLievitoBox.style.display = 'none';
            el.resLmBox.style.display = 'none';
        } else if (lievTipo === 'madre') {
            el.resLievitoBox.style.display = 'none';
            el.resLmBox.style.display = 'flex';
            el.resLm.textContent = fmt(lmWeight) + ' g';
        } else {
            el.resLievitoBox.style.display = 'flex';
            el.resLmBox.style.display = 'none';
            el.resLievito.textContent = fmtDec(yeast) + ' ' + lievDesc;
        }

        // ── Output tourage ───────────────────────────────────────────────────
        el.resTourage.textContent = fmt(tourage) + ' g';
        el.tourageDetail.innerHTML = `
            <span>~${fmt(touragePerPiega)} g per piega · ${strati} strati totali (di cui ${Math.round((strati - 1) / 2)} di burro)</span>
            <span>Burro a 84% m.g. · spessore blocco: ~1 cm · T° lavoro 14–16°C</span>
        `;

        // ── Output extra ─────────────────────────────────────────────────────
        el.resTotale.textContent  = fmt(farina + liquidi + burroImp + uova + zucchero + sale + lmWeight) + ' g';
        el.resStrati.textContent  = strati + ` strati totali (${nPieghe}× piega da ${tipoPiega === 'mix' ? '4+4+3' : tipoPiega})`;
        el.resForza.textContent   = 'W ' + t.farinaW;

        if (uova > 0) {
            el.resUovaNumRow.style.display = 'flex';
            el.resUovaNum.textContent = `~${Math.round(uova / 55)} uova (${fmt(uova)} g)`;
        } else {
            el.resUovaNumRow.style.display = 'none';
        }

        if (hasAromi) {
            el.aroміRow.style.display = 'flex';
            el.resAromi.textContent = `miele ${fmt(miele_cornetto)}g + scorze ${scorze}g + vaniglia`;
        } else if (hasMiele) {
            el.aroміRow.style.display = 'flex';
            el.resAromi.textContent = `miele ${fmt(mieleg)} g`;
        } else {
            el.aroміRow.style.display = 'none';
        }

        if (hasStrutto) {
            el.struttoRow.style.display = 'flex';
            el.resStrutto.textContent = fmt(struttog) + ' g';
        } else {
            el.struttoRow.style.display = 'none';
        }

        // ── Timeline & Tips ──────────────────────────────────────────────────
        renderTimeline(currentType, lievTipo, tempAmb, nPieghe, tipoPiega, strati);
        renderTips(currentType);
    }

    // ── Timeline ─────────────────────────────────────────────────────────────
    function renderTimeline(type, lievTipo, temp, nPieghe, tipoPiega, strati) {
        const steps = [];
        const tFactor = temp >= 24 ? 0.8 : temp >= 20 ? 1 : 1.25;
        const isSenzaLievito = type === 'ciavattoni';
        const isCornetto = type === 'cornetto';

        steps.push({
            icon: '🍳',
            label: 'Impasto détrempe',
            duration: '10–15 min',
            note: `Impasta tutti gli ingredienti fino a un panetto liscio e omogeneo. ${isCornetto ? 'Incorpora le uova gradualmente.' : ''} Non sviluppare eccessivamente il glutine — l'impasto deve essere estensibile, non elastico.`
        });

        if (!isSenzaLievito) {
            const riposo1 = formatH(tFactor * 0.5);
            steps.push({
                icon: '❄️',
                label: 'Riposo in frigo',
                duration: `1–2 h a 4°C`,
                note: 'Avvolgi nel cellophane e fai riposare in frigo. L\'impasto deve essere ben freddo prima di inserire il tourage, per evitare che il burro si sciolga durante la laminatura.'
            });
        }

        steps.push({
            icon: '🧈',
            label: 'Prepara il blocco di tourage',
            duration: '10 min',
            note: 'Il burro deve essere freddo ma plastico (circa 14–16°C): si piega senza rompersi. Batti il panetto con il mattarello fino a formare un rettangolo uniforme spesso ~1 cm.'
        });

        steps.push({
            icon: '📐',
            label: 'Incasso del burro',
            duration: '5 min',
            note: 'Stendi la détrempe a rettangolo, posiziona il blocco di burro al centro e chiudi i lembi. Sigilla bene i bordi per non far fuoriuscire il burro durante la laminatura.'
        });

        // Pieghe
        for (let i = 1; i <= nPieghe; i++) {
            const isLast = i === nPieghe;
            const piegaTipo = tipoPiega === 'mix'
                ? (i <= 2 ? '4 (a portafoglio)' : '3 (a libro)')
                : (tipoPiega === '3' ? '3 (a libro)' : '4 (a portafoglio)');
            steps.push({
                icon: '🔁',
                label: `Piega ${i} — piega da ${piegaTipo}`,
                duration: '5 min + 20–30 min riposo',
                note: `Stendi delicatamente a ~6mm, esegui la piega da ${piegaTipo}. ${isLast ? 'Dopo l\'ultima piega, stendi allo spessore finale (3–4 mm) e taglia le forme.' : `Avvolgi e riposa 20–30 min in frigo (4°C) prima della piega successiva. Non saltare il riposo: il glutine deve rilassarsi.`}`
            });
        }

        steps.push({
            icon: '✂️',
            label: 'Taglio e formatura',
            duration: '15–25 min',
            note: `Stendi a ${type === 'ciavattoni' ? '4–5' : '3–4'} mm. ${type === 'croissant' || type === 'cornetto' ? 'Taglia triangoli isosceli (base ~10 cm), arrotola dalla base verso la punta con leggera tensione.' : type === 'ciavattoni' ? 'Taglia rettangoli o strisce, piega o arrotola secondo la forma desiderata.' : 'Taglia rettangoli per fagottini, o triangoli per croissant. Farcisci prima di arrotolare.'}`
        });

        if (!isSenzaLievito) {
            const liev = lievTipo === 'madre' ? '4–6 ore' : formatH(tFactor * 2.5);
            steps.push({
                icon: '🌤️',
                label: 'Lievitazione finale',
                duration: liev + ' a 24–26°C',
                note: 'Disponi i pezzi ben distanziati su teglia. Coperti con pellicola o campana. Devono essere gonfi, tremolanti al tocco — le sfogliature devono essere ancora visibili. NON lievitare a temperature alte: il burro si scioglierebbe.'
            });
        }

        steps.push({
            icon: '🖌️',
            label: 'Doratura',
            duration: '2 min',
            note: 'Spennella delicatamente con tuorlo + panna (o solo latte). Non premere: rischi di far collassare la lievitatura. Per i ciavattoni, spolvera con zucchero a velo o spennella con acqua e zucchero.'
        });

        if (type === 'croissant' || type === 'sfoglia-neutra') {
            steps.push({ icon: '🔥', label: 'Cottura a 190–200°C', duration: '16–20 min', note: 'Forno statico, preriscaldato. I primi 10 min non aprire il forno. Pronti quando sono dorati su tutti i lati e la base è solida e asciutta.' });
        } else if (type === 'cornetto') {
            steps.push({ icon: '🔥', label: 'Cottura a 185–195°C', duration: '18–22 min', note: 'Forno statico. Più scuri del croissant francese: la doratura intensa è caratteristica del cornetto italiano.' });
        } else {
            steps.push({ icon: '🔥', label: 'Cottura a 200–210°C', duration: '20–25 min', note: 'Forno statico ben caldo. La sfoglia senza lievito richiede temperatura alta per creare il vapore che separa gli strati.' });
        }

        steps.push({
            icon: '💨',
            label: 'Raffreddamento',
            duration: '15–20 min',
            note: 'Su griglia — mai su superficie piana, il vapore ammorbidirebbe la base. I croissant/cornetti sono migliori appena tiepidi.'
        });

        el.timeline.innerHTML = steps.map(s => `
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
        `).join('');
    }

    // ── Consigli per tipo ─────────────────────────────────────────────────────
    const TIPS = {
        croissant: [
            'Usa burro di cacao secco (84% m.g., tipo Corman o equivalente) per il tourage: si lamina senza rompersi e ha un punto di fusione più alto.',
            'La temperatura ideale di lavorazione è 16–18°C: in estate lavora in un locale condizionato o fai pause più lunghe in frigo.',
            'Lo spessore finale prima del taglio deve essere esattamente 3–3,5 mm: troppo spesso → non si cuoce bene; troppo sottile → perde volume.',
            'I triangoli per croissant: base 9–10 cm, altezza 24–28 cm. Fai un piccolo taglio di 1 cm alla base prima di arrotolare.',
            'Farina consigliata: W 240–280 (farina 0 di media forza, non Manitoba pura).',
            'Dopo la cottura, lustra con sciroppo 1:1 caldo per una superficie brillante.'
        ],
        cornetto: [
            'Aggiungi gli aromi (scorza, vaniglia, miele) nell\'impasto détrempe, non nel tourage.',
            'Il cornetto italiano vuole una sfogliatura meno netta del croissant: meno pieghe e burro di tourage meno secco vanno bene.',
            'La mollica deve essere filamentosa e leggermente briosciata, non a nido d\'ape come il croissant.',
            'Per un colore più caldo, aggiungi un tuorlo extra all\'uovo di doratura.',
            'Tradizionalmente si mangia vuoto o farcito con crema pasticcera, marmellata o Nutella dopo la cottura.',
            'Farina consigliata: W 240–260 (00 di forza media).'
        ],
        'sfoglia-neutra': [
            'Essendo neutro, questo impasto si presta ad essere farcito prima della formatura (pain au chocolat, fagottini salati).',
            'Per il pain au chocolat: rettangoli 8×15 cm, 2 barrette di cioccolato da copertura, arrotola dal lato corto.',
            'Per fagottini salati: riduci lo zucchero a 2% e aggiungi 0,5% di erbe aromatiche secche nell\'impasto.',
            'La lievitazione finale è più corta rispetto al croissant: 1,5–2 h sono sufficienti.',
            'Farina consigliata: W 240–270.'
        ],
        ciavattoni: [
            'Nessuna lievitazione: dopo l\'ultima piega, stendi subito e taglia.',
            'Il burro tourage abbondante (60–70%) è fondamentale per la croccantezza: non ridurlo.',
            'Tieni tutto il più freddo possibile: il burro non deve mai ammorbidirsi durante la lavorazione.',
            'I ciavattoni si possono farcire prima di arrotolarli: crema, marmellata, ricotta e zucchero.',
            'Cottura ad alta temperatura (210°C) con calore secco — senza vapore: il vapore ammorbidisce la sfoglia invece di renderla croccante.',
            'Farina consigliata: W 180–220 (farina 00 debole per maggiore friabilità).'
        ]
    };

    function renderTips(type) {
        const tips = TIPS[type];
        const t = TYPES[type];
        el.tipsSection.innerHTML = `
            <h3><span class="icon">💡</span> Consigli — ${t.label}</h3>
            <ul class="tips-list">
                ${tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
    }

    // ── Utilità ───────────────────────────────────────────────────────────────
    function fmt(n)    { return Math.round(n); }
    function fmtDec(n) { return n.toFixed(1).replace('.', ','); }
    function formatH(h) {
        const hh = Math.round(h * 2) / 2;
        return hh < 1 ? `${Math.round(hh * 60)} min` : `${hh} ore`;
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    loadDefaults('croissant');
    calculate();
});
