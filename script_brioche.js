document.addEventListener('DOMContentLoaded', () => {

    // ── Profili per tipo di impasto ──────────────────────────────────────────
    const TYPES = {
        classica: {
            label: 'Brioche Classica (Francese)',
            description: 'Impasto ricco e burroso in stile francese. Alta percentuale di burro, uova e poca idratazione liquida. Richiede incordatura lunga e burro incorporato a freddo.',
            burro: 50, uova: 25, zucchero: 10, latte: 10, sale: 1.5,
            tips: [
                'Incorpora il burro freddo a cubetti solo quando l\'impasto è già ben incordato.',
                'L\'impasto finale deve staccarsi dalle pareti della ciotola e risultare liscio e lucido.',
                'Se possibile, usa la planetaria: il calore delle mani scioglie troppo il burro.',
                'Farina consigliata: W 330–380 (Manitoba o mix 70% forte + 30% 00).'
            ]
        },
        siciliana: {
            label: 'Brioche Siciliana (col Tuppo)',
            description: 'La classica brioche delle gelaterie siciliane. Soffice, profumata di arancia e vaniglia, si mangia con granita o gelato. Meno burro, più strutto o olio, leggermente più dolce.',
            burro: 20, uova: 20, zucchero: 15, latte: 40, sale: 1.2,
            tips: [
                'Sostituisci metà del burro con strutto per una texture più soffice e caratteristica.',
                'Aggiungi scorza d\'arancia grattugiata e un cucchiaino di miele nell\'impasto.',
                'La forma col tuppo (pallina sopra) si ottiene modellando 2/3 e 1/3 dell\'impasto.',
                'Lucida con tuorlo + latte prima della cottura per una superficie dorata e lucida.',
                'Farina consigliata: W 260–300 (farina 00 di forza media).'
            ]
        },
        'col-nodo': {
            label: 'Brioche Leggera (Toast / Pan Bauletto)',
            description: 'Versione più leggera, ideale per panini al latte, toast o pan bauletto. Meno burro e uova, più latte. Morbida e versatile, ottima per sandwich dolci e salati.',
            burro: 12, uova: 8, zucchero: 8, latte: 55, sale: 1.8,
            tips: [
                'Per il pan bauletto, stendi l\'impasto a rettangolo e arrotolalo nello stampo da plumcake.',
                'Usa latte intero tiepido (non caldo) per attivare meglio il lievito.',
                'Una spennellata di burro fuso appena uscito dal forno mantiene la crosta morbida.',
                'Farina consigliata: W 240–280 (farina 00 o 0 normale).'
            ]
        },
        veneziana: {
            label: 'Veneziana / Grande Lievitato',
            description: 'Lievitato ricco simile al pandoro, con struttura alta e soffice. Richiede due impasti (biga o poolish) e molta pazienza. Ottima per le feste.',
            burro: 60, uova: 30, zucchero: 20, latte: 5, sale: 1.2,
            tips: [
                'Impasto in due fasi: primo impasto la sera, secondo impasto il mattino dopo.',
                'Il burro deve essere pomato (morbido ma non sciolto), aggiunto in più riprese.',
                'Dopo la formatura, metti nello stampo e aspetta che l\'impasto raggiunga il bordo.',
                'Non aprire il forno nei primi 20 minuti di cottura.',
                'Farina consigliata: W 380–420 (Manitoba pura o farina per grandi lievitati).',
                'Per un risultato ottimale, usa lievito madre ben maturo invece di lievito di birra.'
            ]
        },
        pangoccioli: {
            label: 'Pangoccioli',
            description: 'I soffici panini al latte con gocce di cioccolato. Impasto brioche leggero, leggermente dolce, con gocce di cioccolato fondente o al latte incorporate a freddo durante la formatura. Perfetti a colazione o merenda.',
            burro: 18, uova: 12, zucchero: 10, latte: 48, sale: 1.5,
            extra: { label: 'Gocce di Cioccolato', key: 'gocce', perc: 25, icon: '🍫',
                     hint: 'Percentuale di gocce di cioccolato sulla farina (tipicamente 20–30%).' },
            tips: [
                'Aggiungi le gocce di cioccolato congelate (30 min in freezer) negli ultimi 2 min di impasto, a bassa velocità, per non scioglierle.',
                'Usa gocce stabili al calore se vuoi che rimangano intatte dopo la cottura.',
                'Per un colore dorato uniforme, lucida con latte (non uovo) prima di infornare.',
                'Forma palline tese e lisce: la superficie liscia aiuta la lievitazione regolare.',
                'Ottimi anche con gocce di cioccolato bianco o mix fondente + latte.',
                'Farina consigliata: W 260–300 (farina 00 di media forza).'
            ]
        },
        kardamom: {
            label: 'Kardemummabullar (Svedesi)',
            description: 'I classici nodi svedesi alla cannella e cardamomo. Impasto semplicice e leggermente burroso, avvolto attorno a un ripieno generoso di burro, zucchero di canna e cardamomo macinato fresco. La formatura a nodo è parte del rituale.',
            burro: 15, uova: 10, zucchero: 8, latte: 52, sale: 1.2,
            extra: { label: 'Ripieno (totale)', key: 'ripieno', perc: null, icon: '🌿',
                     hint: 'Il ripieno è calcolato automaticamente: burro pomato + zucchero muscovado + cardamomo + cannella.' },
            fillingRatio: { burro: 18, zucchero: 14, cardamomo: 1.2, cannella: 0.5 }, // % sulla farina
            tips: [
                'Macina il cardamomo fresco al momento dai baccelli: la differenza di profumo è enorme.',
                'Stendi l\'impasto in un rettangolo sottile (~4mm), spalma il ripieno su metà, ripiega e taglia strisce da 2cm.',
                'Per il nodo classico: tieni una striscia per le due estremità, avvolgila attorno alle dita due volte, poi passa un\'estremità nel centro.',
                'Dopo la formatura, i knots devono lievitare fino a diventare gonfi e leggeri al tatto.',
                'Glassa tradizionale: sciroppo di zucchero 1:1 spennellato caldo appena usciti dal forno.',
                'Farina consigliata: W 240–280 (farina 00 normale, non troppo forte).'
            ]
        },
        burgerbun: {
            label: 'Brioche Burger Bun',
            description: 'Il panino da hamburger in stile brioche: soffice, leggermente dolce, con una mollica a grana fine che regge bene le farciture senza sfaldarsi. Superficie lucida con semi di sesamo. Bilancia morbidezza e struttura.',
            burro: 14, uova: 14, zucchero: 6, latte: 50, sale: 2.0,
            tips: [
                'Pesa ogni panino: 80–90 g per bun classico, 110–120 g per bun large da smash burger.',
                'Forma sfere tese e piatte (schiaccia leggermente il top) — in cottura crescono in altezza, non in larghezza.',
                'Spennella con uovo intero sbattuto + pizzico di sale per una superficie più lucida e croccante rispetto al solo latte.',
                'Aggiungi i semi di sesamo subito dopo la spennellatura, prima della seconda lievitazione, così aderiscono meglio.',
                'Cuoci a 190°C per 13–16 min: devono essere dorati ma ancora morbidi al tatto — non aspettare che si scuriscano.',
                'Farina consigliata: W 260–300 (farina 00 di forza media o mix 00 + manitoba).'
            ]
        },
        potatobun: {
            label: 'Potato Bun (tipo Martin\'s)',
            description: 'Il burger bun americano morbidissimo con purè di patate nell\'impasto. La fecola o le patate lesse trattengono l\'umidità e danno una mollica ultra-soffice, compatta e leggermente dolce — il bun perfetto per smash burger e pulled pork.',
            burro: 10, uova: 10, zucchero: 8, latte: 40, sale: 1.8,
            extra: { label: 'Patate lesse (% sulla farina)', key: 'patate', perc: 30, icon: '🥔',
                     hint: 'Patate lesse schiacciate (o fecola: usa 10–12% al posto di 30%). Le patate vanno aggiunte fredde all\'impasto.' },
            tips: [
                'Usa patate lesse raffreddate e schiacciate finemente — niente grumi. Aggiungile insieme alla farina all\'inizio.',
                'In alternativa alle patate lesse, usa fecola di patate al 10–12%: stessa morbidezza, meno umidità da gestire.',
                'L\'impasto è più appiccicoso del normale per via delle patate: lavora con le mani umide o in planetaria.',
                'Pesa 90–100 g per bun. Dopo la formatura, schiaccia i panini a circa 2 cm di altezza con il palmo.',
                'Lucida con burro fuso invece che uovo per una superficie gialla dorata, tipica dei Martin\'s originali.',
                'Cuoci a 185°C per 14–16 min. Appena sfornati, spennella di nuovo con burro fuso per la crosta morbida.',
                'Farina consigliata: W 240–260 (farina 00 normale — non serve farina forte con le patate).'
            ]
        },
        bauletto: {
            label: 'Pan Bauletto & Pancarré',
            description: 'Il classico pane in cassetta italiano, dalla mollica bianca e compatta. Leggermente più ricco del pane comune ma più leggero della brioche. Il pan bauletto ha la caratteristica gobba sopra, il pancarré si cuoce con il coperchio per una forma perfettamente rettangolare.',
            burro: 8, uova: 0, zucchero: 5, latte: 58, sale: 1.8,
            tips: [
                'Per il pan bauletto: riempi lo stampo da plumcake a 2/3 e lascia la gobba libera di formarsi in cottura.',
                'Per il pancarré: riempi lo stampo a 3/4 e chiudi con il coperchio. Cuoci a 175°C — la pressione del coperchio darà la forma rettangolare.',
                'Il taglio a fette è più facile il giorno dopo: aspetta che sia completamente freddo prima di affettare.',
                'Per una mollica ancora più morbida, sostituisci il 10% del latte con panna fresca.',
                'Aggiungi un cucchiaio di latte in polvere (3–5% sulla farina) per una mollica più bianca e soffice.',
                'Cuoci a 175–180°C per 30–35 min (stampo 500g) o 40–45 min (stampo 1 kg). T° cuore 95°C.',
                'Farina consigliata: W 240–280 (farina 00 o 0 normale).'
            ]
        },
        cinnamonroll: {
            label: 'Cinnamon Roll (Bakery Style)',
            description: 'Cinnamon roll stile bakery professionale — ispirati a Brotique di Stoccarda. Impasto brioche semi-ricco, laminato con ripieno di burro pomato, zucchero muscovado e cannella in abbondanza. Soffici, stratificati e glassati con cream cheese frosting. Il segreto è il ripieno generoso e la cottura appena prima del caramello.',
            burro: 18, uova: 15, zucchero: 8, latte: 48, sale: 1.8,
            extra: { label: 'Ripieno (totale)', key: 'ripieno', perc: null, icon: '🌀',
                     hint: 'Il ripieno è calcolato automaticamente: burro pomato + zucchero muscovado + cannella + sale.' },
            fillingRatio: { burro: 22, zucchero: 20, cannella: 3.5, sale: 0.3 },
            tips: [
                'Usa cannella Ceylon (non cassia) per un sapore più delicato e floreale — la differenza si sente.',
                'Stendi l\'impasto in un rettangolo di 40×60 cm, spessore 4 mm. Il ripieno deve arrivare fino ai bordi su tre lati, lascia 1 cm libero sul bordo lungo finale per sigillare.',
                'Arrotola stretto e con tensione costante dal lato lungo. Taglia rotoli da 4–5 cm con filo da cucina (non coltello) per non schiacciare la spirale.',
                'Cottura in teglia profonda ravvicinati: i rolls si sostengono a vicenda e crescono in altezza invece che allargarsi.',
                'Cream cheese frosting: 200 g cream cheese + 80 g burro pomato + 150 g zucchero a velo + 1 cucchiaino vaniglia. Applica sui rolls ancora caldi (non bollenti) per una glassa che cola leggermente nella spirale.',
                'Per rolls ancora più soffici, usa un poolish (50% farina + acqua uguale + lievito) la sera prima.',
                'Farina consigliata: W 300–330 (farina di forza o mix 60% 00 forte + 40% manitoba).'
            ]
        },
        graffe: {
            label: 'Graffe Napoletane (Ciambelle Fritte)',
            description: 'Le graffe sono le ciambelle fritte tipiche della tradizione napoletana: morbide, profumate di limone e vaniglia, con patate nell\'impasto per una texture leggera e asciutta dopo la frittura. Si mangiano calde, ricoperte di zucchero semolato. La versione professionale prevede un impasto indiretto per massima leggerezza e digeribilità.',
            burro: 10, uova: 20, zucchero: 12, latte: 20, sale: 1.5,
            extra: { label: 'Patate lesse (% sulla farina)', key: 'patate', perc: 30, icon: '🥔',
                     hint: 'Patate lesse passate al setaccio, fredde. Le patate sostituiscono parte del liquido e rendono la graffa leggera e asciutta dopo la frittura.' },
            tips: [
                'Le patate vanno passate al setaccio (non al mixer) mentre sono ancora calde, poi lasciate raffreddare completamente prima di aggiungerle all\'impasto.',
                'Aggiungi scorza grattugiata di 1 limone e 1 arancia, e i semi di mezza bacca di vaniglia: la profumatura è fondamentale nelle graffe napoletane.',
                'L\'impasto deve risultare morbido ma lavorabile. Non aggiungere farina extra: la consistenza appiccicosa è normale con le patate.',
                'Forma un salsicciotto, congiungilo a ciambella e lascia il buco grande (il doppio rispetto al risultato finale voluto): si restringe in frittura.',
                'Friggi in olio di arachidi a 170°C (non oltre): temperatura troppo alta brucia l\'esterno prima che l\'interno cuocia. Gira una volta sola.',
                'Scola su carta assorbente e passa immediatamente nello zucchero semolato mentre sono ancora calde e umide: lo zucchero aderisce perfettamente.',
                'Per graffe ripiene: dopo la frittura, farcisci con crema pasticcera o Nutella usando una sac à poche con beccuccio a siringa.',
                'Farina consigliata: W 260–300 (farina 00 di media forza).'
            ]
        },
        maritozzi: {
            label: 'Maritozzi Romani',
            description: 'Il maritozzo è il dolce da colazione romano per eccellenza: un panino morbido, dolce e profumato di arancio, tagliato a metà e riempito generosamente di panna montata fresca. L\'impasto è una brioche arricchita con miele, scorza d\'arancia e vaniglia. La versione professionale prevede una notte di maturazione in frigo per sviluppare la complessità aromatica.',
            burro: 22, uova: 18, zucchero: 14, latte: 35, sale: 1.5,
            extra: { label: 'Miele (% sulla farina)', key: 'miele', perc: 4, icon: '🍯',
                     hint: 'Il miele aggiunge profumo, umidità e favorisce la doratura. Usa miele di acacia (neutro) o millefiori.' },
            tips: [
                'Aggiungi miele, scorza grattugiata di arancia e semi di vaniglia direttamente nell\'impasto — questi aromi sono la firma del maritozzo romano autentico.',
                'L\'impasto deve risultare liscio, lucido e leggermente appiccicoso. Incorpora il burro a temperatura ambiente (non pomato) in più riprese, aspettando che ogni aggiunta sia assorbita.',
                'Maturazione in frigo 12–16 ore: porta i maritozzi a un livello superiore in termini di aroma e leggerezza. Tira fuori 2 ore prima di formare.',
                'Forma dei filoncini ovali da 60–70 g, non sfere: la forma allungata è caratteristica del maritozzo tradizionale.',
                'Prima della cottura, lucida con uovo intero sbattuto per una superficie mogano. Appena usciti dal forno, spennella con sciroppo di zucchero 1:1 per la lucentezza tipica delle vetrine romane.',
                'La panna montata va inserita solo al momento del servizio, mai prima. Usa panna al 35% di grassi, poco zucchero (5–6%) e nessun addensante artificiale.',
                'Il taglio classico: incidi il maritozzo per 2/3 della sua lunghezza partendo dall\'alto, non completamente. Riempi con una spatola passata in modo da creare una "gobba" di panna abbondante e scenografica.',
                'Farina consigliata: W 300–330 (farina di forza o manitoba).'
            ]
        }
    };

    // ── Elementi DOM ─────────────────────────────────────────────────────────
    const el = {
        pezzi:        document.getElementById('pezzi'),
        pesoPezzo:    document.getElementById('peso-pezzo'),
        burroPerc:    document.getElementById('burro-perc'),
        uovaPerc:     document.getElementById('uova-perc'),
        zuccheroPerc: document.getElementById('zucchero-perc'),
        salePerc:     document.getElementById('sale-perc'),
        lattePerc:    document.getElementById('latte-perc'),
        tempAmb:      document.getElementById('temp-amb'),
        lmPercGroup:  document.getElementById('lm-perc-group'),
        lmPerc:       document.getElementById('lm-perc'),
        aromi:        document.getElementById('aromi'),
        // output
        resFarina:    document.getElementById('res-farina'),
        resBurro:     document.getElementById('res-burro'),
        resUova:      document.getElementById('res-uova'),
        resZucchero:  document.getElementById('res-zucchero'),
        resSale:      document.getElementById('res-sale'),
        resLatte:     document.getElementById('res-latte'),
        resLievito:   document.getElementById('res-lievito'),
        resLmBox:     document.getElementById('res-lm-box'),
        resLm:        document.getElementById('res-lm'),
        resTotale:    document.getElementById('res-totale'),
        resUovaNum:   document.getElementById('res-uova-num'),
        aroміRow:     document.getElementById('aromi-row'),
        resAromi:     document.getElementById('res-aromi'),
        extraRow:     document.getElementById('extra-row'),
        extraLabel:   document.getElementById('extra-label'),
        resExtra:     document.getElementById('res-extra'),
        fillingBox:   document.getElementById('filling-box'),
        timeline:     document.getElementById('timeline'),
        tipsSection:  document.getElementById('tips-section'),
        errorMsg:     document.getElementById('error-message'),
        typeDesc:     document.getElementById('type-description'),
        extraPercGroup: document.getElementById('extra-perc-group'),
        extraPercLabel: document.getElementById('extra-perc-label'),
        extraPercHint:  document.getElementById('extra-perc-hint'),
        extraPerc:      document.getElementById('extra-perc'),
    };

    let currentType = 'classica';

    // ── Selettore tipo ────────────────────────────────────────────────────────
    document.querySelectorAll('.type-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.type-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentType = card.dataset.type;
            loadTypeDefaults(currentType);
            calculate();
        });
    });

    function loadTypeDefaults(type) {
        const t = TYPES[type];
        el.burroPerc.value    = t.burro;
        el.uovaPerc.value     = t.uova;
        el.zuccheroPerc.value = t.zucchero;
        el.lattePerc.value    = t.latte;
        el.salePerc.value     = t.sale;
        el.typeDesc.textContent = t.description;

        // Mostra/nascondi campo extra (gocce cioccolato o ripieno)
        if (t.extra && t.extra.perc !== null) {
            el.extraPercGroup.style.display = 'flex';
            el.extraPercLabel.textContent = t.extra.label + ' (% sulla farina)';
            el.extraPercHint.textContent  = t.extra.hint;
            el.extraPerc.value = t.extra.perc;
        } else {
            el.extraPercGroup.style.display = 'none';
        }
    }

    // ── Visibilità lievito madre ──────────────────────────────────────────────
    document.querySelectorAll('input[name="liev-tipo"]').forEach(r => {
        r.addEventListener('change', () => {
            const val = document.querySelector('input[name="liev-tipo"]:checked').value;
            el.lmPercGroup.style.display = val === 'madre' ? 'flex' : 'none';
            el.resLmBox.style.display    = val === 'madre' ? 'flex' : 'none';
            calculate();
        });
    });

    // ── Listener generici ─────────────────────────────────────────────────────
    document.querySelectorAll('input').forEach(i => i.addEventListener('input', calculate));

    // ── Calcolo principale ────────────────────────────────────────────────────
    function calculate() {
        el.errorMsg.style.display = 'none';

        const pezzi     = parseFloat(el.pezzi.value)        || 0;
        const pesoPezzo = parseFloat(el.pesoPezzo.value)    || 0;
        const burroP    = parseFloat(el.burroPerc.value)    || 0;
        const uovaP     = parseFloat(el.uovaPerc.value)     || 0;
        const zuccheroP = parseFloat(el.zuccheroPerc.value) || 0;
        const saleP     = parseFloat(el.salePerc.value)     || 0;
        const latteP    = parseFloat(el.lattePerc.value)    || 0;
        const tempAmb   = parseFloat(el.tempAmb.value)      || 22;
        const lmP       = parseFloat(el.lmPerc.value)       || 0;
        const lievTipo  = document.querySelector('input[name="liev-tipo"]:checked').value;
        const metodo    = document.querySelector('input[name="metodo"]:checked').value;
        const hasAromi  = el.aromi.checked;

        if (pezzi <= 0 || pesoPezzo <= 0) {
            showError('Inserisci un numero valido di pezzi e peso per pezzo.');
            return;
        }

        // Baker's percentage: total dough = farina * (1 + somma %)
        // Perdita cottura ~12% per brioche e lievitati — coerente con script_laminati
        const perdita = 1.12;
        const totDough = pezzi * pesoPezzo * perdita;
        const lmContributo = lievTipo === 'madre' ? lmP : 0;
        const totalPerc = 100 + burroP + uovaP + zuccheroP + saleP + latteP + lmContributo;

        const farina   = (totDough / totalPerc) * 100;
        const burro    = farina * burroP / 100;
        const uova     = farina * uovaP / 100;
        const zucchero = farina * zuccheroP / 100;
        const sale     = farina * saleP / 100;
        const latte    = farina * latteP / 100;
        const lmWeight = farina * lmContributo / 100;

        // Lievito di birra: formula empirica adattata per ricchi impasti
        // I grassi e gli zuccheri rallentano la fermentazione
        const richnessFactor = 1 + (burroP / 100) * 0.8 + (zuccheroP / 100) * 0.5;
        const tempFactor = Math.max(0.5, (30 - tempAmb) / 10);
        const baseYeastPerc = 0.015 * richnessFactor * tempFactor;

        let yeast = 0;
        let lievDesc = '';
        if (lievTipo === 'fresco') {
            yeast = farina * baseYeastPerc;
            lievDesc = 'g fresco';
        } else if (lievTipo === 'secco') {
            yeast = farina * (baseYeastPerc / 3);
            lievDesc = 'g secco';
        } else {
            // Solo lievito madre, niente lievito di birra
            yeast = 0;
            lievDesc = '—';
        }

        // Aromi
        const aroma_scorza = hasAromi ? (farina * 0.005).toFixed(1) : 0;
        const aroma_vaniglia = hasAromi ? '1 bacca' : '';

        // ── Output ────────────────────────────────────────────────────────────
        el.resFarina.textContent   = fmt(farina)    + ' g';
        el.resBurro.textContent    = fmt(burro)     + ' g';
        el.resUova.textContent     = fmt(uova)      + ' g';
        el.resZucchero.textContent = fmt(zucchero)  + ' g';
        el.resSale.textContent     = fmtDec(sale)   + ' g';
        el.resLatte.textContent    = fmt(latte)     + ' g';
        el.resLievito.textContent  = lievTipo !== 'madre'
            ? fmtDec(yeast) + ' ' + lievDesc
            : '—';
        el.resLm.textContent       = fmt(lmWeight)  + ' g';
        el.resTotale.textContent   = fmt(farina + burro + uova + zucchero + sale + latte + lmWeight) + ' g';
        el.resUovaNum.textContent  = uova > 0
            ? `~${Math.round(uova / 55)} uova (${fmt(uova)} g)`
            : '—';

        if (hasAromi) {
            el.aroміRow.style.display = 'flex';
            el.resAromi.textContent = `scorza ${aroma_scorza}g + vaniglia`;
        } else {
            el.aroміRow.style.display = 'none';
        }

        // ── Extra ingredient (gocce / ripieno) ───────────────────────────────
        const tDef = TYPES[currentType];

        if (tDef.extra && tDef.extra.perc !== null) {
            // Pangoccioli: gocce di cioccolato
            const gocceP = parseFloat(el.extraPerc.value) || tDef.extra.perc;
            const gocce  = farina * gocceP / 100;
            el.extraRow.style.display = 'flex';
            el.extraLabel.textContent = tDef.extra.icon + ' ' + tDef.extra.label + ':';
            el.resExtra.textContent   = fmt(gocce) + ' g';
            el.fillingBox.style.display = 'none';
        } else if (tDef.fillingRatio) {
            el.extraRow.style.display = 'none';
            const fr = tDef.fillingRatio;
            const fBurro    = farina * fr.burro / 100;
            const fZucchero = farina * fr.zucchero / 100;
            el.fillingBox.style.display = 'block';

            if (currentType === 'cinnamonroll') {
                const fCannella = farina * fr.cannella / 100;
                const fSale     = farina * fr.sale / 100;
                el.fillingBox.innerHTML = `
                    <h3><span class="icon">🌀</span> Ripieno Cinnamon Roll</h3>
                    <div class="filling-grid">
                        <div class="filling-item"><span class="f-label">Burro pomato</span><span class="f-value">${fmt(fBurro)} g</span></div>
                        <div class="filling-item"><span class="f-label">Zucchero muscovado</span><span class="f-value">${fmt(fZucchero)} g</span></div>
                        <div class="filling-item"><span class="f-label">Cannella Ceylon</span><span class="f-value">${fmtDec(fCannella)} g</span></div>
                        <div class="filling-item"><span class="f-label">Sale fino</span><span class="f-value">${fmtDec(fSale)} g</span></div>
                    </div>
                    <p class="filling-note">Mescola fino a crema spalmabile. Il ripieno deve essere a temperatura ambiente — né freddo né sciolto. Ricopri tutta la superficie dell'impasto steso fino ai bordi.</p>
                    <h3 style="margin-top:1rem"><span class="icon">🍦</span> Cream Cheese Frosting</h3>
                    <div class="filling-grid">
                        <div class="filling-item"><span class="f-label">Cream cheese</span><span class="f-value">${fmt(farina * 0.2)} g</span></div>
                        <div class="filling-item"><span class="f-label">Burro pomato</span><span class="f-value">${fmt(farina * 0.08)} g</span></div>
                        <div class="filling-item"><span class="f-label">Zucchero a velo</span><span class="f-value">${fmt(farina * 0.15)} g</span></div>
                        <div class="filling-item"><span class="f-label">Estratto vaniglia</span><span class="f-value">1 cucchiaino</span></div>
                    </div>
                    <p class="filling-note">Monta cream cheese + burro, poi aggiungi zucchero a velo setacciato e vaniglia. Applica sui rolls ancora caldi (non bollenti).</p>
                `;
            } else {
                // Kardamom knots
                const fCardamomo = farina * fr.cardamomo / 100;
                const fCannella  = farina * fr.cannella / 100;
                el.fillingBox.innerHTML = `
                    <h3><span class="icon">🌿</span> Ripieno</h3>
                    <div class="filling-grid">
                        <div class="filling-item"><span class="f-label">Burro pomato</span><span class="f-value">${fmt(fBurro)} g</span></div>
                        <div class="filling-item"><span class="f-label">Zucchero muscovado</span><span class="f-value">${fmt(fZucchero)} g</span></div>
                        <div class="filling-item"><span class="f-label">Cardamomo macinato</span><span class="f-value">${fmtDec(fCardamomo)} g</span></div>
                        <div class="filling-item"><span class="f-label">Cannella</span><span class="f-value">${fmtDec(fCannella)} g</span></div>
                    </div>
                    <p class="filling-note">Mescola burro + zucchero + spezie fino a ottenere un composto cremoso. Spalma sull'impasto steso.</p>
                `;
            }
        } else {
            el.extraRow.style.display = 'none';
            el.fillingBox.style.display = 'none';
        }

        // ── Timeline ─────────────────────────────────────────────────────────
        renderTimeline(metodo, lievTipo, tempAmb, currentType);

        // ── Consigli ─────────────────────────────────────────────────────────
        renderTips(currentType);
    }

    // ── Timeline ─────────────────────────────────────────────────────────────
    function renderTimeline(metodo, lievTipo, temp, type) {
        const steps = [];
        const isRich    = (type === 'classica' || type === 'veneziana');
        const isKnot    = type === 'kardamom';
        const isPango   = type === 'pangoccioli';
        const isBun     = (type === 'burgerbun' || type === 'potatobun');
        const isBauletto = type === 'bauletto';
        const isCinnamon = type === 'cinnamonroll';
        const isGraffa   = type === 'graffe';
        const isMaritozzо = type === 'maritozzi';
        const lmSlow    = lievTipo === 'madre';

        const tFactor = temp >= 26 ? 0.75 : temp >= 22 ? 1 : temp >= 18 ? 1.3 : 1.6;

        if (metodo === 'poolish') {
            steps.push({ icon: '🥣', label: 'Prepara il Poolish', duration: '10 min', note: '50% farina + 50% latte + pizzico lievito. Mescola e copri.' });
            steps.push({ icon: '⏳', label: 'Maturazione Poolish', duration: formatH(tFactor * (lmSlow ? 8 : 4)), note: 'A temperatura ambiente, finché raddoppia e bolle in superficie.' });
        }

        // Impastamento
        if (isKnot) {
            steps.push({ icon: '🍳', label: 'Impastamento', duration: '10–15 min', note: 'Impasta fino a ottenere un panetto liscio ed elastico. Non sovra-impastare.' });
        } else if (type === 'potatobun') {
            steps.push({ icon: '🥔', label: 'Prepara le patate', duration: '20 min', note: 'Lessa le patate, scolale bene e schiacciale finissime mentre sono ancora calde. Lascia raffreddare completamente prima di aggiungerle all\'impasto.' });
            steps.push({ icon: '🍳', label: 'Impastamento', duration: '12–18 min', note: 'Aggiungi le patate fredde insieme alla farina. L\'impasto sarà più appiccicoso del normale — non aggiungere farina extra. Usa la planetaria o mani umide.' });
        } else if (isBauletto) {
            steps.push({ icon: '🍳', label: 'Impastamento', duration: '10–15 min', note: 'Impasto semplice: mescola tutto insieme e lavora finché è liscio ed omogeneo. Non richiede incordatura lunga.' });
        } else if (isCinnamon) {
            steps.push({ icon: '🍳', label: 'Impastamento', duration: '15–20 min', note: 'Incorda prima la parte asciutta, poi aggiungi il burro a temperatura ambiente in 3–4 riprese. Finisci quando l\'impasto è liscio, lucido e si stacca dalla ciotola.' });
            steps.push({ icon: '🧈', label: 'Prepara il Ripieno', duration: '5 min', note: 'Mescola burro pomato, zucchero muscovado, cannella (abbondante) e pizzico di sale. Deve avere consistenza di pasta spalmabile. Tieni a temperatura ambiente.' });
        } else if (isGraffa) {
            steps.push({ icon: '🥔', label: 'Prepara le patate', duration: '25 min', note: 'Lessa le patate con la buccia, pelale e passale al setaccio finché sono ancora calde. Stendi su un vassoio e lascia raffreddare completamente.' });
            steps.push({ icon: '🍳', label: 'Impastamento', duration: '15–20 min', note: 'Inserisci le patate fredde con la farina. Aggiungi scorza di agrumi e vaniglia. Incorpora il burro morbido a pezzi solo a impasto incordato. Deve risultare morbido e leggermente appiccicoso.' });
        } else if (isMaritozzо) {
            steps.push({ icon: '🍳', label: 'Impastamento', duration: '20–25 min', note: 'Aggiungi miele, scorza d\'arancia e vaniglia all\'impasto. Incorpora il burro a temperatura ambiente in 4–5 riprese, aspettando che ogni aggiunta sia assorbita. L\'impasto finale è liscio, elastico e profumatissimo.' });
        } else {
            steps.push({ icon: '🍳', label: 'Impastamento', duration: isRich ? '20–30 min' : '12–18 min', note: isRich ? 'Planetaria: prima incorda la parte asciutta, poi aggiungi burro a freddo in più riprese.' : isPango ? 'Incorda bene l\'impasto, poi aggiungi le gocce di cioccolato congelate negli ultimi 2 min.' : 'A mano o planetaria, finché l\'impasto è liscio ed elastico.' });
        }

        // Prima lievitazione
        if (metodo === 'frigo') {
            steps.push({ icon: '❄️', label: 'Prima Lievitazione (Frigo)', duration: '8–12 ore', note: 'Copri con pellicola e metti in frigo. Lievita lentamente e sviluppa più aroma.' });
            steps.push({ icon: '🌡️', label: 'Acclimatazione', duration: '1–2 ore', note: 'Tira fuori dal frigo e lascia tornare a temperatura ambiente prima di formare.' });
        } else {
            const rise1 = lmSlow ? formatH(tFactor * 3) : formatH(tFactor * 1.5);
            steps.push({ icon: '📈', label: 'Prima Lievitazione', duration: rise1, note: 'Copri con pellicola o canovaccio umido. L\'impasto deve raddoppiare.' });
        }

        // Formatura specifica per tipo
        if (isKnot) {
            steps.push({ icon: '🧈', label: 'Prepara il Ripieno', duration: '5 min', note: 'Mescola burro pomato, zucchero muscovado, cardamomo macinato e cannella in una ciotola.' });
            steps.push({ icon: '📐', label: 'Stendi e Farcisci', duration: '10 min', note: 'Stendi l\'impasto in un rettangolo sottile (~4mm). Spalma il ripieno su tutta la superficie, piega a metà e taglia strisce da 2cm.' });
            steps.push({ icon: '🌀', label: 'Forma i Nodi', duration: '15–20 min', note: 'Tieni ogni striscia per le estremità, avvolgila attorno a due dita, poi passa un\'estremità nel centro. Disponi sulla teglia con carta forno.' });
        } else if (isPango) {
            steps.push({ icon: '🫙', label: 'Porzionatura', duration: '10 min', note: 'Dividi l\'impasto in pezzi uguali, forma palline tese e disponile distanziate sulla teglia.' });
        } else if (isBun) {
            steps.push({ icon: '⚖️', label: 'Porzionatura e Formatura', duration: '10–15 min', note: type === 'potatobun' ? 'Pesa 90–100 g per bun. Forma palline tese, poi schiaccia ogni pezzo a circa 2 cm di altezza con il palmo della mano.' : 'Pesa 80–90 g (classico) o 110–120 g (large). Forma sfere tese e schiaccia leggermente il top.' });
        } else if (isBauletto) {
            steps.push({ icon: '📦', label: 'Formatura in stampo', duration: '10 min', note: 'Stendi l\'impasto a rettangolo largo quanto lo stampo, arrotolalo su se stesso e ponilo nello stampo imburrato. Per il pancarré, riempi a 3/4 e chiudi con il coperchio.' });
        } else if (isCinnamon) {
            steps.push({ icon: '📐', label: 'Stendi e Farcisci', duration: '10 min', note: 'Stendi l\'impasto in un rettangolo di 40×60 cm, spessore 4 mm. Spalma il ripieno abbondantemente su tutta la superficie, fino ai bordi su 3 lati. Lascia 1 cm libero sul bordo lungo finale per sigillare.' });
            steps.push({ icon: '🌀', label: 'Arrotola e Taglia', duration: '10 min', note: 'Arrotola stretto dal lato lungo con tensione costante. Taglia rolls da 4–5 cm usando un filo da cucina (non un coltello): posiziona il filo sotto il rotolo, incrocia le estremità e tira — la spirale resterà intatta.' });
            steps.push({ icon: '🫙', label: 'Disponi in teglia', duration: '5 min', note: 'Posiziona i rolls in una teglia profonda imburrata, ravvicinati ma non a contatto. In lievitazione si toccheranno: si sostengono a vicenda e crescono in altezza.' });
        } else if (isGraffa) {
            steps.push({ icon: '⭕', label: 'Formatura a ciambella', duration: '15–20 min', note: 'Pesa pezzi da 80–90 g. Forma un salsicciotto di 20–22 cm e congiungilo a ciambella lasciando il buco generoso (5–6 cm di diametro): in frittura si restringe. Posa su quadrati di carta forno.' });
        } else if (isMaritozzо) {
            steps.push({ icon: '🫓', label: 'Formatura ovale', duration: '10–15 min', note: 'Pesa pezzi da 60–70 g. Forma filoncini ovali (non sfere): la forma allungata è la firma del maritozzo romano. Ponili sulla teglia con carta forno, ben distanziati.' });
        } else {
            steps.push({ icon: '✋', label: 'Formatura', duration: '10–20 min', note: 'Sgonfia delicatamente, forma i pezzi e disponili nello stampo o sulla teglia.' });
        }

        // Seconda lievitazione
        const rise2 = lmSlow ? formatH(tFactor * 4) : formatH(tFactor * (isRich ? 2 : isBauletto ? 2 : 1.5));
        const rise2note = isBauletto
            ? 'L\'impasto deve arrivare al bordo dello stampo (bauletto) o a 1 cm dal bordo (pancarré con coperchio).'
            : isKnot ? 'Copri con un canovaccio e lascia lievitare: i knots devono gonfiarsi sensibilmente.'
            : isCinnamon ? 'I rolls devono gonfiarsi visibilmente e toccarsi tra loro nella teglia. Se premi leggermente con un dito, l\'impronta deve tornare lentamente su.'
            : isGraffa ? 'Le graffe devono gonfiare e diventare leggere al tatto. Non sovra-lievitare: si sgonfiano in frittura.'
            : isMaritozzо ? 'I maritozzi devono raddoppiare e apparire gonfi e soffici. Una lievitazione ottimale garantisce la texture caratteristica "a nuvola".'
            : 'Copri e lascia lievitare fino a quando i pezzi sono gonfi e soffici al tatto.';
        steps.push({ icon: '🌤️', label: 'Seconda Lievitazione', duration: rise2, note: rise2note });

        // Lucidatura e cottura
        if (isKnot) {
            steps.push({ icon: '🔥', label: 'Cottura a 190°C', duration: '12–15 min', note: 'Forno statico, finché dorati in superficie. Controllare dal basso: non devono bruciarsi.' });
            steps.push({ icon: '🍯', label: 'Glassa con sciroppo', duration: '2 min', note: 'Appena usciti dal forno, spennella con sciroppo di zucchero 1:1 (acqua + zucchero a 50°C).' });
        } else if (isBun) {
            const glaze = type === 'potatobun'
                ? 'Spennella con burro fuso per la classica superficie gialla dorata dei potato bun americani.'
                : 'Spennella con uovo intero sbattuto + pizzico di sale. Aggiungi semi di sesamo subito dopo.';
            steps.push({ icon: '🖌️', label: 'Lucidatura', duration: '3 min', note: glaze });
            steps.push({ icon: '🔥', label: type === 'potatobun' ? 'Cottura a 185°C' : 'Cottura a 190°C', duration: '13–16 min', note: 'Forno statico. Devono risultare dorati ma ancora morbidi al tatto — non aspettare che si scuriscano.' });
            if (type === 'potatobun') {
                steps.push({ icon: '🧈', label: 'Burro finale', duration: '1 min', note: 'Appena sfornati, spennella di nuovo con burro fuso. Questa seconda mano è il segreto della crosta morbida e lucida dei Martin\'s.' });
            }
        } else if (isBauletto) {
            steps.push({ icon: '🖌️', label: 'Lucidatura', duration: '3 min', note: 'Spennella con latte intero o uovo sbattuto allungato con latte per una crosta dorata.' });
            steps.push({ icon: '🔥', label: 'Cottura a 175–180°C', duration: '30–45 min', note: 'Forno statico. 30–35 min per stampo da 500 g, 40–45 min per 1 kg. T° cuore 95°C. Il pancarré cuoce col coperchio per tutta la durata.' });
        } else if (isCinnamon) {
            steps.push({ icon: '🔥', label: 'Cottura a 185°C', duration: '18–22 min', note: 'Forno statico, griglia bassa. I rolls sono pronti quando sono dorati in superficie e il caramello del ripieno bolle ai lati. Non aprire il forno nei primi 15 min.' });
            steps.push({ icon: '🍦', label: 'Cream Cheese Frosting', duration: '5 min', note: 'Applica il frosting (cream cheese + burro pomato + zucchero a velo + vaniglia) sui rolls ancora caldi ma non bollenti: deve colare leggermente nelle spirali. Servi entro 30 minuti.' });
        } else if (isGraffa) {
            steps.push({ icon: '🛢️', label: 'Frittura a 170°C', duration: '3–4 min per lato', note: 'Olio di arachidi profondo a 170°C (termometro obbligatorio). Immergi le graffe con la carta forno (si staccherà da sola), friggi 3–4 min per lato girando una volta sola. Non sovraffollare il tegame.' });
            steps.push({ icon: '🍬', label: 'Zucchero finale', duration: '2 min', note: 'Scola su carta assorbente 30 secondi, poi passa immediatamente nello zucchero semolato mentre sono ancora calde. Lo zucchero aderisce grazie all\'umidità superficiale.' });
        } else if (isMaritozzо) {
            steps.push({ icon: '🖌️', label: 'Lucidatura', duration: '3 min', note: 'Spennella con uovo intero sbattuto per una superficie mogano lucida. Non usare solo tuorlo: l\'albumina garantisce la lucentezza caratteristica.' });
            steps.push({ icon: '🔥', label: 'Cottura a 180°C', duration: '14–18 min', note: 'Forno statico, griglia a metà. Devono risultare belli dorati e profumati. T° cuore 93°C.' });
            steps.push({ icon: '🍯', label: 'Sciroppo finale', duration: '2 min', note: 'Appena sfornati, spennella con sciroppo di zucchero 1:1 caldo: dà la lucentezza tipica delle vetrine romane e mantiene l\'umidità.' });
            steps.push({ icon: '🍦', label: 'Farcitura con panna', duration: '5 min (al momento)', note: 'Solo al momento del servizio: incidi il maritozzo per 2/3 dall\'alto, farcisci abbondantemente con panna montata al 35% (poco zucchero, nessun addensante). La gobba di panna deve essere generosa e scenografica.' });
        } else {
            steps.push({ icon: '🖌️', label: 'Lucidatura', duration: '5 min', note: isPango ? 'Spennella con latte intero per una superficie dorata e morbida.' : 'Spennella con tuorlo d\'uovo + latte. Aggiungi granella di zucchero se desiderato.' });
            const bakeTemp = isRich ? '170–175°C' : '180–185°C';
            const bakeTime = isRich ? '18–25 min' : '15–20 min';
            steps.push({ icon: '🔥', label: `Cottura a ${bakeTemp}`, duration: bakeTime, note: 'Forno statico, griglia a metà altezza. La brioche è pronta quando è dorata e suona vuota.' });
        }

        steps.push({ icon: '💨', label: 'Raffreddamento', duration: isBauletto ? '1–2 ore' : isGraffa ? '5 min' : isCinnamon ? '10 min' : '20–30 min', note: isBauletto ? 'Sforna, lascia riposare 10 min nello stampo, poi togli e fai raffreddare completamente su una griglia prima di affettare.' : isGraffa ? 'Le graffe si mangiano calde. Se avanzano, riscaldare brevemente in forno a 150°C per 5 min prima di servire.' : isCinnamon ? 'Lascia riposare 10 min prima del frosting. Servire tiepidi — non aspettare che si freddino del tutto.' : isMaritozzо ? 'Raffredda completamente su una griglia prima di farcire. Il maritozzo non va farcito caldo: la panna si scioglierebbe.' : 'Sforna e lascia raffreddare su una griglia. Non coprire subito per non ammorbidire la crosta.' });

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
    function renderTips(type) {
        const tips = TYPES[type].tips;
        el.tipsSection.innerHTML = `
            <h3><span class="icon">💡</span> Consigli per ${TYPES[type].label}</h3>
            <ul class="tips-list">
                ${tips.map(t => `<li>${t}</li>`).join('')}
            </ul>
        `;
    }

    // ── Utilità ───────────────────────────────────────────────────────────────
    function fmt(n)    { return Math.round(n); }
    function fmtDec(n) { return n.toFixed(1).replace('.', ','); }
    function formatH(h) {
        const hh = Math.round(h * 2) / 2;
        if (hh < 1) return `${Math.round(hh * 60)} min`;
        return `${hh} ore`;
    }
    function showError(msg) {
        el.errorMsg.textContent = msg;
        el.errorMsg.style.display = 'block';
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    loadTypeDefaults('classica');
    calculate();
});
