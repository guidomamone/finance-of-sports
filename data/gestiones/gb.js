// ============================================================================
// data/gestiones/gb.js: quién condujo cada club de Inglaterra y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'arsenal-gb': [
    // Kroenke pasó a ser accionista mayoritario el 11/4/2011 (62,89%); recién en 2018 compró el 100%. Dueño; el chairman operativo fue otra persona.
    { nombre:'Stan Kroenke', corto:'Kroenke', cargo:'Dueño', desde:'2011-04-11', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Ownership_of_Arsenal_F.C._%26_W.F.C.', confirmada:true },
  ],
  'astonvilla-gb': [
    // NSWE compró el control el 20-21/7/2018 (fecha aproximada: anuncio del club). Xia siguió de co-chairman hasta agosto de 2019; Sawiris quedó como chairman.
    { nombre:'Nassef Sawiris', corto:'Sawiris', cargo:'Chairman', desde:'2018-07-21', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Nassef_Sawiris', confirmada:true },
  ],
  'bournemouth-gb': [
    { nombre:'Bill Foley', corto:'Foley', cargo:'Chairman', desde:'2022-12-13', hasta:null,
      fuente:'https://footballtoday.com/2022/12/13/bill-foley-led-partnership-completes-bournemouth-takeover/', confirmada:true },
  ],
  'brentford-gb': [
    // Benham tomó el control total en junio de 2012 (Bees United votó la transferencia); día 01 aproximado. Cliff Crown fue chairman; Benham es el dueño.
    { nombre:'Matthew Benham', corto:'Benham', cargo:'Dueño', desde:'2012-06-01', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Matthew_Benham', confirmada:true },
  ],
  'brighton-gb': [
    { nombre:'Tony Bloom', corto:'Bloom', cargo:'Chairman', desde:'2009-05-18', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Tony_Bloom', confirmada:true },
  ],
  'burnley-gb': [
    { nombre:'Alan Pace', corto:'Pace', cargo:'Chairman', desde:'2020-12-31', hasta:null,
      fuente:'https://lastwordonsports.com/football/2020/12/31/alk-burnley-takeover/', confirmada:true },
  ],
  'chelsea-gb': [
    // Boehly dejó la presidencia al vender su parte a Clearlake (anuncio del 16/9/2026). Desde entonces no se carga a nadie (Clearlake es un fondo).
    { nombre:'Todd Boehly', corto:'Boehly', cargo:'Chairman', desde:'2022-05-30', hasta:'2026-09-16',
      fuente:'https://sports.yahoo.com/articles/clearlake-complete-chelsea-takeover-sale-225556156.html', confirmada:true },
  ],
  'crystalpalace-gb': [
    // El club sale de la administración en junio de 2010 (día 01 aproximado). Parish es chairman y cabeza del consorcio; Textor (2021-2025) y Blitzer/Harris fueron socios.
    { nombre:'Steve Parish', corto:'Parish', cargo:'Chairman', desde:'2010-06-01', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Steve_Parish_(businessman)', confirmada:true },
  ],
  'everton-gb': [
    // Moshiri: compra del 49,9% confirmada el 27/2/2016 (la Premier la ratificó dos semanas después).
    { nombre:'Farhad Moshiri', corto:'Moshiri', cargo:'Dueño', desde:'2016-02-27', hasta:'2024-12-19',
      fuente:'https://en.wikipedia.org/wiki/Farhad_Moshiri', confirmada:true },
    { nombre:'Dan Friedkin', corto:'Friedkin', cargo:'Chairman', desde:'2024-12-19', hasta:null,
      fuente:'https://www.skysports.com/football/news/11095/13275439/everton-takeover-the-friedkin-group-complete-deal-to-become-clubs-new-owners', confirmada:true },
  ],
  'fulham-gb': [
    { nombre:'Shahid Khan', corto:'Khan', cargo:'Dueño', desde:'2013-07-12', hasta:null,
      fuente:'https://www.forbes.com/sites/briansolomon/2013/07/12/billionaire-shahid-khan-completes-deal-for-premier-leagues-fulham/', confirmada:true },
  ],
  'leeds-gb': [
    { nombre:'Paraag Marathe', corto:'Marathe', cargo:'Chairman', desde:'2023-07-18', hasta:null,
      fuente:'https://www.theleedspress.com/leeds-united-takeover-complete-after-efl-approve-of-sale-to-49ers-enterprises-35708/', confirmada:true },
  ],
  'mancity-gb': [
    // Nombrado chairman el 23/9/2008 según Companies House; el club cambió de dueño el 1/9/2008. Se usa la fecha de Companies House.
    { nombre:'Khaldoon Al Mubarak', corto:'Al Mubarak', cargo:'Chairman', desde:'2008-09-23', hasta:null,
      fuente:'https://find-and-update.company-information.service.gov.uk/officers/KM6XhsdP4e7BkN6q4IUjNNxGgHE/appointments', confirmada:true },
  ],
  'nottinghamforest-gb': [
    { nombre:'Evangelos Marinakis', corto:'Marinakis', cargo:'Dueño', desde:'2017-05-18', hasta:null,
      fuente:'https://www.espn.co.uk/football/story/_/id/37522382/olympiakos-owner-evangelos-marinakis-completes-nottingham-forest-takeover', confirmada:true },
  ],
  'sunderland-gb': [
    { nombre:'Kyril Louis-Dreyfus', corto:'Louis-Dreyfus', cargo:'Chairman', desde:'2021-02-18', hasta:null,
      fuente:'https://www.safc.com/news/club-news/2021/february/kld-acquires-controlling-interest-in-sunderland-afc', confirmada:true },
  ],
  'tottenham-gb': [
    // Levy: executive chairman desde febrero de 2001 (día aproximado, no verificado en la fuente citada).
    { nombre:'Daniel Levy', corto:'Levy', cargo:'Chairman', desde:'2001-02-01', hasta:'2025-09-04',
      fuente:'https://www.tottenhamhotspur.com/news/2025/september/tottenham-hotspur-announces-departure-of-executive-chairman-daniel-levy/', confirmada:true },
    { nombre:'Peter Charrington', corto:'Charrington', cargo:'Chairman', desde:'2025-09-04', hasta:null,
      fuente:'https://www.espn.com/soccer/story/_/id/46156921/tottenham-hotspur-chairman-daniel-levy-steps-down', confirmada:true },
  ],
  'westham-gb': [
    // Sullivan y Gold compraron el club el 19/1/2010; Sullivan es el cabeza (Gold, co-chairman, murió en enero de 2023).
    { nombre:'David Sullivan', corto:'Sullivan', cargo:'Chairman', desde:'2010-01-19', hasta:null,
      fuente:'https://www.fourfourtwo.com/news/on-this-day-in-2010-david-sullivan-and-david-gold-complete-west-ham-takeover-1610971214000', confirmada:true },
  ],
});
