#!/usr/bin/env node
// ============================================================================
// tools/ajustes.mjs — AJUSTES MANUALES: la base de consulta de las decisiones de Guido que fuerzan un dato de un documento.
//
// POR QUÉ. Hasta la 365 una decisión manual vivía como respuesta a un caso de la cola,
// atada al TEXTO de la pregunta (tools/cola.mjs: el id del caso es un hash de pdf|etapa|motivo|detalle, y en las dudas de la IA el detalle es
// la pregunta). Si el documento se volvía a extraer y la IA redactaba distinto, el caso volvía. Y la decisión "Fortaleza CEIF 2023 se cierra
// por la fuerza" terminó escrita en el HANDOFF, que ningún script lee. Guido: "no puede ir en handoff eso. debería ir en el script".
// Un ajuste está atado a cosas ESTABLES: el documento (pdf) y el campo.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «ajustes.mjs».
//
// USO:
//   node tools/ajustes.mjs                                     lista todos (club, año, campo, valor, motivo)
//   node tools/ajustes.mjs --agregar "<pdf>" <campo> [--valor "..."] --motivo "..." [--evidencia "pág. N del visor, .md L..."] [--causa decision-de-guido|precedente-del-club|precedente-del-pais|regla-escrita|lectura-del-documento|otra]
//        fila además: --etiqueta "..." --lado ingreso|gasto|financiero|impuesto [--linea N] [--reemplaza "etiqueta extraída" | --reemplaza-linea N]
//        caja / deuda / escala además: [--anio AAAA] si el PDF alimenta dos años del sitio.
//        [--autor X]: quién lo decidió. Sin --autor firma quien corre el comando (autorPorDefecto, abajo).
//   import { ajusteDe, ajustesDe } from './ajustes.mjs'        lo que usan los scripts
// ============================================================================

