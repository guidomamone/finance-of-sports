// ============================================================================
// data/gestiones/be.js: quién condujo cada club de Bélgica y desde/hasta cuándo (to-do 149 y 195).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// Criterio del país: si hay un dueño persona (Antwerp, Anderlecht, Gent, Charleroi, Westerlo, Dender, Mechelen,
// Standard con Duchâtelet y Venanzi) se carga el dueño con cargo 'Dueño' durante todo su período, y los presidentes
// formales que firman van en comentarios. Sin dueño persona (clubes asociación/vzw, Genk, Zulte, Cercle) se carga el
// presidente del consejo ('Voorzitter'; 'Président' en los clubes francófonos). Un grupo o fondo no es persona
// (Standard 2022-2025 con 777 Partners y A-Cap, Cercle con AS Monaco, STVV con DMM): ahí no hay entrada.
// Cuando la fuente da solo el año o el mes, el día es 01 por convención. Fuente: donde dice Clubes/..., es el propio
// informe anual (ruta del .md). Los cierres belgas son el 30/6, salvo Westerlo (31/12 hasta 2013) y OH Leuven (31/12 hasta 2018).
// Una gestión con confirmada:false no se muestra en el sitio: está cargada para revisión.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'anderlecht-be': [
    // Vanden Stock: Wikipedia da 1996 (solo año). Entregó el club a Coucke el 28/3/2018 (el consejo nuevo figura en el informe desde el 30/3/2018).
    { nombre:'Roger Vanden Stock', corto:'Vanden Stock', cargo:'Voorzitter', desde:'1996-01-01', hasta:'2018-03-28',
      fuente:'https://nl.wikipedia.org/wiki/RSC_Anderlecht', confirmada:true },
    // Coucke: dueño y accionista mayoritario desde el 28/3/2018, sigue. Fue voorzitter hasta que Wouter Vandenhaute asumió oficialmente
    // en enero de 2021 (anunciado el 28/5/2020); Vandenhaute fue voorzitter (no ejecutivo desde 1/2023) hasta que puso su cargo a disposición el
    // 1/9/2025 (aceptado el 5/9/2025); Michael Verschueren es voorzitter desde mediados de noviembre de 2025 (aprobado el 16/10/2025).
    { nombre:'Marc Coucke', corto:'Coucke', cargo:'Dueño', desde:'2018-03-28', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/RSC_Anderlecht', confirmada:true },
  ],
  'antwerp-be': [
    // Wauters: voorzitter desde 1969 (Wikipedia, solo año); fue sacado del consejo a comienzos de 2012 y lo reemplazó Jan Michel.
    { nombre:'Eddy Wauters', corto:'Wauters', cargo:'Voorzitter', desde:'1969-01-01', hasta:'2012-01-01',
      fuente:'https://nl.wikipedia.org/wiki/Royal_Antwerp_FC', confirmada:true },
    // Michel: voorzitter desde comienzos de 2012 (grupo de Jos Verhaeghen). Desde la temporada 2015-16 figura Patrick Decuyper como voorzitter
    // con Gheysens detrás; el hasta coincide con el desde de Gheysens de más abajo (aproximado, solo año).
    { nombre:'Jan Michel', corto:'Michel', cargo:'Voorzitter', desde:'2012-01-01', hasta:'2015-01-01',
      fuente:'https://nl.wikipedia.org/wiki/Royal_Antwerp_FC', confirmada:true },
    // Gheysens compró el club en 2015 (solo año en la fuente, 1/1 aproximado; se hizo público en marzo de 2017). Vendió a un grupo de Wouter Vandenhaute en julio de 2026 (16/7/2026 aproximado).
    { nombre:'Paul Gheysens', corto:'Gheysens', cargo:'Dueño', desde:'2015-01-01', hasta:'2026-07-16',
      fuente:'https://nl.wikipedia.org/wiki/Paul_Gheysens', confirmada:true },
  ],
  'cerclebrugge-be': [
    // Sin dueño persona (AS Monaco compró la mayoría de la cvba el 5/5/2017). Presidentes según la lista de Wikipedia, solo año (01-01).
    // Goemaere ya figura como voorzitter el 22/4/2020 (Sporza), antes del cierre del 30/6/2020. Tousseyn: la fuente da solo 2023; el ejercicio 2023 depende de ese año.
    { nombre:'Frans Schotte', corto:'Schotte', cargo:'Voorzitter', desde:'2014-01-01', hasta:'2020-01-01',
      fuente:'https://nl.wikipedia.org/wiki/Cercle_Brugge', confirmada:true },
    { nombre:'Vincent Goemaere', corto:'Goemaere', cargo:'Voorzitter', desde:'2020-01-01', hasta:'2023-01-01',
      fuente:'https://nl.wikipedia.org/wiki/Cercle_Brugge', confirmada:true },
    { nombre:'Thomas Tousseyn', corto:'Tousseyn', cargo:'Voorzitter', desde:'2023-01-01', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/Cercle_Brugge', confirmada:true },
  ],
  'charleroi-be': [
    // Bayat: el club fue comprado por el grupo Chaudfontaine (Abbas Bayat) y anunciado el 12/7/2000; propietario y presidente. Renunció a fines de agosto de 2012.
    { nombre:'Abbas Bayat', corto:'Bayat', cargo:'Dueño', desde:'2000-07-12', hasta:'2012-08-31',
      fuente:'https://fr.wikipedia.org/wiki/Royal_Charleroi_Sporting_Club', confirmada:true },
    // Debecq: nuevo presidente a fines de agosto de 2012 (fundador de QNT); sigue.
    { nombre:'Fabien Debecq', corto:'Debecq', cargo:'Président', desde:'2012-08-31', hasta:null,
      fuente:'https://fr.wikipedia.org/wiki/Royal_Charleroi_Sporting_Club', confirmada:true },
  ],
  'clubbrugge-be': [
    // Van Maele: voorzitter desde 1999 (solo año; Fernand De Clerck renunció por un desacuerdo en el consejo), murió el 26/2/2003. El ejercicio 1999 depende de ese año.
    { nombre:'Michel Van Maele', corto:'Van Maele', cargo:'Voorzitter', desde:'1999-01-01', hasta:'2003-02-26',
      fuente:'https://nl.wikipedia.org/wiki/Michel_Van_Maele', confirmada:true },
    // D'Hooghe: lo sucedió en 2003 (la fecha exacta no figura; marzo aproximado, ganó la liga dos meses después). Dejó en junio de 2009 (hasta = 1/7/2009, así el cierre 30/6/2009 es suyo).
    { nombre:"Michel D'Hooghe", corto:"D'Hooghe", cargo:'Voorzitter', desde:'2003-03-01', hasta:'2009-07-01',
      fuente:"https://nl.wikipedia.org/wiki/Michel_D%27Hooghe_(voetbalbestuurder)", confirmada:true },
    // Jonckheere: voorzitter 2009-2011; Verhaeghe lo sucedió el 1 de febrero de 2011.
    { nombre:'Pol Jonckheere', corto:'Jonckheere', cargo:'Voorzitter', desde:'2009-07-01', hasta:'2011-02-01',
      fuente:'https://nl.wikipedia.org/wiki/Pol_Jonckheere', confirmada:true },
    { nombre:'Bart Verhaeghe', corto:'Verhaeghe', cargo:'Voorzitter', desde:'2011-02-01', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/Bart_Verhaeghe', confirmada:true },
  ],
  'dender-be': [
    // Van Roy: voorzitter de la vzw; el informe más antiguo (ejercicio 2008) ya lo lista así y sigue hasta que el consejo cambió el 30/1/2018 (nuevos dueños de Indonesia).
    // El inicio real no se conoce: desde = inicio del ejercicio 2008.
    { nombre:'André Van Roy', corto:'Van Roy', cargo:'Voorzitter', desde:'2007-07-01', hasta:'2018-01-30',
      fuente:'Clubes/Bélgica/Dender EH/jaarrekening-2008-06-30-individual.md', confirmada:true },
    // Sitorus: dueño (Wikipedia). El 30/1/2018 entró el grupo indonesio (Belinda Siahaan, gedelegeerd bestuurder desde esa fecha, y Denderfoot NV);
    // Sitorus figura en el consejo desde el 3/6/2019. La fecha de compra se toma del cambio de consejo (aproximada).
    { nombre:'Sihar Sitorus', corto:'Sitorus', cargo:'Dueño', desde:'2018-01-30', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/FCV_Dender_EH', confirmada:true },
  ],
  'genk-be': [
    // Genk es una vzw sin dueño: presidente del consejo. Lemmens: voorzitter desde 2006 (solo año); renunció en la semana del 23/10/2009.
    { nombre:'Harry Lemmens', corto:'Lemmens', cargo:'Voorzitter', desde:'2006-01-01', hasta:'2009-10-23',
      fuente:'https://nl.wikipedia.org/wiki/KRC_Genk', confirmada:true },
    // Houben: ya es voorzitter en noviembre de 2009 (voetbalkrant 24/11/2009); desde = fecha del artículo de VRT sobre la renuncia de Lemmens (aproximada).
    // Hasta: el consejo se renovó el 16/5/2017 (terminaron cuatro mandatos); en el informe del ejercicio 2017 ya preside Croonen.
    { nombre:'Herbert Houben', corto:'Houben', cargo:'Voorzitter', desde:'2009-10-23', hasta:'2017-05-16',
      fuente:'Clubes/Bélgica/Genk/jaarrekening-2013-06-30-individual.md', confirmada:true },
    // Croonen: voorzitter hasta junio de 2026; Wikipedia lo ubica 2018-2026 pero el informe del ejercicio 2017 ya lo lista como presidente.
    { nombre:'Peter Croonen', corto:'Croonen', cargo:'Voorzitter', desde:'2017-05-16', hasta:'2026-06-07',
      fuente:'Clubes/Bélgica/Genk/jaarrekening-2017-06-30-individual.md', confirmada:true },
    { nombre:'Mathieu Cilissen', corto:'Cilissen', cargo:'Voorzitter', desde:'2026-06-07', hasta:null,
      fuente:'https://www.voetbalkrant.com/nieuws/2026-06-07/wie-is-mathieu-cilissen-de-nieuwe-voorzitter-van-krc-genk/amp', confirmada:true },
  ],
  'gent-be': [
    // De Witte: voorzitter desde 1999 (solo año). Baro compró el club el 20/7/2023 (95% de las acciones, aprobado en asamblea especial); De Witte siguió como voorzitter
    // un año más y Baro pasó a presidir desde la temporada 2024-25.
    { nombre:'Ivan De Witte', corto:'De Witte', cargo:'Voorzitter', desde:'1999-01-01', hasta:'2023-07-20',
      fuente:'https://nl.wikipedia.org/wiki/KAA_Gent_(voetbalclub)', confirmada:true },
    { nombre:'Sam Baro', corto:'Baro', cargo:'Dueño', desde:'2023-07-20', hasta:null,
      fuente:'https://sporza.be/nl/2023/07/20/overname-kaa-gent-is-helemaal-rond-ondernemer-sam-baro-is-de-nieuwe-eigenaar-van-de-club~1689871691350/', confirmada:true },
  ],
  'mechelen-be': [
    // Timmermans: voorzitter desde abril de 2003 (después del interino Uytterhoeven, 12 al 24/4/2003); en diciembre de 2018 ya se había retirado como voorzitter (VRT 15/12/2018): hasta aproximado.
    { nombre:'Johan Timmermans', corto:'Timmermans', cargo:'Voorzitter', desde:'2003-04-24', hasta:'2018-12-15',
      fuente:'https://nl.wikipedia.org/wiki/KV_Mechelen', confirmada:true },
    // Somers: co-accionista mayoritario; Wikipedia lo ubica como voorzitter 2018-2019, sin fecha. No confirmado.
    { nombre:'Olivier Somers', corto:'Somers', cargo:'Voorzitter', desde:'2018-12-15', hasta:'2019-06-01',
      fuente:'https://nl.wikipedia.org/wiki/KV_Mechelen', confirmada:false },
    // Penninckx: en junio de 2019 compró el paquete de Somers y quedó como único accionista mayoritario y voorzitter oficioso (De Tijd, 1/7/2019).
    // El ejercicio 2019 depende de que junio sea previo al cierre. Fue sacado del consejo a fines de febrero de 2021 (Sporza, abril de 2021).
    { nombre:'Dieter Penninckx', corto:'Penninckx', cargo:'Dueño', desde:'2019-06-01', hasta:'2021-02-28',
      fuente:'https://www.tijd.be/ondernemen/sport/brantano-baas-krijgt-kv-mechelen-volledig-in-handen/10141866.html', confirmada:true },
    // Leemans: Wikipedia lo ubica 2020-2022; si fue voorzitter desde agosto de 2020 el cierre 30/6/2020 igual es de Penninckx. Sin fecha confirmada.
    { nombre:'Luc Leemans', corto:'Leemans', cargo:'Voorzitter', desde:'2021-03-01', hasta:'2023-01-11',
      fuente:'https://nl.wikipedia.org/wiki/KV_Mechelen', confirmada:false },
    // Van Esch: entró como accionista (44%) en la ampliación de capital de enero de 2023 y es hoofdaandeelhouder y voorzitter.
    { nombre:'Philippe Van Esch', corto:'Van Esch', cargo:'Dueño', desde:'2023-01-11', hasta:null,
      fuente:'https://sporza.be/nl/2023/01/11/kvm-fans-hoeven-zich-geen-zorgen-te-maken-over-nieuwe-sterke-man-er-kan-niets-naar-het-malafide-toe-gebeuren~1673458648466/', confirmada:true },
  ],
  'sinttruiden-be': [
    // Duchâtelet: voorzitter y dueño desde 2004 (solo año; la titular formal de las acciones era su esposa, Maria Höfte, gedelegeerd bestuurder 2016-2017).
    // DMM compró el 20% en junio de 2017 y el 80% restante en noviembre de 2017; el consejo anterior terminó el 30/11/2017.
    { nombre:'Roland Duchâtelet', corto:'Duchâtelet', cargo:'Dueño', desde:'2004-01-01', hasta:'2017-11-30',
      fuente:'https://nl.wikipedia.org/wiki/Sint-Truidense_VV', confirmada:true },
    // DMM (empresa, no persona): los presidentes que puso. Muranaka duró muy poco; Meekers figura 2018-actual (solo año).
    { nombre:'Yusuke Muranaka', corto:'Muranaka', cargo:'Voorzitter', desde:'2017-11-30', hasta:'2018-01-01',
      fuente:'https://nl.wikipedia.org/wiki/Sint-Truidense_VV', confirmada:true },
    { nombre:'David Meekers', corto:'Meekers', cargo:'Voorzitter', desde:'2018-01-01', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/Sint-Truidense_VV', confirmada:true },
  ],
  'standardliege-be': [
    // Duchêne: président 1998-2000 (administrateur délégué en los informes de 1999 y 2000); Stiffler lo reemplazó en octubre de 2000.
    { nombre:'André Duchêne', corto:'Duchêne', cargo:'Président', desde:'1998-01-01', hasta:'2000-10-01',
      fuente:'https://fr.wikipedia.org/wiki/Andr%C3%A9_Duch%C3%AAne_(football)', confirmada:true },
    // Stiffler: presidente puesto por el dueño Robert Louis-Dreyfus (murió el 4/7/2009; su viuda vendió). Hasta que Duchâtelet compró el club el 23/6/2011.
    { nombre:'Reto Stiffler', corto:'Stiffler', cargo:'Président', desde:'2000-10-01', hasta:'2011-06-23',
      fuente:'https://fr.wikipedia.org/wiki/Reto_Stiffler', confirmada:true },
    { nombre:'Roland Duchâtelet', corto:'Duchâtelet', cargo:'Dueño', desde:'2011-06-23', hasta:'2015-06-24',
      fuente:'https://fr.wikipedia.org/wiki/Standard_de_Li%C3%A8ge', confirmada:true },
    // Venanzi: compró el 24/6/2015 (99,7%); acordó la venta a 777 Partners el 13/3/2022, que se cerró el 19/4/2022. Desde ahí no hay dueño persona.
    { nombre:'Bruno Venanzi', corto:'Venanzi', cargo:'Dueño', desde:'2015-06-24', hasta:'2022-04-19',
      fuente:'https://fr.wikipedia.org/wiki/Standard_de_Li%C3%A8ge', confirmada:true },
  ],
  'unionsg-be': [
    // Presidentes anteriores a 2018 según la lista de Wikipedia (fr, marcada "à sourcer"), solo años. NO confirmados: los informes lo contradicen en parte
    // (el del ejercicio 2002 lista a Michielsen y el de 2003 a Ravasio como presidente; el de 2013 ubica a Ravasio como presidente y a Baatzsch en el consejo).
    { nombre:'Charles Picqué', corto:'Picqué', cargo:'Président', desde:'1993-01-01', hasta:'2000-01-01',
      fuente:'https://fr.wikipedia.org/wiki/Royale_Union_saint-gilloise', confirmada:false },
    { nombre:'Willy Michielsen', corto:'Michielsen', cargo:'Président', desde:'2000-01-01', hasta:'2002-01-01',
      fuente:'https://fr.wikipedia.org/wiki/Royale_Union_saint-gilloise', confirmada:false },
    { nombre:'Giovanni Ravasio', corto:'Ravasio', cargo:'Président', desde:'2002-01-01', hasta:'2006-01-01',
      fuente:'https://fr.wikipedia.org/wiki/Royale_Union_saint-gilloise', confirmada:false },
    { nombre:'Enrico Bove', corto:'Bove', cargo:'Président', desde:'2006-01-01', hasta:'2007-05-01',
      fuente:'https://fr.wikipedia.org/wiki/Royale_Union_saint-gilloise', confirmada:false },
    { nombre:'Willy Michielsen', corto:'Michielsen', cargo:'Président', desde:'2007-05-01', hasta:'2009-11-10',
      fuente:'https://fr.wikipedia.org/wiki/Royale_Union_saint-gilloise', confirmada:false },
    { nombre:'Enrico Bove', corto:'Bove', cargo:'Président', desde:'2009-11-10', hasta:'2013-01-01',
      fuente:'https://fr.wikipedia.org/wiki/Royale_Union_saint-gilloise', confirmada:false },
    { nombre:'Alain Vander Borght', corto:'Vander Borght', cargo:'Président', desde:'2013-01-01', hasta:'2015-01-01',
      fuente:'https://fr.wikipedia.org/wiki/Royale_Union_saint-gilloise', confirmada:false },
    { nombre:'Jürgen Baatzsch', corto:'Baatzsch', cargo:'Président', desde:'2015-01-01', hasta:'2018-07-02',
      fuente:'https://fr.wikipedia.org/wiki/Royale_Union_saint-gilloise', confirmada:false },
    // Muzio: président du conseil d'administration desde el 2/7/2018 (informes de los ejercicios 2018 y 2019); el club lo compró en 2018 la sociedad de Tony Bloom
    // (Wikipedia fr: Muzio 75%, Bloom 25%). Se carga como Président y no como Dueño porque el reparto del capital es de Wikipedia.
    { nombre:'Alex Muzio', corto:'Muzio', cargo:'Président', desde:'2018-07-02', hasta:null,
      fuente:'Clubes/Bélgica/Union Saint-Gilloise/jaarrekening-2019-06-30-individual.md', confirmada:true },
  ],
  'westerlo-be': [
    // Wijnants: gedelegeerd bestuurder en figura de conducción del club (Wikipedia lo llama voorzitter) desde antes del informe más antiguo (ejercicio 1998);
    // el voorzitter del consejo en los informes de 1998 a 2005 es Guido Kestens. Inicio real desconocido: desde = inicio del ejercicio 1998.
    // Hasta que Ercan compró el club (anunciado el 18/6/2019).
    { nombre:'Herman Wijnants', corto:'Wijnants', cargo:'Gedelegeerd bestuurder', desde:'1998-01-01', hasta:'2019-06-18',
      fuente:'Clubes/Bélgica/Westerlo/jaarrekening-2005-12-31-individual.md', confirmada:true },
    { nombre:'Oktay Ercan', corto:'Ercan', cargo:'Dueño', desde:'2019-06-18', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/KVC_Westerlo', confirmada:true },
  ],
  'zultewaregem-be': [
    // Naessens: voorzitter desde la fundación en 2001 (solo año). Todavía se presenta como presidente en octubre de 2013 y asume también el cargo de CEO (DH, 14/10/2013).
    // Ballière: Wikipedia lo ubica 2013-2025 y Sporza lo llama voorzitter en octubre de 2015; el ejercicio 2014 depende de la fecha del cambio, no confirmada.
    // Hullebusch: voorzitter desde 2025 (solo año); no figura en el consejo del informe del ejercicio 2025, donde sigue Ballière.
    { nombre:'Willy Naessens', corto:'Naessens', cargo:'Voorzitter', desde:'2001-01-01', hasta:'2013-10-14',
      fuente:'https://nl.wikipedia.org/wiki/SV_Zulte_Waregem', confirmada:true },
    { nombre:'Carl Ballière', corto:'Ballière', cargo:'Voorzitter', desde:'2013-10-14', hasta:'2025-07-01',
      fuente:'https://nl.wikipedia.org/wiki/SV_Zulte_Waregem', confirmada:true },
    { nombre:'Lode Hullebusch', corto:'Hullebusch', cargo:'Voorzitter', desde:'2025-07-01', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/SV_Zulte_Waregem', confirmada:true },
  ],
  'ohleuven-be': [
    // Vandebroeck: voorzitter van de Raad van Bestuur desde el 14/1/2017 (informe del ejercicio 2017); Wikipedia lo ubica 2016-2018. King Power entró al consejo el 8/6/2017.
    { nombre:'Chris Vandebroeck', corto:'Vandebroeck', cargo:'Voorzitter', desde:'2017-01-14', hasta:'2018-07-19',
      fuente:'Clubes/Bélgica/OH Leuven/jaarrekening-2017-12-31-individual.md', confirmada:true },
    // Vichai: entró al consejo el 19/7/2018 y murió el 27/10/2018. King Power es el grupo de la familia Srivaddhanaprabha; Aiyawatt, su hijo, sigue.
    { nombre:'Vichai Srivaddhanaprabha', corto:'Vichai', cargo:'Dueño', desde:'2018-07-19', hasta:'2018-10-27',
      fuente:'Clubes/Bélgica/OH Leuven/jaarrekening-2018-12-31-individual.md', confirmada:true },
    { nombre:'Aiyawatt Srivaddhanaprabha', corto:'Aiyawatt', cargo:'Dueño', desde:'2018-10-27', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/Oud-Heverlee_Leuven', confirmada:true },
  ],
  'raallalouviere-be': [
    // Curaba: fundador del club relanzado en 2017, président du conseil d'administration desde el 12/5/2017 y accionista mayoritario (70%, lavenir 2025).
    { nombre:'Salvatore Curaba', corto:'Curaba', cargo:'Dueño', desde:'2017-05-12', hasta:null,
      fuente:'Clubes/Bélgica/RAAL La Louvière/jaarrekening-2020-06-30-individual.md', confirmada:true },
  ],
});
