// ============================================================================
//  ⚠⚠⚠  DATOS INVENTADOS. NINGÚN NÚMERO DE ESTE ARCHIVO ES REAL.  ⚠⚠⚠
//
//  QUÉ ES: relleno de mentira para poder probar la UX del prototipo de selector
//  (`prototipo-pasos.html`) sin que la falta de datos reales limite lo que se
//  puede diseñar. Pedido explícito de Guido: "estoy queriendo probar cosas y el
//  tener datos incompletos me limita la creatividad".
//
//  QUÉ INVENTA: los últimos 10 ejercicios (2016 a 2025) de los 18 clubes de
//  ARGENTINA y BRASIL que hay cargados, más ascensos y descensos entre primera y
//  segunda división en esos 10 años. Nada más: el resto de los países queda como
//  está, y los ejercicios REALES no se pisan nunca (solo se rellenan los huecos).
//
//  ── POR QUÉ ESTO ES PELIGROSO Y CÓMO ESTÁ CONTENIDO ──────────────────────────
//
//  Este proyecto existe porque sus números son verificables: cada cifra sale de un
//  balance publicado y `auditAll()` chequea que cierre contra el total impreso de
//  su propio documento. Un archivo de datos inventados es exactamente lo contrario,
//  así que vale la pena escribir dónde está la línea:
//
//   1. NO VIVE EN `data/`. Vive en la raíz, con "inventados" en el nombre. Lo carga
//      UNA sola página, `prototipo-pasos.html`, que además no está linkeada desde
//      ningún lado del sitio.
//   2. NO LO VE NINGUNA HERRAMIENTA DEL PROYECTO. `node tools/audit.js` y
//      `auditAll()` leen `data/*.js`; este archivo no está ahí, así que no puede
//      ensuciar ninguna verificación ni ningún total.
//   3. CADA EJERCICIO INVENTADO SE DECLARA: su meta lleva `inventado:true`, su
//      fuente dice "DATO INVENTADO" en la pestaña Fuentes, cada rubro de la tabla
//      termina en "(inventado)", y el prototipo escribe "· INVENTADO" al lado del
//      año en todos los lugares donde lo ofrece.
//   4. NO SE COPIA A `data/` NUNCA. Si algún día uno de estos clubes consigue su
//      balance real de 2019, se carga como todos los demás: leyendo el documento.
//      Estos números no son un borrador de nada.
//
//  Si estás leyendo esto porque un número del sitio no cierra: mirá primero si la
//  página que estás viendo es el prototipo. En `index.html` este archivo no entra.
// ============================================================================

