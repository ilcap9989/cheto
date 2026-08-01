// Ciclo di 14 giorni, estratto da Piano_14giorni_VLCKD.html (rev. 4, 28 lug 2026).
// Indice 0 = Lun settimana 1 = 27 luglio 2026. Il ciclo si ripete ogni 14 giorni.
var COLAZIONE = {
  t: 'Yogurt greco intero 130 g + proteine in polvere 30 g + mandorle 6 g',
  kc: '310 kcal · 36 g proteine',
  r: 'Un minuto: versa lo yogurt, sciogli dentro il misurino fino a crema, aggiungi le mandorle. Si prepara la sera prima. Caffè nero. In alternativa: 3 uova sode del batch domenicale.'
};

var GIORNI = [
  { n: 'Lun · settimana 1', kcal: 864, p: 118, g: 34, c: 16,
    pranzo: { t: 'Tonno all\'olio EVO 120 g + insalata 100 g + pomodorini 100 g', l: 'lavoro', r: 'Nessuna cottura. Sgocciola bene il tonno, unisci insalata e pomodorini a pezzi. Sale, pepe e limone. Si assembla la sera prima.' },
    cena:   { t: 'Petto di pollo 150 g + zucchine 200 g + olio EVO 3 g', r: 'Salta le zucchine in padella con l\'olio 8-10 min. A lato cuoci il pollo 3-4 min per lato con sale e spezie.' } },

  { n: 'Mar · settimana 1', kcal: 797, p: 105, g: 34, c: 13,
    pranzo: { t: 'Frittata al forno: uova 100 g + albumi 100 g + spinaci 100 g + olio EVO 3 g', l: 'lavoro', r: 'Sbatti 2 uova + 3 albumi con sale, unisci gli spinaci, versa in pirofila e cuoci a 180° per circa 20 min. Taglia a quadrotti: si riscalda al fornetto o si mangia fredda.' },
    cena:   { t: 'Merluzzo o platessa 220 g + insalata 150 g + olio EVO 3 g', r: 'Cuoci il filetto in padella o al forno 8-10 min con un filo d\'olio, sale e limone. Servi con l\'insalata a lato.' } },

  { n: 'Mer · settimana 1', kcal: 839, p: 89, g: 40, c: 25,
    pranzo: { t: 'Fiocchi di latte 180 g + pomodorini 100 g', l: 'lavoro', r: 'Nessuna cottura. Fiocchi di latte in un contenitore con i pomodorini a pezzi, sale e pepe. Freddo, pronto da portare.' },
    cena:   { t: 'Hamburger di vitello 150 g + insalata 150 g + pomodorini 100 g + olio EVO 2 g', r: 'Forma l\'hamburger e cuocilo in padella ben calda 3-4 min per lato, sale. Servi con insalata e pomodorini a crudo, olio a filo.' } },

  { n: 'Gio · settimana 1', kcal: 849, p: 118, g: 33, c: 15,
    pranzo: { t: 'Tonno all\'olio EVO 120 g + cetriolo 100 g + insalata 100 g', l: 'lavoro', r: 'Nessuna cottura. Sgocciola il tonno, affetta il cetriolo crudo con la buccia, unisci l\'insalata. Sale, pepe e limone.' },
    cena:   { t: 'Petto di pollo 150 g + zucchine 200 g + olio EVO 2 g', r: 'Salta le zucchine in padella con l\'olio 8-10 min. A lato cuoci il pollo 3-4 min per lato con sale e spezie.' } },

  { n: 'Ven · settimana 1', kcal: 868, p: 107, g: 39, c: 13,
    pranzo: { t: 'Fesa di tacchino in busta 160 g + insalata 150 g + olio EVO 2 g', l: 'casa', r: 'Nessuna cottura. Taglia l\'affettato a striscioline sull\'insalata, olio a crudo e limone. Zero sale aggiunto: l\'affettato ne contiene già circa 2 g per 100 g. Se in etichetta le proteine sono sotto 20 g/100 g, porta la dose a 180 g.' },
    cena:   { t: 'Salmone 110 g + spinaci 200 g + olio EVO 1 g', r: 'Salmone in padella antiaderente 3-4 min per lato, prima dal lato pelle, sale. Servi con spinaci saltati nell\'olio.' } },

  { n: 'Sab · settimana 1', kcal: 862, p: 108, g: 39, c: 16,
    pranzo: { t: 'Fesa di tacchino in busta 130 g + insalata 100 g + pomodorini 80 g + olio EVO 2 g', l: 'casa', r: 'Nessuna cottura. Striscioline su insalata e pomodorini, olio a crudo e limone. Zero sale aggiunto. Se le proteine in etichetta sono sotto 20 g/100 g, porta la dose a 150 g.' },
    cena:   { t: 'Hamburger di vitello 150 g + zucchine 200 g + olio EVO 1 g', r: 'Forma l\'hamburger e cuocilo in padella ben calda 3-4 min per lato, sale. Servi con zucchine al vapore o saltate.' } },

  { n: 'Dom · settimana 1', kcal: 842, p: 105, g: 36, c: 19,
    nota: 'Batch della domenica: lessa un po\' di uova, cuoci la frittata al forno con spinaci e piastra 2-3 porzioni di pollo. Così i pranzi di lunedì-giovedì sono già pronti.',
    pranzo: { t: 'Petto di pollo 150 g + insalata 150 g + pomodorini 100 g + olio EVO 2 g', l: 'casa', r: 'Cuoci il pollo in padella o piastra 3-4 min per lato, sala. Taglialo a fette sull\'insalata con i pomodorini, olio a crudo.' },
    cena:   { t: 'Sgombro al naturale 90 g + insalata 150 g + pomodorini 100 g + olio EVO 1 g', r: 'Nessuna cottura. Scola bene lo sgombro e sfaldalo sull\'insalata con i pomodorini. Olio, limone, pepe.' } },

  { n: 'Lun · settimana 2', kcal: 846, p: 121, g: 31, c: 16,
    pranzo: { t: 'Tonno all\'olio EVO 120 g + insalata 100 g + pomodorini 100 g', l: 'lavoro', r: 'Nessuna cottura. Sgocciola bene il tonno, unisci insalata e pomodorini a pezzi. Sale, pepe e limone.' },
    cena:   { t: 'Fesa di tacchino 170 g + zucchine 200 g + olio EVO 3 g', r: 'Salta le zucchine in padella 8-10 min. Serve fesa fresca da banco: 3-4 min per lato con sale e spezie. Se hai solo l\'affettato in busta non cuocerlo: mettilo a crudo sulle zucchine tiepide, senza sale.' } },

  { n: 'Mar · settimana 2', kcal: 797, p: 105, g: 34, c: 13,
    pranzo: { t: 'Frittata al forno: uova 100 g + albumi 100 g + spinaci 100 g + olio EVO 3 g', l: 'lavoro', r: 'Sbatti 2 uova + 3 albumi con sale, unisci gli spinaci, cuoci a 180° per circa 20 min. Taglia a quadrotti.' },
    cena:   { t: 'Merluzzo o platessa 220 g + insalata 150 g + olio EVO 3 g', r: 'Cuoci il filetto in padella o al forno 8-10 min con un filo d\'olio, sale e limone.' } },

  { n: 'Mer · settimana 2', kcal: 820, p: 90, g: 40, c: 19,
    pranzo: { t: 'Fiocchi di latte 180 g + cetriolo 100 g', l: 'lavoro', r: 'Nessuna cottura. Fiocchi di latte con il cetriolo crudo a fette, sale e pepe. Freddo, pronto da portare.' },
    cena:   { t: 'Hamburger di vitello 150 g + zucchine 200 g + olio EVO 1 g', r: 'Padella ben calda, 3-4 min per lato, sale. Servi con zucchine al vapore o saltate.' } },

  { n: 'Gio · settimana 2', kcal: 876, p: 121, g: 33, c: 17,
    pranzo: { t: 'Tonno all\'olio EVO 120 g + insalata 100 g + pomodorini 100 g', l: 'lavoro', r: 'Nessuna cottura. Sgocciola bene il tonno, unisci insalata e pomodorini. Sale, pepe e limone.' },
    cena:   { t: 'Petto di pollo 150 g + spinaci 200 g + olio EVO 2 g', r: 'Salta gli spinaci in padella 5-6 min. A lato il pollo 3-4 min per lato. Variante: asparagi o fagiolini 200 g.' } },

  { n: 'Ven · settimana 2', kcal: 892, p: 115, g: 40, c: 14,
    pranzo: { t: 'Tomino o primo sale 60 g + tonno all\'olio EVO 120 g + insalata 150 g', l: 'casa', r: 'Taglia il tomino a fette, unisci il tonno sgocciolato e l\'insalata; olio a crudo, sale e limone.' },
    cena:   { t: 'Merluzzo o platessa 180 g + zucchine 200 g + olio EVO 2 g', r: 'Cuoci il filetto in padella o al forno 8-10 min con un filo d\'olio, sale e limone.' } },

  { n: 'Sab · settimana 2', kcal: 862, p: 108, g: 39, c: 16,
    pranzo: { t: 'Fesa di tacchino in busta 130 g + insalata 100 g + pomodorini 80 g + olio EVO 2 g', l: 'casa', r: 'Nessuna cottura. Striscioline su insalata e pomodorini, olio a crudo e limone. Zero sale aggiunto.' },
    cena:   { t: 'Hamburger di vitello 150 g + zucchine 200 g + olio EVO 1 g', r: 'Padella ben calda, 3-4 min per lato, sale. Servi con zucchine al vapore o saltate.' } },

  { n: 'Dom · settimana 2', kcal: 842, p: 105, g: 36, c: 19,
    nota: 'Batch della domenica: uova sode, frittata al forno con spinaci, 2-3 porzioni di pollo alla piastra.',
    pranzo: { t: 'Petto di pollo 150 g + insalata 150 g + pomodorini 100 g + olio EVO 2 g', l: 'casa', r: 'Cuoci il pollo 3-4 min per lato, sala. A fette sull\'insalata con i pomodorini, olio a crudo.' },
    cena:   { t: 'Sgombro al naturale 90 g + insalata 150 g + pomodorini 100 g + olio EVO 1 g', r: 'Nessuna cottura. Sfalda lo sgombro sull\'insalata con i pomodorini. Olio, limone, pepe.' } }
];

// Spuntino delle 16:30 — aggiunta del 31 luglio, non presente nel piano originale.
// Alterna uovo+albume e grana padano, evitando il grana nei giorni in cui
// pranzo o cena contengono già un latticino (fiocchi di latte, tomino).
var SPUNTINI = [
  { t: 'Grana padano a cubetti 30 g', kc: '118 kcal · 10 g proteine' },
  { t: '1 uovo sodo + 60 g di albume', kc: '98 kcal · 13 g proteine' }
];
var SPUNTINO_DI = [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1];
