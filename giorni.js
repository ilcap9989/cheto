// Piano 17-30 agosto 2026 (rev. 6, generato il 17 ago 2026).
// Protocollo: VLCKD ~850 kcal lun-ven + KETO standard ~1.600 kcal sab-dom.
// Sostituisce lo schema 5+2 di agosto (weekend liberi a 2.600 kcal), ritirato
// dopo il checkpoint del 7 ago (-0,1 kg contro un target di -0,7).
// Indice 0 = lunedi 17 agosto 2026. Il ciclo si ripete ogni 14 giorni.
// Novita strutturale: lo SPUNTINO DELLE 17:00 non e piu facoltativo, e un pasto
// del piano. E la contromisura al pattern "cena che sparisce" (3 cene saltate
// in 6 giorni a inizio agosto). Macros da tabelle CREA/USDA, pesi crudi.

var REGOLE = [
  'Lo spuntino delle 17:00 non e opzionale. Se lo salti, alle 19 il piano si rompe: e successo il 30/7, l\'1/8, il 5/8 e il 6/8.',
  'Sodio ogni giorno: 3 g di sale in 300 ml di acqua calda alle 11 e alle 17. Sale normale, non iposodico.',
  'Olio: cucchiaino raso da 5 g + spruzzino per cuocere. Il cucchiaio "circa" vale 150-190 kcal al giorno non contate.',
  'La cena si mangia seduti, nel piatto, entro le 20:30. Segna ogni sera se e sopravvissuta: obiettivo 12 su 14.',
  'Sabato e domenica sono keto, non liberi: 1.600 kcal, carbo netti sotto 30 g.',
  'Il peso che conta e quello del venerdi mattina. Il lunedi e acqua e sodio. Target -0,8 kg a settimana.'
];

var AVVISO = 'La rivalutazione medica era prevista tra il 16 e il 23 agosto e non e ancora prenotata. Questo piano e un ponte di due settimane, non un sostituto della visita.';