window.FOS_DUMMY = (function(){
  'use strict';

  var DESDE = 2016, HASTA = 2025;
  var PAISES = ['AR', 'BR'];
  var LIGAS = {
    AR: ['ar-primera', 'ar-primeranacional'],
    BR: ['br-serieA', 'br-serieB']
  };

  // Ruido DETERMINISTA: el mismo club y el mismo año dan siempre el mismo número.
  // Si los datos cambiaran en cada recarga, cualquier cosa que se pruebe con ellos
  // (un gráfico, una comparación, una captura) sería irrepetible.
  function hash(str){
    var h = 2166136261;
    for(var i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rnd(semilla){
    var t = (hash(semilla) + 0x6D2B79F5) >>> 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function entre(semilla, min, max){ return min + rnd(semilla) * (max - min); }

  var clubesAR_BR = [];
  var membresia = {};   // clubId -> { year: leagueId }  (real + inventado)
  var inventados = {};  // clubId -> { year: true }

  function esDummy(clubId, year){ return !!(inventados[clubId] && inventados[clubId][year]); }

  function aniosRealesDe(id){
    return ((window.CLUB_INDEX[id] || {}).yrs || []).map(function(par){ return par[0]; });
  }

  // ---------------------------------------------------------------------------
  // ASCENSOS Y DESCENSOS. Cada club arranca en la división donde lo pone su fila
  // real más vieja y después sube o baja: la probabilidad de moverse es baja
  // (12%), así que la mayoría se queda donde está y un puñado hace el recorrido
  // completo, que es lo que se quiere poder probar (Mirassol ya existía de verdad:
  // Série B en 2024 y Série A en 2025).
  // ---------------------------------------------------------------------------
  function armarMembresia(){
    clubesAR_BR.forEach(function(id){
      var pais = window.CLUB_INDEX[id].c;
      var ligas = LIGAS[pais];
      var real = {};
      // Lo REAL manda: si `data/club-leagues.js` ya sabe en qué división estuvo un
      // club un año, ese año no se inventa.
      ligas.forEach(function(lid){
        (window.yearsOfClubInLeague ? window.yearsOfClubInLeague(id, lid) : []).forEach(function(y){ real[y] = lid; });
      });
      var actual = real[DESDE] || real[Object.keys(real)[0]] || (rnd(id + 'div') < 0.75 ? ligas[0] : ligas[1]);
      membresia[id] = {};
      for(var y = DESDE; y <= HASTA; y++){
        if(real[y]){ actual = real[y]; membresia[id][y] = real[y]; continue; }
        if(rnd(id + 'mov' + y) < 0.12) actual = (actual === ligas[0]) ? ligas[1] : ligas[0];
        membresia[id][y] = actual;
      }
      // Los años reales fuera de la ventana de 10 años se conservan tal cual.
      Object.keys(real).forEach(function(y){ if(!membresia[id][y]) membresia[id][y] = real[y]; });
    });
  }

  // ---------------------------------------------------------------------------
  // LOS NÚMEROS. Escala por club (un grande factura más que un chico), una curva
  // de crecimiento con ruido, y un castigo fuerte al año que el club pasó en
  // segunda: es la única "regla de negocio" que tiene sentido meterle a un dato
  // inventado, porque es la que hace que el ascenso/descenso se NOTE en el gráfico.
  // ---------------------------------------------------------------------------
  function numerosDe(id, year){
    var base = entre(id + 'base', 18, 95);                       // M USD del primer año
    var crec = entre(id + 'crec', 0.99, 1.14);
    var ruido = entre(id + year + 'r', 0.88, 1.13);
    var enSegunda = membresia[id] && membresia[id][year] && window.LEAGUES[membresia[id][year]]
                  && window.LEAGUES[membresia[id][year]].tier === 2;
    var revenue = base * Math.pow(crec, year - DESDE) * ruido * (enSegunda ? 0.45 : 1);

    var pesos = { member_dues:0.17, broadcasting:0.27, sponsorship_commercial:0.19, matchday_competition:0.13, player_sales:0.24 };
    var labels = {
      member_dues:'Cuotas sociales (inventado)',
      broadcasting:'Derechos de televisación (inventado)',
      sponsorship_commercial:'Publicidad y sponsors (inventado)',
      matchday_competition:'Recaudación de partidos (inventado)',
      player_sales:'Transferencias de jugadores (inventado)'
    };
    var revenueLines = Object.keys(pesos).map(function(cat){
      var p = pesos[cat] * entre(id + year + cat, 0.75, 1.25);
      return { rawLabel:labels[cat], normalizedCategory:cat, amountNative: +(revenue * p).toFixed(3), disclosureLevel:'detailed', inventado:true };
    });
    var revTotal = revenueLines.reduce(function(s, l){ return s + l.amountNative; }, 0);

    var gastos = [
      ['wages_squad', 'Salarios del plantel (inventado)', entre(id + year + 'w', 0.40, 0.62)],
      ['other_expenses', 'Gastos generales (inventado)', entre(id + year + 'o', 0.20, 0.34)],
      ['player_amortisation', 'Amortización de pases (inventado)', entre(id + year + 'a', 0.06, 0.16)],
      ['depreciation', 'Depreciación de bienes de uso (inventado)', entre(id + year + 'd', 0.02, 0.07)]
    ];
    var expenseLines = gastos.map(function(g){
      return { rawLabel:g[1], normalizedCategory:g[0], amountNative: -(+(revTotal * g[2]).toFixed(3)), disclosureLevel:'detailed', inventado:true };
    });

    var meta = {
      // Moneda USD con fx 1: el dato es inventado igual, y así por lo menos no se
      // le suma una conversión inventada arriba.
      currency:'USD', fx:1, fxSource:'unknown',
      sourceId:'INVENTADO-' + id + '-' + year,
      reportType:'official_balance_sheet',
      grossDebt: +(revTotal * entre(id + year + 'gd', 0.25, 1.35)).toFixed(3),
      cash: +(revTotal * entre(id + year + 'c', 0.02, 0.35)).toFixed(3),
      profitOnPlayerSales: +(revTotal * entre(id + year + 'pp', 0, 0.12)).toFixed(3),
      assetSales: 0,
      netInterest: -(+(revTotal * entre(id + year + 'ni', 0.01, 0.09)).toFixed(3)),
      tax: 0,
      // LA MARCA. Todo lo que dibuje este ejercicio puede preguntar por esto.
      inventado: true
    };
    return { revenueLines:revenueLines, expenseLines:expenseLines, meta:meta };
  }

  // ---------------------------------------------------------------------------
  // INYECCIÓN
  // ---------------------------------------------------------------------------

  // Los ejercicios inventados de un club entran a `CLUB_GENERIC_DATA` DESPUÉS de que
  // su archivo real se haya bajado, porque ese archivo pisa la entrada entera.
  function aplicar(clubId){
    var gd = (window.CLUB_GENERIC_DATA || {})[clubId];
    if(!gd || !inventados[clubId]) return;
    Object.keys(inventados[clubId]).forEach(function(y){
      var year = Number(y);
      if(gd.fiscalYearMeta[year] && !gd.fiscalYearMeta[year].inventado) return;  // real: no se toca
      var n = numerosDe(clubId, year);
      gd.fiscalYearMeta[year] = n.meta;
      gd.revenueLinesByYear[year] = n.revenueLines;
      gd.expenseLinesByYear[year] = n.expenseLines;
      // `finanzasYears` es una lista BLANCA opcional: los clubes que la declaran
      // (Boca) muestran en el dropdown de Finanzas solo esos ejercicios, así que sin
      // esto los inventados aparecían en el selector y después no estaban adentro.
      if(Array.isArray(gd.finanzasYears) && gd.finanzasYears.indexOf(year) < 0) gd.finanzasYears.push(year);
    });
    if(Array.isArray(gd.finanzasYears)) gd.finanzasYears.sort(function(a, b){ return b - a; });
  }

  function init(){
    if(!window.CLUB_INDEX || !window.LEAGUES) return;
    clubesAR_BR = Object.keys(window.CLUB_INDEX).filter(function(id){
      return PAISES.indexOf(window.CLUB_INDEX[id].c) >= 0;
    });
    armarMembresia();

    // 1. El índice liviano: se le agregan los ejercicios inventados que falten.
    clubesAR_BR.forEach(function(id){
      var reales = aniosRealesDe(id);
      inventados[id] = {};
      var todos = reales.slice();
      for(var y = DESDE; y <= HASTA; y++){
        if(reales.indexOf(y) >= 0) continue;
        inventados[id][y] = true;
        todos.push(y);
      }
      var yrs = (window.CLUB_INDEX[id].yrs || []).slice();
      Object.keys(inventados[id]).forEach(function(y){ yrs.push([Number(y), 'official_balance_sheet']); });
      yrs.sort(function(a, b){ return b[0] - a[0]; });
      window.CLUB_INDEX[id].yrs = yrs;
      window.CLUB_INDEX[id].y = yrs.length;
      window.CLUB_INDEX[id].last = yrs.length ? yrs[0][0] : null;
    });

    // 2. La membresía de liga. `CLUB_LEAGUE_BY_YEAR` es un `const` de su archivo, así
    //    que no se puede mutar desde afuera: lo que se reemplaza son los 5 helpers
    //    globales que lo consultan, que es por donde pasa TODO el sitio.
    var tablaVieja = {};
    Object.keys(window.CLUB_INDEX).forEach(function(id){
      tablaVieja[id] = {};
      var lg = window.leaguesOfClub(id) || [];
      lg.forEach(function(x){ x.years.forEach(function(y){ tablaVieja[id][y] = x.league; }); });
    });
    var tabla = tablaVieja;
    Object.keys(membresia).forEach(function(id){
      tabla[id] = tabla[id] || {};
      Object.keys(membresia[id]).forEach(function(y){ tabla[id][y] = membresia[id][y]; });
    });

    window.leagueAt = function(clubId, year){ return (tabla[clubId] || {})[year] || null; };
    window.clubsOfLeagueYear = function(leagueId, year){
      return Object.keys(tabla).filter(function(id){ return tabla[id][year] === leagueId; }).sort();
    };
    window.yearsOfClubInLeague = function(clubId, leagueId){
      var rows = tabla[clubId] || {};
      return Object.keys(rows).filter(function(y){ return rows[y] === leagueId; }).map(Number).sort(function(a, b){ return b - a; });
    };
    window.leaguesOfClub = function(clubId){
      var rows = tabla[clubId] || {};
      var ids = Object.keys(rows).map(function(y){ return rows[y]; }).filter(Boolean);
      ids = ids.filter(function(x, i){ return ids.indexOf(x) === i; });
      ids.sort(function(a, b){
        var ca = window.LEAGUES[a], cb = window.LEAGUES[b];
        if(ca && cb) return (ca.tier - cb.tier) || ca.name.localeCompare(cb.name, 'es', { sensitivity:'base' });
        return a.localeCompare(b);
      });
      return ids.map(function(id){ return { league:id, years: window.yearsOfClubInLeague(clubId, id) }; });
    };
    window.clubsOfLeague = function(leagueId){
      return Object.keys(tabla).filter(function(id){
        return window.clubs[id] && Object.keys(tabla[id]).some(function(y){ return tabla[id][y] === leagueId; });
      }).sort();
    };
    window.leagueYears = function(leagueId){
      var años = {};
      Object.keys(tabla).forEach(function(id){
        Object.keys(tabla[id]).forEach(function(y){ if(tabla[id][y] === leagueId) años[y] = 1; });
      });
      return Object.keys(años).map(Number).sort(function(a, b){ return b - a; });
    };

    // 3. Las fuentes. Que la pestaña Fuentes diga la verdad sobre estos ejercicios
    //    es parte de la contención: ahí es donde alguien va a chequear de dónde sale
    //    un número que le llamó la atención.
    if(typeof sources !== 'undefined'){
      clubesAR_BR.forEach(function(id){
        Object.keys(inventados[id]).forEach(function(y){
          sources['INVENTADO-' + id + '-' + y] = {
            id:'INVENTADO-' + id + '-' + y, clubId:id,
            title:'DATO INVENTADO — relleno de prueba del prototipo, no es un documento del club',
            type:'placeholder', reliability:'none',
            publicNote:'Este ejercicio no existe: sus cifras las generó ' +
              'prototipo-pasos-datos-inventados.js para poder probar la interfaz. No es información del club.'
          };
        });
      });
    }

    // 4. Cada club que se baje pasa por acá y recibe sus ejercicios inventados.
    var original = window.loadClubData;
    if(typeof original === 'function'){
      window.loadClubData = function(clubId){
        return Promise.resolve(original(clubId)).then(function(r){ aplicar(clubId); return r; });
      };
    }

    // Los clubes que ya se bajaron antes de encender esto (el club guardado de la
    // visita anterior) también reciben lo suyo.
    Object.keys(window.CLUB_GENERIC_DATA || {}).forEach(aplicar);

    console.warn('[FOS_DUMMY] Datos INVENTADOS activos: ' + clubesAR_BR.length +
      ' clubes de Argentina y Brasil, ejercicios ' + DESDE + '-' + HASTA + '. Ningún número de esta página es real.');
  }

  return {
    init: init,
    aplicar: aplicar,
    esDummy: esDummy,
    clubes: function(){ return clubesAR_BR.slice(); },
    desde: DESDE, hasta: HASTA
  };
})();
