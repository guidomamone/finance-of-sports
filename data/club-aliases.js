// Los ids viejos de club (sin país) y a qué id apuntan hoy. NO se borra ninguna entrada: un link compartido o una búsqueda guardada
// con el id viejo tiene que seguir abriendo. Lo escribe tools/renombrar-ids.mjs; un alias nuevo se agrega a mano y `audit.js` lo chequea
// (alias-roto). Las páginas fuentes/<id>.html viejas redirigen desde netlify.toml.
window.CLUB_ALIASES = {
  "argentinosjuniors": "argentinosjuniors-ar",
  "athleticclub": "athleticclub-es",
  "atleticogoianiense": "atleticogoianiense-br",
  "atleticomadrid": "atleticomadrid-es",
  "boca": "boca-ar",
  "botafogo": "botafogo-br",
  "celtavigo": "celtavigo-es",
  "cerezoosaka": "cerezoosaka-jp",
  "clubamerica": "clubamerica-mx",
  "coritiba": "coritiba-br",
  "cruzeiro": "cruzeiro-br",
  "deportivoalaves": "deportivoalaves-es",
  "envigado": "envigado-co",
  "estudianteslp": "estudianteslp-ar",
  "fcbarcelona": "fcbarcelona-es",
  "fctokyo": "fctokyo-jp",
  "gambaosaka": "gambaosaka-jp",
  "gremio": "gremio-br",
  "independiente": "independiente-ar",
  "instituto": "instituto-ar",
  "ituano": "ituano-br",
  "kashimaantlers": "kashimaantlers-jp",
  "kawasakifrontale": "kawasakifrontale-jp",
  "mirassol": "mirassol-br",
  "nagoyagrampus": "nagoyagrampus-jp",
  "oncecaldas": "oncecaldas-co",
  "racing": "racing-ar",
  "realbetis": "realbetis-es",
  "realmadrid": "realmadrid-es",
  "river": "river-ar",
  "rosariocentral": "rosariocentral-ar",
  "sanfreccehiroshima": "sanfreccehiroshima-jp",
  "sanlorenzo": "sanlorenzo-ar",
  "sevillafc": "sevillafc-es",
  "union": "union-ar",
  "urawareddiamonds": "urawareddiamonds-jp",
  "valenciacf": "valenciacf-es",
  "velez": "velez-ar",
  "villarrealcf": "villarrealcf-es",
  "visselkobe": "visselkobe-jp",
  "yokohamafmarinos": "yokohamafmarinos-jp"
};

// resolverClubId('boca') -> 'boca-ar'; un id que no es alias vuelve igual. resolverClubIds(x) lo aplica a cada texto de un objeto o lista
// (el estado de una búsqueda guardada lleva ids de club a varias alturas). Sin dependencias: lo usan la URL, el selector y Mi cuenta.
window.resolverClubId = function (id) { return Object.prototype.hasOwnProperty.call(window.CLUB_ALIASES, id) ? window.CLUB_ALIASES[id] : id; };
window.resolverClubIds = function (v) {
  if (typeof v === 'string') return window.resolverClubId(v);
  if (Array.isArray(v)) return v.map(window.resolverClubIds);
  if (v && typeof v === 'object') { var o = {}; Object.keys(v).forEach(function (k) { o[k] = window.resolverClubIds(v[k]); }); return o; }
  return v;
};
