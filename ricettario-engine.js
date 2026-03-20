/**
 * Ricettario Engine
 * Motore di scalatura condiviso per tutte le pagine ricettario.
 * Ogni ricetta dichiara i suoi ingredienti come percentuali rispetto
 * a una teglia/porzione di riferimento. Il motore ricalcola in tempo
 * reale al variare di diametro teglia o numero porzioni.
 */

(function() {
'use strict';

// ── Utility ──────────────────────────────────────────────────────────────────

function fmt(n, decimals) {
    if (isNaN(n) || n === null) return '—';
    if (decimals !== undefined) return n.toFixed(decimals).replace('.', ',');
    // Auto-format: interi se >= 10, 1 decimale se >= 1, 2 decimali se < 1
    if (n >= 100) return Math.round(n).toString();
    if (n >= 10)  return Math.round(n).toString();
    if (n >= 1)   return n.toFixed(1).replace('.', ',');
    return n.toFixed(2).replace('.', ',');
}

function fmtQty(n) {
    if (n === 0) return '—';
    return fmt(n) + ' g';
}

// Calcola il fattore di scala rispetto alla teglia di riferimento
// Per teglie circolari: area ∝ r²
// Per teglie rettangolari: area ∝ l×w
function scaleFactor(type, refVal, newVal, refVal2, newVal2) {
    if (type === 'tonda') {
        const r_ref = (refVal || 24) / 2;
        const r_new = (newVal || refVal) / 2;
        return (r_new * r_new) / (r_ref * r_ref);
    }
    if (type === 'rettangolare') {
        const ref_area = (refVal || 30) * (refVal2 || 20);
        const new_area = (newVal || refVal) * (newVal2 || refVal2);
        return new_area / ref_area;
    }
    if (type === 'porzioni') {
        return (newVal || refVal) / (refVal || 1);
    }
    return 1;
}

// ── Card setup ───────────────────────────────────────────────────────────────
// Ogni card ha:
//   data-ref-type: 'tonda' | 'rettangolare' | 'porzioni'
//   data-ref-val:  valore di riferimento (cm diametro o n porzioni)
//   data-ref-val2: secondo valore per teglie rettangolari (altezza)
//
// Gli ingredienti hanno:
//   data-base: quantità in grammi (o ml) per la teglia di riferimento
//   data-unit: unità di misura (g, ml, pz, cucchiaio)

function setupCard(card) {
    const toggle = card.querySelector('.recipe-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            card.classList.toggle('open');
            const icon = toggle.querySelector('.toggle-icon');
            if (icon) icon.textContent = card.classList.contains('open') ? '▲' : '▼';
        });
    }

    // Scale inputs dentro la card
    const inputs = card.querySelectorAll('.card-scale-input');
    inputs.forEach(inp => inp.addEventListener('input', () => updateCard(card)));

    // Copy shopping list
    const copyBtn = card.querySelector('.shopping-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => copyShoppingList(card, copyBtn));
    }

    // Prima renderizzazione
    updateCard(card);
}

