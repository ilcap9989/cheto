(function () {
  var KEY = 'cheto_checkins_v1';

  // Il PIANO parte il 17 agosto 2026 e dura 14 giorni (ciclo che si ripete).
  var START = new Date(2026, 7, 17);
  var DAYS = 14;

  // Il GRAFICO parte invece dal 27 luglio, per non perdere lo storico.
  var START_G = new Date(2026, 6, 27);
  var DAYS_G = 36;                       // 27 lug -> 30 ago 2026
  var W0 = 118.0;                        // peso di partenza assoluto

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
    { d: '2026-08-04', p: 116.9, f: null, n: 'Weekend 1-2/8 fuori protocollo. Da oggi schema 5+2.' },
    { d: '2026-08-07', p: 115.4, f: null, n: 'Checkpoint 1 dello schema 5+2: −0,1 kg venerdì su venerdì, contro un target di −0,7. Schema sotto osservazione.' },
    { d: '2026-08-17', p: 117.9, f: null, n: 'Ripartenza dopo 10 giorni fuori protocollo (compagna ricoverata). Gran parte del +2,5 è glicogeno e acqua: il grasso reale in più è stimabile in 0,5-1 kg.' }
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
  // Traiettoria del protocollo VLCKD 5 giorni + keto 2 giorni, dal 17 ago 2026
  // (indice 21 sul grafico, 117,9 kg). I primi 3 giorni sono scarico di
  // glicogeno e acqua, non grasso. Poi -0,15 kg nei feriali e -0,05 nel
  // weekend: circa -0,85 kg a settimana, misurato SEMPRE venerdì su venerdì.
  var PIVOT = 21, PIVOT_KG = 117.9;
  var RIENTRO = [-0.60, -0.45, -0.35];
  var DELTA = { 1: -0.15, 2: -0.15, 3: -0.15, 4: -0.15, 5: -0.15, 6: -0.05, 0: -0.05 };

  var labels = [], previsto = [], keys = [], venerdi = [];
  var corrente = PIVOT_KG;
  for (var t = 0; t < DAYS_G; t++) {
    var dt = new Date(START_G.getTime() + t * 86400000);
    labels.push(dt.getDate() + '/' + (dt.getMonth() + 1));
    keys.push(iso(dt));
    venerdi.push(dt.getDay() === 5);
    if (t < PIVOT) {
      previsto.push(null);
    } else if (t === PIVOT) {
      previsto.push(PIVOT_KG);
    } else {
      corrente += (t - PIVOT <= 3) ? RIENTRO[t - PIVOT - 1] : DELTA[dt.getDay()];
      previsto.push(Math.round(corrente * 100) / 100);
    }
  }

  var oggi = new Date();
  var oggiZero = new Date(oggi.getFullYear(), oggi.getMonth(), oggi.getDate());
  var idx = Math.round((oggiZero - START) / 86400000);           // indice nel piano
  var idxG = Math.round((oggiZero - START_G) / 86400000);        // indice sul grafico
  var inFase = idx >= 0 && idx < DAYS;

  function pianoDi(i) { return GIORNI[((i % 14) + 14) % 14]; }
  function prevDi(i) { return (i >= 0 && i < DAYS_G) ? previsto[i] : null; }

  function riga(h, testo, kc, ricetta, tag, cls) {
    return '<div class="meal' + (cls ? ' ' + cls : '') + '"><div class="h">' + h + '</div><div class="b">' +
      esc(testo) + (tag ? ' <span class="tag">' + tag + '</span>' : '') +
      (kc ? '<br><span class="kc">' + kc + '</span>' : '') +
      (ricetta ? '<details><summary>Come si prepara</summary><p>' + esc(ricetta) + '</p></details>' : '') +
      '</div></div>';
  }

  function lista(arr) {
    var s = '';
    arr.forEach(function (r) { s += '<li>' + esc(r) + '</li>'; });
    return s;
  }

  // ---------- scheda di oggi ----------
  function schedaOggi() {
    var g = pianoDi(idx);
    var pv = prevDi(idxG);
    var tdee = 2600;

    var html =
      '<div class="hd">' +
        '<span class="day">' + GG[oggi.getDay()].charAt(0).toUpperCase() + GG[oggi.getDay()].slice(1) + ' ' + oggi.getDate() + ' ' + MM[oggi.getMonth()] + '</span>' +
        '<span class="badge">Giorno ' + (idx + 1) + ' di ' + DAYS + '</span>' +
        '<span class="badge">' + g.tipo + '</span>' +
        (venerdi[idxG] ? '<span class="badge">pesata di verifica</span>' : '') +
        '<span class="meta">' + esc(g.n) + (pv == null ? '' : ' · previsto ' + fmt(pv) + ' kg') + '</span>' +
      '</div>';

    html += '<p class="nota" style="border-color:#eb6834"><b>Da fare:</b> ' + esc(AVVISO) + '</p>';

    if (g.we) {
      html += '<div class="we"><b>Weekend keto · 1.600 kcal</b><ul>' + lista(WEEKEND.regole) +
              '</ul><p class="wefb">' + esc(WEEKEND.fallback) + '</p></div>';
    }

    html +=
      riga('Colazione 07:30', g.colazione.t, g.colazione.kc, g.colazione.r, '') +
      riga('Pranzo 13:00', g.pranzo.t, g.pranzo.kc, g.pranzo.r, g.pranzo.l === 'lavoro' ? 'da portare al lavoro' : 'a casa') +
      riga('Ore 17:00', g.spuntino.t, g.spuntino.kc, g.spuntino.r, 'obbligatorio', 'sp') +
      riga('Cena 20:00', g.cena.t, g.cena.kc, g.cena.r, 'piatto · tavolo · entro le 20:30') +
      '<p class="tot">Totale giornata: <b>' + g.kcal + ' kcal</b> · ' + g.p + ' g proteine · ' + g.g + ' g grassi · ' + g.c + ' g carbo netti' +
      '<span style="color:var(--ink-3)"> · deficit ' + (tdee - g.kcal) + ' kcal sul TDEE</span></p>' +
      (g.nota ? '<p class="nota"><b>Nota:</b> ' + esc(g.nota) + '</p>' : '') +
      '<details style="margin-top:12px"><summary><b>Le 6 regole di queste due settimane</b></summary><ul>' + lista(REGOLE) + '</ul></details>' +
      '<details style="margin-top:6px"><summary><b>Scambi consentiti</b></summary><ul>' + lista(SCAMBI) + '</ul></details>';

    $('today').innerHTML = html;
  }

  if (inFase) {
    schedaOggi();
  } else {
    $('today').innerHTML = '<div class="hd"><span class="day">' + GG[oggi.getDay()].charAt(0).toUpperCase() + GG[oggi.getDay()].slice(1) + ' ' + oggi.getDate() + ' ' + MM[oggi.getMonth()] +
      '</span><span class="badge">Fuori dal piano</span></div><p style="margin:0;font-size:14px;color:var(--ink-2)">Il piano corrente va dal 17 al 30 agosto 2026. Dopo il 30 serve una nuova revisione — e soprattutto la rivalutazione medica.</p>';
  }

  // ---------- calendario ----------
  var c = '';
  for (var i = 0; i < DAYS; i++) {
    var dd = new Date(START.getTime() + i * 86400000);
    var gg = pianoDi(i);
    var iG = Math.round((dd - START_G) / 86400000);
    var pv = prevDi(iG);
    var stato = i === idx ? ' now' : (i < idx ? ' past' : '');
    c += '<div class="dayrow' + stato + (gg.we ? ' we' : '') + '">' +
         '<div class="dh"><b>Giorno ' + (i + 1) + '</b> · ' + GG[dd.getDay()] + ' ' + dd.getDate() + '/' + (dd.getMonth() + 1) +
         (i === idx ? ' <span class="badge">oggi</span>' : '') +
         '<span class="badge">' + gg.tipo + '</span>' +
         (dd.getDay() === 5 ? ' <span class="badge">pesata di verifica</span>' : '') +
         '<span class="dk">' + gg.kcal + ' kcal · ' + gg.p + ' g prot · ' + gg.c + ' g carbo' + (pv == null ? '' : ' · previsto ' + fmt(pv) + ' kg') + '</span></div>' +
         '<div class="dl"><span>Colazione</span>' + esc(gg.colazione.t) + '</div>' +
         '<div class="dl"><span>Pranzo</span>' + esc(gg.pranzo.t) + '</div>' +
         '<div class="dl"><span>Ore 17:00</span>' + esc(gg.spuntino.t) + ' <i style="color:var(--ink-3);font-style:normal">— obbligatorio</i></div>' +
         '<div class="dl"><span>Cena</span>' + esc(gg.cena.t) + '</div>' +
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

    // ultimi due venerdì registrati: è la metrica ufficiale del protocollo
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
          dVen === null ? '' : (dVen <= -0.8 ? 'color:#0f6e56' : 'color:#a32d2d'));

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
        { label: 'Traiettoria attesa', data: previsto, borderColor: '#eb6834', borderWidth: 2, borderDash: [6, 5], pointRadius: 0, pointHoverRadius: 4, fill: false, tension: 0.2, spanGaps: false },
        { label: 'Reale', data: reale, borderColor: '#2a78d6', backgroundColor: 'rgba(42,120,214,0.10)', borderWidth: 3, fill: true, tension: 0.25, pointRadius: 5, pointBackgroundColor: '#2a78d6', pointBorderColor: '#fff', pointBorderWidth: 2, spanGaps: true }
      ] },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (x) { return x.parsed.y === null ? null : x.dataset.label + ': ' + fmt(x.parsed.y) + ' kg'; } } } },
        scales: {
          y: { min: 113, max: 119, ticks: { color: '#898781', stepSize: 1, callback: function (v) { return v.toFixed(0) + ' kg'; } }, grid: { color: '#e5e3dd' } },
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
