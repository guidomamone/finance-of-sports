// ============================================================================
// data/gestiones/it.js: quién condujo cada club de Italia y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre;
// donde el dueño es un fondo o una holding (Milan, Inter desde 2024, Monza) se carga el presidente del
// consejo de administración, que es quien firma el balance. Cuando la fuente da solo el año, el día es 01
// por convención (se avisa en el comentario de la gestión).
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'juvestabia-it': [
    // Andrea Langella: presidente y dueño de la mayoría con su hermano Giuseppe desde 2019 (borsaefinanza.it, 19/4/2024: lo describe como presidente en esa fecha). Las fechas 2021-2026 salen
    // del título de un artículo que encontró Guido ("2021 - 2026: The Andrea Langella Era"), solo con años: día 01 por convención. Falta la fecha exacta de asunción y de salida.
    { nombre:'Andrea Langella', corto:'Langella', cargo:'Presidente', desde:'2021-01-01', hasta:'2026-01-01',
      fuente:'https://borsaefinanza.it/andrea-langella-chi-e-cosa-fa-presidente-juve-stabia/', confirmada:true },
  ],
  'salernitana-it': [
    // Iervolino: presidente del consejo desde el 13/1/2022 (el trust Salernitana 2021, con un administrador único, condujo antes); firma los balances 2022 y 2023.
    { nombre:'Danilo Iervolino', corto:'Iervolino', cargo:'Presidente', desde:'2022-01-13', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Unione_Sportiva_Salernitana_1919', confirmada:true },
  ],
  'chievoverona-it': [
    // Luca Campedelli: presidente desde septiembre de 1992 (murió su padre Luigi) hasta 2022; la fuente da solo mes y año o solo el año: día 01 por convención.
    { nombre:'Luca Campedelli', corto:'Campedelli', cargo:'Presidente', desde:'1992-09-01', hasta:'2022-01-01',
      fuente:'https://it.wikipedia.org/wiki/Luca_Campedelli', confirmada:true },
  ],
  'acmilan-it': [
    // Berlusconi: dueño del 20/2/1986 al 13/4/2017 (presidente 1986-2004 y 2006-2008; de 2008 a 2017 el cargo de presidente estuvo vacante y
    // fue presidente honorario desde el 29/3/2012). Se carga como dueño con nombre (regla de la cabecera de ar.js).
    { nombre:'Silvio Berlusconi', corto:'Berlusconi', cargo:'Presidente', desde:'1986-02-20', hasta:'2017-04-13',
      fuente:'https://it.wikipedia.org/wiki/Presidenti_dell%27Associazione_Calcio_Milan', confirmada:true },
    { nombre:'Li Yonghong', corto:'Li', cargo:'Presidente', desde:'2017-04-14', hasta:'2018-07-21',
      fuente:'https://it.wikipedia.org/wiki/Presidenti_dell%27Associazione_Calcio_Milan', confirmada:true },
    // Elliott (fondo) subió a Scaroni a la presidencia el 21/7/2018; RedBird (fondo) lo confirmó desde 2022.
    { nombre:'Paolo Scaroni', corto:'Scaroni', cargo:'Presidente', desde:'2018-07-21', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Presidenti_dell%27Associazione_Calcio_Milan', confirmada:true },
  ],
  'asroma-it': [
    // Rosella Sensi: presidenta 2008-2011 (la fuente da solo los años: desde 2008-01-01 y hasta 2011-01-01 por convención; cubre los cierres del 30/6/2009 y del 30/6/2010).
    // Pendiente: Franco Sensi hasta 2008 (cierres 2007 y 2008) y el 2011 (Cappelli en 2011 y DiBenedetto 2011-2012): la fuente no da días.
    { nombre:'Rosella Sensi', corto:'Sensi', cargo:'Presidente', desde:'2008-01-01', hasta:'2011-01-01',
      fuente:'https://it.wikipedia.org/wiki/Allenatori_e_presidenti_dell%27Associazione_Sportiva_Roma', confirmada:true },
    // Pallotta: la fuente da solo los años (2012-2020); desde = 01/01/2012 por convención.
    { nombre:'James Pallotta', corto:'Pallotta', cargo:'Presidente', desde:'2012-01-01', hasta:'2020-08-17',
      fuente:'https://it.wikipedia.org/wiki/Allenatori_e_presidenti_dell%27Associazione_Sportiva_Roma', confirmada:true },
    { nombre:'Dan Friedkin', corto:'Friedkin', cargo:'Presidente', desde:'2020-08-17', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Associazione_Sportiva_Roma', confirmada:true },
  ],
  'atalanta-it': [
    // Percassi: "presidente dal 2010" (solo el año; 01/01 por convención). Desde 2022 hay un copresidente (Stephen Pagliuca, cordata
    // estadounidense), pero Percassi sigue de presidente y principal accionista individual: no se parte la gestión.
    { nombre:'Antonio Percassi', corto:'Percassi', cargo:'Presidente', desde:'2010-01-01', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Atalanta_Bergamasca_Calcio', confirmada:true },
  ],
  'bologna-it': [
    // Saputo: control del club desde el 19/9/2015 (Tacopina fue presidente en 2014-15 con Saputo de chairman).
    { nombre:'Joey Saputo', corto:'Saputo', cargo:'Presidente', desde:'2015-09-19', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Bologna_Football_Club_1909', confirmada:true },
  ],
  'cremonese-it': [
    // Rossi: la lista de presidentes da solo el año de arranque (2017); 01/01 por convención.
    { nombre:'Paolo Rossi', corto:'Rossi', cargo:'Presidente', desde:'2017-01-01', hasta:'2023-07-06',
      fuente:'https://it.wikipedia.org/wiki/Unione_Sportiva_Cremonese', confirmada:true },
    { nombre:'Francesco Dini', corto:'Dini', cargo:'Presidente', desde:'2023-07-06', hasta:null,
      fuente:'https://www.uscremonese.it/francesco-dini-e-il-nuovo-presidente-dellu-s-cremonese/', confirmada:true },
  ],
  'fiorentina-it': [
    // Commisso: compra oficializada el 6/6/2019; presidente hasta su muerte, el 16/1/2026.
    { nombre:'Rocco Commisso', corto:'Commisso', cargo:'Presidente', desde:'2019-06-06', hasta:'2026-01-16',
      fuente:'https://it.wikipedia.org/wiki/Rocco_Commisso', confirmada:true },
  ],
  'genoa-it': [
    // Zangrillo: presidente desde el closing de 777 Partners (15/11/2021); lo reemplazó Sucu el 13/1/2025 (sigue en el consejo).
    { nombre:'Alberto Zangrillo', corto:'Zangrillo', cargo:'Presidente', desde:'2021-11-15', hasta:'2025-01-13',
      fuente:'https://www.calcioefinanza.it/2021/11/15/ufficiale-777-proprietaria-del-genoa-zangrillo-presidente/', confirmada:true },
    { nombre:'Dan Sucu', corto:'Sucu', cargo:'Presidente', desde:'2025-01-13', hasta:null,
      fuente:'https://www.calcioefinanza.it/2025/01/13/genoa-nuovo-presidente-dan-sucu/', confirmada:true },
  ],
  'hellasverona-it': [
    // Setti compró el club el 23/6/2012 (único dueño desde marzo de 2013); presidente hasta el pase a Presidio Investors (15/1/2025).
    { nombre:'Maurizio Setti', corto:'Setti', cargo:'Presidente', desde:'2012-06-23', hasta:'2025-01-15',
      fuente:'https://it.wikipedia.org/wiki/Hellas_Verona_Football_Club', confirmada:true },
    { nombre:'Italo Zanzi', corto:'Zanzi', cargo:'Presidente', desde:'2025-01-15', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Hellas_Verona_Football_Club', confirmada:true },
  ],
  'inter-it': [
    { nombre:'Steven Zhang', corto:'Zhang', cargo:'Presidente', desde:'2018-10-26', hasta:'2024-06-04',
      fuente:'https://www.gazzetta.it/Calcio/Serie-A/Inter/26-10-2018/inter-ufficiale-stevenzhang-presidente-marotta-300989857711.shtml', confirmada:true },
    // Oaktree (fondo) tomó el control en mayo de 2024; Marotta es presidente del consejo desde el 4/6/2024.
    { nombre:'Giuseppe Marotta', corto:'Marotta', cargo:'Presidente', desde:'2024-06-04', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Football_Club_Internazionale_Milano', confirmada:true },
  ],
  'lazio-it': [
    // Cragnotti: dueño de la Lazio entre 1992 y 2003; presidente desde el 12/3/1992 y, en su segundo mandato, de 1998 a 2003 (la fuente da solo los años: 01/01
    // por convención). Los cierres de 1999, 2000 y 2001 caen en ese tramo; el hueco hasta Lotito (2004) es de Ugo Longo y no tiene cierre cargado.
    { nombre:'Sergio Cragnotti', corto:'Cragnotti', cargo:'Presidente', desde:'1998-01-01', hasta:'2003-01-01',
      fuente:'https://it.wikipedia.org/wiki/Sergio_Cragnotti', confirmada:true },
    { nombre:'Claudio Lotito', corto:'Lotito', cargo:'Presidente', desde:'2004-06-19', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Societ%C3%A0_Sportiva_Lazio', confirmada:true },
  ],
  'como-it': [
    // Mirwan Suwarso (familia Hartono, dueña desde 2019), firma los bilanci como "Il Presidente". Las fuentes difieren en la fecha de la
    // presidencia (2019 o 2024); decisión de Guido 2026-10-07: desde 2019 (solo el año; 01/01 por convención).
    { nombre:'Mirwan Suwarso', corto:'Suwarso', cargo:'Presidente', desde:'2019-01-01', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Como_1907', confirmada:true },
  ],
  'monza-it': [
    // Desde el 8/7/2022 el club no tiene presidente persona: lo controla Fininvest (sociedad de la familia Berlusconi). Decisión de Guido
    // 2026-10-07: se carga Fininvest como gestión (excepción a "el dueño solo si es una persona con nombre", ver ar.js).
    { nombre:'Fininvest', corto:'Fininvest', cargo:'Propietario', desde:'2022-07-08', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Associazione_Calcio_Monza', confirmada:true },
  ],
  'napoli-it': [
    // De Laurentiis: "presidente y dueño desde 2004" tras la quiebra (solo el año; 01/09 aproximado, verano de 2004).
    { nombre:'Aurelio De Laurentiis', corto:'De Laurentiis', cargo:'Presidente', desde:'2004-09-01', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Societ%C3%A0_Sportiva_Calcio_Napoli', confirmada:true },
  ],
  'parma-it': [
    // Scala: presidente del Parma refundado (Serie D) desde el verano de 2015 (la sociedad se constituyó el 30/6/2015) hasta el 22/11/2016.
    // Entre el 22/11 y el 31/12/2016 la fuente no nombra a nadie (la gestión siguiente arranca el 01/01/2017 por convención): ningún cierre cae ahí.
    { nombre:'Nevio Scala', corto:'Scala', cargo:'Presidente', desde:'2015-06-30', hasta:'2016-11-22',
      fuente:'https://it.wikipedia.org/wiki/Nevio_Scala', confirmada:true },
    // Las tres gestiones: la fuente da solo los años (2017-2018, 2018-2020, 2020-); 01/01/2017, 01/10/2018 (control de Nuovo Inizio,
    // octubre de 2018) y 01/09/2020 (septiembre de 2020, entra la familia Krause) por convención.
    { nombre:'Jiang Lizhang', corto:'Jiang', cargo:'Presidente', desde:'2017-01-01', hasta:'2018-10-01',
      fuente:'https://it.wikipedia.org/wiki/Parma_Calcio_1913', confirmada:true },
    { nombre:'Pietro Pizzarotti', corto:'Pizzarotti', cargo:'Presidente', desde:'2018-10-01', hasta:'2020-09-01',
      fuente:'https://it.wikipedia.org/wiki/Parma_Calcio_1913', confirmada:true },
    { nombre:'Kyle Krause', corto:'Krause', cargo:'Presidente', desde:'2020-09-01', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Parma_Calcio_1913', confirmada:true },
  ],
  'sampdoria-it': [
    // Ferrero compró el club el 12/6/2014. Entre el 5/4 y el 19/12/2017 la FIGC lo hizo decaer de la presidencia (siguió de dueño): no se parte la gestión.
    { nombre:'Massimo Ferrero', corto:'Ferrero', cargo:'Presidente', desde:'2014-06-12', hasta:'2021-12-27',
      fuente:'https://it.wikipedia.org/wiki/Massimo_Ferrero', confirmada:true },
    // Lanna: nombrado el 27/12/2021; la lista da su fin como "2024" (solo el año; 01/01/2024 por convención).
    { nombre:'Marco Lanna', corto:'Lanna', cargo:'Presidente', desde:'2021-12-27', hasta:'2024-01-01',
      fuente:'https://it.wikipedia.org/wiki/Marco_Lanna', confirmada:true },
  ],
  'sassuolo-it': [
    // Carlo Rossi, presidente del consejo (dueña: la familia Squinzi, vía Mapei). Las fuentes dicen 2003 o 2004; 01/01/2004 por convención.
    { nombre:'Carlo Rossi', corto:'Rossi', cargo:'Presidente', desde:'2004-01-01', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Unione_Sportiva_Sassuolo_Calcio', confirmada:true },
  ],
  'torino-it': [
    { nombre:'Urbano Cairo', corto:'Cairo', cargo:'Presidente', desde:'2005-08-31', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Torino_Football_Club', confirmada:true },
  ],
  'udinese-it': [
    // Franco Soldati, presidente del consejo (la familia Pozzo controla vía Gesapar). La fuente dice 2000 en un lado y 2002 en otro; 01/01/2002 por convención.
    { nombre:'Franco Soldati', corto:'Soldati', cargo:'Presidente', desde:'2002-01-01', hasta:null,
      fuente:'https://it.wikipedia.org/wiki/Udinese_Calcio', confirmada:true },
  ],
});
