document.addEventListener('DOMContentLoaded', () => {

    // ── Profili per tipo di pane ────────────────────────────────────────────
    // Valori di default e range consigliati per ogni tipo.
    // lievitanti: 'ldb' | 'lm' | 'biga' (quelli supportati per quel tipo)
    const BREADS = {
        'bianco': {
            label: 'Pane Bianco',
            description: 'Pane comune a pasta morbida o crosta croccante. Adatto a lievito madre, biga o lievito di birra. Grande versatilità di forma: filone, pagnotta, filoncino.',
            idro: 68, sale: 2.0, grassi: 0, lievitanti: ['ldb', 'lm', 'biga'],
            liev: 24, frigo: 12,
            pesoDefault: 750,
            farinaLabel: 'Farina 0 / 00',
            farinaNote: 'W 240–280. Per biga o LM usa W 280–320.',
            tips: [
                'Con LM: fai un\'autolisi di 30–40 min prima di aggiungere il lievito madre.',
                'La crosta croccante si ottiene con vapore nei primi 15 min di cottura (pentola in ghisa o piatto d\'acqua).',
                'Cottura consigliata: 250°C per 15 min con vapore, poi 210°C per 20–25 min senza.',
                'Per una mollica più aperta, aumenta l\'idratazione al 72–75% e usa pieghe di rinforzo.',
            ]
        },
        'semola': {
            label: 'Pane di Semola',
            description: 'Tipico del Sud Italia (Altamura, Matera). Semola rimacinata di grano duro, mollica gialla compatta, crosta spessa e profumata. Ottimo con LM o biga.',
            idro: 65, sale: 2.2, grassi: 0, lievitanti: ['ldb', 'lm', 'biga'],
            liev: 24, frigo: 12,
            pesoDefault: 750,
            farinaLabel: 'Semola Rimacinata',
            farinaNote: 'Semola rimacinata di grano duro (100% o mix 70% semola + 30% 0).',
            tips: [
                'La semola assorbe acqua più lentamente: aggiungi l\'acqua in più riprese durante l\'impasto.',
                'Cottura più lunga del pane bianco: 230°C per 20 min con vapore, poi 200°C per 30–35 min.',
                'Il colore giallo intenso della mollica è normale: è la presenza di carotenoidi del grano duro.',
                'Per il pane di Altamura DOP l\'idratazione è al 65%: non alzarla troppo o perdi la struttura.',
            ]
        },
        'farine-varie': {
            label: 'Pane con Farine Varie',
            description: 'Pane con mix di farine integrali, segale, farro, avena o cereali antichi. Struttura più densa, aroma complesso, conservazione migliore. Ideale con LM.',
            idro: 72, sale: 2.0, grassi: 2, lievitanti: ['ldb', 'lm', 'biga'],
            liev: 30, frigo: 16,
            pesoDefault: 750,
            farinaLabel: 'Mix Farine (vedi note)',
            farinaNote: 'Es: 50% integrale + 30% 0 + 20% segale. Adatta il mix al gusto.',
            tips: [
                'Le farine integrali e di segale assorbono molta più acqua: aspettati un impasto più appiccicoso.',
                'Con alta % di segale (>30%), l\'impasto non incorda come il frumento: è normale.',
                'Aumenta i tempi di lievitazione: le farine integrali rallentano la fermentazione.',
                'Il pane scuro si colora più velocemente: coprilo con carta forno dopo i primi 20 min.',
                'Aggiungi semi (girasole, sesamo, lino) per texture e aroma: 5–10% sulla farina.',
            ]
        },
        'rosette': {
            label: 'Rosette / Michette',
            description: 'Il classico panino romano a fiore, con crosta croccantissima e interno quasi cavo. Tecnica particolare: impasto poco idratato, laminazione, e cottura ad alta temperatura con vapore.',
            idro: 58, sale: 2.0, grassi: 1, lievitanti: ['ldb', 'biga'],
            liev: 18, frigo: 0,
            pesoDefault: 65, // rosetta classica romana
            farinaLabel: 'Farina 0',
            farinaNote: 'W 260–300. La forza è importante per la laminazione.',
            tips: [
                'Il segreto della rosetta è la laminatura: stendi l\'impasto, piega, stendi ancora (3–4 volte). Crea la struttura cava.',
                'Usa lo stampo a stella per rosette (o un coltello per fare 5 tagli a stella).',
                'Cottura con abbondante vapore nei primi 10 min a 240°C, poi togli il vapore e finisci a 220°C.',
                'Devono uscire dal forno molto chiare: se le togli dorate, diventano gommose raffreddandosi.',
                'L\'interno cavo si forma solo se l\'impasto è ben laminato e il forno è caldissimo.',
            ]
        },
        'baguette': {
            label: 'Baguette',
            description: 'Il pane francese per eccellenza. Crosta sottile e croccante, mollica aperta e leggera, grigne profonde. Richiede tecnica di formatura precisa e cottura con vapore.',
            idro: 72, sale: 2.0, grassi: 0, lievitanti: ['ldb', 'biga'],
            liev: 20, frigo: 14,
            pesoDefault: 280,   // baguette tradizionale ~250–300g
            lievOreNote: 'Le ore di frigo sono fondamentali per le grigne: non saltarle.',
            farinaLabel: 'Farina di Forza (T65)',
            farinaNote: 'W 260–300. Ideale farina tipo 0 di media forza o T65 francese.',
            tips: [
                'La formatura è tutto: pre-forma a cilindro, riposa 20 min, poi forma la baguette con pressione decisa.',
                'Le grigne (tagli) vanno fatti con lama da pane (grignette) a 30–45° rispetto all\'asse.',
                'Cottura: 250°C con vapore abbondante per 10–12 min, poi 230°C senza vapore per altri 10–12 min.',
                'La baguette perfetta suona vuota quando si batte il fondo.',
                'Consumala entro 4–6 ore: dopo ammorbidisce inevitabilmente.',
            ]
        },
        'panbauletto': {
            label: 'Pan Bauletto',
            description: 'Pane morbido in cassetta, a fette sottili. Struttura soffice e compatta, crosta delicata. Usato per toast, tramezzini e sandwich. Impasto leggermente arricchito con grassi.',
            idro: 62, sale: 1.8, grassi: 6, lievitanti: ['ldb', 'biga'],
            liev: 20, frigo: 0,
            pesoDefault: 600,   // stampo da plumcake standard
            farinaLabel: 'Farina 00 / 0',
            farinaNote: 'W 220–260. Non servono farine forti.',
            tips: [
                'Stendi l\'impasto in un rettangolo, arrotolalo stretto e mettilo nello stampo da plumcake.',
                'L\'impasto deve arrivare a 1 cm dal bordo prima di infornare.',
                'Cottura a 180°C per 30–35 min. Copri con alluminio se scurisce troppo in superficie.',
                'Per la crosta morbida, spennella con burro fuso appena uscito dal forno.',
                'Per le fette perfette, aspetta che sia completamente freddo prima di tagliare.',
            ]
        },
        'pane-carre': {
            label: 'Pan Carré',
            description: 'Pane in cassetta con coperchio: forma perfettamente rettangolare, mollica bianca uniforme e crosta quasi assente. Ideale per tramezzini e tartine. Leggermente più ricco del pan bauletto.',
            idro: 60, sale: 1.6, grassi: 8, lievitanti: ['ldb', 'biga'],
            liev: 18, frigo: 0,
            pesoDefault: 700,   // stampo carré standard
            farinaLabel: 'Farina 00',
            farinaNote: 'W 200–240. Farina debole per mollica tenera.',
            tips: [
                'È indispensabile lo stampo da pan carré con coperchio scorrevole.',
                'Riempi lo stampo al 70–75%: il coperchio chiuderà l\'espansione e darà la forma rettangolare.',
                'Cottura a 175°C per 35–40 min con coperchio chiuso per tutta la cottura.',
                'Non aprire il coperchio prima dei 30 min: l\'impasto collasserebbe.',
                'Il grasso (burro o olio) è fondamentale per la mollica morbida e setosa.',
            ]
        },
        'burger-bun': {
            label: 'Burger Bun',
            description: 'Panino morbido per hamburger. Struttura leggera, leggermente dolce, crosta morbida. Arricchito ma non brioche: meno burro, più latte, niente uova o pochissime. Con sesamo sopra.',
            idro: 58, sale: 1.8, grassi: 8, lievitanti: ['ldb', 'biga'],
            liev: 16, frigo: 8,
            pesoDefault: 95,    // bun classico ~90–100g
            farinaLabel: 'Farina 00 / 0',
            farinaNote: 'W 220–260.',
            extraIngredients: [
                { label: 'Zucchero', perc: 5, id: 'extra-zucchero', note: '3–7% sulla farina' },
                { label: 'Latte (in sostituzione parz. acqua)', perc: 30, id: 'extra-latte', note: '20–40% sulla farina' },
            ],
            tips: [
                'Forma palline tese da ~90–100g, schiacciale leggermente con il palmo per appiattirle.',
                'Prima della cottura, spennella con uovo sbattuto + latte e cospargi di semi di sesamo.',
                'Cottura a 190°C per 14–16 min: devono essere dorati ma morbidi al tatto.',
                'Per la superficie lucida e morbida, spennella con burro fuso appena usciti dal forno.',
                'Non esagerare con la farina durante la formatura: il bun deve restare morbido.',
            ]
        },
        'brezel-schwabisch': {
            label: 'Brezel Schwäbisch',
            description: 'La Brezel sveva: ventre (Bauch) spesso con incisione profonda che si apre in cottura (Ausbund), braccia (Ärmle) sottilissime e croccanti. Impasto ricco di burro. Tipica di Stuttgart, Ulm, Tübingen.',
            idro: 56, sale: 2.0, grassi: 6, lievitanti: ['ldb'],
            liev: 2, frigo: 0,
            pesoDefault: 80,
            farinaLabel: 'Farina 550 (tipo 0)',
            farinaNote: 'W 260–290. Farina di media forza per buona tenuta della forma.',
            extraIngredients: [
                { label: 'Burro', perc: 6, id: 'extra-burro-brezel', note: 'Schwäbisch: 4–8% burro morbido. Dà morbidezza alla mollica del Bauch.' },
            ],
            laugeBad: { naoh: 4, immersioneS: 4, sale: 'Brezelsalz (grani grossi)' },
            tips: [
                '⚠️ NaOH è caustica: guanti in nitrile, occhiali protettivi, niente alluminio.',
                'Forma filoni rastremati: il Bauch spesso ~2,5 cm, le braccia si assottigliano a filo (3–5 mm alle punte).',
                'Incrocia le braccia due volte e riporta le punte sul Bauch: la forma sveva è elegante e simmetrica.',
                'Dopo la formatura: 10–15 min in frigo (+4°C) scoperto — la superficie si asciuga e il bagno NaOH aderisce meglio.',
                'Bagno NaOH 4% a temperatura ambiente: 3–5 secondi per lato. Usa schiumarola forata, non pinze.',
                'Incidi subito dopo il bagno: taglio obliquo deciso sul Bauch, 3–4 mm di profondità. Si aprirà (Ausbund) in cottura.',
                'Cottura 220–230°C statico SENZA vapore, tiraggio aperto. 14–16 min. Braccia color mogano scuro, Bauch ambrato.',
            ]
        },
        'brezel-bavarese': {
            label: 'Brezn Bavarese',
            description: 'La Brezn bavarese (IGP UE 2014): spessore quasi uniforme, nessuna incisione — apertura rustica spontanea. Impasto più magro, crosta dura e scura, sapore di lauge netto. Simbolo di birrerie e Oktoberfest.',
            idro: 60, sale: 2.0, grassi: 2, lievitanti: ['ldb'],
            liev: 2, frigo: 0,
            pesoDefault: 100,
            farinaLabel: 'Farina 550 / 812 (tipo 0 / 1)',
            farinaNote: 'W 270–300. Una quota di farina 812 intensifica colore e aroma.',
            laugeBad: { naoh: 4, immersioneS: 5, sale: 'Brezelsalz grosso' },
            tips: [
                '⚠️ NaOH è caustica: guanti in nitrile, occhiali protettivi, niente alluminio.',
                'Forma il filone con spessore relativamente uniforme (Ø 2–2,5 cm), punte solo leggermente assottigliate.',
                'Dopo la formatura: 10–15 min in frigo (+4°C) scoperto prima del bagno.',
                'Bagno NaOH 4% a temperatura ambiente: 4–6 secondi per lato. Usa schiumarola forata.',
                'NON incidere: l\'apertura rustica spontanea è il segno distintivo della Brezn bavarese.',
                'Cottura 220–230°C statico SENZA vapore, tiraggio aperto. 16–20 min. Crosta uniformemente color mogano.',
                'Spruzzo d\'acqua fredda appena sfornata per crosta più lucida e croccante.',
            ]
        },
    };

    // ── Elementi DOM ─────────────────────────────────────────────────────────
    const el = {
        pezzi:         document.getElementById('pezzi'),
        peso:          document.getElementById('peso'),
        idro:          document.getElementById('idro'),
        sale:          document.getElementById('sale-perc'),
        grassi:        document.getElementById('grassi-perc'),
        liev:          document.getElementById('ore-liev'),
        frigo:         document.getElementById('ore-frigo'),
        temp:          document.getElementById('temp-amb'),
        // lievitante
        lievGroup:     document.getElementById('liev-tipo-group'),
        lmGroup:       document.getElementById('lm-options'),
        bigaGroup:     document.getElementById('biga-options'),
        brezelGroup:   document.getElementById('brezel-options'),
        brezelDesc:    document.getElementById('brezel-variante-desc'),
        lmPerc:        document.getElementById('lm-perc'),
        bigaPerc:      document.getElementById('biga-perc'),
        idroBiga:      document.getElementById('idro-biga'),
        // extra ingredienti (burger bun)
        extraSection:  document.getElementById('extra-section'),
        // output
        outTotale:     document.getElementById('out-totale'),
        outFarina:     document.getElementById('out-farina'),
        outAcqua:      document.getElementById('out-acqua'),
        outSale:       document.getElementById('out-sale'),
        outGrassi:     document.getElementById('out-grassi'),
        outLm:         document.getElementById('out-lm'),
        outLdb:        document.getElementById('out-ldb'),
        outBiga:       document.getElementById('out-biga-box'),
        outBigaFarina: document.getElementById('out-biga-farina'),
        outBigaAcqua:  document.getElementById('out-biga-acqua'),
        outBigaLdb:    document.getElementById('out-biga-ldb'),
        outForza:      document.getElementById('out-forza'),
        outFarinaNote: document.getElementById('out-farina-note'),
        extraResults:  document.getElementById('extra-results'),
        timeline:      document.getElementById('timeline'),
        tips:          document.getElementById('tips-section'),
        error:         document.getElementById('error-message'),
        typeDesc:      document.getElementById('type-description'),
    };

    let currentType = 'bianco';

    // ── Helper Brezel ─────────────────────────────────────────────────────────
    function getBrezelVariante() {
        return document.querySelector('input[name="brezel-variante"]:checked')?.value || 'schwabisch';
    }
    function getEffectiveType() {
        if (currentType !== 'brezel') return currentType;
        return getBrezelVariante() === 'bavarese' ? 'brezel-bavarese' : 'brezel-schwabisch';
    }
    function updateBrezelDesc() {
        if (!el.brezelDesc) return;
        const b = BREADS[getEffectiveType()];
        if (b) el.brezelDesc.textContent = b.description;
    }

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

    function loadDefaults(type) {
        const effType = type === 'brezel' ? getEffectiveType() : type;
        const b = BREADS[effType];
        if (!b) return;
        el.idro.value   = b.idro;
        el.sale.value   = b.sale;
        el.grassi.value = b.grassi;
        el.liev.value   = b.liev;
        el.frigo.value  = b.frigo || 0;
        if (b.pesoDefault) el.peso.value = b.pesoDefault;
        el.typeDesc.textContent = b.description;

        // Mostra/nascondi switch Brezel e selettore lievitante
        if (el.brezelGroup) el.brezelGroup.style.display = (type === 'brezel') ? 'block' : 'none';
        if (el.lievGroup)   el.lievGroup.style.display   = (type === 'brezel') ? 'none'  : 'block';
        if (type === 'brezel') updateBrezelDesc();

        updateLievOptions(effType);
        renderExtraInputs(effType);
    }

    function updateLievOptions(type) {
        const b = BREADS[type];
        const supported = b.lievitanti;
        // Resetta radio: seleziona il primo disponibile
        const radios = document.querySelectorAll('input[name="liev-tipo"]');
        let firstValid = null;
        radios.forEach(r => {
            const label = r.nextElementSibling;
            const available = supported.includes(r.value);
            if (label) {
                label.style.opacity = available ? '1' : '0.35';
                label.style.pointerEvents = available ? 'auto' : 'none';
            }
            if (available && !firstValid) firstValid = r;
        });
        if (firstValid && !supported.includes(getRadio('liev-tipo'))) {
            firstValid.checked = true;
        }
        updateLievVisibility();
    }

    function updateLievVisibility() {
        const tipo = getRadio('liev-tipo');
        el.lmGroup.style.display   = tipo === 'lm'   ? 'block' : 'none';
        el.bigaGroup.style.display = tipo === 'biga' ? 'block' : 'none';
    }

    function renderExtraInputs(type) {
        const b = BREADS[type];
        if (!b.extraIngredients || b.extraIngredients.length === 0) {
            el.extraSection.style.display = 'none';
            el.extraSection.innerHTML = '';
            return;
        }
        el.extraSection.style.display = 'block';
        el.extraSection.innerHTML = `
            <h3 class="extra-title">Ingredienti Aggiuntivi</h3>
            <div class="form-grid">
                ${b.extraIngredients.map(ing => `
                <div class="input-group">
                    <label for="${ing.id}">${ing.label} (% farina)</label>
                    <input type="number" id="${ing.id}" value="${ing.perc}" min="0" step="0.5">
                    <small>${ing.note}</small>
                </div>`).join('')}
            </div>`;
        // Re-attach listeners for new inputs
        el.extraSection.querySelectorAll('input').forEach(i => i.addEventListener('input', calculate));
    }

    // ── Listener generici ─────────────────────────────────────────────────────
    document.querySelectorAll('input').forEach(i => i.addEventListener('input', () => {
        updateLievVisibility();
        calculate();
    }));

    // Switch variante Brezel
    document.querySelectorAll('input[name="brezel-variante"]').forEach(r => {
        r.addEventListener('change', () => {
            if (currentType === 'brezel') {
                loadDefaults('brezel');
                calculate();
            }
        });
    });

    // ── Calcolo ───────────────────────────────────────────────────────────────
    function calculate() {
        el.error.style.display = 'none';
        const effType = getEffectiveType();
        const b = BREADS[effType];
        if (!b) return;

        const pezzi  = parseFloat(el.pezzi.value)  || 0;
        const peso   = parseFloat(el.peso.value)   || 0;
        const idro   = parseFloat(el.idro.value)   || 0;
        const saleP  = parseFloat(el.sale.value)   || 0;
        const grassiP= parseFloat(el.grassi.value) || 0;
        const lievH  = parseFloat(el.liev.value)   || 0;
        const frigoH = parseFloat(el.frigo.value)  || 0;
        const temp   = parseFloat(el.temp.value)   || 20;
        const tipo   = getRadio('liev-tipo');
        const lmP    = parseFloat(el.lmPerc.value) || 20;
        const bigaP  = parseFloat(el.bigaPerc.value) || 35;
        const idroBiga = parseFloat(el.idroBiga.value) || 45;

        if (pezzi <= 0 || peso <= 0) {
            showError('Inserisci numero di pezzi e peso validi.');
            return;
        }
        if (frigoH > 0 && frigoH >= lievH) {
            showError('Le ore di frigo non possono superare le ore di lievitazione totali.');
        }

        // ── Baker's percentage ────────────────────────────────────────────────
        const totDough = pezzi * peso;
        const lmContrib = tipo === 'lm' ? lmP : 0;
        // biga porta farina + acqua già conteggiate nella farina totale
        const totalPerc = 100 + idro + saleP + grassiP + lmContrib;
        const farina = (totDough / totalPerc) * 100;
        const acqua  = farina * idro / 100;
        const sale   = farina * saleP / 100;
        const grassi = farina * grassiP / 100;
        const lmPeso = farina * lmContrib / 100;

        // ── Biga ─────────────────────────────────────────────────────────────
        let bigaFarina = 0, bigaAcqua = 0, bigaLdb = 0;
        if (tipo === 'biga') {
            bigaFarina = farina * bigaP / 100;
            bigaAcqua  = bigaFarina * idroBiga / 100;
            bigaLdb    = bigaFarina * 0.005;  // 0.5% LDB su farina biga (range pro: 0.3–0.5% a 18°C)
        }

// ── LDB ──────────────────────────────────────────────────────────────
        // Formula professionale (ref: Hamelman "Bread", Suas "Advanced Bread &
        // Pastry", tabelle Lallemand/Lesaffre per lievito fresco).
        //
        // Modello: ldb% = K / (T^1.5 × H_equiv^0.9) × f_sale × f_grassi
        //
        // H_equiv converte le ore di frigo in ore-equivalenti a T_amb,
        // usando il rapporto di attività del lievito stimato con Arrhenius:
        //   attività(T) ∝ exp(-Ea/R × 1/T_K)   con Ea≈60 kJ/mol (lievito S.cerevisiae)
        //   F_frigo = act(4°C) / act(T_amb)
        // A 20°C → F_frigo ≈ 0.18  (1h frigo ≈ 11 min a 20°C)
        // A 25°C → F_frigo ≈ 0.13
        // A 18°C → F_frigo ≈ 0.21
        //
        // H_amb = lievH - frigoH  (ore a temperatura ambiente)
        // H_equiv = H_amb + frigoH × F_frigo

        const Ea_R   = 7220;                         // Ea/R in Kelvin (60 kJ/mol / 8.314)
        const T_K    = Math.max(10, temp) + 273.15;  // temperatura ambiente in Kelvin
        const T_fridge_K = 277.15;                   // 4°C in Kelvin

        const actAmb    = Math.exp(-Ea_R / T_K);
        const actFridge = Math.exp(-Ea_R / T_fridge_K);
        const F_frigo   = actFridge / actAmb;        // tipicamente 0.13–0.22

        const H_amb   = Math.max(0, lievH - frigoH);
        const H_equiv = H_amb + frigoH * F_frigo;

        const T_eff  = Math.max(10, temp);
        const H_eff  = Math.max(1, H_equiv);
        const fSale  = 1 + saleP  * 0.04;
        const fGrassi= 1 + grassiP * 0.03;

        const yeastPerc = (150 / (Math.pow(T_eff, 1.5) * Math.pow(H_eff, 0.9)))
                          * fSale * fGrassi;

        let ldb = 0;
        if (tipo === 'ldb') {
            ldb = farina * Math.min(3, Math.max(0.05, yeastPerc)) / 100;
        } else if (tipo === 'biga') {
            ldb = 0;
        }
        ldb = Math.max(0, ldb);

        // ── Forza farina ─────────────────────────────────────────────────────
        const wCalc = 81.42 + 78.39 * Math.log(lievH);
        const wRound = Math.round(wCalc / 10) * 10;

        // ── Extra ingredienti ─────────────────────────────────────────────────
        let extraHTML = '';
        if (b.extraIngredients) {
            extraHTML = b.extraIngredients.map(ing => {
                const inp = document.getElementById(ing.id);
                if (!inp) return '';
                const perc = parseFloat(inp.value) || 0;
                const qty  = farina * perc / 100;
                return `<div class="result-item-extra">
                    <span class="label">${ing.label}:</span>
                    <span class="value">${fmt(qty)} g</span>
                </div>`;
            }).join('');
        }
        // Brezel: mostra info lauge
        if (b.laugeBad) {
            const lg = b.laugeBad;
            extraHTML += `
                <div class="result-item-extra" style="margin-top:6px;padding-top:8px;border-top:1px dashed var(--border)">
                    <span class="label">⚗️ Soluzione NaOH:</span>
                    <span class="value">${lg.naoh}% in acqua fredda</span>
                </div>
                <div class="result-item-extra">
                    <span class="label">Immersione:</span>
                    <span class="value">${lg.immersioneS}–${lg.immersioneS + 2} sec/lato</span>
                </div>
                <div class="result-item-extra">
                    <span class="label">Sale superficie:</span>
                    <span class="value">${lg.sale}</span>
                </div>`;
        }

        // ── Output ────────────────────────────────────────────────────────────
        el.outTotale.textContent    = fmt(totDough)  + ' g';
        el.outFarina.textContent    = fmt(farina)    + ' g';
        el.outAcqua.textContent     = fmt(acqua)     + ' g';
        el.outSale.textContent      = fmtD(sale)     + ' g';
        el.outGrassi.textContent    = grassiP > 0 ? fmtD(grassi) + ' g' : '—';
        el.outLm.textContent        = tipo === 'lm' ? fmt(lmPeso) + ' g' : '—';
        el.outLdb.textContent       = tipo === 'ldb' ? fmtD(ldb) + ' g fresco' : '—';
        el.outForza.textContent     = `W ${wRound}`;
        el.outFarinaNote.textContent = b.farinaNote;

        // Biga
        if (tipo === 'biga') {
            el.outBiga.style.display    = 'block';
            el.outBigaFarina.textContent = fmt(bigaFarina) + ' g farina';
            el.outBigaAcqua.textContent  = fmt(bigaAcqua)  + ' g acqua';
            el.outBigaLdb.textContent    = fmtD2(bigaLdb)  + ' g LDB (1%)';
        } else {
            el.outBiga.style.display = 'none';
        }

        // Extra
        el.extraResults.innerHTML = extraHTML;

        // Timeline e consigli
        renderTimeline(tipo, effType, temp, lievH, frigoH);
        renderTips(effType);
    }

    // ── Timeline ─────────────────────────────────────────────────────────────
    function renderTimeline(tipo, type, temp, lievH, frigoH) {
        const b  = BREADS[type];
        if (!b) return;
        const tF = temp >= 26 ? 0.75 : temp >= 22 ? 1.0 : temp >= 18 ? 1.3 : 1.6;
        const steps = [];

        if (type === 'brezel-schwabisch' || type === 'brezel-bavarese') {
            const isSchwab = type === 'brezel-schwabisch';
            steps.push({ icon: '🍳', label: 'Impastamento', duration: '8–12 min',
                note: isSchwab
                    ? 'Sciogli LDB in acqua tiepida (max 30°C). Aggiungi farina, sale, burro morbido a pezzi. Impasta fino a superficie liscia e tenace. Impasto sodo: è normale.'
                    : 'Sciogli LDB in acqua tiepida. Aggiungi farina e sale. Impasta energicamente fino a impasto liscio e ben incordato.' });
            steps.push({ icon: '📈', label: 'Puntatura', duration: formatH(tF * 0.75),
                note: 'Copri con pellicola. Attendi ~50% di aumento. Non esagerare: i Brezel si formano prima del pieno sviluppo.' });
            steps.push({ icon: '✋', label: 'Formatura', duration: '15–25 min',
                note: isSchwab
                    ? 'Preforma a cilindro, riposa 5 min. Stendi ogni pezzo: Bauch spesso ~2,5 cm, braccia a filo (3–5 mm). Incrocia le braccia due volte e riporta le punte sul Bauch.'
                    : 'Preforma a cilindro, riposa 5 min. Stendi a filone con spessore uniforme (Ø ~2 cm), punte solo leggermente assottigliate. Forma la curva, incrocia le braccia.' });
            steps.push({ icon: '❄️', label: 'Riposo pre-lauge', duration: '10–20 min',
                note: 'Teglia con carta forno in frigo (+4°C), scoperto. La superficie si asciuga: il bagno NaOH aderisce meglio.' });
            steps.push({ icon: '⚗️', label: `Bagno NaOH ${b.laugeBad.naoh}%`, duration: `${b.laugeBad.immersioneS}–${b.laugeBad.immersioneS + 2} sec/lato`,
                note: '⚠️ Guanti in nitrile, occhiali, niente alluminio. Aggiungi sempre NaOH all\'acqua fredda (mai il contrario). Immergi con schiumarola forata.' });
            steps.push({ icon: '🧂', label: 'Salatura', duration: '1 min',
                note: `Cospargi subito con ${b.laugeBad.sale} mentre la superficie è ancora umida e appiccicosa.` });
            if (isSchwab) {
                steps.push({ icon: '🔪', label: 'Incisione Bauch', duration: '1–2 min',
                    note: 'Lama da pane o rasoio: taglio netto sul ventre, obliquo (30–45°), profondo 3–4 mm. Si aprirà (Ausbund) durante la cottura. La Brezn bavarese NON si incide.' });
            }
            steps.push({ icon: '🔥', label: 'Cottura', duration: isSchwab ? '14–16 min a 220–230°C' : '16–20 min a 220–230°C',
                note: 'Forno STATICO, SENZA vapore, tiraggio aperto (cucchiaio nello sportello). Sveba: braccia mogano scuro, Bauch ambrato. Bavarese: tutto uniformemente color mogano.' });
            steps.push({ icon: '💨', label: 'Raffreddamento', duration: '5–10 min',
                note: isSchwab
                    ? 'Consuma entro 1–2 ore: le braccia sottili perdono croccantezza velocemente.'
                    : 'Facoltativo: spruzza acqua fredda appena sfornata per crosta più lucida. Ideale fresca, entro 2–3 ore.' });

        } else {
            if (tipo === 'biga') {
                steps.push({ icon: '🌙', label: 'Prepara la Biga', duration: '5 min', note: 'Mescola farina + acqua fredda + 1% LDB brevemente (non impastare, deve restare grumosa). Copri e lascia fermentare a 18°C per 16–18 ore.' });
            }
            const kneadTime = type === 'rosette' ? '20–25 min' : '10–15 min';
            const kneadNote = type === 'rosette'
                ? 'Impasta energicamente. Per le rosette è fondamentale l\'incordatura forte.'
                : tipo === 'lm'
                    ? 'Sciogli il LM nell\'acqua, aggiungi farina e sale. Incorda bene.'
                    : tipo === 'biga'
                        ? 'Spezza la biga in pezzi, aggiungi la farina restante + acqua + sale. Incorda fino a impasto liscio.'
                        : 'Sciogli il LDB nell\'acqua tiepida, aggiungi farina e sale. Impasta fino a impasto liscio ed elastico.';
            steps.push({ icon: '🍳', label: 'Impastamento', duration: kneadTime, note: kneadNote });
            if (type === 'rosette') {
                steps.push({ icon: '📄', label: 'Laminatura', duration: '15 min', note: 'Stendi l\'impasto sottile con il mattarello, piega a portafoglio, ruota di 90° e ripeti 3–4 volte. Questo crea la struttura cava.' });
            }
            const rise1note = tipo === 'lm'
                ? 'LM: l\'impasto deve raddoppiare o quasi. Con LM i tempi sono indicativi.'
                : 'Copri con pellicola. L\'impasto deve aumentare di circa il 50–70%.';
            const rise1time = tipo === 'lm' ? formatH(tF * 3) : formatH(tF * 1.5);
            steps.push({ icon: '📈', label: 'Prima Lievitazione', duration: rise1time, note: rise1note });
            if (frigoH > 0) {
                steps.push({ icon: '❄️', label: 'Maturazione in Frigo', duration: `${frigoH} ore`, note: 'Trasferisci in frigo (4–6°C). La maturazione lenta sviluppa aroma e migliora la struttura del glutine.' });
                steps.push({ icon: '🌡️', label: 'Acclimatazione', duration: '1–2 ore', note: 'Tira fuori dal frigo e lascia riportare a temperatura ambiente prima di formare.' });
            }
            const shapeNote = {
                'bianco':       'Forma a pagnotta o filone con tensione in superficie. Le bolle d\'aria nella mollica si formano qui.',
                'semola':       'Forma a pagnotta tonda (ciambella per il tipo Altamura) o filone.',
                'farine-varie': 'Con impasti integrali la formatura è più delicata: non sgonfiare troppo.',
                'rosette':      'Premi il centro con il pollice o usa lo stampo a stella. Disponi sulla teglia con il taglio verso il basso.',
                'baguette':     'Pre-forma a cilindro, riposa 20 min coperto, poi forma la baguette con pressione decisa sull\'asse.',
                'panbauletto':  'Stendi a rettangolo e arrotola stretto. Metti nello stampo da plumcake con la chiusura verso il basso.',
                'pane-carre':   'Forma un filone, mettilo nello stampo carré. Riempi lo stampo al 70–75% e chiudi con il coperchio.',
                'burger-bun':   'Forma palline da ~90–100g, schiacciale leggermente con il palmo e disponi distanziate sulla teglia.',
            };
            steps.push({ icon: '✋', label: 'Formatura', duration: '10–20 min', note: shapeNote[type] || 'Forma i pezzi e disponili sulla teglia o nello stampo.' });
            const rise2time = tipo === 'lm' ? formatH(tF * 3.5) : formatH(tF * 1.2);
            const rise2note = type === 'pane-carre'
                ? 'Con coperchio chiuso. L\'impasto deve arrivare al bordo dello stampo.'
                : 'Copri con pellicola o un canovaccio umido. I pezzi devono essere visibilmente gonfi e soffici al tatto.';
            steps.push({ icon: '🌤️', label: 'Apretto (2ª lievitazione)', duration: rise2time, note: rise2note });
            if (type !== 'panbauletto' && type !== 'pane-carre' && type !== 'burger-bun') {
                steps.push({ icon: '🔪', label: 'Incisione', duration: '2 min', note: 'Incidi la superficie con lama affilata (grignette o rasoio). Permette all\'impasto di espandersi in modo controllato.' });
            }
            const bakeInfo = {
                'bianco':       '250°C + vapore 15 min → 210°C 20–25 min',
                'semola':       '230°C + vapore 20 min → 200°C 30–35 min',
                'farine-varie': '220°C + vapore 15 min → 200°C 25–30 min',
                'rosette':      '240°C + vapore 10 min → 220°C 10–12 min',
                'baguette':     '250°C + vapore 12 min → 230°C 10–12 min',
                'panbauletto':  '180°C statico 30–35 min (no vapore)',
                'pane-carre':   '175°C statico 35–40 min con coperchio chiuso',
                'burger-bun':   '190°C statico 14–16 min (no vapore)',
            };
            steps.push({ icon: '🔥', label: 'Cottura', duration: bakeInfo[type] || '—', note: 'Forno statico. Il pane è pronto quando suona vuoto battendo il fondo.' });
            steps.push({ icon: '💨', label: 'Raffreddamento', duration: '30–60 min', note: 'Lascia raffreddare su una griglia. Non tagliare il pane caldo: la mollica è ancora in formazione.' });
        }

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
            </div>`).join('');
    }

    // ── Tips ─────────────────────────────────────────────────────────────────
    function renderTips(type) {
        const b = BREADS[type];
        if (!b || !b.tips) return;
        el.tips.innerHTML = `
            <h3><span class="icon">💡</span> Consigli — ${b.label}</h3>
            <ul class="tips-list">
                ${b.tips.map(t => `<li>${t}</li>`).join('')}
            </ul>`;
    }

    // ── Utilità ───────────────────────────────────────────────────────────────
    function getRadio(name) {
        return document.querySelector(`input[name="${name}"]:checked`)?.value || null;
    }
    function fmt(n)    { return Math.round(n); }
    function fmtD(n)   { return n.toFixed(1).replace('.', ','); }
    function fmtD2(n)  { return n.toFixed(2).replace('.', ','); }
    function formatH(h) {
        const hh = Math.round(h * 2) / 2;
        return hh < 1 ? `${Math.round(hh * 60)} min` : `${hh} ore`;
    }
    function showError(msg) {
        el.error.textContent = msg;
        el.error.style.display = 'block';
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    loadDefaults('bianco');
    calculate();
});