var GIORNI = [
  { n: 'Lun 17/8 · settimana 1', tipo: 'VLCKD', kcal: 846, p: 123.3, g: 32.5, c: 17,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Tonno al naturale (sgocciolato) 120 g + Uova (guscio escluso) 55 g + Insalata mista 100 g + Pomodorini 80 g + Olio EVO 5 g', kc: '280 kcal · 39.5 g proteine', l: 'lavoro', r: 'Insalatona fredda, si prepara la sera prima. Uovo sodo.' },
    spuntino:  { t: 'Bresaola 40 g + Mandorle 10 g', kc: '122 kcal · 15 g proteine', r: 'OBBLIGATORIO. Pesato. + 300 ml acqua calda con 3 g di sale.' },
    cena:      { t: 'Macinato di vitello 150 g + Zucchine 200 g + Olio EVO 5 g', kc: '276 kcal · 33.6 g proteine', r: 'Hamburger in padella con spruzzino. Zucchine grigliate. Nel piatto, a tavola.' } },

  { n: 'Mar 18/8 · settimana 1', tipo: 'VLCKD', kcal: 843, p: 120.5, g: 33.2, c: 15.3,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Petto di pollo 150 g + Zucchine 150 g + Olio EVO 5 g', kc: '236 kcal · 36.9 g proteine', l: 'lavoro', r: 'Pollo cotto la sera prima, si mangia freddo o da fornetto.' },
    spuntino:  { t: 'Grana Padano 30 g + Mandorle 10 g', kc: '179 kcal · 12.1 g proteine', r: 'OBBLIGATORIO. Il grana porta anche sodio: utile in chetosi.' },
    cena:      { t: 'Merluzzo/platessa surgelata 200 g + Insalata mista 100 g + Pomodorini 80 g + Olio EVO 7 g', kc: '260 kcal · 36.3 g proteine', r: 'Filetto al forno o in padella, 12 min. Scongelare la mattina.' } },

  { n: 'Mer 19/8 · settimana 1', tipo: 'VLCKD', kcal: 874, p: 123.7, g: 33.1, c: 16.7,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Mazzancolle/gamberi surgelati 180 g + Insalata mista 120 g + Cetrioli 100 g + Olio EVO 5 g', kc: '223 kcal · 34 g proteine', l: 'lavoro', r: 'Gamberi lessati 3 min, raffreddati. Ottimo piatto freddo da ufficio.' },
    spuntino:  { t: 'Fesa di tacchino a fette 100 g', kc: '107 kcal · 21.3 g proteine', r: 'OBBLIGATORIO. + 300 ml acqua calda con 3 g di sale.' },
    cena:      { t: 'Uova (guscio escluso) 165 g + Albume 60 g + Spinaci 200 g + Olio EVO 7 g', kc: '376 kcal · 33.2 g proteine', r: 'Frittata 3 uova + albume con spinaci saltati.' } },

  { n: 'Gio 20/8 · settimana 1', tipo: 'VLCKD', kcal: 863, p: 122.3, g: 33.3, c: 15.6,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Fesa di tacchino a fette 120 g + Finocchi 150 g + Grana Padano 15 g + Olio EVO 5 g', kc: '255 kcal · 32.3 g proteine', l: 'lavoro', r: 'Zero cottura. Il piu veloce dei cinque.' },
    spuntino:  { t: 'Whey isolate 90% 14 g + Mandorle 12 g', kc: '129 kcal · 15.8 g proteine', r: 'OBBLIGATORIO. 14 g = 2 misurini rasi, shaker con 250 ml acqua.' },
    cena:      { t: 'Filetto di tonno surgelato 160 g + Melanzane 200 g + Olio EVO 5 g', kc: '311 kcal · 39 g proteine', r: 'Tonno scottato in padella 3 min per lato. Melanzane grigliate.' } },

  { n: 'Ven 21/8 · settimana 1', tipo: 'VLCKD', kcal: 880, p: 118.7, g: 37.5, c: 18.7,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Tonno al naturale (sgocciolato) 120 g + Uova (guscio escluso) 55 g + Insalata mista 100 g + Pomodorini 80 g + Olio EVO 5 g', kc: '280 kcal · 39.5 g proteine', l: 'casa', r: 'Come lunedi. Venerdi e il giorno critico: non saltare nulla.' },
    spuntino:  { t: 'Grana Padano 20 g + Mandorle 10 g', kc: '140 kcal · 8.8 g proteine', r: 'OBBLIGATORIO. Venerdi alle 17 e il punto di rottura storico. + 300 ml acqua calda con 3 g di sale.' },
    cena:      { t: 'Macinato di vitello 150 g + Insalata mista 150 g + Zucchine 150 g + Olio EVO 5 g', kc: '292 kcal · 35.2 g proteine', r: 'Venerdi sera appartiene ai 5 giorni. A tavola, nel piatto.' } },

  { n: 'Sab 22/8 · settimana 1', tipo: 'KETO', kcal: 1614, p: 139.8, g: 108.5, c: 15.7, we: true,
    colazione: { t: 'Uova (guscio escluso) 165 g + Grana Padano 20 g + Burro 8 g', kc: '372 kcal · 27.4 g proteine', r: 'Uova strapazzate. + caffe nero.' },
    pranzo:    { t: 'Petto di pollo 180 g + Insalata mista 200 g + Avocado 80 g + Olio EVO 10 g', kc: '450 kcal · 46.5 g proteine', l: 'casa', r: 'Pollo grigliato su insalatona con avocado.' },
    spuntino:  { t: 'Mandorle 20 g + Bresaola 40 g', kc: '183 kcal · 17.2 g proteine', r: 'Anche nel weekend lo spuntino delle 17 resta. Pesato.' },
    cena:      { t: 'Salmone fresco 200 g + Melanzane 130 g + Zucchine 120 g + Feta 40 g + Olio EVO 10 g', kc: '609 kcal · 48.7 g proteine', r: 'Salmone al forno + verdure grigliate.' } },

  { n: 'Dom 23/8 · settimana 1', tipo: 'KETO', kcal: 1615, p: 117.8, g: 115.8, c: 20.2, we: true,
    colazione: { t: 'Yogurt greco intero 170 g + Noci 20 g', kc: '296 kcal · 18.3 g proteine', r: '+ caffe nero.' },
    pranzo:    { t: 'Tagliata di manzo 220 g + Rucola 80 g + Grana Padano 20 g + Olio EVO 10 g', kc: '474 kcal · 54.9 g proteine', l: 'casa', r: 'Template ristorante: tagliata/grigliata + contorno di verdura. Vedi regole fuori casa.' },
    spuntino:  { t: 'Mandorle 30 g + Olive verdi 40 g', kc: '242 kcal · 7 g proteine', r: 'Pesato prima di uscire.' },
    cena:      { t: 'Uova (guscio escluso) 165 g + Albume 60 g + Insalata mista 150 g + Zucchine 100 g + Avocado 50 g + Feta 40 g + Olio EVO 12 g', kc: '603 kcal · 37.6 g proteine', r: 'Cena leggera di rientro.' } },

  { n: 'Lun 24/8 · settimana 2', tipo: 'VLCKD', kcal: 846, p: 123.3, g: 32.5, c: 17,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Tonno al naturale (sgocciolato) 120 g + Uova (guscio escluso) 55 g + Insalata mista 100 g + Pomodorini 80 g + Olio EVO 5 g', kc: '280 kcal · 39.5 g proteine', l: 'lavoro', r: 'Insalatona fredda, si prepara la sera prima. Uovo sodo.' },
    spuntino:  { t: 'Bresaola 40 g + Mandorle 10 g', kc: '122 kcal · 15 g proteine', r: 'OBBLIGATORIO. Pesato. + 300 ml acqua calda con 3 g di sale.' },
    cena:      { t: 'Macinato di vitello 150 g + Zucchine 200 g + Olio EVO 5 g', kc: '276 kcal · 33.6 g proteine', r: 'Hamburger in padella con spruzzino. Zucchine grigliate. Nel piatto, a tavola.' } },

  { n: 'Mar 25/8 · settimana 2', tipo: 'VLCKD', kcal: 843, p: 120.5, g: 33.2, c: 15.3,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Petto di pollo 150 g + Zucchine 150 g + Olio EVO 5 g', kc: '236 kcal · 36.9 g proteine', l: 'lavoro', r: 'Pollo cotto la sera prima, si mangia freddo o da fornetto.' },
    spuntino:  { t: 'Grana Padano 30 g + Mandorle 10 g', kc: '179 kcal · 12.1 g proteine', r: 'OBBLIGATORIO. Il grana porta anche sodio: utile in chetosi.' },
    cena:      { t: 'Merluzzo/platessa surgelata 200 g + Insalata mista 100 g + Pomodorini 80 g + Olio EVO 7 g', kc: '260 kcal · 36.3 g proteine', r: 'Filetto al forno o in padella, 12 min. Scongelare la mattina.' } },

  { n: 'Mer 26/8 · settimana 2', tipo: 'VLCKD', kcal: 874, p: 123.7, g: 33.1, c: 16.7,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Mazzancolle/gamberi surgelati 180 g + Insalata mista 120 g + Cetrioli 100 g + Olio EVO 5 g', kc: '223 kcal · 34 g proteine', l: 'lavoro', r: 'Gamberi lessati 3 min, raffreddati. Ottimo piatto freddo da ufficio.' },
    spuntino:  { t: 'Fesa di tacchino a fette 100 g', kc: '107 kcal · 21.3 g proteine', r: 'OBBLIGATORIO. + 300 ml acqua calda con 3 g di sale.' },
    cena:      { t: 'Uova (guscio escluso) 165 g + Albume 60 g + Spinaci 200 g + Olio EVO 7 g', kc: '376 kcal · 33.2 g proteine', r: 'Frittata 3 uova + albume con spinaci saltati.' } },

  { n: 'Gio 27/8 · settimana 2', tipo: 'VLCKD', kcal: 863, p: 122.3, g: 33.3, c: 15.6,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Fesa di tacchino a fette 120 g + Finocchi 150 g + Grana Padano 15 g + Olio EVO 5 g', kc: '255 kcal · 32.3 g proteine', l: 'lavoro', r: 'Zero cottura. Il piu veloce dei cinque.' },
    spuntino:  { t: 'Whey isolate 90% 14 g + Mandorle 12 g', kc: '129 kcal · 15.8 g proteine', r: 'OBBLIGATORIO. 14 g = 2 misurini rasi, shaker con 250 ml acqua.' },
    cena:      { t: 'Filetto di tonno surgelato 160 g + Melanzane 200 g + Olio EVO 5 g', kc: '311 kcal · 39 g proteine', r: 'Tonno scottato in padella 3 min per lato. Melanzane grigliate.' } },

  { n: 'Ven 28/8 · settimana 2', tipo: 'VLCKD', kcal: 880, p: 118.7, g: 37.5, c: 18.7,
    colazione: { t: 'Yogurt greco 0% 150 g + Whey isolate 90% 21 g', kc: '168 kcal · 35.2 g proteine', r: '21 g = 3 misurini rasi. + caffe nero. Alternativa: 3 uova sode (165 g).' },
    pranzo:    { t: 'Tonno al naturale (sgocciolato) 120 g + Uova (guscio escluso) 55 g + Insalata mista 100 g + Pomodorini 80 g + Olio EVO 5 g', kc: '280 kcal · 39.5 g proteine', l: 'casa', r: 'Come lunedi. Venerdi e il giorno critico: non saltare nulla.' },
    spuntino:  { t: 'Grana Padano 20 g + Mandorle 10 g', kc: '140 kcal · 8.8 g proteine', r: 'OBBLIGATORIO. Venerdi alle 17 e il punto di rottura storico. + 300 ml acqua calda con 3 g di sale.' },
    cena:      { t: 'Macinato di vitello 150 g + Insalata mista 150 g + Zucchine 150 g + Olio EVO 5 g', kc: '292 kcal · 35.2 g proteine', r: 'Venerdi sera appartiene ai 5 giorni. A tavola, nel piatto.' } },

  { n: 'Sab 29/8 · settimana 2', tipo: 'KETO', kcal: 1614, p: 139.8, g: 108.5, c: 15.7, we: true,
    colazione: { t: 'Uova (guscio escluso) 165 g + Grana Padano 20 g + Burro 8 g', kc: '372 kcal · 27.4 g proteine', r: 'Uova strapazzate. + caffe nero.' },
    pranzo:    { t: 'Petto di pollo 180 g + Insalata mista 200 g + Avocado 80 g + Olio EVO 10 g', kc: '450 kcal · 46.5 g proteine', l: 'casa', r: 'Pollo grigliato su insalatona con avocado.' },
    spuntino:  { t: 'Mandorle 20 g + Bresaola 40 g', kc: '183 kcal · 17.2 g proteine', r: 'Anche nel weekend lo spuntino delle 17 resta. Pesato.' },
    cena:      { t: 'Salmone fresco 200 g + Melanzane 130 g + Zucchine 120 g + Feta 40 g + Olio EVO 10 g', kc: '609 kcal · 48.7 g proteine', r: 'Salmone al forno + verdure grigliate.' } },

  { n: 'Dom 30/8 · settimana 2', tipo: 'KETO', kcal: 1615, p: 117.8, g: 115.8, c: 20.2, we: true,
    colazione: { t: 'Yogurt greco intero 170 g + Noci 20 g', kc: '296 kcal · 18.3 g proteine', r: '+ caffe nero.' },
    pranzo:    { t: 'Tagliata di manzo 220 g + Rucola 80 g + Grana Padano 20 g + Olio EVO 10 g', kc: '474 kcal · 54.9 g proteine', l: 'casa', r: 'Template ristorante: tagliata/grigliata + contorno di verdura. Vedi regole fuori casa.' },
    spuntino:  { t: 'Mandorle 30 g + Olive verdi 40 g', kc: '242 kcal · 7 g proteine', r: 'Pesato prima di uscire.' },
    cena:      { t: 'Uova (guscio escluso) 165 g + Albume 60 g + Insalata mista 150 g + Zucchine 100 g + Avocado 50 g + Feta 40 g + Olio EVO 12 g', kc: '603 kcal · 37.6 g proteine', r: 'Cena leggera di rientro.' } }

];

