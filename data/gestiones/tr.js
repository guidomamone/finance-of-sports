// ============================================================================
// data/gestiones/tr.js: quién condujo cada club de Turquía y desde/hasta cuándo (to-do 195).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En los clubes asociativos grandes (Galatasaray, Fenerbahçe, Beşiktaş,
// Trabzonspor) la conducción real es el presidente del club (dernek başkanı), elegido por los socios, que
// además preside la A.Ş.: esa es la gestión. En Başakşehir se carga a Göksel Gümüşdağ, que figura como
// presidente. Cuando la fuente da solo el año o el mes, el día es 01 por convención (se avisa en el comentario).
// Cierres: Alanyaspor 31/12 hasta 2021 y 31/5 desde 2022; Beşiktaş, Fenerbahçe y Trabzonspor 31/5;
// Galatasaray 31/5 o 31/8 de 2019 (el documento se contradice); Gaziantep FK 31/5 y 31/12 de 2023;
// Başakşehir 31/12; Kocaelispor 31/7/2020 (no confirmado). Fatih Karagümrük, Kasımpaşa y Konyaspor
// no tienen documentos todavía: sin gestiones.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'alanyaspor-tr': [
    // Çavuşoğlu: presidente desde 2011 (tr.wikipedia da solo el año: dia 01); reelegido en 2018 y en junio de 2024. Sigue.
    { nombre:'Hasan Çavuşoğlu', corto:'Çavuşoğlu', cargo:'Presidente', desde:'2011-01-01', hasta:null,
      fuente:'https://tr.wikipedia.org/wiki/Alanyaspor', confirmada:true },
  ],
  'besiktas-tr': [
    { nombre:'Yıldırım Demirören', corto:'Demirören', cargo:'Presidente', desde:'2004-04-26', hasta:'2012-02-27',
      fuente:'https://tr.wikipedia.org/wiki/Beşiktaş_JK_başkanları_listesi', confirmada:true },
    { nombre:'Fikret Orman', corto:'Orman', cargo:'Presidente', desde:'2012-03-25', hasta:'2019-10-24',
      fuente:'https://tr.wikipedia.org/wiki/Beşiktaş_JK_başkanları_listesi', confirmada:true },
    { nombre:'Ahmet Nur Çebi', corto:'Çebi', cargo:'Presidente', desde:'2019-10-24', hasta:'2023-12-05',
      fuente:'https://tr.wikipedia.org/wiki/Beşiktaş_JK_başkanları_listesi', confirmada:true },
  ],
  'fenerbahce-tr': [
    { nombre:'Aziz Yıldırım', corto:'Yıldırım', cargo:'Presidente', desde:'1998-02-15', hasta:'2018-06-05',
      fuente:'https://tr.wikipedia.org/wiki/Fenerbahçe_SK_başkanları_listesi', confirmada:true },
    { nombre:'Ali Koç', corto:'Koç', cargo:'Presidente', desde:'2018-06-05', hasta:'2025-09-25',
      fuente:'https://tr.wikipedia.org/wiki/Fenerbahçe_SK_başkanları_listesi', confirmada:true },
    { nombre:'Sadettin Saran', corto:'Saran', cargo:'Presidente', desde:'2025-09-25', hasta:'2026-06-10',
      fuente:'https://tr.wikipedia.org/wiki/Fenerbahçe_SK_başkanları_listesi', confirmada:true },
    { nombre:'Aziz Yıldırım', corto:'Yıldırım', cargo:'Presidente', desde:'2026-06-10', hasta:null,
      fuente:'https://tr.wikipedia.org/wiki/Fenerbahçe_SK_başkanları_listesi', confirmada:true },
  ],
  'galatasaray-tr': [
    { nombre:'Dursun Özbek', corto:'Özbek', cargo:'Presidente', desde:'2015-05-23', hasta:'2018-01-23',
      fuente:'https://tr.wikipedia.org/wiki/Galatasaray_SK_başkanları_listesi', confirmada:true },
    // Cengiz presidía al 31/5/2019 y al 31/8/2019 (el documento 2019 se contradice en la fecha de cierre; da igual para la gestión).
    { nombre:'Mustafa Cengiz', corto:'Cengiz', cargo:'Presidente', desde:'2018-01-23', hasta:'2021-06-22',
      fuente:'https://tr.wikipedia.org/wiki/Galatasaray_SK_başkanları_listesi', confirmada:true },
    { nombre:'Burak Elmas', corto:'Elmas', cargo:'Presidente', desde:'2021-06-22', hasta:'2022-06-14',
      fuente:'https://tr.wikipedia.org/wiki/Galatasaray_SK_başkanları_listesi', confirmada:true },
    { nombre:'Dursun Özbek', corto:'Özbek', cargo:'Presidente', desde:'2022-06-14', hasta:null,
      fuente:'https://tr.wikipedia.org/wiki/Galatasaray_SK_başkanları_listesi', confirmada:true },
  ],
  'gaziantepfk-tr': [
    // Akınal: Büyükekşi le traspasó la presidencia en la asamblea del 25/5/2021 (Cumhuriyet, nota del 24/5/2021 que la anuncia para "mañana"); renunció el 10/1/2023 (Posta).
    { nombre:'Cevdet Akınal', corto:'Akınal', cargo:'Presidente', desde:'2021-05-25', hasta:'2023-01-10',
      fuente:'https://www.posta.com.tr/spor/futbol/gaziantep-fk-baskani-cevdet-akinal-istifa-etti-2600275', confirmada:true },
    // Yılmaz: dice que asumió "unos días antes del terremoto del 6/2/2023"; la asamblea que lo eligió formalmente fue el 9/6/2023. Desde aproximado (dia 01 de febrero).
    { nombre:'Memik Yılmaz', corto:'Yılmaz', cargo:'Presidente', desde:'2023-02-01', hasta:null,
      fuente:'https://www.cumhuriyet.com.tr/spor/gaziantep-fknin-yeni-baskani-memik-yilmaz-oldu-2089203', confirmada:true },
  ],
  'istanbulbasaksehir-tr': [
    // Gümüşdağ: presidente del İstanbul Başakşehir FK desde 2014 (tr.wikipedia da solo el año: dia 01). Sigue.
    { nombre:'Göksel Gümüşdağ', corto:'Gümüşdağ', cargo:'Presidente', desde:'2014-01-01', hasta:null,
      fuente:'https://tr.wikipedia.org/wiki/İstanbul_Başakşehir_FK', confirmada:true },
  ],
  'kocaelispor-tr': [
    { nombre:'Hüseyin Üzülmez', corto:'Üzülmez', cargo:'Presidente', desde:'2019-06-17', hasta:'2020-12-21',
      fuente:'https://tr.wikipedia.org/wiki/Kocaelispor', confirmada:true },
    { nombre:'Engin Koyun', corto:'Koyun', cargo:'Presidente', desde:'2020-12-21', hasta:'2024-03-18',
      fuente:'https://tr.wikipedia.org/wiki/Kocaelispor', confirmada:true },
    { nombre:'Recep Durul', corto:'Durul', cargo:'Presidente', desde:'2024-03-18', hasta:null,
      fuente:'https://tr.wikipedia.org/wiki/Kocaelispor', confirmada:true },
  ],
  'trabzonspor-tr': [
    { nombre:'İbrahim Hacıosmanoğlu', corto:'Hacıosmanoğlu', cargo:'Presidente', desde:'2013-05-26', hasta:'2015-12-06',
      fuente:'https://tr.wikipedia.org/wiki/Trabzonspor_başkanları_listesi', confirmada:true },
    { nombre:'Muharrem Usta', corto:'Usta', cargo:'Presidente', desde:'2015-12-06', hasta:'2018-04-08',
      fuente:'https://tr.wikipedia.org/wiki/Trabzonspor_başkanları_listesi', confirmada:true },
    { nombre:'Ahmet Ağaoğlu', corto:'Ağaoğlu', cargo:'Presidente', desde:'2018-04-08', hasta:'2023-03-03',
      fuente:'https://tr.wikipedia.org/wiki/Trabzonspor_başkanları_listesi', confirmada:true },
    // Doğan: la lista da el 26/3/2023 (entre el 3 y el 26/3 no figura nadie).
    { nombre:'Ertuğrul Doğan', corto:'Doğan', cargo:'Presidente', desde:'2023-03-26', hasta:null,
      fuente:'https://tr.wikipedia.org/wiki/Trabzonspor_başkanları_listesi', confirmada:true },
  ],
});
