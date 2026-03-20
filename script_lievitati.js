/**
 * Calcolatore Grandi Lievitati Professionali - VERSIONE CORRETTA
 * Panettone, Pandoro, Colomba — Doppio Impasto
 *
 * RICETTE PROFESSIONALI ITALIANE (su farina = 100%):
 * Fonti: Iginio Massari, Piergiorgio Giorilli, Achille Zoia, Rolando Morandin
 *
 * ── PANETTONE ──────────────────────────────────────────────
 *   Burro:         48 – 55 %  (default 50%)
 *   Tuorli:        28 – 35 %  (default 30%)
 *   Zucchero:      28 – 35 %  (default 30%)
 *   Acqua:         32 – 40 %  (default 35%)
 *   Sale:           0.8 – 1.2 % (default 1%)
 *   Miele:          2 – 4 %   (default 3%)
 *   Uvetta:        30 – 40 %  (default 35%)
 *   Canditi:       35 – 45 %  (default 40%)
 *   Pasta arancia:  50-70 g per kg farina
 *   Vaniglia:      1 bacca per kg farina
 *   LM solido:     18 – 25 %  (default 20%)
 *   Forza farina:  W 340–380
 *
 * ── PANDORO ────────────────────────────────────────────────
 *   Burro:         52 – 60 %  (default 55%)
 *   Uova intere:   65 – 80 %  (default 70%)
 *   Zucchero:      28 – 35 %  (default 30%)
 *   Sale:           0.8 – 1.2 % (default 1%)
 *   Miele:          1 – 3 %   (default 2%)
 *   Scorza limone:  12–15 g/kg farina
 *   Vaniglia:      2 bacche per kg farina
 *   LM solido:     18 – 25 %  (default 20%)
 *   Forza farina:  W 360–400
 *
 * ── COLOMBA ────────────────────────────────────────────────
 *   Burro:         46 – 52 %  (default 48%)
 *   Tuorli:        26 – 32 %  (default 28%)
 *   Zucchero:      26 – 32 %  (default 28%)
 *   Acqua:         28 – 32 %  (default 30%)
 *   Sale:           0.8 – 1.2 % (default 1%)
 *   Miele:          2 – 4 %   (default 3%)
 *   Canditi arancia:  18–25 % (default 20%)
 *   Pasta arancia:  50-70 g per kg farina
 *   Vaniglia:        1 bacca per kg farina
 *   LM solido:       18 – 25 % (default 20%)
 *   Forza farina:    W 340–380
 *   
 *   Glassatura:
 *   - Albumi:        15% farina
 *   - Zucchero:      15% farina
 *   - Mandorle grana: 12% farina
 *   - Granella:       8% farina
 *
 * ── DOPPIO IMPASTO (80/20) ─────────────────────────────────
 *   Primo impasto (80% farina):
 *     - Farina 80%
 *     - LM/Biga totale
 *     - Zucchero 50% del totale
 *     - Tuorli/Uova 40% del totale
 *     - Acqua/Latte totale
 *     - Burro 40% del totale
 *     - Miele metà
 *   
 *   Secondo impasto (20% farina):
 *     - Farina 20%
 *     - Burro 60% del totale
 *     - Zucchero 50% del totale
 *     - Tuorli/Uova 60% del totale
 *     - Sale totale
 *     - Miele metà
 *     - LDB rinforzo (se metodo misto)
 *     - Aromi (vaniglia, scorze)
 *     - Inerti (uvetta, canditi, gocce)
 */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Elementi UI ──────────────────────────────────────────────────────────
    const el = {
        // Tipo prodotto
        tipoProdotto: document.querySelectorAll('input[name="tipo-prodotto"]'),

        // Input condivisi
        numStampi: document.getElementById('num-stampi'),
        pesoStampo: document.getElementById('peso-stampo'),
        tempAmbiente: document.getElementById('temp-ambiente'),

        // Tipo lievitazione
        tipoLiev: document.querySelectorAll('input[name="tipo-liev"]'),

        // Sezione LM
        lmGroup: document.getElementById('lm-group'),
        percLm: document.getElementById('perc-lm'),

        // Sezione Biga
        bigaGroup: document.getElementById('biga-group'),
        percBiga: document.getElementById('perc-biga'),
        idroBiga: document.getElementById('idro-biga'),
        tempBiga: document.getElementById('temp-biga'),

        // Sezione LDB
        ldbGroup: document.getElementById('ldb-group'),

        // Percentuali Panettone
        panettoneGroup: document.getElementById('panettone-group'),
        percBurroPanettone: document.getElementById('perc-burro-panettone'),
        percTuorliPanettone: document.getElementById('perc-tuorli-panettone'),
        percZuccheroPanettone: document.getElementById('perc-zucchero-panettone'),
        percAcquaPanettone: document.getElementById('perc-acqua-panettone'),
        percSalePanettone: document.getElementById('perc-sale-panettone'),
        percMielePanettone: document.getElementById('perc-miele-panettone'),
        percUvettaPanettone: document.getElementById('perc-uvetta-panettone'),
        percCanditiPanettone: document.getElementById('perc-canditi-panettone'),

        // Percentuali Pandoro
        pandoroGroup: document.getElementById('pandoro-group'),
        percBurroPandoro: document.getElementById('perc-burro-pandoro'),
        percUovaPandoro: document.getElementById('perc-uova-pandoro'),
        percZuccheroPandoro: document.getElementById('perc-zucchero-pandoro'),
        percSalePandoro: document.getElementById('perc-sale-pandoro'),
        percMielePandoro: document.getElementById('perc-miele-pandoro'),

        // Percentuali Colomba
        colombaGroup: document.getElementById('colomba-group'),
        percBurroColomba: document.getElementById('perc-burro-colomba'),
        percTuorliColomba: document.getElementById('perc-tuorli-colomba'),
        percZuccheroColomba: document.getElementById('perc-zucchero-colomba'),
        percAcquaColomba: document.getElementById('perc-acqua-colomba'),
        percSaleColomba: document.getElementById('perc-sale-colomba'),
        percMieleColomba: document.getElementById('perc-miele-colomba'),
        percCanditiColomba: document.getElementById('perc-canditi-colomba'),

        // Output primo impasto
        primoImpastoTotale: document.getElementById('primo-impasto-totale'),
        primoFarina: document.getElementById('primo-farina'),
        primoLievitazione: document.getElementById('primo-lievitazione'),
        primoZucchero: document.getElementById('primo-zucchero'),
        primoUova: document.getElementById('primo-uova'),
        primoLiquidi: document.getElementById('primo-liquidi'),
        primoMiele: document.getElementById('primo-miele'),
        primoBurro: document.getElementById('primo-burro'),
        primoLievLabel: document.getElementById('primo-liev-label'),
        primoUovaLabel: document.getElementById('primo-uova-label'),
        primoLiquidiLabel: document.getElementById('primo-liquidi-label'),

        // Output secondo impasto
        secondoImpastoTotale: document.getElementById('secondo-impasto-totale'),
        secondoFarina: document.getElementById('secondo-farina'),
        secondoBurro: document.getElementById('secondo-burro'),
        secondoZucchero: document.getElementById('secondo-zucchero'),
        secondoUova: document.getElementById('secondo-uova'),
        secondoSale: document.getElementById('secondo-sale'),
        secondoLdb: document.getElementById('secondo-ldb'),
        secondoLdbItem: document.getElementById('secondo-ldb-item'),
        secondoUovaLabel: document.getElementById('secondo-uova-label'),
        aromiGrid: document.getElementById('aromi-grid'),

        // Output biga
        outBigaFarina: document.getElementById('out-biga-farina'),
        outBigaAcqua: document.getElementById('out-biga-acqua'),
        outBigaLdb: document.getElementById('out-biga-ldb'),
        outBigaTacqua: document.getElementById('out-biga-tacqua'),

        // Output glassatura colomba
        glassaColombaSection: document.getElementById('glassa-colomba-section'),
        glassaAlbumi: document.getElementById('glassa-albumi'),
        glassaZucchero: document.getElementById('glassa-zucchero'),
        glassaMandorle: document.getElementById('glassa-mandorle'),
        glassaGranella: document.getElementById('glassa-granella'),

        // Output totali
        impastoTotale: document.getElementById('impasto-totale'),
        outFarinaTotale: document.getElementById('out-farina-totale'),
        outForza: document.getElementById('out-forza'),
        pesoPerStampo: document.getElementById('peso-per-stampo'),

        // Rinfreschi
        rinfreschiSection: document.getElementById('rinfreschi-section'),
        outLmStart: document.getElementById('out-lm-start'),
        outRinfresco1: document.getElementById('out-rinfresco-1'),
        outRinfresco2: document.getElementById('out-rinfresco-2'),
        outRinfresco3: document.getElementById('out-rinfresco-3'),

        // Timeline
        timelineSection: document.getElementById('timeline-section'),
        outTimeline: document.getElementById('out-timeline'),

        errorMessage: document.getElementById('error-message')
    };

    // ─── Main Calculate ───────────────────────────────────────────────────────
    function calculate() {
        el.errorMessage.style.display = 'none';

        const prodotto = getRadio('tipo-prodotto');
        const tipoLiev = getRadio('tipo-liev');
        const numStampi = parseFloat(el.numStampi.value);
        const pesoStampo = parseFloat(el.pesoStampo.value);
        const tempAmbiente = parseFloat(el.tempAmbiente?.value || 20);

        // Validazione
        if ([numStampi, pesoStampo].some(isNaN)) {
            showError('Controlla i valori: numero stampi e peso devono essere numerici.');
            return;
        }

        // Mostra/nascondi sezioni
        updateLievVisibility(tipoLiev);
        updateProdottoVisibility(prodotto);

        // ── Percentuali ingredienti ─────────────────────────────────────────
        let percBurro, percUovaOTuorli, percZucchero, percAcquaOLatte, percSale, percMiele;
        let percUvetta = 0, percCanditi = 0;
        let aromiList = [];

        if (prodotto === 'panettone') {
            percBurro = parseFloat(el.percBurroPanettone.value);
            percUovaOTuorli = parseFloat(el.percTuorliPanettone.value);
            percZucchero = parseFloat(el.percZuccheroPanettone.value);
            percAcquaOLatte = parseFloat(el.percAcquaPanettone.value);
            percSale = parseFloat(el.percSalePanettone.value);
            percMiele = parseFloat(el.percMielePanettone.value);
            percUvetta = parseFloat(el.percUvettaPanettone.value);
            percCanditi = parseFloat(el.percCanditiPanettone.value);
            aromiList = [
                { nome: 'Pasta arancia', valore: '50–70 g/kg farina' },
                { nome: 'Vaniglia', valore: '1 bacca/kg farina' }
            ];
        } else if (prodotto === 'pandoro') {
            percBurro = parseFloat(el.percBurroPandoro.value);
            percUovaOTuorli = parseFloat(el.percUovaPandoro.value);
            percZucchero = parseFloat(el.percZuccheroPandoro.value);
            percAcquaOLatte = 0; // Il pandoro non ha acqua o latte!
            percSale = parseFloat(el.percSalePandoro.value);
            percMiele = parseFloat(el.percMielePandoro.value);
            aromiList = [
                { nome: 'Scorza limone', valore: '12–15 g/kg farina' },
                { nome: 'Vaniglia', valore: '2 bacche/kg farina' }
            ];
        } else { // colomba
            percBurro = parseFloat(el.percBurroColomba.value);
            percUovaOTuorli = parseFloat(el.percTuorliColomba.value);
            percZucchero = parseFloat(el.percZuccheroColomba.value);
            percAcquaOLatte = parseFloat(el.percAcquaColomba.value);
            percSale = parseFloat(el.percSaleColomba.value);
            percMiele = parseFloat(el.percMieleColomba.value);
            percCanditi = parseFloat(el.percCanditiColomba.value);
            aromiList = [
                { nome: 'Pasta arancia', valore: '50–70 g/kg farina' },
                { nome: 'Vaniglia', valore: '1 bacca/kg farina' }
            ];
        }

        // ── Calcolo peso impasto ────────────────────────────────────────────
        const perdita = 0.08; // 8% perdita in cottura
        const pesoFinale = numStampi * pesoStampo;
        const pesoImpastoCrudo = pesoFinale / (1 - perdita);

        // ── Calcolo farina da percentuali ───────────────────────────────────
        const sommaPerc = 100 + percBurro + percUovaOTuorli + percZucchero + 
                         percAcquaOLatte + percSale + percMiele + 
                         percUvetta + percCanditi;
        const farina = (pesoImpastoCrudo / sommaPerc) * 100;

        // ── Ingredienti totali ──────────────────────────────────────────────
        const burro = (farina * percBurro) / 100;
        const uovaTuorli = (farina * percUovaOTuorli) / 100;
        const zucchero = (farina * percZucchero) / 100;
        const acquaLatte = (farina * percAcquaOLatte) / 100;
        const sale = (farina * percSale) / 100;
        const miele = (farina * percMiele) / 100;
        const uvetta = (farina * percUvetta) / 100;
        const canditi = (farina * percCanditi) / 100;

        // ── Forza farina consigliata ────────────────────────────────────────
        let wMin, wMax;
        if (prodotto === 'panettone' || prodotto === 'colomba') {
            wMin = 340; wMax = 380;
        } else {
            wMin = 360; wMax = 400;
        }

        // ── Lievitazione ────────────────────────────────────────────────────
        const percLm = parseFloat(el.percLm.value);
        const percBigaFarina = parseFloat(el.percBiga.value);
        const idroBiga = parseFloat(el.idroBiga.value) / 100;
        const tempBiga = parseFloat(el.tempBiga.value);

        let lmPeso = 0, ldbPeso = 0;
        let bigaFarina = 0, bigaAcqua = 0, bigaLdb = 0, bigaTacqua = 0;
        let rinfreschi = [];

        if (tipoLiev === 'lm' || tipoLiev === 'misto-lm') {
            lmPeso = (farina * percLm) / 100;
            rinfreschi = calcolaRinfreschi(lmPeso);
        }

        if (tipoLiev === 'ldb') {
            ldbPeso = (farina * 0.8) / 100;
        }

        if (tipoLiev === 'biga' || tipoLiev === 'misto-biga') {
            bigaFarina = (farina * percBigaFarina) / 100;
            bigaAcqua = bigaFarina * idroBiga;
            bigaLdb = bigaFarina * 0.01;
            const tempFarina = 18;
            bigaTacqua = 55 - (tempFarina + tempAmbiente);
        }

        if (tipoLiev === 'misto-lm') {
            ldbPeso = (farina * 0.5) / 100;
        }

        if (tipoLiev === 'misto-biga') {
            ldbPeso = (farina * 0.8) / 100;
        }

        // ── DOPPIO IMPASTO (80/20) ──────────────────────────────────────────
        // Primo impasto: 80% farina
        const primoFarina = farina * 0.80;
        const primoZucchero = zucchero * 0.50;  // 50% del totale
        const primoUova = uovaTuorli * 0.40;     // 40% del totale
        const primoLiquidi = acquaLatte;         // Tutta l'acqua/latte nel primo
        const primoMiele = miele * 0.50;         // Metà del miele
        const primoBurro = burro * 0.40;         // 40% del burro

        let primoLievitazione = 0;
        if (tipoLiev === 'lm' || tipoLiev === 'misto-lm') {
            primoLievitazione = lmPeso;
        } else if (tipoLiev === 'biga' || tipoLiev === 'misto-biga') {
            primoLievitazione = bigaFarina + bigaAcqua + bigaLdb;
        } else if (tipoLiev === 'ldb') {
            primoLievitazione = ldbPeso;
        }

        const primoTotale = primoFarina + primoLievitazione + primoZucchero + 
                           primoUova + primoLiquidi + primoMiele + primoBurro;

        // Secondo impasto: 20% farina
        const secondoFarina = farina * 0.20;
        const secondoBurro = burro * 0.60;       // 60% del burro
        const secondoZucchero = zucchero * 0.50; // 50% del totale
        const secondoUova = uovaTuorli * 0.60;   // 60% del totale
        const secondoSale = sale;                // Tutto il sale nel secondo
        const secondoMiele = miele * 0.50;       // Altra metà del miele

        let secondoLdb = 0;
        if (tipoLiev === 'misto-lm' || tipoLiev === 'misto-biga') {
            secondoLdb = ldbPeso;
        }

        const secondoTotale = secondoFarina + secondoBurro + secondoZucchero + 
                             secondoUova + secondoSale + secondoMiele + secondoLdb +
                             uvetta + canditi;

        // ── Glassatura Colomba ──────────────────────────────────────────────
        let glassaAlbumi = 0, glassaZucchero = 0, glassaMandorle = 0, glassaGranella = 0;
        if (prodotto === 'colomba') {
            glassaAlbumi = farina * 0.15;
            glassaZucchero = farina * 0.15;
            glassaMandorle = farina * 0.12;
            glassaGranella = farina * 0.08;
        }

        // ── Timeline ────────────────────────────────────────────────────────
        const timeline = buildTimeline(tipoLiev, prodotto);

        // ─── Aggiorna UI ────────────────────────────────────────────────────

        // Primo impasto
        el.primoImpastoTotale.textContent = fmt0(primoTotale) + ' g';
        el.primoFarina.textContent = fmt0(primoFarina) + ' g';
        el.primoLievitazione.textContent = fmt0(primoLievitazione) + ' g';
        el.primoZucchero.textContent = fmt0(primoZucchero) + ' g';
        el.primoUova.textContent = fmt0(primoUova) + ' g';
        el.primoLiquidi.textContent = fmt0(primoLiquidi) + ' g';
        el.primoMiele.textContent = fmt0(primoMiele) + ' g';
        el.primoBurro.textContent = fmt0(primoBurro) + ' g';

        // Label dinamiche primo impasto
        if (tipoLiev === 'lm' || tipoLiev === 'misto-lm') {
            el.primoLievLabel.textContent = 'Lievito Madre';
        } else if (tipoLiev === 'biga' || tipoLiev === 'misto-biga') {
            el.primoLievLabel.textContent = 'Biga (totale)';
        } else {
            el.primoLievLabel.textContent = 'LDB';
        }

        el.primoUovaLabel.textContent = (prodotto === 'pandoro') ? 'Uova (40%)' : 'Tuorli (40%)';
        el.primoLiquidiLabel.textContent = (prodotto === 'pandoro') ? 'Acqua/Latte' : 'Acqua';

        // Dettaglio biga
        if (tipoLiev === 'biga' || tipoLiev === 'misto-biga') {
            el.outBigaFarina.textContent = fmt0(bigaFarina) + ' g';
            el.outBigaAcqua.textContent = fmt0(bigaAcqua) + ' g';
            el.outBigaLdb.textContent = fmt2(bigaLdb) + ' g (1%)';
            el.outBigaTacqua.textContent = bigaTacqua.toFixed(0) + ' °C';
        }

        // Secondo impasto
        el.secondoImpastoTotale.textContent = fmt0(secondoTotale) + ' g';
        el.secondoFarina.textContent = fmt0(secondoFarina) + ' g';
        el.secondoBurro.textContent = fmt0(secondoBurro) + ' g';
        el.secondoZucchero.textContent = fmt0(secondoZucchero) + ' g';
        el.secondoUova.textContent = fmt0(secondoUova) + ' g';
        el.secondoSale.textContent = fmt1(secondoSale) + ' g';

        el.secondoUovaLabel.textContent = (prodotto === 'pandoro') ? 'Uova (60%)' : 'Tuorli (60%)';

        // LDB rinforzo
        if (tipoLiev === 'misto-lm' || tipoLiev === 'misto-biga') {
            el.secondoLdbItem.style.display = 'flex';
            el.secondoLdb.textContent = fmt2(secondoLdb) + ' g';
        } else {
            el.secondoLdbItem.style.display = 'none';
        }

        // Aromi e inerti
        renderAromiEInerti(prodotto, aromiList, uvetta, canditi);

        // Glassatura colomba
        if (prodotto === 'colomba') {
            el.glassaColombaSection.style.display = 'block';
            el.glassaAlbumi.textContent = fmt0(glassaAlbumi) + ' g';
            el.glassaZucchero.textContent = fmt0(glassaZucchero) + ' g';
            el.glassaMandorle.textContent = fmt0(glassaMandorle) + ' g';
            el.glassaGranella.textContent = fmt0(glassaGranella) + ' g';
        } else {
            el.glassaColombaSection.style.display = 'none';
        }

        // Totali
        el.impastoTotale.textContent = fmt0(pesoImpastoCrudo) + ' g';
        el.outFarinaTotale.textContent = fmt0(farina) + ' g';
        el.outForza.textContent = `W ${wMin}–${wMax}`;
        el.pesoPerStampo.textContent = fmt0(pesoStampo * 1.10) + ' g';

        // Rinfreschi
        if (rinfreschi.length > 0) {
            el.rinfreschiSection.style.display = 'block';
            el.outLmStart.textContent = fmt0(rinfreschi[0].pmInizio) + ' g';
            renderRinfresco(el.outRinfresco1, rinfreschi[0]);
            renderRinfresco(el.outRinfresco2, rinfreschi[1]);
            renderRinfresco(el.outRinfresco3, rinfreschi[2]);
        } else {
            el.rinfreschiSection.style.display = 'none';
        }

        // Timeline
        el.timelineSection.style.display = 'block';
        el.outTimeline.innerHTML = timeline;
    }

    // ─── Render aromi e inerti ────────────────────────────────────────────────
    function renderAromiEInerti(prodotto, aromiList, uvetta, canditi) {
        let html = '';

        // Aromi
        aromiList.forEach(a => {
            html += `<div class="aromi-item">
                <span class="aromi-nome">${a.nome}</span>
                <span class="aromi-valore">${a.valore}</span>
            </div>`;
        });

        // Inerti
        if (prodotto === 'panettone') {
            html += `<div class="aromi-item">
                <span class="aromi-nome">Uvetta</span>
                <span class="aromi-valore">${fmt0(uvetta)} g</span>
            </div>`;
            html += `<div class="aromi-item">
                <span class="aromi-nome">Canditi</span>
                <span class="aromi-valore">${fmt0(canditi)} g</span>
            </div>`;
        } else if (prodotto === 'colomba') {
            if (canditi > 0) {
                html += `<div class="aromi-item">
                    <span class="aromi-nome">Canditi arancia</span>
                    <span class="aromi-valore">${fmt0(canditi)} g</span>
                </div>`;
            }
        }

        el.aromiGrid.innerHTML = html;
    }

    // ─── Calcolo rinfreschi LM ────────────────────────────────────────────────
    function calcolaRinfreschi(lmPesoNecessario) {
        const scartoFattore = 1.20;
        const idro = 0.45;

        const pm3Out = lmPesoNecessario * scartoFattore;
        const r3 = 2;
        const pm3 = pm3Out / (1 + r3 + r3 * idro);
        const f3 = pm3 * r3;
        const a3 = f3 * idro;

        const pm2Out = pm3 * scartoFattore;
        const r2 = 2;
        const pm2 = pm2Out / (1 + r2 + r2 * idro);
        const f2 = pm2 * r2;
        const a2 = f2 * idro;

        const pm1Out = pm2 * scartoFattore;
        const r1 = 1;
        const pm1 = pm1Out / (1 + r1 + r1 * idro);
        const f1 = pm1 * r1;
        const a1 = f1 * idro;

        return [
            { num: 1, rapporto: '1:1', pmInizio: pm1, farina: f1, acqua: a1, pmFine: pm1Out },
            { num: 2, rapporto: '1:2', pmInizio: pm2, farina: f2, acqua: a2, pmFine: pm2Out },
            { num: 3, rapporto: '1:2', pmInizio: pm3, farina: f3, acqua: a3, pmFine: pm3Out },
        ];
    }

    function renderRinfresco(el, r) {
        if (!el) return;
        el.innerHTML =
            `<strong>Rinfresco ${r.num}</strong> (rapporto ${r.rapporto} – 45% idro – 28°C – 4 h)<br>` +
            `LM: ${fmt0(r.pmInizio)} g · Farina: ${fmt0(r.farina)} g · Acqua: ${fmt0(r.acqua)} g ` +
            `→ ${fmt0(r.pmFine)} g di LM maturo`;
    }

    // ─── Timeline ─────────────────────────────────────────────────────────────
    function buildTimeline(tipoLiev, prodotto) {
        const rows = [];

        if (tipoLiev === 'biga' || tipoLiev === 'misto-biga') {
            rows.push('<strong>Giorno –1 (sera)</strong>: Impasto biga (miscelazione breve, non sviluppare glutine). Fermentazione 18 h a 18°C.');
        }

        if (tipoLiev === 'lm' || tipoLiev === 'misto-lm') {
            rows.push('<strong>Giorno 0 – ore 8:00</strong>: Rinfresco 1 (1:1) – 28°C – 4 h');
            rows.push('<strong>Giorno 0 – ore 12:00</strong>: Rinfresco 2 (1:2) – 28°C – 4 h');
            rows.push('<strong>Giorno 0 – ore 16:00</strong>: Rinfresco 3 (1:2) – 28°C – 4 h');
        }

        rows.push('<strong>1° Impasto (ore ~20:00)</strong>: 80% farina + LM/biga/LDB + 50% zucchero + 40% tuorli/uova + acqua/latte + 40% burro + metà miele. T° impasto 26–28°C. Lievitazione 10–14 h a 26–28°C fino a triplicazione.');
        
        rows.push('<strong>2° Impasto (mattino successivo)</strong>: Aggiunta 20% farina + 60% burro + 50% zucchero + 60% tuorli/uova + sale + metà miele + aromi (vaniglia, scorze) + LDB rinforzo (se metodo misto). Impasto fino a incordatura. Lievitazione in massa 30–45 min a 26–28°C.');
        
        if (prodotto === 'panettone') {
            rows.push('<strong>Incorporazione inerti</strong>: Uvetta e canditi alla fine dell\'impasto. Evitare riscaldamento.');
        } else if (prodotto === 'colomba') {
            rows.push('<strong>Incorporazione inerti</strong>: Canditi alla fine dell\'impasto.');
        }

        rows.push('<strong>Pezzatura e pirlatura</strong>: Formare i pezzi con 10% eccedenza. Prima pirlatura → riposo 20 min (su carta forno) → seconda pirlatura → inserimento in stampo.');
        
        rows.push('<strong>Lievitazione in stampo</strong>: 5–6 h a 28–30°C, umidità 75%. Segnale di pronto: 1 cm sotto il bordo (panettone/pandoro) o 2/3 altezza stampo (colomba).');

        if (prodotto === 'panettone') {
            rows.push('<strong>Cottura panettone</strong>: 165°C statico per 50–55 min (1 kg). T° cuore 94–96°C. Sfornare, infilzare e capovolgere immediatamente. Raffreddamento capovolto minimo 8 h.');
        } else if (prodotto === 'pandoro') {
            rows.push('<strong>Cottura pandoro</strong>: 160–170°C statico per 50–60 min (1 kg). T° cuore 94–96°C. Sfornare e capovolgere. Spolverare con zucchero a velo vanigliato da freddo.');
        } else {
            rows.push('<strong>Preparazione glassa</strong>: Montare albumi + zucchero fino a picco morbido. Incorporare mandorle in grana.');
            rows.push('<strong>Cottura colomba</strong>: 165°C statico. Dopo 25 min, glassare e cospargere di granella. Proseguire cottura 25–30 min fino a doratura glassa. T° cuore 94–96°C. Raffreddamento capovolto.');
        }

        return rows.map(r => `<li>${r}</li>`).join('');
    }

    // ─── Visibilità sezioni ───────────────────────────────────────────────────
    function updateLievVisibility(tipoLiev) {
        const hasLm = (tipoLiev === 'lm' || tipoLiev === 'misto-lm');
        const hasBiga = (tipoLiev === 'biga' || tipoLiev === 'misto-biga');
        const hasLdb = (tipoLiev === 'ldb' || tipoLiev === 'misto-lm' || tipoLiev === 'misto-biga');
        el.lmGroup.style.display = hasLm ? 'block' : 'none';
        el.bigaGroup.style.display = hasBiga ? 'block' : 'none';
        el.ldbGroup.style.display = hasLdb ? 'block' : 'none';
    }

    function updateProdottoVisibility(prodotto) {
        el.panettoneGroup.style.display = (prodotto === 'panettone') ? 'block' : 'none';
        el.pandoroGroup.style.display = (prodotto === 'pandoro') ? 'block' : 'none';
        el.colombaGroup.style.display = (prodotto === 'colomba') ? 'block' : 'none';
    }

    // ─── Utility ──────────────────────────────────────────────────────────────
    function getRadio(name) {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        return checked ? checked.value : null;
    }
    function showError(msg) {
        el.errorMessage.textContent = msg;
        el.errorMessage.style.display = 'block';
    }
    function fmt0(n) { return isNaN(n) ? '—' : Math.round(n).toString(); }
    function fmt1(n) { return isNaN(n) ? '—' : n.toFixed(1).replace('.', ','); }
    function fmt2(n) { return isNaN(n) ? '—' : n.toFixed(2).replace('.', ','); }

    // ─── Event listeners ──────────────────────────────────────────────────────
    [...el.tipoProdotto, ...el.tipoLiev].forEach(r => r.addEventListener('change', calculate));
    [el.numStampi, el.pesoStampo, el.tempAmbiente, el.percLm, el.percBiga, el.idroBiga, el.tempBiga,
     el.percBurroPanettone, el.percTuorliPanettone, el.percZuccheroPanettone, el.percAcquaPanettone,
     el.percSalePanettone, el.percMielePanettone, el.percUvettaPanettone, el.percCanditiPanettone,
     el.percBurroPandoro, el.percUovaPandoro, el.percZuccheroPandoro,
     el.percSalePandoro, el.percMielePandoro,
     el.percBurroColomba, el.percTuorliColomba, el.percZuccheroColomba, el.percAcquaColomba,
     el.percSaleColomba, el.percMieleColomba, el.percCanditiColomba
    ].forEach(inp => inp && inp.addEventListener('input', calculate));

    // ─── Init ─────────────────────────────────────────────────────────────────
    calculate();
});