function updateCard(card) {
    const refType = card.dataset.refType || 'tonda';
    const refVal  = parseFloat(card.dataset.refVal)  || 24;
    const refVal2 = parseFloat(card.dataset.refVal2) || 0;

    // Leggi gli input scala della card
    let newVal  = refVal;
    let newVal2 = refVal2;

    const inp1 = card.querySelector('.card-scale-input[data-dim="1"]');
    const inp2 = card.querySelector('.card-scale-input[data-dim="2"]');
    if (inp1 && inp1.value) newVal  = parseFloat(inp1.value) || refVal;
    if (inp2 && inp2.value) newVal2 = parseFloat(inp2.value) || refVal2;

    const sf = scaleFactor(refType, refVal, newVal, refVal2, newVal2);

    // Aggiorna tutti gli ingredienti
    const rows = card.querySelectorAll('.ingredient-row[data-base]');
    const shopping = {};

    rows.forEach(row => {
        const base  = parseFloat(row.dataset.base);
        const unit  = row.dataset.unit || 'g';
        const name  = row.dataset.name || row.querySelector('.ing-name')?.textContent || '';
        const scaled = base * sf;
        const qtyEl = row.querySelector('.ing-qty');
        if (qtyEl) {
            if (unit === 'pz') {
                qtyEl.textContent = Math.max(1, Math.round(scaled));
            } else if (unit === 'cucchiaio' || unit === 'cucchiaino') {
                qtyEl.textContent = fmt(scaled, 1);
            } else {
                qtyEl.textContent = fmt(scaled);
            }
        }
        // Accumula per shopping list
        const key = name.toLowerCase().trim();
        if (!shopping[key]) shopping[key] = { name, unit, qty: 0 };
        shopping[key].qty += scaled;
    });

    // Aggiorna shopping list
    const shopContainer = card.querySelector('.shopping-list');
    if (shopContainer) {
        shopContainer.innerHTML = Object.values(shopping)
            .filter(i => i.qty > 0.01)
            .map(i => {
                const qty = i.unit === 'pz' ? Math.round(i.qty) : fmt(i.qty);
                return `<div class="shopping-item">
                    <span class="shop-qty">${qty} ${i.unit}</span>
                    <span class="shop-name">${i.name}</span>
                </div>`;
            }).join('');
    }

    // Aggiorna info scala visibile
    const scaleDisplay = card.querySelector('.scale-display');
    if (scaleDisplay) {
        scaleDisplay.textContent = sf.toFixed(2) + '×';
    }
}

function copyShoppingList(card, btn) {
    const items = card.querySelectorAll('.shopping-item');
    const lines = Array.from(items).map(el => {
        const qty  = el.querySelector('.shop-qty')?.textContent || '';
        const name = el.querySelector('.shop-name')?.textContent || '';
        return `• ${qty} ${name}`.trim();
    });
    const text = card.querySelector('h3')?.textContent + '\n' + lines.join('\n');
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copiato!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
    });
}

// ── Global scale bar ──────────────────────────────────────────────────────────
function setupGlobalScaleBar() {
    const bar = document.querySelector('.scale-bar');
    if (!bar) return;

    const globalDiam  = bar.querySelector('#global-diam');
    const globalPort  = bar.querySelector('#global-port');
    const resetBtn    = bar.querySelector('.scale-reset');

    function applyGlobal() {
        const diam = globalDiam ? parseFloat(globalDiam.value) : null;
        const port = globalPort ? parseFloat(globalPort.value) : null;

        document.querySelectorAll('.recipe-card').forEach(card => {
            const refType = card.dataset.refType || 'tonda';
            const inp1 = card.querySelector('.card-scale-input[data-dim="1"]');
            const inp2 = card.querySelector('.card-scale-input[data-dim="2"]');

            if (refType === 'tonda' && diam && inp1) {
                inp1.value = diam;
                updateCard(card);
            } else if (refType === 'porzioni' && port && inp1) {
                inp1.value = port;
                updateCard(card);
            }
        });
    }

    if (globalDiam) globalDiam.addEventListener('input', applyGlobal);
    if (globalPort) globalPort.addEventListener('input', applyGlobal);

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.querySelectorAll('.recipe-card').forEach(card => {
                const refVal  = card.dataset.refVal;
                const refVal2 = card.dataset.refVal2;
                const inp1 = card.querySelector('.card-scale-input[data-dim="1"]');
                const inp2 = card.querySelector('.card-scale-input[data-dim="2"]');
                if (inp1 && refVal)  inp1.value = refVal;
                if (inp2 && refVal2) inp2.value = refVal2;
                updateCard(card);
            });
            if (globalDiam) globalDiam.value = '';
            if (globalPort) globalPort.value = '';
        });
    }
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.recipe-card').forEach(setupCard);
    setupGlobalScaleBar();
});

})();
