// ============================================================================
// js/finanzas-calc.js — capa de CÁLCULO de Finanzas: a partir de los datos crudos de cada club calcula revenue/ebitda/PAT,
// reclasifica a "Formato simplificado" y convierte de moneda. Ninguna función de este archivo toca el DOM ni arma HTML (eso vive en
// js/finanzas-render.js).
//
// Orden de carga: después de clubs.js/category-map.js/currency-map.js (lee esas constantes por nombre), antes de
// js/finanzas-render.js y de js/principal.js.
// ============================================================================


  // yearMetaFor(clubId, year): moneda y tipo de cambio de un ejercicio, desde fiscalYearMeta[year]. El fx se resuelve con fxMetaFor()
  // (data/currency-map.js) porque un ejercicio puede traer `fxRef:'BRL@2024-12-31'` en vez de `fx:`; si no hay fx se usa FX_RATE para
  // que el toggle funcione igual. fxSource/fxLabel son lo que la ficha de fuente muestra al visitante.
  function yearMetaFor(clubId, year){
    const table = ((window.CLUB_GENERIC_DATA || {})[clubId] || {}).fiscalYearMeta;
    const m = (table && table[year]) || {};
    const f = fxMetaFor(m);
    return {
      currency: m.currency || 'USD',
      fx: (f.fx != null ? f.fx : FX_RATE),
      fxSource: f.source, fxLabel: f.label, fxRef: f.ref,
      // meses del ejercicio si no son 12 (un tramo corto de transición cargado como año, Admin/CONVENCIONES-DATOS.md); sin el campo, null = 12.
      // Uno de menos de 12 no entra al ranking por año (tools/generate-rankings.js) ni a las variaciones interanuales.
      periodMonths: m.periodMonths || null,
      // las líneas que el documento junta en una sola (la pantalla marca «s/d» y explica el caso: js/finanzas-render.js, marcaSD)
      sinDesglose: m.sinDesglose || null,
    };
  }
  // Un tramo corto de transición: un ejercicio de menos de 12 meses cargado como año. Sus flujos (ingresos, gastos, resultado) no se comparan
  // con un año de 12 meses: sin Δ en Finanzas multi-año (js/finanzas-multi.js); la deuda y la caja, que son saldos, sí.
  function esTramoCorto(clubId, year){
    const pm = yearMetaFor(clubId, year).periodMonths;
    return !!(pm && pm < 12);
  }


  // OVERLAY DE PRESUPUESTO: un ejercicio con presupuesto Y balance. El balance sigue siendo el dato primario (KPIs, Formato
  // simplificado, verifyTieOuts); el overlay solo pinta la columna "Presupuesto" de "Estado de resultados" y no entra en ningún
  // cálculo. Sale de `presupuestoOverlayByYear` en el data file del club. Criterio: skill club-or-year-onboarding, sección 11.
  function presupuestoOverlayFor(clubId, year){
    const club = (window.CLUB_GENERIC_DATA || {})[clubId];
    const table = club && club.presupuestoOverlayByYear;
    return (table && table[year]) || null;
  }

  // Mismo shape {ingresos, gastos} que nativeReportFor(), para que buildNativeSectionHtml() pinte el overlay con el mismo código.
  // Con Formato simplificado se agrupa con el MISMO bucketize() que la columna primaria: si no, los labels de las dos columnas no
  // coinciden y la columna "Presupuesto" sale con "—" en todas las filas salvo el total.
  function presupuestoOverlayReportFor(clubId, year){
    const overlay = presupuestoOverlayFor(clubId, year);
    if(!overlay) return null;
    if(simplifyFormat){
      return {
        ingresos: bucketize(overlay.revenueLines, GENERIC_SIMPLIFIED_REVENUE_BUCKETS, 'Otros ingresos', null, sportOfClub(clubId)),
        gastos: bucketize(overlay.expenseLines, GENERIC_SIMPLIFIED_EXPENSE_BUCKETS, 'Otros gastos', null, sportOfClub(clubId)),
      };
    }
    return {
      ingresos: overlay.revenueLines.map(l => ({label:l.rawLabel, value:l.amountNative, items:l.items || null})),
      gastos: overlay.expenseLines.map(l => ({label:l.rawLabel, value:l.amountNative, items:l.items || null})),
    };
  }

  // {currency, fx} del overlay, mismo shape que yearMetaFor(). Su fx puede ser distinto del balance del mismo ejercicio (suele ser la
  // premisa del presupuesto).
  function presupuestoOverlayMetaFor(clubId, year){
    const overlay = presupuestoOverlayFor(clubId, year);
    if(!overlay) return null;
    const f = fxMetaFor(overlay);
    return {
      currency: overlay.currency,
      fx: (f.fx != null ? f.fx : FX_RATE),
      fxSource: f.source, fxLabel: f.label, fxRef: f.ref,
    };
  }


  // Convierte un valor en la moneda nativa de `meta` (en millones) a la moneda a mostrar. INVARIANTE: targetCurrency es la nativa o
  // 'USD' (el puente); para ir a una tercera moneda se hacen 2 llamadas, nunca un branch nuevo acá. La escala ("miles de millones"
  // para ARS, CLP, COP...) sale de CURRENCY_META[code].scale. Modelo completo: cabecera de data/currency-map.js.
  function toDisplayValue(value, meta, targetCurrency){
    const curScale = currencyMetaFor(meta.currency).scale;
    if(meta.currency === targetCurrency) return value / curScale;
    if(targetCurrency === 'USD') return meta.currency === 'USD' ? value : value / meta.fx;
    if(meta.currency === 'USD') return (value * meta.fx) / currencyMetaFor(targetCurrency).scale;
    // Única excepción al puente por USD: una moneda legado del euro (CURRENCY_META[code].euroFijo, ej. ITL) se pasa a EUR por su
    // paridad fija legal, que es exacta.
    const fijo = currencyMetaFor(meta.currency).euroFijo;
    if(targetCurrency === 'EUR' && fijo) return (value / fijo) / currencyMetaFor('EUR').scale;
    // Fuera del invariante: devolver el valor crudo es más seguro que inventar una conversión.
    return value;
  }


  // ---------- HELPERS ----------
  // Un ejercicio que no es de año calendario se identifica por el año en que TERMINA: year=2027 es el ejercicio 2026/2027.
  // isCalendarYearClub(clubId): el club declara `fiscalYearStart:'01-01'` en data/clubs.js (ejercicio = año calendario).
  function isCalendarYearClub(clubId){
    return !!(clubs[clubId] && clubs[clubId].fiscalYearStart === '01-01');
  }

  // cierreEjercicio(clubId, y): la fecha de cierre (AAAA-MM-DD) de UN ejercicio, no la del club, porque hay clubes que cambiaron la
  // fecha de cierre (Parma: 30/6 hasta 2019, 31/12 desde 2021). Gana el primero que exista:
  //   1. `cierre` en su fiscalYearMeta (a mano);
  //   2. la fecha de su `fxRef` ("EUR@2018-06-30"), que el pipeline escribe con el cierre real;
  //      (1 y 2 solo con el data file cargado; si no, viene en CLUB_INDEX[id].ci, que tools/generate-club-index.js arma con este
  //      mismo criterio y solo para los ejercicios que no siguen la regla del club)
  //   3. la regla del club (`fiscalYearStart` de data/clubs.js).
  function cierreEjercicio(clubId, y){
    const m = (((window.CLUB_GENERIC_DATA || {})[clubId] || {}).fiscalYearMeta || {})[y];
    if(m && m.cierre) return m.cierre;
    const ref = m && m.fxRef && String(m.fxRef).split('@')[1];
    if(ref && /^\d{4}-\d{2}-\d{2}$/.test(ref)) return ref;
    const ci = (((window.CLUB_INDEX || {})[clubId] || {}).ci || {})[y];
    if(ci) return y + '-' + ci;
    const ini = (clubs[clubId] || {}).fiscalYearStart || '07-01';
    if(ini === '01-01') return y + '-12-31';
    const d = new Date(Date.UTC(y, Number(ini.slice(0, 2)) - 1, Number(ini.slice(3, 5))));
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().slice(0, 10);
  }
  // Un ejercicio que cierra en diciembre es de año calendario: se muestra el año suelto ("2021"), no la temporada ("20/21").
  function esEjercicioCalendario(clubId, y){
    return cierreEjercicio(clubId, y).slice(5, 7) === '12';
  }
  window.cierreEjercicio = cierreEjercicio;
  window.esEjercicioCalendario = esEjercicioCalendario;

  // La marca COVID: un ejercicio (balance o presupuesto) cuyo cierre cae entre el 31/03/2020 y el 31/12/2021. Se deriva de la fecha de
  // cierre, sin campo en los datos. Regla y diseño: Admin/PANTALLA.md, "Marca COVID".
  function esCovid(clubId, y){
    const c = cierreEjercicio(clubId, y);
    return c >= '2020-03-31' && c <= '2021-12-31';
  }
  // `tam`: 's' (card de ejercicio), 'm' (cabecera de tabla) o 'l' (número grande). `conFoco`: false dentro de un botón, donde un segundo
  // elemento enfocable sobraría. Devuelve el HTML de una etiqueta de estado; el globo sale de data-info-tip (js/info-tip.js).
  function marcaCovidHtml(tam, conFoco){
    const aria = t('covid.aria', 'Ejercicio dentro de la pandemia de COVID-19: partidos suspendidos o a puertas cerradas');
    const tip = t('covid.tip', 'Pandemia de COVID-19: entre marzo de 2020 y junio de 2021 hubo partidos suspendidos o a puertas cerradas, según el país. Los importes son los del balance, sin ajuste.');
    return '<span class="covid ' + tam + '" role="img"' + (conFoco ? ' tabindex="0"' : '') + ' aria-label="' + aria.replace(/"/g, '&quot;') + '" data-info-tip="' + tip.replace(/"/g, '&quot;') + '">COVID</span>';
  }
  // Un conjunto de pares [club, año] (una temporada de liga, un lado de Comparar) lleva la marca solo si TODOS caen en la ventana: hoy ninguna
  // temporada de liga mezcla clubes de adentro y de afuera.
  function esCovidPares(pares){
    return pares.length > 0 && pares.every(p => p[1] != null && esCovid(p[0], p[1]));
  }
  // Una fila de chips de ejercicio que en el celular se scrollea de costado (Finanzas y Comparar): arranca en lo más nuevo, salvo que así no
  // se vea ningún elegido (un link a 2019 y 2020); ahí arranca con el más viejo de los elegidos contra el borde izquierdo.
  function mostrarElegidosEnFila(fila){
    const fin = fila.scrollWidth - fila.clientWidth;
    const on = fila.querySelectorAll('.fin-year.on');
    if(!on.length || !fila.clientWidth){ fila.scrollLeft = fila.scrollWidth; return; }
    const x = b => b.getBoundingClientRect().left - fila.getBoundingClientRect().left + fila.scrollLeft;
    fila.scrollLeft = x(on[on.length - 1]) >= fin - 1 ? fin : Math.max(0, Math.min(fin, x(on[0]) - 8));
  }
  window.mostrarElegidosEnFila = mostrarElegidosEnFila;
  window.esCovid = esCovid;
  window.esCovidPares = esCovidPares;
  window.marcaCovidHtml = marcaCovidHtml;
  // Con el teclado la marca se abre con Enter o espacio y se cierra con Escape.
  if(typeof document !== 'undefined' && document.addEventListener){ // este archivo también lo corre tools/ sin navegador
    document.addEventListener('keydown', function(ev){
      const m = ev.target && ev.target.closest ? ev.target.closest('.covid[tabindex]') : null;
      if(!m) return;
      if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); m.click(); }
      else if(ev.key === 'Escape' && window.INFO_TIP) window.INFO_TIP.cerrar();
    });
  }

  // "Presupuesto 2026/2027", "Balance 2024/2025" o "Ejercicio ..." (sin documento oficial). Con `clubId` y un ejercicio que cierra en
  // diciembre, solo el año ("Balance 2024"): el rango sería una fecha falsa. Regla del prefijo: Admin/PANTALLA.md, "Header de Estado
  // de resultados".
  function ejercicioLabel(year, reportType, clubId){
    const prefix = reportType === 'official_budget' ? t('ejercicio.budget', 'Presupuesto')
      : (reportType === 'official_budget_and_balance' || reportType === 'official_balance_sheet') ? t('ejercicio.balance', 'Balance')
      : t('ejercicio.default', 'Ejercicio');
    if(clubId && esEjercicioCalendario(clubId, year)) return prefix+' '+year; // por ejercicio, no por club
    return prefix+' '+(year-1)+'/'+year;
  }

  // Formatea un valor que YA está en la moneda que se va a mostrar (ver toDisplayValue). No convierte nada.
  function fmtDisplay(v){
    const abs = Math.abs(v).toFixed(1);
    return v < 0 ? `<span class="neg-num">(${abs})</span>` : abs;
  }

  function fmtPctDisplay(growth, prevDisp){
    if(!prevDisp) return '—';
    const pct = (growth / Math.abs(prevDisp)) * 100;
    return pct < 0 ? `<span class="neg-num">(${Math.abs(pct).toFixed(0)}%)</span>` : pct.toFixed(0)+'%';
  }

  // % de una fila sobre el total de SU sección (common-size statement). En Gastos fila y total son negativos y el signo se cancela.
  function fmtPctOfTotal(val, total){
    if(!total) return '—';
    const pct = (val / total) * 100;
    const rounded = Math.round(pct);
    return rounded < 0 ? `<span class="neg-num">(${Math.abs(rounded)}%)</span>` : rounded+'%';
  }

  // fmtAmount/fmtAmountPlain esperan un valor YA convertido (toDisplayValue(valor, yearMetaFor(clubId, year), currency)); solo agregan
  // signo y unidad. La unidad sale de currencyMetaFor(currency).unitSuffix, que nunca devuelve undefined: una moneda sin entrada en
  // CURRENCY_META se muestra "M <código>".
  function fmtAmount(value, currency){
    const unit = `${currencyMetaFor(currency).unitSuffix} ${currency}`;
    const sign = value > 0 ? '+' : (value < 0 ? '-' : '');
    return `${sign}${Math.abs(value).toFixed(1)} ${unit}`;
  }

  function fmtAmountPlain(value, currency){
    const unit = `${currencyMetaFor(currency).unitSuffix} ${currency}`;
    return `${value < 0 ? '-' : ''}${Math.abs(value).toFixed(1)} ${unit}`;
  }



  // "Formato simplificado": agrupa las líneas de cada club por normalizedCategory en filas comunes a todos los clubes. Labels y ORDEN
  // tienen que ser iguales entre clubes (Admin/PANTALLA.md y skill club-data-mapping, referencia/formato-simplificado.md). El
  // catch-all absorbe cualquier categoría sin fila, para no perder un renglón. El bolsón "sin desglosar por la fuente" va al final
  // con `hideIfZero`: no es una categoría real, así que si está en cero no se pinta (una fila real en $0 sí se muestra).
  // INTERRUPTOR DE ABONOS: en `true`, "Estadio" junta recaudación, abonos y uso del estadio; en `false` vuelve la fila "Abonos"
  // propia. Revertir no toca datos, pero hay que regenerar los rankings: Admin/PANTALLA.md, "Revertir la fusión de abonos".
  const ABONOS_DENTRO_DE_ESTADIO = true;

  // Las filas se definen por CATEGORÍA GENÉRICA (`gens`, data/category-map.js), así sirven para cualquier deporte. `cats` son las
  // subcategorías de fútbol de cada fila, DERIVADAS del mapa (no se escriben a mano): las leen las tools que marcan filas por subcategoría
  // (audit.js, tools/dentro-de-otro.mjs). El rótulo del bolsón sin desglosar depende del deporte (LUMP_LABEL_BY_SPORT).
  const GENERIC_SIMPLIFIED_REVENUE_BUCKETS = [
    {label:'Cuotas Sociales', gens:['membership']},
    {label:'Comercial / Sponsors', gens:['commercial']},
    {label:'Estadio', gens: ABONOS_DENTRO_DE_ESTADIO ? ['matchday','season_tickets','venue'] : ['matchday','venue']},
    {label:'Televisión', gens:['media_rights']},
    {label:'Premios por competencias', gens:['prize_money']},
    ...(ABONOS_DENTRO_DE_ESTADIO ? [] : [{label:'Abonos', gens:['season_tickets']}]),
    {label:'Venta de Jugadores', gens:['player_transfers']},
    {label:'Otras actividades (educación y otros deportes)', gens:['non_sporting_activities','other_sporting_sections']},
    {label:'Subsidios y donaciones', gens:['grants_donations']},
    {label:'Fútbol profesional (sin desglosar por la fuente)', gens:['undisclosed'], hideIfZero:true},
  ];

  // Las filas de gastos son siempre las mismas entre clubes aunque alguna dé cero, para que el catch-all "Otros gastos" no absorba
  // plata que tiene una categoría identificable.
  const GENERIC_SIMPLIFIED_EXPENSE_BUCKETS = [
    {label:'Compra de jugadores', gens:['player_registrations_amortisation','player_registrations_impairment']},
    {label:'Salarios y primas (plantel y cuerpo técnico)', gens:['first_team_staff']},
    {label:'Inversiones (amortizaciones y depreciación)', gens:['depreciation','other_amortisation']},
    {label:'Organización de partidos', gens:['match_operations']},
    {label:'Otras actividades (educación, juvenil, otros deportes, básquet)', gens:['non_sporting_activities','other_sporting_sections']},
    {label:'Administración y gastos generales', gens:['admin_general']},
    {label:'Fútbol profesional (sin desglosar por la fuente)', gens:['undisclosed'], hideIfZero:true},
  ];
  // El bolsón sin desglosar se llama según el deporte del club; el de fútbol es el rótulo de la lista de arriba.
  const LUMP_LABEL_BY_SPORT = { futbol: 'Fútbol profesional (sin desglosar por la fuente)', rugby: 'Rugby profesional (sin desglosar por la fuente)' };
  window.LUMP_LABEL_BY_SPORT = LUMP_LABEL_BY_SPORT;
  const sportOfClub = (clubId) => (typeof clubs !== 'undefined' && clubs[clubId] && clubs[clubId].sport) || 'futbol';
  const sideOfBuckets = (buckets) => buckets === GENERIC_SIMPLIFIED_EXPENSE_BUCKETS ? 'expense' : 'revenue';
  // las subcategorías de un deporte que caen en una fila (para `incluidoEn`, que se escribe en subcategorías)
  const subsOfBucket = (b, sport, side) => {
    const t = SPORT_TAXONOMIES[sport] || { revenue: {}, expense: {} };
    return [...Object.keys(t.revenue), ...Object.keys(t.expense)].filter((sub, i, a) => a.indexOf(sub) === i && b.gens.includes(genericCategoryOf(sport, side, sub)));
  };
  for (const [bs, side] of [[GENERIC_SIMPLIFIED_REVENUE_BUCKETS, 'revenue'], [GENERIC_SIMPLIFIED_EXPENSE_BUCKETS, 'expense']]) for (const b of bs) b.cats = subsOfBucket(b, 'futbol', side);

  // Para tools/dentro-de-otro.mjs, que corre este motor en Node: marca las mismas filas que ve el visitante sin copiar estas listas.
  window.SIMPLIFIED_BUCKETS = { ingresos: GENERIC_SIMPLIFIED_REVENUE_BUCKETS, gastos: GENERIC_SIMPLIFIED_EXPENSE_BUCKETS };

  // Agrupa líneas en filas por su categoría genérica (genericCategoryOf, del deporte del club). Cada fila lleva `items` con las líneas
  // reales que la suman (el acordeón de control). Las mismas reglas de Admin/CONVENCIONES-DATOS.md:
  //   - con un bolsón "sin desglosar por la fuente" CON PLATA ADENTRO, otra fila en cero es un "no sabemos": se marca `unknown` y se
  //     pinta "—" (el catch-all queda afuera de la marca);
  //   - `incluidoEn` (en fiscalYearMeta, por subcategoría) marca una fila en cero cuyo concepto está dentro de otra fila del documento.
  // Ninguna de las dos marcas mueve un número: la fila sigue valiendo 0 y el total de la sección no cambia.
  function bucketize(lines, buckets, catchAllLabel, incluidoEn, sport){
    const dep = sport || 'futbol'; const side = sideOfBuckets(buckets);
    const genDe = (l) => genericCategoryOf(dep, side, l.normalizedCategory);
    const bucketed = new Set(buckets.flatMap(b => b.gens));
    const labelDe = (b) => b.gens.includes('undisclosed') ? (LUMP_LABEL_BY_SPORT[dep] || b.label) : b.label;
    const filaDe = (sub) => { const g = genericCategoryOf(dep, side, sub); const b = buckets.find(x => x.gens.includes(g)); return b ? labelDe(b) : catchAllLabel; };
    const hayBolson = lines.some(l => genDe(l) === 'undisclosed' && l.amountNative !== 0);
    const rows = buckets
      .map(b => {
        const matches = lines.filter(l => b.gens.includes(genDe(l)));
        const value = matches.reduce((s,l) => s + l.amountNative, 0);
        const items = matches.length ? matches.map(l => [l.rawLabel, l.amountNative, l.items || null]) : null;
        const esBolson = b.gens.includes('undisclosed');
        const dentro = value === 0 && incluidoEn ? subsOfBucket(b, dep, side).map(c => incluidoEn[c]).find(Boolean) : null;
        return { label:labelDe(b), value, items, hideIfZero:b.hideIfZero,
                 unknown: !dentro && hayBolson && value === 0 && !esBolson,
                 // `incluidoEn` puede ser 'categoria' o { en:'categoria', posible:true } (no confirmado que esté ahí)
                 ...(dentro ? { incluidoEn: filaDe(typeof dentro === 'string' ? dentro : dentro.en), ...(dentro.posible ? { incluidoPosible: true } : {}) } : {}) };
      })
      .filter(row => !(row.hideIfZero && row.value === 0));
    const restLines = lines.filter(l => !bucketed.has(genDe(l)));
    const rest = restLines.reduce((s,l) => s + l.amountNative, 0);
    const restItems = restLines.length ? restLines.map(l => [l.rawLabel, l.amountNative, l.items || null]) : null;
    rows.push({ label:catchAllLabel, value:rest, items:restItems });
    return rows;
  }

  function simplifiedReportForGeneric(clubId, year){
    const cur = computeYearGeneric(clubId, year);
    // "Intereses netos" va siempre, aunque sea 0, para que la fila exista igual en todos los clubes; las otras filas de abajo solo
    // si tienen valor (Admin/PANTALLA.md, "Reglas de Estado de resultados").
    const extraRows = cur.meta.extraRows ? cur.meta.extraRows.slice() : [
      ...(cur.profitOnPlayerSales ? [{label:'Ganancia por venta de jugadores', value:cur.profitOnPlayerSales}] : []),
      ...(cur.assetSales ? [{label:'Venta de activos', value:cur.assetSales}] : []),
      {label:'Intereses netos', value:cur.netInterest||0},
      ...(cur.tax ? [{label:'Impuestos', value:cur.tax}] : []),
    ];
    return {
      resultLabel:'Resultado neto',
      ingresos: bucketize(cur.revenueLines, GENERIC_SIMPLIFIED_REVENUE_BUCKETS, 'Otros ingresos', cur.meta.incluidoEn, sportOfClub(clubId)),
      gastos: bucketize(cur.expenseLines, GENERIC_SIMPLIFIED_EXPENSE_BUCKETS, 'Otros gastos', cur.meta.incluidoEn, sportOfClub(clubId)),
      extraRows,
    };
  }


  // Reporte "tal cual la fuente" {ingresos, gastos, extraRows, resultLabel}. OJO: "gastos" ya lista TODAS las expenseLines, así que
  // NO hay que sumar cur.exceptionalItems ni cur.nonCash (son sub-sumas de esas mismas líneas: se contarían dos veces).
  // profitOnPlayerSales, assetSales, netInterest y tax vienen de fiscalYearMeta, no de expenseLines.
  function nativeReportFor(clubId, year){
    if(simplifyFormat) return simplifiedReportForGeneric(clubId, year);
    const cur = computeYearGeneric(clubId, year);
    // Las filas debajo de Gastos se arman solas con esos 4 campos. Un ejercicio que necesita filas propias (dos líneas del documento
    // donde el motor tiene una) define meta.extraRows:[{label,value}]: cambia cómo se muestra, no el PAT.
    const extraRows = cur.meta.extraRows ? cur.meta.extraRows.slice() : [
      ...(cur.profitOnPlayerSales ? [{label:'Ganancia por venta de jugadores', value:cur.profitOnPlayerSales}] : []),
      ...(cur.assetSales ? [{label:'Venta de activos', value:cur.assetSales}] : []),
      {label:'Intereses netos', value:cur.netInterest||0},
      ...(cur.tax ? [{label:'Impuestos', value:cur.tax}] : []),
    ];
    return {
      resultLabel:'Resultado neto',
      ingresos: cur.revenueLines.map(l => ({label:l.rawLabel, value:l.amountNative, items:l.items || null})),
      gastos: cur.expenseLines.map(l => ({label:l.rawLabel, value:l.amountNative, items:l.items || null})),
      extraRows,
    };
  }


  // Valor de una categoría en la moneda a mostrar. meta === null: ya está en esa moneda, no se convierte.
  function nativeDisplayVal(value, meta, targetCurrency){
    return meta ? toDisplayValue(value, meta, targetCurrency) : value;
  }


  // TOLERANCIA DEL TIE-OUT: la suma de n renglones redondeados a la unidad impresa puede diferir del total impreso hasta n x media
  // unidad sin que nadie se haya equivocado. Bayern publica en millones con un decimal: 6 renglones de ingresos dan hasta ±0,3 (2024:
  // calculado 908,2 contra 908,1 impreso). La unidad sale de las propias cifras (la que tiene más decimales manda); con 3 o más
  // decimales la tolerancia queda en 0,01, la de siempre. La usan verifyTieOuts() (js/principal.js) y tools/audit.js.
  function toleranciaTieOut(montos, oficial){
    const decimales = (x) => { const s = String(Math.abs(x)); const i = s.indexOf('.'); return i < 0 ? 0 : s.length - i - 1; };
    const cifras = montos.concat([oficial]).filter((v) => typeof v === 'number' && v !== 0);
    if(!cifras.length) return 0.01;
    const unidad = Math.pow(10, -Math.max.apply(null, cifras.map(decimales)));
    return Math.max(0.01, montos.length * unidad / 2 + 1e-9);
  }
  // Los montos que suma cada chequeo, para toleranciaTieOut(): los renglones de su lado y, en el resultado, también las filas del meta.
  function montosTieOut(c, que){
    const ing = (c.revenueLines || []).map((l) => l.amountNative), gas = (c.expenseLines || []).map((l) => l.amountNative);
    if(que === 'revenue') return ing;
    if(que === 'expenses') return gas;
    const m = c.meta || {};
    return ing.concat(gas, [m.netInterest, m.tax, m.profitOnPlayerSales, m.assetSales].filter((v) => typeof v === 'number' && v !== 0));
  }

  // Aviso de deuda o caja sin dato: Admin/PANTALLA.md, "Deuda y caja sin dato".
  // `t()` local: mismo one-liner que js/finanzas-render.js y js/selector.js.
  function t(key, es){ return (window.I18N && window.I18N.t) ? window.I18N.t(key, es) : es; }
  function fillNote(s, a, b){ return s.replace('{a}', a).replace('{b}', b); }

  function debtDisclosureNote(curUndisclosed, curLabel, prevUndisclosed, prevLabel){
    const both = t('finanzas.debt.note.both', '⚠️ Ni el documento de {a} ni el de {b} informan deuda y caja: donde ves "—" el dato no está disponible, no es cero, y sin los dos no hay deuda neta.');
    const one  = t('finanzas.debt.note.one',  '⚠️ El documento de {a} no informa deuda y caja: donde ves "—" el dato no está disponible, no es cero, y sin los dos no hay deuda neta.');
    if(curUndisclosed && prevUndisclosed) return fillNote(both, curLabel, prevLabel);
    if(curUndisclosed) return fillNote(one, curLabel, '');
    if(prevUndisclosed) return fillNote(one, prevLabel, '');
    return '';
  }




  function computeYearGeneric(clubId, year){
    // Sin club elegido (arranque del selector) no hay nada que computar.
    const gd = (window.CLUB_GENERIC_DATA || {})[clubId];
    if(!gd) return null;
    const revenueLines = (gd.revenueLinesByYear[year]) || [];
    const expenseLines = (gd.expenseLinesByYear[year]) || [];
    const meta = (gd.fiscalYearMeta[year]) || {};
    const revenue = revenueLines.reduce((s,l) => s + l.amountNative, 0);
    // Los gastos se suman por la categoría GENÉRICA de cada línea y su bloque (data/category-map.js): operating (en efectivo),
    // non_cash y exceptional. Una subcategoría nueva entra sola en su bloque al darle su genérica; sin genérica no suma (audit.js lo avisa:
    // taxonomia-incompleta, categoria-inexistente).
    const sport = sportOfClub(clubId);
    const genDe = (l) => genericCategoryOf(sport, 'expense', l.normalizedCategory);
    const bloqueDe = (g) => (GENERIC_EXPENSE_CATEGORIES.find(x => x.id === g) || {}).block;
    const sumGen = (pred) => expenseLines.filter(l => pred(genDe(l))).reduce((s,l) => s + l.amountNative, 0);
    const wages = sumGen(g => g === 'first_team_staff');
    const otherExpenses = sumGen(g => g !== 'first_team_staff' && bloqueDe(g) === 'operating');
    const expenses = wages + otherExpenses;
    const ebitda = revenue + expenses;
    const exceptionalItems = sumGen(g => bloqueDe(g) === 'exceptional');
    const playerAmortisation = sumGen(g => g === 'player_registrations_amortisation');
    const playerImpairment = sumGen(g => g === 'player_registrations_impairment');
    const depreciation = sumGen(g => g === 'depreciation');
    const otherAmortisation = sumGen(g => g === 'other_amortisation');
    const nonCash = playerAmortisation + playerImpairment + depreciation + otherAmortisation;
    const operatingProfit = ebitda + exceptionalItems + nonCash;
    const profitOnPlayerSales = meta.profitOnPlayerSales || 0;
    const assetSales = meta.assetSales || 0;
    const ebit = operatingProfit + profitOnPlayerSales + assetSales;
    const netInterest = meta.netInterest || 0;
    const pbt = ebit + netInterest;
    const tax = meta.tax || 0;
    const pat = pbt + tax;
    const wagesToTurnover = revenue !== 0 ? (-wages / revenue) : 0;
    const grossDebt = meta.grossDebt || 0, cash = meta.cash || 0;
    const netDebt = grossDebt - cash;
    const yearLabel = ejercicioLabel(year, meta.reportType, clubId);
    return { clubId, year, yearLabel, meta, revenueLines, expenseLines, revenue, wages, otherExpenses, expenses, ebitda, exceptionalItems, playerAmortisation, playerImpairment, depreciation, otherAmortisation, nonCash, operatingProfit, profitOnPlayerSales, assetSales, ebit, netInterest, pbt, tax, pat, wagesToTurnover, grossDebt, cash, netDebt };
  }


  // Sufijo del <select> "Año": SOLO 4 palabras posibles, nunca una 5ta (Admin/PANTALLA.md, "El sufijo entre paréntesis del dropdown
  // Año"). pending_official se muestra como Placeholder a propósito.
  function anioDropdownSuffix(reportType){
    if(reportType === 'official_budget') return t('ejercicio.dropdown.budget', ' (Presupuesto)');
    if(reportType === 'official_budget_and_balance') return t('ejercicio.dropdown.budgetAndBalance', ' (Presupuesto y Balance)');
    if(reportType === 'placeholder' || reportType === 'pending_official') return t('ejercicio.dropdown.placeholder', ' (Placeholder)');
    return t('ejercicio.dropdown.balance', ' (Balance)');
  }


  // Parte un header de "Estado de resultados" en el primer espacio, con cada palabra en nowrap: ninguna palabra se parte nunca
  // (Admin/PANTALLA.md, "Header de Estado de resultados").
  function wrapHeaderLabel(text){
    const spaceIdx = text.indexOf(' ');
    if(spaceIdx === -1) return '<span style="white-space:nowrap">'+text+'</span>';
    const prefix = text.slice(0, spaceIdx), rest = text.slice(spaceIdx+1);
    return '<span style="white-space:nowrap">'+prefix+'</span><br>'+rest;
  }


  // reportType de un club/ejercicio sin pasar por computeYearGeneric (lo usa renderSupuestosCard()).
  function reportTypeForYear(clubId, year){
    const table = ((window.CLUB_GENERIC_DATA || {})[clubId] || {}).fiscalYearMeta || {};
    return ((table[year]) || {}).reportType || 'placeholder';
  }


  // Wrapper que se mantiene por si algún día hace falta volver a bifurcar por club.
  function computeYearForClub(clubId, year){
    return computeYearGeneric(clubId, year);
  }


  // {revenue, expenses, pat, netDebt} en USD: "Comparar Gestiones" siempre muestra USD, sin importar el toggle de Finanzas.
  function displayFinancialsForClub(clubId, computed){
    const meta = yearMetaFor(clubId, computed.year);
    return {
      revenue: toDisplayValue(computed.revenue, meta, 'USD'),
      expenses: Math.abs(toDisplayValue(computed.expenses, meta, 'USD')),
      pat: toDisplayValue(computed.pat, meta, 'USD'),
      netDebt: deudaNoDesglosada(computed) ? null : toDisplayValue(computed.netDebt, meta, 'USD'),
    };
  }


  // La gestión "actual" de un club = la que tiene el lastYear más alto; null si el club no tiene gestiones.
  function currentGestionKey(clubId){
    const gestiones = gestionesByClub[clubId] || {};
    return Object.keys(gestiones).reduce((best,k) => (!best || gestiones[k].lastYear > gestiones[best].lastYear) ? k : best, null);
  }


  // allYearsRangeForClub() y yearKindForClub() no tienen consumidor hoy y se conservan a propósito: son helpers del motor, y
  // yearKindForClub() es la única rama que distingue `placeholder` de `pending_official`.
  // Todos los años del club, del más viejo al más nuevo, sin saltear ninguno del medio aunque no tenga datos.
  function allYearsRangeForClub(clubId){
    const table = ((window.CLUB_GENERIC_DATA || {})[clubId] || {}).fiscalYearMeta;
    if(!table) return [];
    const years = Object.keys(table).map(Number);
    const min = Math.min(...years), max = Math.max(...years);
    const range = [];
    for(let y=min; y<=max; y++) range.push(y);
    return range;
  }

  // "blank" (placeholder o pending_official), "presupuesto" (solo presupuesto) o "balance" (hay balance, con o sin presupuesto: el
  // balance es siempre el dato primario).
  function yearKindForClub(clubId, year){
    const rt = reportTypeForYear(clubId, year);
    if(rt === 'placeholder' || rt === 'pending_official') return 'blank';
    if(rt === 'official_budget') return 'presupuesto';
    return 'balance';
  }

  // Formato simplificado de un club sin depender del toggle global `simplifyFormat`.
  function simplifiedReportForClub(clubId, year){
    return simplifiedReportForGeneric(clubId, year);
  }

  // El color de cada fila de ingresos de Formato simplificado (mismos labels que GENERIC_SIMPLIFIED_REVENUE_BUCKETS). El nombre es
  // viejo: su único consumidor es colorDeRubro() en js/selector.js (composición de ingresos de Comparar).
  const INICIO_INGRESOS_BUCKETS = [
    {label:'Cuotas Sociales', color:'#0a2b5c'},
    {label:'Comercial / Sponsors', color:'#f2b705'},
    {label:'Estadio', color:'#1b7a3d'},
    {label:'Televisión', color:'#8a5cf6'},
    {label:'Premios por competencias', color:'#2b8a99'},
    {label:'Abonos', color:'#e07b39'},
    {label:'Venta de Jugadores', color:'#b5372b'},
    {label:'Otras actividades (educación y otros deportes)', color:'#4a7c9e'},
    {label:'Subsidios y donaciones', color:'#7a9e4a'},
    {label:'Fútbol profesional (sin desglosar por la fuente)', color:'#c2185b'},
    {label:'Rugby profesional (sin desglosar por la fuente)', color:'#c2185b'},
    {label:'Otros ingresos', color:'#6b6b6b'},
    // 'Abonos' y las 2 de abajo no se usan mientras ABONOS_DENTRO_DE_ESTADIO sea true: se conservan para poder revertir la fusión.
    {label:'Estadio: recaudación de partidos', color:'#1b7a3d'},
    {label:'Otras secciones deportivas y otros ingresos', color:'#6b6b6b'},
  ];


