/* ══════════════════════════════════════════════════════════════════════════
   search-filter.js  –  Filtro ricette da URL (?search=query)
   Da includere in fondo a ogni pagina ricettario (cucina, pasticceria).
   
   Funzionamento:
   - Legge ?search= dall'URL
   - Mostra solo le ricette che matchano (tutte le altre in opacity ridotta)
   - Scrolla e apre automaticamente la prima card trovata
   - Mostra un banner con info ricerca e tasto "mostra tutto"
══════════════════════════════════════════════════════════════════════════ */

(function () {
    const params = new URLSearchParams(location.search);
    const rawQuery = params.get('search') || '';
    if (!rawQuery.trim()) return;

    /* ── Normalizzazione ── */
    function norm(s) {
        return (s || '').toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s]/g, ' ');
    }

    const tokens = norm(rawQuery).split(/\s+/).filter(Boolean);

    function matchesArticle(article) {
        // Raccoglie tutto il testo dell'articolo: titolo, desc, ingredienti, procedimento
        const title = article.querySelector('h3')?.textContent || '';
        const desc  = article.querySelector('.recipe-desc')?.textContent || '';
        const ings  = Array.from(article.querySelectorAll('[data-name]')).map(el => el.dataset.name).join(' ');
        const steps = Array.from(article.querySelectorAll('.step-text')).map(el => el.textContent).join(' ');
        const cat   = article.dataset.category || '';
        const region = article.querySelector('.region-badge')?.textContent || '';
        const text  = norm([title, desc, ings, steps, cat, region].join(' '));
        return tokens.every(t => text.includes(t));
    }

    /* ── Crea banner di ricerca ── */
    function injectBanner() {
        const banner = document.createElement('div');
        banner.id = 'search-filter-banner';
        banner.innerHTML = `
            <div class="sfb-inner">
                <span class="sfb-icon">🔍</span>
                <span class="sfb-text">Risultati per <strong>"${rawQuery}"</strong></span>
                <a href="search-results.html?q=${encodeURIComponent(rawQuery)}" class="sfb-link">Tutti i risultati →</a>
                <button class="sfb-clear" id="sfb-clear-btn">✕ Mostra tutto</button>
            </div>`;
        document.body.insertBefore(banner, document.body.firstChild);

        document.getElementById('sfb-clear-btn').addEventListener('click', () => {
            // Rimuovi ?search dall'URL senza ricaricare
            const url = new URL(location.href);
            url.searchParams.delete('search');
            history.pushState({}, '', url);
            // Ripristina tutto
            document.querySelectorAll('article.recipe-card').forEach(a => {
                a.classList.remove('sf-match', 'sf-nomatch');
            });
            document.querySelectorAll('.recipes-section, .section-heading-block').forEach(s => {
                s.style.opacity = '';
            });
            banner.remove();
        });
    }

    /* ── Applica filtro ── */
    function applyFilter() {
        const articles = Array.from(document.querySelectorAll('article.recipe-card'));
        if (!articles.length) return;

        let firstMatch = null;
        let matchCount = 0;

        articles.forEach(art => {
            if (matchesArticle(art)) {
                art.classList.add('sf-match');
                art.classList.remove('sf-nomatch');
                if (!firstMatch) firstMatch = art;
                matchCount++;
            } else {
                art.classList.add('sf-nomatch');
                art.classList.remove('sf-match');
            }
        });

        // Scrolla e apri la prima card trovata
        if (firstMatch) {
            setTimeout(() => {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Apri automaticamente la prima card trovata (se non già aperta)
                const toggle = firstMatch.querySelector('.recipe-toggle');
                if (toggle && !firstMatch.classList.contains('open')) {
                    toggle.click();
                }
            }, 400);
        }

        return matchCount;
    }

    /* ── CSS dinamico ── */
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Banner filtro */
            #search-filter-banner {
                position: sticky;
                top: 0;
                z-index: 100;
                background: var(--accent-pale, #fdf0e4);
                border-bottom: 1.5px solid rgba(201,106,16,0.25);
                padding: 10px 20px;
            }
            .sfb-inner {
                max-width: 900px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            .sfb-icon { font-size: 0.95rem; }
            .sfb-text {
                flex: 1;
                font-size: 0.85rem;
                color: var(--text2, #3d3428);
                min-width: 0;
            }
            .sfb-text strong { color: var(--accent, #c96a10); }
            .sfb-link {
                font-size: 0.8rem;
                color: var(--accent, #c96a10);
                text-decoration: none;
                white-space: nowrap;
                font-weight: 500;
            }
            .sfb-link:hover { text-decoration: underline; }
            .sfb-clear {
                background: none;
                border: 1px solid rgba(201,106,16,0.3);
                border-radius: 20px;
                padding: 3px 12px;
                font-size: 0.78rem;
                color: var(--muted, #8a7d6b);
                cursor: pointer;
                font-family: inherit;
                white-space: nowrap;
                transition: background 0.15s, color 0.15s;
            }
            .sfb-clear:hover { background: rgba(201,106,16,0.1); color: var(--accent, #c96a10); }

            /* Cards filtrate */
            article.recipe-card.sf-nomatch {
                opacity: 0.25;
                filter: grayscale(0.4);
                pointer-events: none;
                transition: opacity 0.2s;
            }
            article.recipe-card.sf-match {
                opacity: 1;
                border-color: rgba(201,106,16,0.4) !important;
                box-shadow: 0 0 0 2px rgba(201,106,16,0.1), var(--shadow-sm, 0 2px 12px rgba(0,0,0,0.06));
                transition: opacity 0.2s;
            }
        `;
        document.head.appendChild(style);
    }

    /* ── Init (attende DOM pronto) ── */
    function init() {
        injectStyles();
        injectBanner();
        applyFilter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
