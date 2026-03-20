(function () {
'use strict';
const DEF = 4;

function fmt(n, unit) {
    if (isNaN(n)) return '—';
    if (unit === 'pz' || unit === 'spicchi' || unit === 'foglie') return Math.max(1, Math.round(n)).toString();
    if (unit === 'qb') return 'q.b.';
    if (n >= 1000 && (unit === 'g' || unit === 'ml')) {
        const u2 = unit === 'g' ? 'kg' : 'l';
        const v = n / 1000;
        return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace('.', ',')) + ' ' + u2;
    }
    if (n >= 10) return Math.round(n).toString();
    if (n >= 1)  return n.toFixed(1).replace('.', ',');
    return n.toFixed(1).replace('.', ',');
}

function updateCard(card) {
    const ref = parseFloat(card.dataset.refPortions) || DEF;
    const cur = parseFloat(card.dataset.currentPortions) || ref;
    const sf  = cur / ref;

    card.querySelectorAll('.ingredient-row[data-base]').forEach(row => {
        const base = parseFloat(row.dataset.base);
        const unit = row.dataset.unit || 'g';
        const el   = row.querySelector('.ing-qty');
        if (el) el.textContent = unit === 'qb' ? 'q.b.' : fmt(base * sf, unit);
    });

    const countEl = card.querySelector('.portion-count');
    if (countEl) countEl.textContent = cur;

    const shopEl = card.querySelector('.shopping-list');
    if (shopEl) {
        const map = {};
        card.querySelectorAll('.ingredient-row[data-base]').forEach(row => {
            const unit = row.dataset.unit || 'g';
            if (unit === 'qb') return;
            const name = row.dataset.name || row.querySelector('.ing-name')?.textContent || '';
            const key  = name.toLowerCase().trim();
            if (!map[key]) map[key] = { name, unit, qty: 0 };
            map[key].qty += parseFloat(row.dataset.base) * sf;
        });
        shopEl.innerHTML = Object.values(map)
            .filter(i => i.qty > 0.001)
            .map(i => `<div class="shopping-item"><span class="shop-qty">${fmt(i.qty, i.unit)} ${i.unit}</span><span class="shop-name">${i.name}</span></div>`)
            .join('');
    }
}

function setupCard(card) {
    const toggle = card.querySelector('.recipe-toggle');
    if (toggle) toggle.addEventListener('click', () => {
        card.classList.toggle('open');
        const ic = toggle.querySelector('.toggle-icon');
        if (ic) ic.textContent = card.classList.contains('open') ? '▲' : '▼';
    });

    card.querySelector('.portion-btn[data-action="minus"]')?.addEventListener('click', () => {
        const c = parseFloat(card.dataset.currentPortions) || DEF;
        if (c > 1) { card.dataset.currentPortions = c - 1; updateCard(card); }
    });
    card.querySelector('.portion-btn[data-action="plus"]')?.addEventListener('click', () => {
        card.dataset.currentPortions = (parseFloat(card.dataset.currentPortions) || DEF) + 1;
        updateCard(card);
    });

    card.querySelector('.shopping-copy')?.addEventListener('click', function() {
        const items = card.querySelectorAll('.shopping-item');
        const title = card.querySelector('h3')?.textContent || '';
        const text  = title + '\n' + Array.from(items).map(el =>
            `• ${el.querySelector('.shop-qty')?.textContent} ${el.querySelector('.shop-name')?.textContent}`
        ).join('\n');
        navigator.clipboard.writeText(text).then(() => {
            const orig = this.textContent;
            this.textContent = '✓ Copiato!';
            setTimeout(() => { this.textContent = orig; }, 2000);
        });
    });

    card.dataset.currentPortions = card.dataset.refPortions || DEF;
    updateCard(card);
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.filter;
            document.querySelectorAll('.recipe-card').forEach(card => {
                card.classList.toggle('hidden', cat !== 'tutti' && card.dataset.category !== cat);
            });
        });
    });
}

function setupGlobalBar() {
    const bar = document.querySelector('.scale-bar-cucina');
    if (!bar) return;
    let g = DEF;
    const display = bar.querySelector('.portion-display');
    const update = () => {
        if (display) display.textContent = g;
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.dataset.currentPortions = g; updateCard(card);
        });
    };
    bar.querySelector('[data-action="minus"]')?.addEventListener('click', () => { if (g > 1) { g--; update(); } });
    bar.querySelector('[data-action="plus"]')?.addEventListener('click',  () => { g++; update(); });
    bar.querySelector('.scale-reset-cucina')?.addEventListener('click', () => {
        g = DEF;
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.dataset.currentPortions = card.dataset.refPortions || DEF; updateCard(card);
        });
        if (display) display.textContent = g;
    });
    if (display) display.textContent = g;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.recipe-card').forEach(setupCard);
    setupFilters();
    setupGlobalBar();
});
})();
