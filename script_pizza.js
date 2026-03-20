document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    const elements = {
        panielli: document.getElementById('panielli'),
        peso: document.getElementById('peso'),
        idro: document.getElementById('idro'),
        salePerc: document.getElementById('salePerc'),
        grassiPerc: document.getElementById('grassiPerc'),
        liev: document.getElementById('liev'),
        frigo: document.getElementById('frigo'),
        gradi: document.getElementById('gradi'),
        teglia: document.getElementById('teglia'),
        pdrp: document.getElementById('pdrp'),
        pdrpGroup: document.getElementById('pdrp-group'),
        soloLm: document.getElementById('solo-lm'),
        soloLmGroup: document.getElementById('solo-lm-group'),
        errorMessage: document.getElementById('error-message'),
        forza: document.getElementById('forza'),
        farina: document.getElementById('farina'),
        aqua: document.getElementById('aqua'),
        sale: document.getElementById('sale'),
        grassi: document.getElementById('grassi'),
        pdr: document.getElementById('pdr'),
        lievito: document.getElementById('lievito'),
        impastoTotale: document.getElementById('impasto-totale')
    };

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

    function calculate() {
        elements.errorMessage.style.display = 'none';
        
        const num_balls = parseFloat(elements.panielli.value);
        const weight_per_ball = parseFloat(elements.peso.value);
        const hydration_perc = parseFloat(elements.idro.value);
        const salt_perc = parseFloat(elements.salePerc.value);
        const fat_perc = parseFloat(elements.grassiPerc.value);
        const sourdough_perc_on_flour = parseFloat(document.querySelector('input[name="pdrt"]:checked').value !== '0' ? elements.pdrp.value : 0);
        const total_leavening_hr = parseFloat(elements.liev.value);
        const fridge_hr = parseFloat(elements.frigo.value);
        const temp_ambient = parseFloat(elements.gradi.value);
        const is_pan_pizza = elements.teglia.checked;
        const sourdough_type = document.querySelector('input[name="pdrt"]:checked').value;
        const use_only_sourdough = elements.soloLm.checked;

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
            if (sourdough_type === '1') { // 100% idro
                lm_flour_perc = sourdough_perc_on_flour / 2;
                lm_water_perc_of_lm_flour = 1;
            } else if (sourdough_type === '2') { // 50% idro
                lm_flour_perc = sourdough_perc_on_flour * (2/3);
                lm_water_perc_of_lm_flour = 0.5;
            } else { // 80% idro (default)
                lm_flour_perc = sourdough_perc_on_flour / 1.8;
                lm_water_perc_of_lm_flour = 0.8;
            }
        }

        const total_percs_for_flour_calc = 100 + hydration_perc + salt_perc + fat_perc - (lm_flour_perc * lm_water_perc_of_lm_flour);
        const flour_total_for_calc = (total_dough_weight / total_percs_for_flour_calc) * (100 - lm_flour_perc);

        const sourdough_weight = flour_total_for_calc * (sourdough_perc_on_flour / (100 - lm_flour_perc));
        const sourdough_flour = (sourdough_type === '0') ? 0 : sourdough_weight / (1 + lm_water_perc_of_lm_flour);
        const sourdough_water = sourdough_weight - sourdough_flour;

        const flour = flour_total_for_calc - sourdough_flour;
        const water = (flour_total_for_calc * hydration_perc / 100) - sourdough_water;
        const salt = flour_total_for_calc * (salt_perc / 100);
        const fat = flour_total_for_calc * (fat_perc / 100);

        // ── Calcolo Lievito di Birra Fresco (MODELLO REVISIONATO v2) ──────────────────
        let yeast = 0;
        const REF_HOURS = 24, REF_TEMP = 20, BASE_YEAST_PERC_ON_FLOUR = 0.08;
        
        // CORREZIONE: frigo_hr è stato rinominato correttamente in fridge_hr
        const effective_hours = Math.max(1, (total_leavening_hr - fridge_hr) + (fridge_hr / 20));

        const time_factor = REF_HOURS / effective_hours;
        const temp_factor = Math.pow(2, (REF_TEMP - temp_ambient) / 9);
        let yeast_perc = BASE_YEAST_PERC_ON_FLOUR * time_factor * temp_factor;

        const salt_correction = 1 + Math.max(0, (salt_perc - 2.5) * 0.15);
        yeast_perc *= salt_correction;
        const fat_correction = 1 + (fat_perc * 0.05);
        yeast_perc *= fat_correction;

        if (is_pan_pizza) {
            yeast_perc *= 1.25; // Aumento del 25% per la teglia
        }

        yeast = flour_total_for_calc * (yeast_perc / 100);

        if (sourdough_perc_on_flour > 0 && use_only_sourdough) {
            yeast = 0;
        } else if (sourdough_perc_on_flour > 0) {
            let lm_ldb_equiv = 0;
            if (sourdough_type === '1') lm_ldb_equiv = sourdough_weight / 80;
            if (sourdough_type === '2') lm_ldb_equiv = sourdough_weight / 150;
            if (sourdough_type === '3') lm_ldb_equiv = sourdough_weight / 120;
            yeast = Math.max(0, yeast - lm_ldb_equiv);
        }
        
        // ── Forza farina consigliata ──────────────────────────────────────────
        const flour_strength_W = 81.42 + 78.39 * Math.log(total_leavening_hr);

        // ── Aggiorna UI ───────────────────────────────────────────────────────
        elements.impastoTotale.textContent = `${total_dough_weight.toFixed(0)} g`;
        elements.farina.textContent = `${flour.toFixed(0)} g`;
        elements.aqua.textContent = `${water.toFixed(0)} g`;
        elements.sale.textContent = `${salt.toFixed(1)} g`;
        elements.grassi.textContent = `${fat.toFixed(1)} g`;
        elements.pdr.textContent = `${sourdough_weight.toFixed(0)} g`;
        elements.lievito.textContent = `${Math.max(0, yeast).toFixed(2).replace('.', ',')} g`;
        elements.forza.textContent = `W ${Math.round(flour_strength_W / 10) * 10}`;
    }

    updateLMVisibility();
    calculate();
});