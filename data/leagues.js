// El CATÁLOGO de la taxonomía del selector: deportes, regiones, países y ligas. Nada de membresía (qué club en qué liga, siempre con
// año, vive en data/club-leagues.js). Las reglas (ids por escalón, `tier`, nombres sin sponsor): Admin/ARQUITECTURA.md, "Ligas por
// ejercicio y catálogo".

// DEPORTES. `active:false` = roadmap: se muestran apagados y no se pueden elegir.
const SPORTS = [
  { id:'futbol',  key:'sport.futbol',  name:'Fútbol',             icon:'⚽',   active:true  },
  { id:'basquet', key:'sport.basquet', name:'Básquet',            icon:'🏀', active:false },
  { id:'nfl',     key:'sport.nfl',     name:'Fútbol americano',   icon:'🏈', active:false },
  { id:'f1',      key:'sport.f1',      name:'Automovilismo',      icon:'🏎️', active:false },
  { id:'tenis',   key:'sport.tenis',   name:'Tenis',              icon:'🎾', active:false },
  { id:'rugby',   key:'sport.rugby',   name:'Rugby',              icon:'🏉', active:false },
];

// REGIONES. Las que no tienen clubes se muestran apagadas por el conteo real, no por un flag.
const REGIONS = [
  { id:'sudamerica',   key:'region.sudamerica',   name:'Sudamérica' },
  { id:'europa',       key:'region.europa',       name:'Europa' },
  { id:'asia',         key:'region.asia',         name:'Asia' },
  { id:'norteamerica', key:'region.norteamerica', name:'Norteamérica' },
  { id:'africa',       key:'region.africa',       name:'África' },
  { id:'oceania',      key:'region.oceania',      name:'Oceanía' },
];

// PAÍSES: los de clubes cargados o por dar de alta, nunca "próximamente". `flag`: el emoji de la columna País.
const COUNTRIES = {
  AR: { name:'Argentina', key:'country.AR', flag:'🇦🇷', region:'sudamerica' },
  BE: { name:'Bélgica',   key:'country.BE', flag:'🇧🇪', region:'europa' },
  BR: { name:'Brasil',    key:'country.BR', flag:'🇧🇷', region:'sudamerica' },
  CL: { name:'Chile',     key:'country.CL', flag:'🇨🇱', region:'sudamerica' },
  CO: { name:'Colombia',  key:'country.CO', flag:'🇨🇴', region:'sudamerica' },
  DE: { name:'Alemania',  key:'country.DE', flag:'🇩🇪', region:'europa' },
  DK: { name:'Dinamarca', key:'country.DK', flag:'🇩🇰', region:'europa' },
  ES: { name:'España',    key:'country.ES', flag:'🇪🇸', region:'europa' },
  GB: { name:'Inglaterra',key:'country.GB', flag:'🏴', region:'europa' },
  GR: { name:'Grecia',    key:'country.GR', flag:'🇬🇷', region:'europa' },
  HR: { name:'Croacia',   key:'country.HR', flag:'🇭🇷', region:'europa' },
  JP: { name:'Japón',     key:'country.JP', flag:'🇯🇵', region:'asia' },
  MX: { name:'México',    key:'country.MX', flag:'🇲🇽', region:'norteamerica' },
  NL: { name:'Países Bajos', key:'country.NL', flag:'🇳🇱', region:'europa' },
  PE: { name:'Perú',      key:'country.PE', flag:'🇵🇪', region:'sudamerica' },
  AT: { name:'Austria',   key:'country.AT', flag:'🇦🇹', region:'europa' },
  CH: { name:'Suiza',     key:'country.CH', flag:'🇨🇭', region:'europa' },
  CN: { name:'China',     key:'country.CN', flag:'🇨🇳', region:'asia' },
  CZ: { name:'República Checa', key:'country.CZ', flag:'🇨🇿', region:'europa' },
  EC: { name:'Ecuador',   key:'country.EC', flag:'🇪🇨', region:'sudamerica' },
  IT: { name:'Italia',    key:'country.IT', flag:'🇮🇹', region:'europa' },
  KR: { name:'Corea del Sur', key:'country.KR', flag:'🇰🇷', region:'asia' },
  NO: { name:'Noruega',   key:'country.NO', flag:'🇳🇴', region:'europa' },
  PT: { name:'Portugal',  key:'country.PT', flag:'🇵🇹', region:'europa' },
  RU: { name:'Rusia',     key:'country.RU', flag:'🇷🇺', region:'europa' },
  TR: { name:'Turquía',   key:'country.TR', flag:'🇹🇷', region:'europa' },
};

