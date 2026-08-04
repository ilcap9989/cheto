(function () {
  var KEY = 'cheto_checkins_v1';
  var START = new Date(2026, 6, 27);
  var DAYS = 28;
  var W0 = 118.0;
  var GG = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  var MM = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];

  var seed = [
    { d: '2026-07-27', p: 118.0 },
    { d: '2026-07-28', p: 116.7 },
    { d: '2026-07-29', p: 115.7 },
    { d: '2026-07-30', p: 115.2 },
    { d: '2026-07-31', p: 115.5 },
    { d: '2026-08-01', p: 116.1 },
    { d: '2026-08-02', p: 116.6, f: null, n: 'Sera del 1/8 in spiaggia: 3 birre, pizza tonno e cipolla + un pezzo extra.' },
    { d: '2026-08-04', p: 116.9, f: null, n: 'Weekend 1-2/8 fuori protocollo (pizza+birre sab, kebab+patatine dom). Lun 3/8 pulito. Da oggi schema 5+2.' }
  ];

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save(r) { try { localStorage.setItem(KEY, JSON.stringify(r)); } catch (e) {} }
  function all() {
    var m = {};
    seed.forEach(function (r) { m[r.d] = { d: r.d, p: r.p, f: r.f == null ? null : r.f, n: r.n || '' }; });
    load().forEach(function (r) { m[r.d] = r; });
    return Object.keys(m).sort().map(function (k) { return m[k]; });
  }
  function iso(dt) { return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0'); }
  function fmt(n) { return Number(n).toFixed(1).replace('.', ','); }
  function say(t) { $('msg').textContent = t; }

  // ---------- curva prevista ----------
  // La vecchia proiezione VLCKD 7/7 è stata ritirata: non è più il protocollo
  // in corso e mostrarla creava un confronto senza senso. La traiettoria parte
  // dal 4 ago 2026 (indice 8, 116,9 kg) e segue il modello 5+2: calo nei
  // feriali, risalita fisiologica di acqua nel weekend. Netto atteso circa
  // -0,85 kg a settimana, misurato SEMPRE venerdì contro venerdì.
  var PIVOT = 8, PIVOT_KG = 116.9;
  var DELTA = { 1: -0.30, 2: -0.28, 3: -0.28, 4: -0.27, 5: -0.27, 6: 0.30, 0: 0.25 };

  var labels = [], previsto = [], keys = [], venerdi = [];
  var corrente = PIVOT_KG;
  for (var t = 0; t < DAYS; t++) {
    var dt = new Date(START.getTime() + t * 86400000);
    labels.push(dt.getDate() + '/' + (dt.getMonth() + 1));
    keys.push(iso(dt));
    venerdi.push(dt.getDay() === 5);
    if (t < PIVOT) {
      previsto.push(null);
    } else if (t === PIVOT) {
      previsto.push(PIVOT_KG);
    } else {
      corrente += DELTA[dt.getDay()];
      if (t === PIVOT + 1 || t === PIVOT + 2) { corrente -= 0.15; } // scarico glicogeno del rientro
      previsto.push(Math.round(corrente * 100) / 100);
    }
  }

  var oggi = new Date();
  var idx = Math.round((new Date(oggi.getFullYear(), oggi.getMonth(), oggi.getDate()) - START) / 86400000);
  var inFase = idx >= 0 && idx < DAYS;

  function pianoDi(i) { return GIORNI[((i % 14) + 14) % 14]; }
  function spuntinoDi(i) { return SPUNTINI[SPUNTINO_DI[((i % 14) + 14) % 14]]; }

  function riga(h, testo, kc, ricetta, tag) {
    return '<div class="meal"><div class="h">' + h + '</div><div class="b">' +
      esc(testo) + (tag ? ' <span class="tag">' + tag + '</span>' : '') +
      (kc ? '<br><span class="kc">' + kc + '</span>' : '') +
      (ricetta ? '<details><summary>Come si prepara</summary><p>' + esc(ricetta) + '</p></details>' : '') +
      '</div></div>';
  }

  // ---------- scheda di oggi ----------
  var gOggi = null, spOggi = null;

  function schedaOggi(conSpuntino) {
    var g = gOggi, sp = spOggi;
    var totBase = g.kcal;
    var totSpunt = g.kcal + sp.k - (g.cenaS ? g.cenaS.sc : 0);
    var tot = conSpuntino ? totSpunt : totBase;
    var cena = conSpuntino && g.cenaS ? g.cenaS.t : g.cena.t;

    var toggle =
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:14px 0 4px">' +
        '<span style="font-size:13px;color:var(--ink-2)">Fame nel pomeriggio?</span>' +
        '<button type="button" id="sp-no"' + (conSpuntino ? '' : ' data-on="1"') + ' class="pill">Sotto 6/10 · niente spuntino</button>' +
        '<button type="button" id="sp-si"' + (conSpuntino ? ' data-on="1"' : '') + ' class="pill">Sopra 6/10 · spuntino + cena scalata</button>' +
      '</div>';

    var html =
      '<div class="hd">' +
        '<span class="day">' + GG[oggi.getDay()].charAt(0).toUpperCase() + GG[oggi.getDay()].slice(1) + ' ' + oggi.getDate() + ' ' + MM[oggi.getMonth()] + '</span>' +
        '<span class="badge">Giorno ' + (idx + 1) + ' di 28</span>' +
        '<span class="meta">' + g.n + (previsto[idx] == null ? '' : ' · previsto ' + fmt(previsto[idx]) + ' kg') + '</span>' +
      '</div>';

    if (g.we) {
      html += '<div class="we"><b>Weekend · schema 5+2</b><ul>';
      WEEKEND.regole.forEach(function (r) { html += '<li>' + esc(r) + '</li>'; });
      html += '</ul><p class="wefb">' + esc(WEEKEND.fallback) + ' Il menu qui sotto è quello.</p></div>';
    }

    html += toggle +
      riga('Colazione', COLAZIONE.t, COLAZIONE.kc, COLAZIONE.r, '') +
      riga('Pranzo', g.pranzo.t, '', g.pranzo.r, g.pranzo.l === 'lavoro' ? 'da portare al lavoro' : 'a casa') +
      (conSpuntino ? riga('Ore 16:30', sp.t, sp.kc, '', 'facoltativo') : '') +
      riga('Cena', cena, '', g.cena.r, conSpuntino ? 'scalata di ' + g.cenaS.sc + ' kcal' : '') +
      '<p class="tot">Totale giornata: <b>' + tot + ' kcal</b> · ' + g.p + ' g proteine · ' + g.g + ' g grassi · ' + g.c + ' g carbo netti' +
      '<span style="color:var(--ink-3)"> · deficit ' + (2600 - tot) + ' kcal sul TDEE</span></p>' +
      (conSpuntino ? '' : '<p class="nota" style="border-color:#d3d1c7"><b>Senza spuntino:</b> se alle 17 la fame supera 6/10 non stringere i denti — premi il pulsante e usa la cena scalata. Con lo spuntino la giornata sta a ' + totSpunt + ' kcal invece di ' + totBase + ': ' + (totSpunt - totBase) + ' kcal in più valgono molto meno di uno sgarro serale da 1.700.</p>') +
      (g.nota ? '<p class="nota"><b>Nota:</b> ' + esc(g.nota) + '</p>' : '');

    $('today').innerHTML = html;
    $('sp-no').addEventListener('click', function () { schedaOggi(false); });
    $('sp-si').addEventListener('click', function () { schedaOggi(true); });
  }

  if (inFase) {
    gOggi = pianoDi(idx);
    spOggi = spuntinoDi(idx);
    schedaOggi(false);
  } else {
    $('today').innerHTML = '<div class="hd"><span class="day">' + GG[oggi.getDay()].charAt(0).toUpperCase() + GG[oggi.getDay()].slice(1) + ' ' + oggi.getDate() + ' ' + MM[oggi.getMonth()] + '</span><span class="badge">Fuori dalla Fase 1</span></div><p style="margin:0;font-size:14px;color:var(--ink-2)">La Fase 1 va dal 27 luglio al 23 agosto 2026.</p>';
  }

  // ---------- calendario ----------
  var c = '';
  for (var i = 0; i < DAYS; i++) {
    var dd = new Date(START.getTime() + i * 86400000);
    var gg = pianoDi(i), ss = spuntinoDi(i);
    var pieno = gg.kcal, conSp = gg.kcal + ss.k - (gg.cenaS ? gg.cenaS.sc : 0);
    var stato = i === idx ? ' now' : (i < idx ? ' past' : '');
    c += '<div class="dayrow' + stato + (gg.we ? ' we' : '') + '">' +
         '<div class="dh"><b>Giorno ' + (i + 1) + '</b> · ' + GG[dd.getDay()] + ' ' + dd.getDate() + '/' + (dd.getMonth() + 1) +
         (i === idx ? ' <span class="badge">oggi</span>' : '') +
         (gg.we ? ' <span class="badge">libero · tetto 2.600</span>' : '') +
         (venerdi[i] ? ' <span class="badge">pesata di verifica</span>' : '') +
         '<span class="dk">' + pieno + ' kcal · ' + conSp + ' con spuntino' + (previsto[i] == null ? '' : ' · previsto ' + fmt(previsto[i]) + ' kg') + '</span></div>' +
         '<div class="dl"><span>Colazione</span>' + esc(COLAZIONE.t) + '</div>' +
         '<div class="dl"><span>Pranzo</span>' + esc(gg.pranzo.t) + '</div>' +
         '<div class="dl"><span>Ore 16:30</span>' + esc(ss.t) + ' <i style="color:var(--ink-3);font-style:normal">— solo se fame &gt; 6/10</i></div>' +
         '<div class="dl"><span>Cena</span>' + esc(gg.cena.t) + '</div>' +
         (gg.cenaS ? '<div class="dl"><span>Cena scalata</span>' + esc(gg.cenaS.t) + '</div>' : '') +
         '</div>';
  }
  $('cal').innerHTML = c;

  // ---------- grafico e check-in ----------
  var chart = null;

  function render() {
    var rows = all(), byDate = {};
    rows.forEach(function (r) { byDate[r.d] = r.p; });
    var reale = keys.map(function (k) { return byDate[k] === undefined ? null : byDate[k]; });

    var pesi = rows.map(function (r) { return r.p; });
    var last = pesi[pesi.length - 1];
    var min = Math.min.apply(null, pesi);

    // ultimi due venerdì registrati: è la metrica ufficiale dello schema 5+2
    var ven = rows.filter(function (r) {
      var q = r.d.split('-');
      return new Date(+q[0], +q[1] - 1, +q[2]).getDay() === 5;
    });
    var dVen = ven.length >= 2 ? (ven[ven.length - 1].p - ven[ven.length - 2].p) : null;

    $('kpis').innerHTML =
      kpi('Peso attuale', fmt(last) + ' kg', '') +
      kpi('Calo totale', '−' + fmt(W0 - last) + ' kg', 'color:#0f6e56') +
      kpi('Minimo toccato', fmt(min) + ' kg', '') +
      kpi('Venerdì su venerdì', dVen === null ? 'in attesa' : (dVen <= 0 ? '−' : '+') + fmt(Math.abs(dVen)) + ' kg',
          dVen === null ? '' : (dVen <= -0.7 ? 'color:#0f6e56' : 'color:#a32d2d'));

    var h = '<table style="margin-top:18px"><thead><tr><th>Data</th><th class="num">Peso</th><th class="num">Fame</th><th>Note</th></tr></thead><tbody>';
    rows.slice().reverse().slice(0, 10).forEach(function (r) {
      var q = r.d.split('-');
      h += '<tr><td>' + q[2] + '/' + q[1] + '</td><td class="num">' + fmt(r.p) + ' kg</td><td class="num">' +
           (r.f ? r.f + '/10' : '—') + '</td><td style="color:var(--ink-2)">' + (r.n ? esc(r.n) : '—') + '</td></tr>';
    });
    $('hist').innerHTML = h + '</tbody></table>';

    if (chart) { chart.data.datasets[1].data = reale; chart.update(); return; }
    chart = new Chart($('chart'), {
      type: 'line',
      data: { labels: labels, datasets: [
        { label: 'Traiettoria 5+2', data: previsto, borderColor: '#eb6834', borderWidth: 2, borderDash: [6, 5], pointRadius: 0, pointHoverRadius: 4, fill: false, tension: 0.2, spanGaps: false },
        { label: 'Reale', data: reale, borderColor: '#2a78d6', backgroundColor: 'rgba(42,120,214,0.10)', borderWidth: 3, fill: true, tension: 0.25, pointRadius: 5, pointBackgroundColor: '#2a78d6', pointBorderColor: '#fff', pointBorderWidth: 2, spanGaps: true }
      ] },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (x) { return x.parsed.y === null ? null : x.dataset.label + ': ' + fmt(x.parsed.y) + ' kg'; } } } },
        scales: {
          y: { min: 112, max: 118.5, ticks: { color: '#898781', stepSize: 1, callback: function (v) { return v.toFixed(0) + ' kg'; } }, grid: { color: '#e5e3dd' } },
          x: { ticks: { color: '#898781', maxRotation: 0, autoSkipPadding: 14, font: { size: 11 } }, grid: { display: false } }
        }
      }
    });
  }

  function kpi(l, v, s) { return '<div class="kpi"><p class="lbl">' + l + '</p><p class="val" style="' + s + '">' + v + '</p></div>'; }

  $('d').value = iso(oggi);

  $('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var d = $('d').value, p = parseFloat($('p').value);
    if (!d || isNaN(p)) { return; }
    var f = parseInt($('f').value, 10);
    var rows = load().filter(function (r) { return r.d !== d; });
    rows.push({ d: d, p: Math.round(p * 10) / 10, f: isNaN(f) ? null : f, n: $('n').value || '' });
    rows.sort(function (a, b) { return a.d < b.d ? -1 : 1; });
    save(rows);
    $('p').value = ''; $('f').value = ''; $('n').value = '';
    var q = d.split('-');
    say(new Date(+q[0], +q[1] - 1, +q[2]).getDay() === 5 ? 'Salvato. Questo è un venerdì: è la pesata che conta.' : 'Salvato.');
    render();
  });

  $('exp').addEventListener('click', function () {
    var b = $('box'); b.style.display = 'block'; b.value = JSON.stringify(load()); b.select();
    say('Copi questo testo e lo incolli sull\'altro dispositivo con Importa.');
  });

  $('imp').addEventListener('click', function () {
    var b = $('box');
    if (b.style.display === 'none' || !b.value.trim()) {
      b.style.display = 'block'; b.value = ''; b.focus();
      say('Incolli qui il testo esportato, poi prema di nuovo Importa.');
      return;
    }
    try {
      var inc = JSON.parse(b.value);
      if (!Array.isArray(inc)) { throw new Error('formato'); }
      var mp = {};
      load().forEach(function (r) { mp[r.d] = r; });
      inc.forEach(function (r) { if (r && r.d && typeof r.p === 'number') { mp[r.d] = r; } });
      save(Object.keys(mp).sort().map(function (k) { return mp[k]; }));
      b.style.display = 'none'; b.value = '';
      say('Importati ' + inc.length + ' record.');
      render();
    } catch (err) { say('Testo non valido: controlli di aver incollato tutto.'); }
  });

  $('del').addEventListener('click', function () {
    if (confirm('Cancellare i check-in salvati su questo dispositivo? I dati storici del piano restano.')) {
      try { localStorage.removeItem(KEY); } catch (e) {}
      say('Storico locale cancellato.'); render();
    }
  });

  render();
})();