import { readFileSync, appendFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { negarSiSeMide } from './candado-medicion.mjs';
import { validar } from './registro-esquema.js';

const ROOT = resolve(import.meta.dirname, '..');
const ARCHIVO = resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl');
export const CAMPOS = ['no-recargar', 'filas-a-mano', 'estado', 'resultado-final', 'sin-dudas', 'fila', 'fx', 'cero-real', 'desglose', 'anio', 'categoria', 'perimetro', 'cierre', 'reportType', 'confirmado', 'caja', 'deuda', 'deuda-incluye', 'incluye', 'name', 'moneda', 'escala', 'suma-con', 'ixbrl-omitir', 'covid-omitir'];
export const LADOS = ['ingreso', 'gasto', 'financiero', 'impuesto'];
export const DESTINOS_FILA = ['profit_on_player_sales']; // --destino de una fila del lado financiero (sin él, net_interest)

// UNA LECTURA POR PROCESO, igual que leer() de cola.mjs: 18 de los 36 s de `verificar.mjs --lista` sobre 237 documentos eran
// releer este archivo en cada ajusteDe. Se vuelve a leer solo si cambió (tamaño o fecha de modificación). Lo devuelto no se modifica.
let cacheLeer = null;
function leer() {
  if (!existsSync(ARCHIVO)) return [];
  const st = statSync(ARCHIVO); const firma = `${st.size}|${st.mtimeMs}`;
  if (cacheLeer && cacheLeer.firma === firma) return cacheLeer.datos;
  const datos = readFileSync(ARCHIVO, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
  cacheLeer = { firma, datos }; return datos;
}

// Todos los ajustes vigentes de un documento (el último por campo; en `fila`, por campo + etiqueta).
export function ajustesDe(pdf) {
  const m = new Map();
  for (const a of leer()) if (a.pdf === pdf) m.set(a.campo === 'fila' ? `fila|${a.etiqueta}` : a.campo === 'cero-real' ? `cero-real|${String(a.valor).toLowerCase()}` : a.campo === 'desglose' ? `desglose|${a.etiqueta}` : a.campo === 'categoria' ? `categoria|${a.etiqueta}` : a.campo === 'incluye' ? `incluye|${a.valor}` : a.campo === 'confirmado' ? `confirmado|${a.linea}|${a.valor}` : CAMPOS_POR_ANIO.includes(a.campo) ? `${a.campo}|${a.anio ?? ''}` : a.campo, a);
  return [...m.values()].filter((a) => !a.anulado); // un registro `anulado` gana sobre el anterior de la misma clave y lo saca
}
export function ajusteDe(pdf, campo) {
  return ajustesDe(pdf).find((a) => a.campo === campo) || null;
}
// AJUSTE POR PDF Y AÑO. Un mismo PDF puede alimentar dos años del sitio (el del documento y su
// comparativo): Dortmund 2024 y 2025 salen de geschaeftsbericht-2024-25, RB Leipzig 2024 y 2025 de jahresabschluss-2024-25. Con el ajuste
// buscado solo por PDF los dos años recibían el mismo valor (el de 2025). `caja`, `deuda` y `escala` pueden llevar `anio` (--anio AAAA).
// COMPUERTA (una sola): el ajuste con `anio` vale solo para ese año; el ajuste SIN `anio` vale solo si el PDF alimenta UN año del sitio
// (`unSoloAnio`), que es como funcionaba en todos los otros PDFs. Si alimenta dos o más y no hay ajuste de ese año, no decide: el año baja
// al escalón siguiente de su escalera, como un año sin ajuste.
export const CAMPOS_POR_ANIO = ['caja', 'deuda', 'escala'];
export function ajusteDelAnio(pdf, campo, anio, unSoloAnio) {
  const vivos = ajustesDe(pdf).filter((a) => a.campo === campo);
  return vivos.find((a) => a.anio != null && String(a.anio) === String(anio)) || (unSoloAnio ? vivos.find((a) => a.anio == null) || null : null);
}
// PERÍMETRO (pedido de Guido: "ruta de ajuste manual para que no joda"): `perimetro` = individual | consolidado.
// Se puede fijar para UN documento o para TODO EL CLUB (en vez del pdf, la carpeta `Clubes/<País>/<Club>/`); el del documento gana sobre el
// del club. Escalón 0 del perímetro en cargar.mjs: gana sobre lo que detecta el documento y sobre la cola. Caso: Novorizontino, una sola
// entidad; "Consolidado" aparece en el membrete del auditor (2018-2020) y el script preguntaba cada año.
// lo mismo para cualquier campo que se pueda fijar para todo el club (perimetro, deuda-incluye).
export function ajusteClubODoc(pdf, campo) {
  const todos = leer().filter((a) => a.campo === campo);
  const delDoc = todos.filter((a) => a.pdf === pdf); if (delDoc.length && !delDoc[delDoc.length - 1].anulado) return delDoc[delDoc.length - 1];
  const delClub = todos.filter((a) => a.pdf.endsWith('/') && pdf.startsWith(a.pdf)); return delClub.length && !delClub[delClub.length - 1].anulado ? delClub[delClub.length - 1] : null;
}
// CERO REAL DEL CLUB: el ajuste `cero-real` vigente de esa categoría en OTRO documento del mismo club
// (la carpeta), o null. cargar.mjs lo usa como escalón del aviso de categoría en 0, con su compuerta (ningún año cargado con monto).
export function ceroRealDelClub(pdf, categoria) {
  const carpeta = pdf.split('/').slice(0, 3).join('/') + '/'; const cat = String(categoria).toLowerCase();
  const otros = [...new Set(leer().filter((a) => a.campo === 'cero-real' && a.pdf !== pdf && a.pdf.startsWith(carpeta)).map((a) => a.pdf))];
  for (const p of otros) { const a = ajustesDe(p).find((x) => x.campo === 'cero-real' && String(x.valor).toLowerCase() === cat); if (a) return a; }
  return null;
}
// QUIÉN FIRMA. Escalón 0: --autor X (o `autor` cuando lo escribe un script, como perimetro-senales.mjs). Escalón 1: sin --autor,
// quien corre el comando: los comandos que corre Claude Code (la sesión y sus subagentes) llevan la variable CLAUDECODE=1 y firman "Claude";
// la terminal de Guido no la tiene y firma "Guido". Antes firmaba "Guido" siempre: ~800 ajustes que decidió
// Claude dicen "Guido" en el jsonl y en el comentario del año en data/ (Guido: el histórico queda como está).
export const autorPorDefecto = () => (process.env.CLAUDECODE === '1' ? 'Claude' : 'Guido');
// Toda línea nueva lleva `esquema: 1` y cumple 'ajustes-manuales' de tools/esquemas-registros.json; una que no lo cumple no se escribe. Las anteriores son legado.
function escribirLinea(l) {
  const linea = { esquema: 1, ...l };
  const fuera = validar('ajustes-manuales', linea);
  if (fuera.length) throw new Error(`el ajuste no cumple el esquema de tools/esquemas-registros.json (${fuera.join('; ')}); no se guardó`);
  appendFileSync(ARCHIVO, JSON.stringify(linea) + '\n');
  return linea;
}
// Escribe un ajuste desde un script (mismo formato que --agregar; `autor` dice quién lo decidió). Caso: perimetro-senales.mjs fija el
// perímetro de un club cuando sus documentos coinciden (autor "perimetro-senales"); el motivo cita los documentos y los criterios.
export function agregarAjuste(a) {
  if (!CAMPOS.includes(a.campo)) throw new Error(`campo desconocido: ${a.campo}`);
  const linea = { pdf: a.pdf, campo: a.campo, valor: a.valor ?? null, linea: a.linea ?? null, motivo: a.motivo, evidencia: a.evidencia ?? null, autor: a.autor || autorPorDefecto(), fecha: new Date().toISOString().slice(0, 10) };
  return escribirLinea(linea);
}
export function ajustePerimetroDe(pdf) {
  const todos = leer().filter((a) => a.campo === 'perimetro');
  const delDoc = todos.filter((a) => a.pdf === pdf); if (delDoc.length && !delDoc[delDoc.length - 1].anulado) return delDoc[delDoc.length - 1];
  const delClub = todos.filter((a) => a.pdf.endsWith('/') && pdf.startsWith(a.pdf)); return delClub.length && !delClub[delClub.length - 1].anulado ? delClub[delClub.length - 1] : null;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2);
  const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  negarSiSeMide('ajustes.mjs', { si: A.includes('--agregar') || A.includes('--anular') }); // escriben los ajustes: no mientras medir pipeline mide
  // ANULAR: el archivo es un historial y gana el último registro de cada clave; para sacar un ajuste que ya no hace falta (el
  // script ahora lo resuelve solo) se agrega un registro `anulado` con la misma clave (pdf + campo + etiqueta en fila/categoria/desglose,
  // + valor en incluye/cero-real). Caso: los ajustes de ingresos de Bologna 2019-2022, resueltos por la nota del subtotal.
  if (A.includes('--anular')) {
    const i = A.indexOf('--anular'); const pdf = A[i + 1]; const campo = A[i + 2];
    if (!pdf || !CAMPOS.includes(campo) || !flag('--motivo')) { console.error('Uso: --anular "<pdf>" <campo> [--etiqueta "..."] [--valor "..."] [--anio AAAA] --motivo "..."'); process.exit(1); }
    const vivo = ajustesDe(pdf).find((a) => a.campo === campo && (flag('--etiqueta') == null || a.etiqueta === flag('--etiqueta')) && (flag('--valor') == null || String(a.valor) === flag('--valor')) && (flag('--anio') == null || String(a.anio) === flag('--anio')));
    if (!vivo) { console.error('No hay un ajuste vigente con esa clave.'); process.exit(1); }
    try { escribirLinea({ pdf, campo, ...(vivo.etiqueta != null ? { etiqueta: vivo.etiqueta } : {}), ...(vivo.anio != null ? { anio: vivo.anio } : {}), valor: vivo.valor ?? null, anulado: true, motivo: flag('--motivo'), autor: flag('--autor') || autorPorDefecto(), fecha: new Date().toISOString().slice(0, 10) }); } catch (e) { console.error(e.message); process.exit(1); }
    console.log(`Ajuste anulado: ${pdf.split('/').slice(-2).join('/')} · ${campo}${vivo.etiqueta ? ` "${vivo.etiqueta}"` : ''}${vivo.valor != null ? ` = ${vivo.valor}` : ''}`);
    process.exit(0);
  }
  if (A.includes('--agregar')) {
    const i = A.indexOf('--agregar'); const pdf = A[i + 1]; const campo = A[i + 2];
    if (!pdf || !CAMPOS.includes(campo)) { console.error(`Uso: --agregar "<pdf>" <campo> (campos: ${CAMPOS.join(', ')})`); process.exit(1); }
    if (!existsSync(resolve(ROOT, pdf))) { console.error(`No existe ${pdf}`); process.exit(1); }
    // cierre = AAAA-MM-DD del ejercicio (escalón 0 de la fecha de cierre en alta-club.mjs y localizar.mjs); reportType =
    // official_balance_sheet | official_budget (escalón 0 del tipo de documento en alta-club.mjs). Casos: Novorizontino 2022 (el detector de
    // período tomó la fecha de la firma, 28/04/2023) y 2010 (estado de resultados en una tabla con pocas filas numéricas).
    // confirmado = un número de la transcripción que la segunda lectura (Gemini) no confirmó, confirmado a mano contra el PDF:
    // --linea N --valor "tal cual en el .md". Lo toma la compuerta del registro (verificar.mjs, avisarRegistro). Varios por documento.
    // Casos: Novorizontino 2014 (Gemini no leyó 5 números chicos; la lectura 5 cierra al centavo) y 2016 (Gemini leyó otro dígito; la
    // versión detallada en reales del mismo PDF confirma el .md).
    // caja = la caja del año TAL CUAL impresa (caja-deuda.mjs la pasa a millones con la escala del documento). Caso: Novorizontino 2022.
    if (campo === 'caja' && !flag('--valor')) { console.error('caja necesita --valor (el número tal cual impreso)'); process.exit(1); }
    // deuda = la deuda bruta del año TAL CUAL impresa, igual que `caja`: escalón 0 de la deuda en caja-deuda.mjs. Caso: Fortaleza
    // CEIF 2021, el escalón 2 leyó solo el corto plazo (102.513, nota 12) y el cuadro de instrumentos financieros dice 295.846 (.md L506).
    // incluye = una categoría que queda en 0 porque el documento la junta con otra en UNA línea: --valor <la que queda en 0>
    // --categoria <donde está> [--posible si no está confirmado que esté ahí]. cargar.mjs lo escribe como fiscalYearMeta.incluidoEn (el sitio
    // pinta "Incluido en <fila>" o "Posiblemente incluido en <fila>") y no lo trata como una categoría en 0 que debería tener número.
    // Caso: Bahia 2024-2025, member_dues dentro de matchday_competition ("Sócios e bilheteria").
    if (campo === 'incluye' && (!flag('--valor') || !flag('--categoria'))) { console.error('incluye necesita --valor <categoría en 0> y --categoria <donde está> [--posible]'); process.exit(1); }
    // escala = la escala de las cifras de ESE año en el documento (unidades | miles | millones), tal cual la imprime (la cita va en
    // --motivo/--evidencia): escalón 0 de la escala del año en caja-deuda.mjs (escalaDe), antes de factorPorIngresos. Con --anio si el PDF
    // alimenta dos años. Caso: RB Leipzig 2024, comparativo "30.06.2024 TEUR" del jahresabschluss-2024-25 (el año 2025 está en EUR).
    if (campo === 'escala' && !['unidades', 'miles', 'millones'].includes(flag('--valor'))) { console.error('escala necesita --valor unidades|miles|millones'); process.exit(1); }
    if (campo === 'deuda' && !flag('--valor')) { console.error('deuda necesita --valor (el número tal cual impreso)'); process.exit(1); }
    if (campo === 'confirmado' && (!flag('--linea') || !flag('--valor'))) { console.error('confirmado necesita --linea N y --valor "el número tal cual en el .md"'); process.exit(1); }
    if (campo === 'moneda' && !/^[A-Z]{3}$/.test(flag('--valor') || '')) { console.error('moneda necesita --valor con el código ISO de 3 letras (ITL, DEM...)'); process.exit(1); }
    if (campo === 'cierre' && !/^\d{4}-\d{2}-\d{2}$/.test(flag('--valor') || '')) { console.error('cierre necesita --valor AAAA-MM-DD'); process.exit(1); }
    if (campo === 'reportType' && !['official_balance_sheet', 'official_budget'].includes(flag('--valor'))) { console.error('reportType necesita --valor official_balance_sheet|official_budget'); process.exit(1); }
    if (campo === 'perimetro' && !['individual', 'consolidado'].includes(flag('--valor'))) { console.error('perimetro necesita --valor individual|consolidado (pdf = un documento, o la carpeta del club terminada en "/")'); process.exit(1); }
    // deuda-incluye = términos extra (separados por ';') para el diccionario de deuda de caja-deuda.mjs, para un documento o todo
    // el club. Caso: Novorizontino, el préstamo de su controlante I-9 Sports figura como "Débitos com partes relacionadas" / "Partes relacionadas".
    if (campo === 'deuda-incluye' && !flag('--valor')) { console.error('deuda-incluye necesita --valor "término; término"'); process.exit(1); }
    if (!['perimetro', 'deuda-incluye', 'name'].includes(campo) && pdf.endsWith('/')) { console.error('solo `perimetro`, `deuda-incluye` y `name` se fijan para la carpeta de un club'); process.exit(1); }
    if (['resultado-final', 'fila', 'fx', 'cero-real', 'desglose'].includes(campo) && !flag('--valor')) { console.error(`${campo} necesita --valor (el número tal cual está impreso)`); process.exit(1); }
    if (campo === 'suma-con' && (!flag('--valor') || !flag('--etiqueta') || !flag('--etiqueta-otra') || !flag('--evidencia'))) { console.error('suma-con necesita --valor (el PDF de la otra entidad), --etiqueta (renglón de gasto propio), --etiqueta-otra (ingreso espejo del otro documento) y --evidencia (las dos líneas)'); process.exit(1); }
    if (campo === 'fila' && (!flag('--etiqueta') || !LADOS.includes(flag('--lado')))) { console.error(`fila necesita --etiqueta y --lado (${LADOS.join(', ')})`); process.exit(1); }
    // (Auditora 5, Girona 2021-23) --destino profit_on_player_sales: una fila del lado financiero que va a financial.profit_on_player_sales y no a net_interest
    if (flag('--destino') !== null && !(campo === 'fila' && flag('--lado') === 'financiero' && DESTINOS_FILA.includes(flag('--destino')))) { console.error(`--destino solo va con fila --lado financiero (${DESTINOS_FILA.join(', ')})`); process.exit(1); }
    // --anio AAAA: solo en caja / deuda, para un PDF que alimenta dos años del sitio (ver ajusteDelAnio, arriba).
    if (flag('--anio') !== null && (!CAMPOS_POR_ANIO.includes(campo) || !/^\d{4}$/.test(flag('--anio') || ''))) { console.error(`--anio AAAA solo va con ${CAMPOS_POR_ANIO.join(' / ')}`); process.exit(1); }
    if (flag('--reemplaza-linea') !== null && !/^\d+$/.test(flag('--reemplaza-linea') || '')) { console.error('--reemplaza-linea necesita el número de línea del .md'); process.exit(1); }
    if (!flag('--motivo')) { console.error('Falta --motivo'); process.exit(1); }
    const a = { pdf, campo, valor: flag('--valor'), linea: flag('--linea') ? Number(flag('--linea')) : null, ...(campo === 'fila' ? { etiqueta: flag('--etiqueta'), lado: flag('--lado'), reemplaza: flag('--reemplaza'), ...(flag('--reemplaza-linea') ? { reemplazaLinea: Number(flag('--reemplaza-linea')) } : {}), ...(flag('--destino') ? { destino: flag('--destino') } : {}) } : {}), ...(campo === 'desglose' ? { etiqueta: flag('--etiqueta'), categoria: flag('--categoria'), ...(flag('--etiqueta-diferencia') ? { etiquetaDiferencia: flag('--etiqueta-diferencia') } : {}) } : {}), ...(campo === 'suma-con' ? { etiqueta: flag('--etiqueta'), etiquetaOtra: flag('--etiqueta-otra') } : {}), ...(campo === 'categoria' ? { etiqueta: flag('--etiqueta') } : {}), ...(campo === 'incluye' ? { categoria: flag('--categoria'), ...(A.includes('--posible') ? { posible: true } : {}) } : {}), ...(flag('--anio') ? { anio: Number(flag('--anio')) } : {}), motivo: flag('--motivo'), evidencia: flag('--evidencia'), ...(flag('--causa') ? { causa: flag('--causa') } : {}), autor: flag('--autor') || autorPorDefecto(), fecha: new Date().toISOString().slice(0, 10) };
    try { escribirLinea(a); } catch (e) { console.error(e.message); process.exit(1); }
    console.log(`Ajuste guardado: ${pdf.split('/').slice(-2).join('/')} · ${campo}${a.anio ? ` (año ${a.anio})` : ''}${a.etiqueta ? ` "${a.etiqueta}" (${a.lado})` : ''}${a.valor ? ` = ${a.valor}` : ''}. Lo toma la próxima corrida de verificar.mjs.`);
  } else {
    const vigentes = [...new Set(leer().map((a) => a.pdf))].flatMap((p) => ajustesDe(p));
    console.log(`AJUSTES MANUALES (${vigentes.length}) — Admin/registros/ajustes-manuales.jsonl\n`);
    // Al lado de cada documento con `resultado-final`, el IMPUESTO que calculó verificar.mjs por diferencia: el
    // ajuste no tiene compuerta, así que un error en las filas termina en el impuesto. Fortaleza 2018 daba 248.440 sobre una pérdida antes de
    // impuestos (un costo financiero sumado como ingreso); con el signo bien, 40.604, y el documento imprime 40.612.
    const impuestoDe = (pdf) => { try { const V = JSON.parse(readFileSync(resolve(ROOT, derivado(pdf.replace(/\.pdf$/i, '.md'), '.verificacion.json', { crear: false })), 'utf8')); const r = V.totales?.resultadoFinal; return r?.impuestoDeducido != null ? `impuesto calculado ${r.impuestoDeducido} (antes de impuestos ${Number((V.totales.resultadoParaCargar + r.impuestoDeducido).toFixed(3))}, resultado ${r.valor}; millones)` : null; } catch { return null; } };
    for (const a of vigentes.filter((x) => x.campo === 'resultado-final')) { const t = impuestoDe(a.pdf); if (t) a.calculo = t; }
    for (const a of vigentes) console.log(`  ${a.pdf.split('/').slice(-2).join('/')} · ${a.campo}${a.anio ? ` (año ${a.anio})` : ''}${a.etiqueta ? ` "${a.etiqueta}" (${a.lado}${a.reemplaza ? `, reemplaza "${a.reemplaza}"` : ''}${a.reemplazaLinea != null ? `, reemplaza la fila de L${a.reemplazaLinea}` : ''})` : ''}${a.valor ? ` = ${a.valor}` : ''}  (${a.autor}, ${a.fecha})\n      motivo: ${a.motivo}${a.evidencia ? `\n      evidencia: ${a.evidencia}` : ''}${a.calculo ? `\n      → ${a.calculo}` : ''}`);
  }
}