// LIGAS. id `<iso2>-<slug>` que nombra el ESCALÓN; `tier` = el escalón (1 = primera). Sin `totalClubs`: el tamaño cambia por
// temporada y vive en LEAGUE_SIZE_BY_YEAR (data/club-leagues.js).
const LEAGUES = {
  'ar-primera':        { name:'Primera División',      full:'Primera División de Argentina',       country:'AR', sport:'futbol', tier:1 },
  'ar-primeranacional':{ name:'Primera Nacional',      full:'Primera Nacional de Argentina',       country:'AR', sport:'futbol', tier:2 },
  'ar-primerab':       { name:'Primera B Metropolitana', full:'Primera B Metropolitana de Argentina', country:'AR', sport:'futbol', tier:3 },
  'be-proleague':      { name:'Pro League',            full:'Pro League de Bélgica',                country:'BE', sport:'futbol', tier:1 },
  'be-challengerproleague': { name:'Challenger Pro League', full:'Challenger Pro League de Bélgica',  country:'BE', sport:'futbol', tier:2 },
  'be-div1amateur':    { name:'1. Amateur Division',   full:'Belgian Division 1 (Eerste nationale)', country:'BE', sport:'futbol', tier:3 },
  'be-div2amateur':    { name:'2. Amateur Division',   full:'Belgian Division 2 (Tweede klasse amateurs)', country:'BE', sport:'futbol', tier:4 },
  'be-div3amateur':    { name:'3. Amateur Division',   full:'Belgian Division 3 (Derde klasse amateurs)', country:'BE', sport:'futbol', tier:5 },
  'br-serieA':         { name:'Brasileirão Série A',   full:'Campeonato Brasileiro Série A',       country:'BR', sport:'futbol', tier:1 },
  'br-serieB':         { name:'Brasileirão Série B',   full:'Campeonato Brasileiro Série B',       country:'BR', sport:'futbol', tier:2 },
  'br-serieC':         { name:'Brasileirão Série C',   full:'Campeonato Brasileiro Série C',       country:'BR', sport:'futbol', tier:3 },
  'br-serieD':         { name:'Brasileirão Série D',   full:'Campeonato Brasileiro Série D',       country:'BR', sport:'futbol', tier:4 },
  // Ligas estaduales: no son un escalón de la pirámide nacional, así que `tier:null` y `scope:'estadual'` (van al final del país).
  'br-paulistaA1':     { name:'Paulista Série A1',     full:'Campeonato Paulista Série A1',        country:'BR', sport:'futbol', tier:null, scope:'estadual' },
  'br-paulistaA2':     { name:'Paulista Série A2',     full:'Campeonato Paulista Série A2',        country:'BR', sport:'futbol', tier:null, scope:'estadual' },
  'br-paulistaA3':     { name:'Paulista Série A3',     full:'Campeonato Paulista Série A3',        country:'BR', sport:'futbol', tier:null, scope:'estadual' },
  'cl-primera':        { name:'Primera División',      full:'Primera División de Chile',           country:'CL', sport:'futbol', tier:1 },
  'co-primeraA':       { name:'Primera A',             full:'Categoría Primera A',                 country:'CO', sport:'futbol', tier:1 },
  'co-primeraB':       { name:'Primera B',             full:'Categoría Primera B',                 country:'CO', sport:'futbol', tier:2 },
  'de-bundesliga':     { name:'Bundesliga',            full:'Fußball-Bundesliga',                  country:'DE', sport:'futbol', tier:1 },
  'de-2bundesliga':    { name:'2. Bundesliga',         full:'2. Fußball-Bundesliga',               country:'DE', sport:'futbol', tier:2 },
  'dk-superliga':      { name:'Superliga',              full:'Danish Superliga',                    country:'DK', sport:'futbol', tier:1 },
  'es-laliga':         { name:'LaLiga',                full:'Primera División de España',          country:'ES', sport:'futbol', tier:1 },
  'es-segunda':        { name:'Segunda División',      full:'Segunda División de España',          country:'ES', sport:'futbol', tier:2 },
  'gb-premierleague':  { name:'Premier League',        full:'Premier League',                      country:'GB', sport:'futbol', tier:1 },
  'gb-championship':   { name:'Championship',          full:'EFL Championship',                    country:'GB', sport:'futbol', tier:2 },
  'gr-superleague':    { name:'Super League',           full:'Super League Greece',                 country:'GR', sport:'futbol', tier:1 },
  'hr-hnl':            { name:'HNL',                    full:'Hrvatska nogometna liga',             country:'HR', sport:'futbol', tier:1 },
  'jp-j1':             { name:'J1 League',             full:'J1 League',                           country:'JP', sport:'futbol', tier:1 },
  'mx-ligamx':         { name:'Liga MX',               full:'Liga MX',                             country:'MX', sport:'futbol', tier:1 },
  'nl-eredivisie':     { name:'Eredivisie',             full:'Eredivisie de los Países Bajos',      country:'NL', sport:'futbol', tier:1 },
  'pe-liga1':          { name:'Liga 1',                full:'Liga 1 de Perú',                      country:'PE', sport:'futbol', tier:1 },
  'at-bundesliga':     { name:'Bundesliga',            full:'Bundesliga de Austria',               country:'AT', sport:'futbol', tier:1 },
  'at-2liga':          { name:'2. Liga',               full:'2. Liga de Austria',                  country:'AT', sport:'futbol', tier:2 },
  'ch-superleague':    { name:'Super League',          full:'Super League de Suiza',               country:'CH', sport:'futbol', tier:1 },
  'ch-challengeleague': { name:'Challenge League',     full:'Challenge League de Suiza',           country:'CH', sport:'futbol', tier:2 },
  'cn-csl':            { name:'Super League',          full:'Superliga de China',                  country:'CN', sport:'futbol', tier:1 },
  'cn-league1':        { name:'League One',            full:'China League One',                    country:'CN', sport:'futbol', tier:2 },
  'cz-firstleague':    { name:'Primera Liga',          full:'Primera Liga checa',                  country:'CZ', sport:'futbol', tier:1 },
  'cz-fnl':            { name:'FNL',                   full:'Fotbalová národní liga',              country:'CZ', sport:'futbol', tier:2 },
  'dk-1division':      { name:'1. Division',           full:'1. Division de Dinamarca',            country:'DK', sport:'futbol', tier:2 },
  'ec-seriea':         { name:'Serie A',               full:'Serie A de Ecuador',                  country:'EC', sport:'futbol', tier:1 },
  'ec-serieb':         { name:'Serie B',               full:'Serie B de Ecuador',                  country:'EC', sport:'futbol', tier:2 },
  'gb-leagueone':      { name:'League One',            full:'EFL League One',                      country:'GB', sport:'futbol', tier:3 },
  'gb-leaguetwo':      { name:'League Two',            full:'EFL League Two',                      country:'GB', sport:'futbol', tier:4 },
  'gr-superleague2':   { name:'Super League 2',        full:'Super League 2 de Grecia',            country:'GR', sport:'futbol', tier:2 },
  'it-seriea':         { name:'Serie A',               full:'Serie A de Italia',                   country:'IT', sport:'futbol', tier:1 },
  'it-serieb':         { name:'Serie B',               full:'Serie B de Italia',                   country:'IT', sport:'futbol', tier:2 },
  'it-seriec':         { name:'Serie C',               full:'Serie C de Italia',                   country:'IT', sport:'futbol', tier:3 },
  'it-seried':         { name:'Serie D',               full:'Serie D de Italia',                   country:'IT', sport:'futbol', tier:4 },
  'kr-kleague1':       { name:'K League 1',            full:'K League 1',                          country:'KR', sport:'futbol', tier:1 },
  'kr-kleague2':       { name:'K League 2',            full:'K League 2',                          country:'KR', sport:'futbol', tier:2 },
  'nl-eerstedivisie':  { name:'Eerste Divisie',        full:'Eerste Divisie de los Países Bajos',  country:'NL', sport:'futbol', tier:2 },
  'no-eliteserien':    { name:'Eliteserien',           full:'Eliteserien de Noruega',              country:'NO', sport:'futbol', tier:1 },
  'no-1divisjon':      { name:'1. divisjon',           full:'Norwegian First Division (Adeccoligaen/OBOS-ligaen)', country:'NO', sport:'futbol', tier:2 },
  'pt-primeiraliga':   { name:'Primeira Liga',         full:'Primeira Liga de Portugal',           country:'PT', sport:'futbol', tier:1 },
  'pt-ligaportugal2':  { name:'Liga Portugal 2',       full:'Liga Portugal 2',                     country:'PT', sport:'futbol', tier:2 },
  'pt-liga3':          { name:'Liga 3',                full:'Liga 3 de Portugal',                  country:'PT', sport:'futbol', tier:3 },
  'ru-premierliga':    { name:'Premier Liga',          full:'Liga Premier de Rusia',               country:'RU', sport:'futbol', tier:1 },
  'ru-pervayaliga':    { name:'Primera Liga',          full:'Primera Liga de Rusia (FNL)',         country:'RU', sport:'futbol', tier:2 },
  'tr-superlig':       { name:'Süper Lig',             full:'Süper Lig de Turquía',                country:'TR', sport:'futbol', tier:1 },
  'tr-1lig':           { name:'1. Lig',                full:'TFF 1. Lig',                          country:'TR', sport:'futbol', tier:2 },
};