// Regole del weekend keto. Sostituiscono il vecchio "tetto 2.600 kcal".
var WEEKEND = {
  tetto: 1600,
  regole: [
    'Il weekend non e piu libero: e keto. 1.600 kcal, carbo netti sotto 30 g, chetosi mantenuta 7 giorni su 7.',
    'Puoi cenare fuori. SI a grigliate di carne o pesce, tagliata, crudo di mare, verdure grigliate, formaggi, uova, frutti di mare.',
    'NO a pane e grissini in tavola (falli togliere), patate, pasta, riso, pizza, birra, cocktail, dolci, fritti in pastella.',
    'Da bere acqua frizzante. Al massimo un calice di vino secco (~120 kcal): rallenta la chetosi e riapre l\'appetito.',
    'Lo spuntino delle 17:00 vale anche sabato e domenica. Non arrivare al ristorante affamato.'
  ],
  fallback: 'Se resti a casa, il menu keto del giorno e gia bilanciato a 1.600 kcal.'
};

// Scambi consentiti, mostrati nella scheda del giorno.
var SCAMBI = [
  'Colazione: 150 g yogurt greco 0% + 21 g di polvere proteica <-> 3 uova sode (165 g).',
  'Merluzzo <-> platessa <-> nasello, stesso peso.',
  'Mazzancolle <-> gamberi argentini <-> polpo lesso, stesso peso.',
  'Bresaola <-> fesa di tacchino (peso x1,3) <-> prosciutto crudo sgrassato (peso x0,7).',
  'Zucchine <-> melanzane <-> peperoni <-> spinaci. Insalata: quantita libera.',
  'Finocchi e cetrioli crudi: liberi, quando vuoi, non si contano.',
  'Vietato scambiare un pasto con "niente". Saltare non e uno scambio.'
];