// Helpers de catálogo. Los de MEMBRESÍA viven en data/club-leagues.js, siempre con el año.

// La división en palabras, para el subtítulo de la fila de liga. Una clave fija por escalón (la ordinal en inglés no se deriva del
// número); un tier sin clave cae al castellano.
function tierLabel(tier){
  if(tier == null) return '';
  var t = (window.I18N && window.I18N.t) ? window.I18N.t : function(k, es){ return es; };
  if(tier === 1) return t('league.tier1', '1ª división');
  if(tier === 2) return t('league.tier2', '2ª división');
  if(tier === 3) return t('league.tier3', '3ª división');
  if(tier === 4) return t('league.tier4', '4ª división');
  return tier + 'ª división';
}

// Las ligas de un país, por escalón y después por nombre.
function leaguesOfCountry(countryId){
  return Object.keys(LEAGUES)
    .filter(id => LEAGUES[id].country === countryId)
    .sort((a, b) => ((LEAGUES[a].tier ?? 99) - (LEAGUES[b].tier ?? 99)) || LEAGUES[a].name.localeCompare(LEAGUES[b].name, 'es', {sensitivity:'base'})); // sin tier (estaduales) al final
}

// Los países de una región, alfabético.
function countriesOfRegion(regionId){
  return Object.keys(COUNTRIES)
    .filter(id => COUNTRIES[id].region === regionId)
    .sort((a, b) => COUNTRIES[a].name.localeCompare(COUNTRIES[b].name, 'es', {sensitivity:'base'}));
}

// La región de un país, en un solo lugar: no es un campo del club.
function regionOfCountry(countryId){
  return (COUNTRIES[countryId] || {}).region || null;
}

window.SPORTS = SPORTS;
window.REGIONS = REGIONS;
window.COUNTRIES = COUNTRIES;
window.LEAGUES = LEAGUES;
